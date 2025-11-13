import { LitElement, html, css, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "./types";

// Import the editor
import "./popup-wrapper-editor";

export interface PopupWrapperCardConfig extends Record<string, any> {
  type: string;
  card: any; // The card configuration to wrap
  trigger_type?: "floating" | "entity" | "auto"; // How to open the popup
  trigger_entity?: string; // Entity to display as trigger (for entity mode)
  floating_button_position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  floating_button_icon?: string;
  floating_button_text?: string;
  popup_title?: string; // Title for the popup
  popup_icon?: string; // Icon for the popup header
  auto_open?: boolean; // Auto-open on load
  close_on_click_outside?: boolean; // Close popup when clicking outside
}

@customElement("popup-wrapper-card")
export class PopupWrapperCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: PopupWrapperCardConfig;
  @state() private showPopup: boolean = false;
  @state() private wrappedCard?: any;

  public static getConfigElement() {
    return document.createElement("popup-wrapper-editor");
  }

  public static getStubConfig(): PopupWrapperCardConfig {
    return {
      type: "custom:popup-wrapper-card",
      trigger_type: "floating",
      floating_button_position: "bottom-right",
      floating_button_icon: "mdi:card",
      floating_button_text: "",
      popup_title: "Card",
      auto_open: false,
      close_on_click_outside: true,
      card: {
        type: "entities",
        entities: [],
      },
    };
  }

  public setConfig(config: PopupWrapperCardConfig): void {
    if (!config.card) {
      throw new Error("You must define a card to wrap");
    }

    this.config = {
      trigger_type: "floating",
      floating_button_position: "bottom-right",
      floating_button_icon: "mdi:card",
      floating_button_text: "",
      popup_title: "Card",
      auto_open: false,
      close_on_click_outside: true,
      ...config,
    };

    // Don't create wrapped card immediately - wait until it's needed
    // This prevents issues in preview/edit mode
  }

  private _isEditMode(): boolean {
    // Check if we're in edit mode by looking at the URL or panel state
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

  public getCardSize(): number {
    if (this.config.trigger_type === "floating") {
      return 0; // Floating button doesn't take up space
    }
    return 1; // Entity trigger takes minimal space
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has("hass") && this.wrappedCard) {
      this.wrappedCard.hass = this.hass;
    }

    // Auto-open on load if configured
    if (
      changedProperties.has("config") &&
      this.config.auto_open &&
      !this.showPopup
    ) {
      setTimeout(() => {
        this.showPopup = true;
      }, 100);
    }
  }

  private async _createWrappedCard() {
    if (!this.config.card) return;

    try {
      const helpers = await (window as any).loadCardHelpers?.();
      if (!helpers) {
        console.error("Could not load card helpers");
        return;
      }

      this.wrappedCard = await helpers.createCardElement(this.config.card);
      this.wrappedCard.hass = this.hass;
      this.requestUpdate();
    } catch (error) {
      console.error("Error creating wrapped card:", error);
    }
  }

  private _togglePopup(): void {
    this.showPopup = !this.showPopup;
    // Create wrapped card when popup is first opened
    if (this.showPopup && !this.wrappedCard && !this._isEditMode()) {
      this._createWrappedCard();
    }
  }

  private _closePopup(): void {
    this.showPopup = false;
  }

  private _handleOverlayClick(): void {
    if (this.config.close_on_click_outside !== false) {
      this._closePopup();
    }
  }

  private _renderTrigger() {
    const triggerType = this.config.trigger_type || "floating";

    if (triggerType === "floating") {
      const position = this.config.floating_button_position || "bottom-right";
      const icon = this.config.floating_button_icon || "mdi:card";
      const text = this.config.floating_button_text || "";

      return html`
        <button
          class="floating-button ${position} ${text ? "with-text" : ""}"
          @click=${this._togglePopup}
          title="${this.config.popup_title || "Open Card"}"
        >
          <ha-icon icon="${icon}"></ha-icon>
          ${text ? html`<span class="button-text">${text}</span>` : ""}
        </button>
      `;
    }

    if (triggerType === "entity" && this.config.trigger_entity) {
      const entity = this.hass.states[this.config.trigger_entity];

      return html`
        <div class="entity-trigger" @click=${this._togglePopup}>
          <ha-card>
            <div class="entity-trigger-content">
              <div class="entity-info">
                ${entity
                  ? html`
                      <div class="entity-name">
                        ${entity.attributes.friendly_name ||
                        this.config.trigger_entity}
                      </div>
                      <div class="entity-state">${entity.state}</div>
                    `
                  : html`
                      <div class="entity-name">
                        ${this.config.trigger_entity}
                      </div>
                      <div class="entity-state">unavailable</div>
                    `}
              </div>
              <ha-icon icon="mdi:arrow-expand"></ha-icon>
            </div>
          </ha-card>
        </div>
      `;
    }

    // Auto mode - no visible trigger, popup controlled by auto_open
    return html``;
  }

  private _renderPopup() {
    if (!this.showPopup) return html``;

    const isEdit = this._isEditMode();
    const cardContent = isEdit
      ? html`<p
          style="padding: 20px; text-align: center; color: var(--secondary-text-color);"
        >
          Card preview will be shown when popup is opened
        </p>`
      : this.wrappedCard || html`<p>Loading card...</p>`;

    return html`
      <div class="popup-overlay" @click=${this._handleOverlayClick}>
        <div class="popup" @click=${(e: Event) => e.stopPropagation()}>
          <div class="popup-header">
            <div class="popup-header-content">
              ${this.config.popup_icon
                ? html`<ha-icon icon="${this.config.popup_icon}"></ha-icon>`
                : ""}
              <h3>${this.config.popup_title || "Card"}</h3>
            </div>
            <button class="close-button" @click=${this._closePopup}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="popup-content">${cardContent}</div>
        </div>
      </div>
    `;
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const isEdit = this._isEditMode();

    // In edit mode, show a simple placeholder for floating trigger
    if (isEdit && this.config.trigger_type === "floating") {
      return html`
        <div class="edit-mode-placeholder">
          <ha-icon
            icon="${this.config.floating_button_icon || "mdi:card"}"
          ></ha-icon>
          <p>Popup Wrapper Card</p>
          <span>${this.config.popup_title || "Card"}</span>
        </div>
      `;
    }

    return html`
      <div class="popup-wrapper-container">
        ${this._renderTrigger()} ${this._renderPopup()}
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .edit-mode-placeholder {
        padding: 20px;
        text-align: center;
        background: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
        border-radius: 8px;
        border: 2px dashed var(--divider-color, #e0e0e0);
      }

      .edit-mode-placeholder ha-icon {
        --mdc-icon-size: 48px;
        color: var(--primary-color);
        margin-bottom: 8px;
      }

      .edit-mode-placeholder p {
        margin: 8px 0 4px 0;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .edit-mode-placeholder span {
        font-size: 14px;
        color: var(--secondary-text-color);
      }

      .popup-wrapper-container {
        position: relative;
      }

      /* Floating Button Styles */
      .floating-button {
        position: fixed;
        z-index: 1000;
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
        gap: 8px;
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

      /* Entity Trigger Styles */
      .entity-trigger {
        cursor: pointer;
        transition: transform 0.2s ease;
      }

      .entity-trigger:hover {
        transform: scale(1.02);
      }

      .entity-trigger ha-card {
        padding: 16px;
      }

      .entity-trigger-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .entity-info {
        flex: 1;
      }

      .entity-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .entity-state {
        font-size: 24px;
        font-weight: 700;
        color: var(--primary-color);
        margin-top: 4px;
      }

      .entity-trigger ha-icon {
        --mdc-icon-size: 24px;
        color: var(--secondary-text-color);
      }

      /* Popup Overlay */
      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1001;
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

      /* Popup Container */
      .popup {
        background: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        max-width: 800px;
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

      /* Popup Header */
      .popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        position: sticky;
        top: 0;
        background: var(
          --ha-card-background,
          var(--card-background-color, white)
        );
        z-index: 1;
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

      /* Popup Content */
      .popup-content {
        padding: 20px;
      }

      /* Mobile Responsive */
      @media (max-width: 600px) {
        .popup {
          max-height: 95vh;
          border-radius: 16px 16px 0 0;
          max-width: 100%;
        }

        .popup-overlay {
          align-items: flex-end;
          padding: 0;
        }

        .popup-content {
          padding: 16px;
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
  type: "custom:popup-wrapper-card",
  name: "Popup Wrapper",
  description:
    "Wraps any card in a popup that can be opened via floating button, entity, or auto-open",
});
