import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
  isToday,
} from 'date-fns';
import { DateRangeSelectorCardConfig, PresetType, HomeAssistant } from './types';

// Import the editor
import './editor';

const VERSION = '1.0.0';

console.info(
  `%c DATE-RANGE-SELECTOR-CARD %c v${VERSION} `,
  'color: white; background: #0084ff; font-weight: 700;',
  'color: #0084ff; background: white; font-weight: 700;'
);

@customElement('date-range-selector-card')
export class DateRangeSelectorCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: DateRangeSelectorCardConfig;
  @state() private selectedPreset: PresetType = 'day';
  @state() private currentStartDate: Date = startOfDay(new Date());
  @state() private currentEndDate: Date = endOfDay(new Date());
  @state() private showCustomPickers: boolean = false;

  public static getConfigElement() {
    return document.createElement('date-range-selector-editor');
  }

  public static getStubConfig(): DateRangeSelectorCardConfig {
    return {
      type: 'custom:date-range-selector-card',
      start_entity: 'input_datetime.date_range_start',
      end_entity: 'input_datetime.date_range_end',
      show_arrows: true,
      today_button_type: 'icon',
    };
  }

  public setConfig(config: DateRangeSelectorCardConfig): void {
    if (!config.start_entity) {
      throw new Error('You must define start_entity');
    }
    if (!config.end_entity) {
      throw new Error('You must define end_entity');
    }

    this.config = {
      show_arrows: true,
      today_button_type: 'icon',
      hide_background: false,
      show_custom_range: false,
      disable_future: false,
      ...config,
    };
  }

  public getCardSize(): number {
    return 3;
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('hass') && this.hass) {
      this._updateDatesFromEntities();
    }
  }

  private _updateDatesFromEntities(): void {
    if (!this.hass || !this.config) return;

    const startEntity = this.hass.states[this.config.start_entity];
    const endEntity = this.hass.states[this.config.end_entity];

    if (startEntity && startEntity.state !== 'unavailable' && startEntity.state !== 'unknown') {
      try {
        this.currentStartDate = parseISO(startEntity.state);
      } catch (e) {
        console.error('Error parsing start date:', e);
      }
    }

    if (endEntity && endEntity.state !== 'unavailable' && endEntity.state !== 'unknown') {
      try {
        this.currentEndDate = parseISO(endEntity.state);
      } catch (e) {
        console.error('Error parsing end date:', e);
      }
    }
  }

  private _handleToday(): void {
    const today = new Date();
    this.selectedPreset = 'day';
    this._setDateRange(startOfDay(today), endOfDay(today));
  }

  private _handlePreset(preset: PresetType): void {
    if (preset === 'custom') {
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

  private _handleNavigation(direction: 'prev' | 'next'): void {
    if (this.selectedPreset === 'custom') return;

    const amount = direction === 'prev' ? -1 : 1;
    let newStart: Date;
    let newEnd: Date;

    switch (this.selectedPreset) {
      case 'day':
        newStart = addDays(this.currentStartDate, amount);
        newEnd = addDays(this.currentEndDate, amount);
        break;
      case 'week':
        newStart = addWeeks(this.currentStartDate, amount);
        newEnd = addWeeks(this.currentEndDate, amount);
        break;
      case 'month':
        newStart = addMonths(this.currentStartDate, amount);
        newEnd = addMonths(this.currentEndDate, amount);
        break;
      case 'year':
        newStart = addYears(this.currentStartDate, amount);
        newEnd = addYears(this.currentEndDate, amount);
        break;
      default:
        return;
    }

    const { start, end } = this._applyConstraints(newStart, newEnd);
    this._setDateRange(start, end);
  }

  private _calculatePresetRange(preset: PresetType, referenceDate: Date): { start: Date; end: Date } {
    let start: Date;
    let end: Date;

    switch (preset) {
      case 'day':
        start = startOfDay(referenceDate);
        end = endOfDay(referenceDate);
        break;
      case 'week':
        start = startOfWeek(referenceDate, { weekStartsOn: 1 }); // ISO week (Monday)
        end = endOfWeek(referenceDate, { weekStartsOn: 1 });
        break;
      case 'month':
        start = startOfMonth(referenceDate);
        end = endOfMonth(referenceDate);
        break;
      case 'year':
        start = startOfYear(referenceDate);
        end = endOfYear(referenceDate);
        break;
      default:
        start = startOfDay(referenceDate);
        end = endOfDay(referenceDate);
    }

    return this._applyConstraints(start, end);
  }

  private _applyConstraints(start: Date, end: Date): { start: Date; end: Date } {
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

    // Apply disable_future constraint
    if (this.config.disable_future) {
      if (isAfter(constrainedEnd, today)) {
        constrainedEnd = today;
      }
      if (isAfter(constrainedStart, today)) {
        constrainedStart = today;
      }
    }

    return { start: constrainedStart, end: constrainedEnd };
  }

  private _canNavigatePrev(): boolean {
    if (this.selectedPreset === 'custom') return false;
    if (!this.config.min_date) return true;

    const minDateValue = parseISO(this.config.min_date);
    let testDate: Date;

    switch (this.selectedPreset) {
      case 'day':
        testDate = addDays(this.currentStartDate, -1);
        break;
      case 'week':
        testDate = addWeeks(this.currentStartDate, -1);
        break;
      case 'month':
        testDate = addMonths(this.currentStartDate, -1);
        break;
      case 'year':
        testDate = addYears(this.currentStartDate, -1);
        break;
      default:
        return true;
    }

    return !isBefore(testDate, minDateValue);
  }

  private _canNavigateNext(): boolean {
    if (this.selectedPreset === 'custom') return false;
    if (!this.config.disable_future) return true;

    const today = new Date();
    let testDate: Date;

    switch (this.selectedPreset) {
      case 'day':
        testDate = addDays(this.currentEndDate, 1);
        break;
      case 'week':
        testDate = addWeeks(this.currentEndDate, 1);
        break;
      case 'month':
        testDate = addMonths(this.currentEndDate, 1);
        break;
      case 'year':
        testDate = addYears(this.currentEndDate, 1);
        break;
      default:
        return true;
    }

    return !isAfter(testDate, today);
  }

  private async _setDateRange(start: Date, end: Date): Promise<void> {
    this.currentStartDate = start;
    this.currentEndDate = end;

    const startDateStr = format(start, 'yyyy-MM-dd');
    const endDateStr = format(end, 'yyyy-MM-dd');

    try {
      await this.hass.callService('input_datetime', 'set_datetime', {
        entity_id: this.config.start_entity,
        date: startDateStr,
      });

      await this.hass.callService('input_datetime', 'set_datetime', {
        entity_id: this.config.end_entity,
        date: endDateStr,
      });
    } catch (error) {
      console.error('Error setting date range:', error);
    }
  }

  private _handleCustomStartChange(e: CustomEvent): void {
    const value = (e.target as any).value;
    if (value) {
      const newStart = parseISO(value);
      this._setDateRange(newStart, this.currentEndDate);
    }
  }

  private _handleCustomEndChange(e: CustomEvent): void {
    const value = (e.target as any).value;
    if (value) {
      const newEnd = parseISO(value);
      this._setDateRange(this.currentStartDate, newEnd);
    }
  }

  private _formatDateRange(): string {
    try {
      const startFormatted = format(this.currentStartDate, 'MMMM d, yyyy');
      const endFormatted = format(this.currentEndDate, 'MMMM d, yyyy');

      if (startFormatted === endFormatted) {
        return startFormatted;
      }

      return `${startFormatted} - ${endFormatted}`;
    } catch (e) {
      return 'Invalid date range';
    }
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const cardClass = this.config.hide_background ? 'no-background' : '';

    return html`
      <ha-card class="${cardClass}">
        <div class="card-content">
          <!-- Date Range Display -->
          <div class="date-range-display">
            ${this._formatDateRange()}
          </div>

          <!-- Preset Buttons Row -->
          <div class="button-row">
            ${this.config.show_arrows
              ? html`
                  <button
                    class="nav-button"
                    @click=${() => this._handleNavigation('prev')}
                    ?disabled=${!this._canNavigatePrev()}
                    title="Previous"
                  >
                    <ha-icon icon="mdi:chevron-left"></ha-icon>
                  </button>
                `
              : ''}

            <button
              class="preset-button ${isToday(this.currentStartDate) && this.selectedPreset === 'day' ? 'active' : ''}"
              @click=${this._handleToday}
              title="Today"
            >
              ${this.config.today_button_type === 'icon'
                ? html`<ha-icon icon="mdi:calendar-today"></ha-icon>`
                : html`Today`}
            </button>

            <button
              class="preset-button ${this.selectedPreset === 'day' ? 'active' : ''}"
              @click=${() => this._handlePreset('day')}
            >
              Day
            </button>

            <button
              class="preset-button ${this.selectedPreset === 'week' ? 'active' : ''}"
              @click=${() => this._handlePreset('week')}
            >
              Week
            </button>

            <button
              class="preset-button ${this.selectedPreset === 'month' ? 'active' : ''}"
              @click=${() => this._handlePreset('month')}
            >
              Month
            </button>

            <button
              class="preset-button ${this.selectedPreset === 'year' ? 'active' : ''}"
              @click=${() => this._handlePreset('year')}
            >
              Year
            </button>

            ${this.config.show_custom_range
              ? html`
                  <button
                    class="preset-button ${this.selectedPreset === 'custom' ? 'active' : ''}"
                    @click=${() => this._handlePreset('custom')}
                  >
                    Custom
                  </button>
                `
              : ''}

            ${this.config.show_arrows
              ? html`
                  <button
                    class="nav-button"
                    @click=${() => this._handleNavigation('next')}
                    ?disabled=${!this._canNavigateNext()}
                    title="Next"
                  >
                    <ha-icon icon="mdi:chevron-right"></ha-icon>
                  </button>
                `
              : ''}
          </div>

          <!-- Custom Date Pickers -->
          ${this.showCustomPickers
            ? html`
                <div class="custom-range-pickers">
                  <div class="picker-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      .value=${format(this.currentStartDate, 'yyyy-MM-dd')}
                      @change=${this._handleCustomStartChange}
                      .min=${this.config.min_date || ''}
                      .max=${this.config.disable_future ? format(new Date(), 'yyyy-MM-dd') : ''}
                    />
                  </div>
                  <div class="picker-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      .value=${format(this.currentEndDate, 'yyyy-MM-dd')}
                      @change=${this._handleCustomEndChange}
                      .min=${this.config.min_date || ''}
                      .max=${this.config.disable_future ? format(new Date(), 'yyyy-MM-dd') : ''}
                    />
                  </div>
                </div>
              `
            : ''}
        </div>
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
        background: var(--ha-card-background, var(--card-background-color, white));
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

      .button-row {
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
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

      .nav-button {
        padding: 10px;
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
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        padding: 16px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .picker-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .picker-group label {
        font-size: 14px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }

      .picker-group input[type='date'] {
        padding: 10px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background: var(--card-background-color, white);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
      }

      @media (max-width: 600px) {
        .button-row {
          gap: 4px;
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
      }

      ha-icon {
        --mdc-icon-size: 20px;
      }
    `;
  }
}

// Register the card
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'date-range-selector-card',
  name: 'Date Range Selector',
  description: 'A card for selecting date ranges with preset buttons',
});
