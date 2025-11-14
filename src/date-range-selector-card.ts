import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  format,
  parseISO,
  isBefore,
  isAfter,
  differenceInDays,
} from "date-fns";
import {
  DateRangeSelectorCardConfig,
  PresetType,
  HomeAssistant,
} from "./types";

// Import the editor
import "./editor";

/**
 * Forced loader for `ha-date-input`.
 * Home Assistant lazily registers many elements only when certain frontend bundles are touched.
 * We heuristically trigger those bundles by creating core cards that reference input_datetime entities.
 * This avoids users having to manually open dialogs first. Safe failure: if not found after retries we stop.
 */
const forceLoadHaDateInput = async (hass: HomeAssistant | undefined) => {
  if (customElements.get("ha-date-input")) return true;
  const helpers = await (window as any).loadCardHelpers?.();
  if (!helpers) return false;
  const candidateEntities: string[] = [];
  try {
    // Prefer provided start/end entities if they are input_datetime (no time portion)
    if (hass) {
      Object.keys(hass.states).forEach((id) => {
        if (id.startsWith("input_datetime")) candidateEntities.push(id);
      });
    }
    // Ensure at least one dummy entry to coerce row rendering
    if (candidateEntities.length === 0) {
      // Fallback: create empty entities card (may still pull shared chunk)
      candidateEntities.push("sun.sun");
    }
    const card = await helpers.createCardElement({
      type: "entities",
      entities: candidateEntities.slice(0, 3),
    });
    // Access config element (often triggers additional lazy imports)
    if (card?.getConfigElement) {
      try {
        await card.getConfigElement();
      } catch {
        /* ignore */
      }
    }
  } catch {
    // swallow
  }
  if (customElements.get("ha-date-input")) return true;

  // Heuristic 2: Try to load via ha-selector with a date selector which internally uses ha-date-input
  try {
    const selectorEl = document.createElement("ha-selector") as any;
    (selectorEl as any).hass = hass;
    (selectorEl as any).selector = { date: {} };
    selectorEl.style.display = "none";
    document.body.appendChild(selectorEl);
    await new Promise((res) => setTimeout(res, 50));
    if ((selectorEl as any).updateComplete) {
      try {
        await (selectorEl as any).updateComplete;
      } catch {
        void 0;
      }
    }
    selectorEl.remove();
  } catch {
    void 0;
  }

  return !!customElements.get("ha-date-input");
};

const VERSION = "v0.0.22";

console.info(
  `%c DATE-RANGE-SELECTOR-CARD %c ${VERSION} `,
  "color: white; background: #0084ff; font-weight: 700;",
  "color: #0084ff; background: white; font-weight: 700;",
);

@customElement("date-range-selector-card")
export class DateRangeSelectorCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: DateRangeSelectorCardConfig;
  @state() private selectedPreset: PresetType = "day";
  @state() private currentStartDate: Date = startOfDay(new Date());
  @state() private currentEndDate: Date = endOfDay(new Date());
  @state() private showCustomPickers: boolean = false;
  @state() private isUpdating: boolean = false;
  @state() private showFloatingPopup: boolean = false;
  @state() private haDateInputReady: boolean =
    !!customElements.get("ha-date-input");
  @state() private haDateInputLoading: boolean = false;
  @state() private haDateInputFailed: boolean = false;

  public static getConfigElement() {
    return document.createElement("date-range-selector-editor");
  }

  public static getStubConfig(): DateRangeSelectorCardConfig {
    return {
      type: "custom:date-range-selector-card",
      start_entity: "",
      end_entity: "",
      show_arrows: true,
      today_button_type: "icon",
    };
  }

  public setConfig(config: DateRangeSelectorCardConfig): void {
    if (!config.start_entity) {
      throw new Error("You must define start_entity");
    }
    if (!config.end_entity) {
      throw new Error("You must define end_entity");
    }

    this.config = {
      show_arrows: true,
      today_button_type: "icon",
      hide_background: false,
      hide_date_display: false,
      date_display_position: "above",
      show_custom_range: false,
      disable_future: false,
      display_mode: "default",
      visible_range_modes: {
        day: true,
        week: true,
        month: true,
        year: true,
      },
      use_button_group: false,
      floating_mode: false,
      floating_button_position: "bottom-right",
      floating_button_icon: "mdi:calendar-range",
      floating_button_text: "",
      popup_title: "Date Range Selector",
      popup_icon: "",
      ...config,
    };

    // Ensure at least one range mode is visible
    const visibleModes = this.config.visible_range_modes!;
    const hasVisibleMode =
      visibleModes.day ||
      visibleModes.week ||
      visibleModes.month ||
      visibleModes.year;
    if (!hasVisibleMode) {
      // Default to day if all are hidden
      visibleModes.day = true;
    }

    // Determine default range mode (smallest visible if not specified or not visible)
    if (
      !this.config.default_range_mode ||
      !this._isRangeModeVisible(this.config.default_range_mode)
    ) {
      // Find the smallest visible range mode
      if (visibleModes.day) this.selectedPreset = "day";
      else if (visibleModes.week) this.selectedPreset = "week";
      else if (visibleModes.month) this.selectedPreset = "month";
      else if (visibleModes.year) this.selectedPreset = "year";
    } else {
      this.selectedPreset = this.config.default_range_mode;
    }
  }

  public getCardSize(): number {
    return 3;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._initHaDateInput();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has("hass") && this.hass) {
      this._updateDatesFromEntities();
      // Retry loader once hass is available if not yet ready
      if (
        !this.haDateInputReady &&
        !this.haDateInputLoading &&
        !this.haDateInputFailed
      ) {
        this._initHaDateInput();
      }
    }
  }

  /**
   * Initialize forced loading of ha-date-input with bounded retries.
   */
  private _initHaDateInput(): void {
    if (this.haDateInputReady || this.haDateInputLoading) return;
    this.haDateInputFailed = false;
    this.haDateInputLoading = true;
    let attempts = 0;
    const maxAttempts = 8; // ~8 * 500ms = 4s
    const tryLoad = async () => {
      attempts++;
      const loaded = await forceLoadHaDateInput(this.hass);
      try {
        // eslint-disable-next-line no-console
        console.debug(
          "[date-range-selector] ha-date-input load attempt",
          attempts,
          loaded,
        );
      } catch {
        void 0;
      }
      if (loaded) {
        this.haDateInputReady = true;
        this.haDateInputLoading = false;
        this.requestUpdate();
        return;
      }
      if (attempts < maxAttempts) {
        setTimeout(tryLoad, 500);
      } else {
        // Give up; user can still interact with presets or re-open card later.
        this.haDateInputLoading = false;
        this.haDateInputFailed = true;
        try {
          // eslint-disable-next-line no-console
          console.warn("[date-range-selector] ha-date-input failed to load");
        } catch {
          void 0;
        }
        this.requestUpdate();
      }
    };
    // Kick off first attempt
    void tryLoad();
  }

  private _updateDatesFromEntities(): void {
    if (!this.hass || !this.config) return;

    const startEntity = this.hass.states[this.config.start_entity];
    const endEntity = this.hass.states[this.config.end_entity];

    if (
      startEntity &&
      startEntity.state !== "unavailable" &&
      startEntity.state !== "unknown"
    ) {
      try {
        this.currentStartDate = parseISO(startEntity.state);
      } catch (e) {
        console.error("Error parsing start date:", e);
      }
    }

    if (
      endEntity &&
      endEntity.state !== "unavailable" &&
      endEntity.state !== "unknown"
    ) {
      try {
        this.currentEndDate = parseISO(endEntity.state);
      } catch (e) {
        console.error("Error parsing end date:", e);
      }
    }
  }

  private _handleToday(): void {
    const today = new Date();

    // If in custom mode, reset to day mode
    if (this.selectedPreset === "custom") {
      this.selectedPreset = "day";
      this.showCustomPickers = false;
    }

    // Calculate range based on current mode
    const { start, end } = this._calculatePresetRange(
      this.selectedPreset,
      today,
    );
    this._setDateRange(start, end);
  }

  private _handlePreset(preset: PresetType): void {
    if (preset === "custom") {
      this.showCustomPickers = !this.showCustomPickers;
      this.selectedPreset = preset;
      return;
    }

    this.selectedPreset = preset;
    this.showCustomPickers = false;
    const today = new Date();
    const { start, end } = this._calculatePresetRange(preset, today);
    this._setDateRange(start, end);
  }

  private _handleNavigation(direction: "prev" | "next"): void {
    if (this.selectedPreset === "custom") return;

    const amount = direction === "prev" ? -1 : 1;
    let referenceDate: Date;

    // Get a reference date for calculating the new range
    // Use start date for calculating the new period
    switch (this.selectedPreset) {
      case "day":
        referenceDate = addDays(this.currentStartDate, amount);
        break;
      case "week":
        referenceDate = addWeeks(this.currentStartDate, amount);
        break;
      case "month":
        referenceDate = addMonths(this.currentStartDate, amount);
        break;
      case "year":
        referenceDate = addYears(this.currentStartDate, amount);
        break;
      default:
        return;
    }

    // Calculate the full range for the new period
    const { start, end } = this._calculatePresetRange(
      this.selectedPreset,
      referenceDate,
    );
    this._setDateRange(start, end);
  }

  private _calculatePresetRange(
    preset: PresetType,
    referenceDate: Date,
  ): { start: Date; end: Date } {
    let start: Date;
    let end: Date;

    switch (preset) {
      case "day":
        start = startOfDay(referenceDate);
        end = endOfDay(referenceDate);
        break;
      case "week":
        start = startOfWeek(referenceDate, { weekStartsOn: 1 }); // ISO week (Monday)
        end = endOfWeek(referenceDate, { weekStartsOn: 1 });
        break;
      case "month":
        start = startOfMonth(referenceDate);
        end = endOfMonth(referenceDate);
        break;
      case "year":
        start = startOfYear(referenceDate);
        end = endOfYear(referenceDate);
        break;
      default:
        start = startOfDay(referenceDate);
        end = endOfDay(referenceDate);
    }

    return this._applyConstraints(start, end);
  }

  private _applyConstraints(
    start: Date,
    end: Date,
  ): { start: Date; end: Date } {
    const today = endOfDay(new Date());
    let constrainedStart = start;
    let constrainedEnd = end;

    // Apply min_date constraint
    if (this.config.min_date) {
      const minDateValue = parseISO(this.config.min_date);
      if (isBefore(constrainedStart, minDateValue)) {
        constrainedStart = minDateValue;
      }
      if (isBefore(constrainedEnd, minDateValue)) {
        constrainedEnd = minDateValue;
      }
    }

    // Apply disable_future constraint - only cap the end date if it goes beyond today
    // Don't cap historical ranges
    if (this.config.disable_future) {
      if (isAfter(constrainedEnd, today)) {
        constrainedEnd = today;
      }
      // Only adjust start date if it's also in the future
      if (isAfter(constrainedStart, today)) {
        constrainedStart = today;
      }
    }

    return { start: constrainedStart, end: constrainedEnd };
  }

  private _canNavigatePrev(): boolean {
    if (this.selectedPreset === "custom") return false;
    if (!this.config.min_date) return true;

    const minDateValue = parseISO(this.config.min_date);
    let testDate: Date;

    switch (this.selectedPreset) {
      case "day":
        testDate = addDays(this.currentStartDate, -1);
        break;
      case "week":
        testDate = addWeeks(this.currentStartDate, -1);
        break;
      case "month":
        testDate = addMonths(this.currentStartDate, -1);
        break;
      case "year":
        testDate = addYears(this.currentStartDate, -1);
        break;
      default:
        return true;
    }

    return !isBefore(testDate, minDateValue);
  }

  private _canNavigateNext(): boolean {
    if (this.selectedPreset === "custom") return false;
    if (!this.config.disable_future) return true;

    const today = new Date();
    let testDate: Date;

    switch (this.selectedPreset) {
      case "day":
        testDate = addDays(this.currentEndDate, 1);
        break;
      case "week":
        testDate = addWeeks(this.currentEndDate, 1);
        break;
      case "month":
        testDate = addMonths(this.currentEndDate, 1);
        break;
      case "year":
        testDate = addYears(this.currentEndDate, 1);
        break;
      default:
        return true;
    }

    return !isAfter(testDate, today);
  }

  private _isRangeModeVisible(mode: PresetType): boolean {
    if (mode === "custom") return this.config.show_custom_range === true;
    return this.config.visible_range_modes?.[mode] !== false;
  }

  private _getVisibleRangeModes(): PresetType[] {
    const modes: PresetType[] = [];
    if (this._isRangeModeVisible("day")) modes.push("day");
    if (this._isRangeModeVisible("week")) modes.push("week");
    if (this._isRangeModeVisible("month")) modes.push("month");
    if (this._isRangeModeVisible("year")) modes.push("year");
    return modes;
  }

  private _shouldShowRangeButton(mode: PresetType): boolean {
    if (!this._isRangeModeVisible(mode)) return false;

    // If custom range is disabled and only one range mode is active, hide its button
    if (!this.config.show_custom_range) {
      const visibleModes = this._getVisibleRangeModes();
      if (visibleModes.length === 1) return false;
    }

    return true;
  }

  private async _setDateRange(start: Date, end: Date): Promise<void> {
    // Prevent concurrent updates
    if (this.isUpdating) {
      return;
    }

    this.isUpdating = true;
    this.currentStartDate = start;
    this.currentEndDate = end;

    const startDateStr = format(start, "yyyy-MM-dd");
    const endDateStr = format(end, "yyyy-MM-dd");

    try {
      await this.hass.callService("input_datetime", "set_datetime", {
        entity_id: this.config.start_entity,
        date: startDateStr,
      });

      await this.hass.callService("input_datetime", "set_datetime", {
        entity_id: this.config.end_entity,
        date: endDateStr,
      });

      // Update range entity (number of days)
      if (this.config.range_entity) {
        const range = differenceInDays(end, start) + 1; // +1 to include both start and end day
        await this.hass.callService("input_number", "set_value", {
          entity_id: this.config.range_entity,
          value: range,
        });
      }

      // Update offset entity (days from today to start)
      if (this.config.offset_entity) {
        const today = startOfDay(new Date());
        const offset = differenceInDays(start, today);
        await this.hass.callService("input_number", "set_value", {
          entity_id: this.config.offset_entity,
          value: offset,
        });
      }
    } catch (error) {
      console.error("Error setting date range:", error);
    } finally {
      // Add a small delay to ensure Home Assistant has processed the updates
      setTimeout(() => {
        this.isUpdating = false;
      }, 100);
    }
  }

  private _handleCustomStartChange(e: CustomEvent): void {
    const value = (e.detail as any).value;
    if (value) {
      const newStart = parseISO(value);
      let newEnd = this.currentEndDate;

      // If new start date is after current end date, update end date to match start
      if (isAfter(newStart, this.currentEndDate)) {
        newEnd = newStart;
      }

      this._setDateRange(newStart, newEnd);
    }
  }

  private _handleCustomEndChange(e: CustomEvent): void {
    const value = (e.detail as any).value;
    if (value) {
      const newEnd = parseISO(value);
      this._setDateRange(this.currentStartDate, newEnd);
    }
  }

  private _getTodayButtonLabel(): string {
    switch (this.selectedPreset) {
      case "day":
        return "Today";
      case "week":
        return "This Week";
      case "month":
        return "This Month";
      case "year":
        return "This Year";
      case "custom":
        return "Today";
      default:
        return "Today";
    }
  }

  private _toggleFloatingPopup(): void {
    this.showFloatingPopup = !this.showFloatingPopup;
  }

  private _closeFloatingPopup(): void {
    this.showFloatingPopup = false;
  }

  private _isTodayRangeActive(): boolean {
    // Check if the current date range matches what would happen if the today button was pressed
    if (this.selectedPreset === "custom") return false;

    const today = new Date();
    const { start, end } = this._calculatePresetRange(
      this.selectedPreset,
      today,
    );

    // Compare dates by string format to avoid time comparison issues
    const currentStart = format(this.currentStartDate, "yyyy-MM-dd");
    const currentEnd = format(this.currentEndDate, "yyyy-MM-dd");
    const todayStart = format(start, "yyyy-MM-dd");
    const todayEnd = format(end, "yyyy-MM-dd");

    return currentStart === todayStart && currentEnd === todayEnd;
  }

  private _isEditMode(): boolean {
    // Check if we're in edit mode by looking at the URL or panel state
    // In edit mode, the URL typically contains 'edit=1' or the panel class has 'edit-mode'
    if (typeof window !== "undefined") {
      const url = window.location.href;
      if (url.includes("edit=1")) return true;

      // Check if any parent has edit-mode class
      let element = this.parentElement;
      while (element) {
        if (element.classList?.contains("edit-mode")) return true;
        element = element.parentElement;
      }
    }
    return false;
  }

  private _formatDateRange(): string {
    try {
      const startFormatted = format(this.currentStartDate, "MMMM d, yyyy");
      const endFormatted = format(this.currentEndDate, "MMMM d, yyyy");

      if (startFormatted === endFormatted) {
        return startFormatted;
      }

      return `${startFormatted} - ${endFormatted}`;
    } catch {
      return "Invalid date range";
    }
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const cardClass = this.config.hide_background ? "no-background" : "";
    const compactMode = this.config.display_mode === "compact";
    const inHeaderMode = this.config.display_mode === "in-header";
    const showDateDisplay = !this.config.hide_date_display;
    const datePosition = this.config.date_display_position || "above";
    const useButtonGroup = this.config.use_button_group === true;
    const floatingMode =
      this.config.floating_mode === true && !this._isEditMode();
    const hasHaDateInput = this.haDateInputReady;

    // Render date display template
    const renderDateDisplay = () => {
      if (!showDateDisplay) return html``;

      if (compactMode) {
        return html`
          <div class="date-range-display compact">
            ${this._formatDateRange()}
          </div>
        `;
      }

      return html`
        <div class="date-range-display">${this._formatDateRange()}</div>
      `;
    };

    // Render the button row content
    const renderButtonRow = () => html`
      <div class="button-row ${useButtonGroup ? "button-group" : ""}">
        ${this.config.show_arrows
          ? html`
              <button
                class="nav-button"
                @click=${() => this._handleNavigation("prev")}
                ?disabled=${!this._canNavigatePrev() || this.isUpdating}
                title="Previous"
              >
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </button>
            `
          : ""}

        <button
          class="preset-button ${this._isTodayRangeActive() ? "active" : ""}"
          @click=${this._handleToday}
          ?disabled=${this.isUpdating}
          title="${this._getTodayButtonLabel()}"
        >
          ${this.config.today_button_type === "icon"
            ? html`<ha-icon icon="mdi:calendar-today"></ha-icon>`
            : html`${this._getTodayButtonLabel()}`}
        </button>

        ${this._shouldShowRangeButton("day")
          ? html`
              <button
                class="preset-button ${this.selectedPreset === "day"
                  ? "active"
                  : ""}"
                @click=${() => this._handlePreset("day")}
                ?disabled=${this.isUpdating}
              >
                Day
              </button>
            `
          : ""}
        ${this._shouldShowRangeButton("week")
          ? html`
              <button
                class="preset-button ${this.selectedPreset === "week"
                  ? "active"
                  : ""}"
                @click=${() => this._handlePreset("week")}
                ?disabled=${this.isUpdating}
              >
                Week
              </button>
            `
          : ""}
        ${this._shouldShowRangeButton("month")
          ? html`
              <button
                class="preset-button ${this.selectedPreset === "month"
                  ? "active"
                  : ""}"
                @click=${() => this._handlePreset("month")}
                ?disabled=${this.isUpdating}
              >
                Month
              </button>
            `
          : ""}
        ${this._shouldShowRangeButton("year")
          ? html`
              <button
                class="preset-button ${this.selectedPreset === "year"
                  ? "active"
                  : ""}"
                @click=${() => this._handlePreset("year")}
                ?disabled=${this.isUpdating}
              >
                Year
              </button>
            `
          : ""}
        ${this.config.show_custom_range
          ? html`
              <button
                class="preset-button ${this.selectedPreset === "custom"
                  ? "active"
                  : ""}"
                @click=${() => this._handlePreset("custom")}
                ?disabled=${this.isUpdating}
              >
                Custom
              </button>
            `
          : ""}
        ${this.config.show_arrows
          ? html`
              <button
                class="nav-button"
                @click=${() => this._handleNavigation("next")}
                ?disabled=${!this._canNavigateNext() || this.isUpdating}
                title="Next"
              >
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </button>
            `
          : ""}
      </div>
    `;

    // Render custom date pickers (simplified to only support ha-date-input)
    const renderCustomPickers = () => {
      if (!this.showCustomPickers) return html``;
      if (!hasHaDateInput) {
        return html`
          <div class="custom-range-pickers">
            <div class="picker-group">
              <label>Date Picker Loading</label>
              <div class="loading-hint">
                ${this.haDateInputLoading
                  ? html`<span>Loading Home Assistant date component...</span>`
                  : html`<span
                      >Failed to load <code>ha-date-input</code>. Reload
                      dashboard or open an entities card containing an
                      <code>input_datetime</code>.
                      <button
                        @click=${() => {
                          this.haDateInputFailed = false;
                          this._initHaDateInput();
                        }}
                      >
                        Retry
                      </button></span
                    >`}
              </div>
            </div>
          </div>
        `;
      }
      return html`
        <div class="custom-range-pickers">
          <div class="picker-group">
            <ha-date-input
              .hass=${this.hass}
              .locale=${this.hass.locale}
              .value=${format(this.currentStartDate, "yyyy-MM-dd")}
              .label=${"Start Date"}
              @value-changed=${this._handleCustomStartChange}
              .min=${typeof this.config.min_date === "string"
                ? this.config.min_date
                : ""}
              .max=${this.config.disable_future
                ? format(new Date(), "yyyy-MM-dd")
                : ""}
              .disabled=${this.isUpdating}
            ></ha-date-input>
          </div>
          <div class="picker-group">
            <ha-date-input
              .hass=${this.hass}
              .locale=${this.hass.locale}
              .value=${format(this.currentEndDate, "yyyy-MM-dd")}
              .label=${"End Date"}
              @value-changed=${this._handleCustomEndChange}
              .min=${format(this.currentStartDate, "yyyy-MM-dd")}
              .max=${this.config.disable_future
                ? format(new Date(), "yyyy-MM-dd")
                : ""}
              .disabled=${this.isUpdating}
            ></ha-date-input>
          </div>
        </div>
      `;
    };

    // Render main content
    const renderMainContent = () => html`
      <!-- Date Range Display (Above) -->
      ${datePosition === "above" ? renderDateDisplay() : ""}

      <!-- Preset Buttons Row -->
      ${renderButtonRow()}

      <!-- Date Range Display (Below) -->
      ${datePosition === "below" ? renderDateDisplay() : ""}

      <!-- Custom Date Pickers -->
      ${renderCustomPickers()}
    `;

    // If floating mode, render the floating button and popup
    if (floatingMode) {
      const position = this.config.floating_button_position || "bottom-right";
      const icon = this.config.floating_button_icon || "mdi:calendar-range";
      const text = this.config.floating_button_text || "";

      return html`
        <div class="floating-container">
          <button
            class="floating-button ${position} ${text ? "with-text" : ""}"
            @click=${this._toggleFloatingPopup}
            title="Date Range Selector"
          >
            <ha-icon icon="${icon}"></ha-icon>
            ${text ? html`<span class="button-text">${text}</span>` : ""}
          </button>

          ${this.showFloatingPopup
            ? html`
                <div
                  class="floating-popup-overlay"
                  @click=${this._closeFloatingPopup}
                >
                  <div
                    class="floating-popup ${cardClass}"
                    @click=${(e: Event) => e.stopPropagation()}
                  >
                    <div class="popup-header">
                      <div class="popup-header-content">
                        ${this.config.popup_icon
                          ? html`<ha-icon
                              icon="${this.config.popup_icon}"
                            ></ha-icon>`
                          : ""}
                        <h3>
                          ${this.config.popup_title || "Date Range Selector"}
                        </h3>
                      </div>
                      <button
                        class="close-button"
                        @click=${this._closeFloatingPopup}
                      >
                        <ha-icon icon="mdi:close"></ha-icon>
                      </button>
                    </div>
                    <div class="popup-content">${renderMainContent()}</div>
                  </div>
                </div>
              `
            : ""}
        </div>
      `;
    }

    // Standard mode - render as a card
    return html`
      <ha-card
        class="${cardClass} ${compactMode ? "compact-mode" : ""} ${inHeaderMode
          ? "in-header-mode"
          : ""}"
      >
        <div class="card-content">${renderMainContent()}</div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
        background: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(
          --ha-card-box-shadow,
          0px 2px 1px -1px rgba(0, 0, 0, 0.2),
          0px 1px 1px 0px rgba(0, 0, 0, 0.14),
          0px 1px 3px 0px rgba(0, 0, 0, 0.12)
        );
      }

      ha-card.no-background {
        background: transparent;
        box-shadow: none;
        border: none;
        padding: 8px;
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .date-range-display {
        text-align: center;
        font-size: 1.1em;
        font-weight: 500;
        color: var(--primary-text-color);
        padding: 8px;
      }

      .date-range-display.compact {
        font-size: 0.9em;
        padding: 4px 8px;
      }

      ha-card.compact-mode {
        padding: 8px;
      }

      ha-card.compact-mode .card-content {
        gap: 8px;
      }

      ha-card.compact-mode .button-row {
        gap: 4px;
      }

      ha-card.compact-mode .button-row.button-group {
        gap: 0;
      }

      ha-card.compact-mode .preset-button,
      ha-card.compact-mode .nav-button {
        padding: 6px 10px;
        font-size: 12px;
        min-width: 36px;
        height: 36px;
      }

      ha-card.in-header-mode {
        padding: 0;
      }

      ha-card.in-header-mode .card-content {
        gap: 0;
      }

      ha-card.in-header-mode .button-row {
        gap: 2px;
      }

      ha-card.in-header-mode .button-row.button-group {
        gap: 0;
      }

      ha-card.in-header-mode .preset-button,
      ha-card.in-header-mode .nav-button {
        padding: 4px 8px;
        font-size: 11px;
        min-width: 32px;
        height: 32px;
      }

      .button-row {
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }

      /* Button Group Styles */
      .button-row.button-group {
        gap: 0;
        border-radius: 8px;
        overflow: hidden;
      }

      .button-row.button-group .preset-button,
      .button-row.button-group .nav-button {
        border-radius: 0;
        border-right-width: 0;
        margin: 0;
      }

      .button-row.button-group .preset-button:first-child,
      .button-row.button-group .nav-button:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      .button-row.button-group .preset-button:last-child,
      .button-row.button-group .nav-button:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-right-width: 1px;
      }

      .button-row.button-group .preset-button.active {
        position: relative;
        z-index: 1;
        border-right-width: 1px;
      }

      .preset-button,
      .nav-button {
        padding: 10px 16px;
        border: 1px solid var(--divider-color, #e0e0e0);
        background: var(--card-background-color, white);
        color: var(--primary-text-color);
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 44px;
        height: 44px;
      }

      .preset-button:hover,
      .nav-button:hover {
        background: var(--secondary-background-color, #f5f5f5);
        border-color: var(--primary-color);
      }

      .preset-button.active {
        background: var(--primary-color);
        color: var(--text-primary-color, white);
        border-color: var(--primary-color);
      }

      .nav-button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      .nav-button:disabled:hover {
        background: var(--card-background-color, white);
        border-color: var(--divider-color, #e0e0e0);
      }

      .custom-range-pickers {
        display: flex;
        justify-content: center;
        border-radius: 8px;
        gap: 16px;
      }

      /* Only add padding and background when NOT in no-background mode */
      ha-card:not(.no-background) .custom-range-pickers {
        padding: 16px;
        background: var(--secondary-background-color, #f5f5f5);
      }

      .custom-range-pickers ha-date-range-picker {
        width: 100%;
        max-width: 600px;
      }

      ha-card.compact-mode:not(.no-background) .custom-range-pickers {
        padding: 8px;
      }

      ha-card.in-header-mode .custom-range-pickers {
        padding: 4px;
      }

      /* Floating Mode Styles */
      .floating-container {
        position: relative;
      }

      .floating-button {
        position: fixed;
        z-index: 10;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--primary-color);
        color: var(--text-primary-color, white);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        font-size: 14px;
        font-weight: 500;
        padding: 0;
      }

      .floating-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
      }

      .floating-button ha-icon {
        --mdc-icon-size: 24px;
      }

      .floating-button.with-text {
        width: auto;
        border-radius: 28px;
        padding: 0 20px 0 16px;
        gap: 8px;
      }

      .floating-button .button-text {
        white-space: nowrap;
      }

      .floating-button.top-left {
        top: 16px;
        left: 16px;
      }

      .floating-button.top-right {
        top: 16px;
        right: 16px;
      }

      .floating-button.bottom-left {
        bottom: 16px;
        left: 16px;
      }

      .floating-button.bottom-right {
        bottom: 16px;
        right: 16px;
      }

      .floating-popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 30;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        animation: fadeIn 0.2s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .floating-popup {
        position: relative;
        z-index: 31; /* above overlay, below HA dialogs */
        background: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
      }

      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .popup-header-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .popup-header-content ha-icon {
        --mdc-icon-size: 24px;
        color: var(--primary-color);
      }

      .popup-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .close-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
        color: var(--primary-text-color);
      }

      .close-button:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .close-button ha-icon {
        --mdc-icon-size: 20px;
      }

      .popup-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .popup-content .card-content {
        padding: 0;
        gap: 16px;
      }

      .popup-content .date-range-display {
        padding: 0;
      }

      @media (max-width: 600px) {
        .button-row {
          gap: 4px;
        }

        .button-row.button-group {
          flex-wrap: nowrap;
          overflow-x: auto;
        }

        .preset-button,
        .nav-button {
          padding: 8px 12px;
          font-size: 12px;
          min-width: 40px;
        }

        .custom-range-pickers {
          grid-template-columns: 1fr;
        }

        .floating-popup {
          max-height: 95vh;
          border-radius: 16px 16px 0 0;
        }
      }

      /* Popup mode: respect no-background setting for custom-range-pickers */
      .floating-popup.no-background .custom-range-pickers {
        padding: 0;
        background: transparent;
      }

      .floating-popup:not(.no-background) .custom-range-pickers {
        padding: 16px;
        background: var(--secondary-background-color, #f5f5f5);
      }

      @media (max-width: 600px) {
        .floating-popup:not(.no-background) .custom-range-pickers {
          padding: 8px;
        }

        .floating-popup-overlay {
          align-items: flex-end;
          padding: 0;
        }
      }

      ha-icon {
        --mdc-icon-size: 20px;
      }
    `;
  }
}

// Register the card
if (!(window as any).customCards) {
  (window as any).customCards = [];
}
(window as any).customCards.push({
  type: "date-range-selector-card",
  name: "Date Range Selector",
  description: "A card for selecting date ranges with preset buttons",
  preview: false,
  documentationURL: "https://github.com/Prestodus/Date-Range-Selector",
});
