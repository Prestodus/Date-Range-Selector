import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PopupWrapperCardConfig } from './popup-wrapper-card';
import { HomeAssistant } from './types';

// Load HA components
const loadHaComponents = async () => {
  if (customElements.get('ha-selector')) return;
  const helpers = await (window as any).loadCardHelpers?.();
  if (!helpers) return;
  const card = await helpers.createCardElement({ type: 'entity' });
  if (!card) return;
  await card.getConfigElement();
};

@customElement('popup-wrapper-editor')
export class PopupWrapperEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: PopupWrapperCardConfig;

  public setConfig(config: PopupWrapperCardConfig): void {
    this.config = config;
  }

  connectedCallback(): void {
    super.connectedCallback();
    loadHaComponents();
  }

  public static getStubConfig(): PopupWrapperCardConfig {
    return {
      type: 'custom:popup-wrapper-card',
      trigger_type: 'floating',
      floating_button_position: 'bottom-right',
      floating_button_icon: 'mdi:card',
      floating_button_text: '',
      popup_title: 'Card',
      auto_open: false,
      close_on_click_outside: true,
      card: {
        type: 'entities',
        entities: [],
      },
    };
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this.config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const configValue = target.configValue;

    if (!configValue) {
      return;
    }

    let newConfig: PopupWrapperCardConfig;

    if (target.value === '' || target.value === undefined) {
      newConfig = { ...this.config };
      delete newConfig[configValue];
    } else {
      newConfig = {
        ...this.config,
        [configValue]: target.checked !== undefined ? target.checked : target.value,
      };
    }

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _entityChanged(ev: CustomEvent, configKey: string): void {
    if (!this.config || !this.hass) {
      return;
    }

    const value = ev.detail.value;
    
    const newConfig: PopupWrapperCardConfig = {
      ...this.config,
    };

    if (!value || value === '') {
      delete newConfig[configKey];
    } else {
      newConfig[configKey] = value;
    }

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _handleGUIEditor(): void {
    // Open the GUI editor for the wrapped card
    const event = new CustomEvent('ll-custom', {
      detail: {
        type: 'gui-editor',
        path: ['card'],
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    const triggerType = this.config.trigger_type || 'floating';

    return html`
      <div class="card-config">
        <h3>Wrapped Card Configuration</h3>
        
        <!-- Card Configuration -->
        <div class="config-row">
          <label>Card to Display in Popup</label>
          <div class="helper-text">
            Configure the card that will be shown inside the popup
          </div>
          <button class="gui-editor-button" @click=${this._handleGUIEditor}>
            <ha-icon icon="mdi:pencil"></ha-icon>
            <span>Configure Card</span>
          </button>
        </div>

        <hr />

        <h3>Popup Settings</h3>

        <!-- Popup Title -->
        <div class="config-row">
          <label for="popup_title">Popup Title</label>
          <input
            type="text"
            id="popup_title"
            .configValue=${'popup_title'}
            .value=${this.config.popup_title || 'Card'}
            @input=${this._valueChanged}
            placeholder="Card"
          />
          <div class="helper-text">
            Title displayed in the popup header
          </div>
        </div>

        <!-- Popup Icon -->
        <div class="config-row">
          <label for="popup_icon">Popup Icon (Optional)</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ icon: {} }}
            .value=${this.config.popup_icon || ''}
            @value-changed=${(e: CustomEvent) => this._entityChanged(e, 'popup_icon')}
          ></ha-selector>
          <div class="helper-text">
            Icon to display in the popup header next to the title
          </div>
        </div>

        <!-- Close on Click Outside -->
        <div class="config-row checkbox-config">
          <label for="close_on_click_outside">Close on Click Outside</label>
          <div class="helper-text">
            Close the popup when clicking outside of it
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="close_on_click_outside"
              .configValue=${'close_on_click_outside'}
              .checked=${this.config.close_on_click_outside !== false}
              @change=${this._valueChanged}
            />
            <span>Enable close on outside click</span>
          </label>
        </div>

        <hr />

        <h3>Trigger Configuration</h3>

        <!-- Trigger Type -->
        <div class="config-row">
          <label for="trigger_type">Trigger Type</label>
          <select
            id="trigger_type"
            .configValue=${'trigger_type'}
            .value=${this.config.trigger_type || 'floating'}
            @change=${this._valueChanged}
          >
            <option value="floating">Floating Button</option>
            <option value="entity">Entity Card (Click to Open)</option>
            <option value="auto">Auto Open (No Trigger)</option>
          </select>
          <div class="helper-text">
            How the popup will be opened
          </div>
        </div>

        ${triggerType === 'floating'
          ? html`
              <hr />
              <h3>Floating Button Settings</h3>

              <!-- Floating Button Position -->
              <div class="config-row">
                <label for="floating_button_position">Button Position</label>
                <select
                  id="floating_button_position"
                  .configValue=${'floating_button_position'}
                  .value=${this.config.floating_button_position || 'bottom-right'}
                  @change=${this._valueChanged}
                >
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
                <div class="helper-text">
                  Position of the floating action button on the screen
                </div>
              </div>

              <!-- Floating Button Icon -->
              <div class="config-row">
                <label for="floating_button_icon">Button Icon</label>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ icon: {} }}
                  .value=${this.config.floating_button_icon || 'mdi:card'}
                  @value-changed=${(e: CustomEvent) => this._entityChanged(e, 'floating_button_icon')}
                ></ha-selector>
                <div class="helper-text">
                  Icon to display on the floating button
                </div>
              </div>

              <!-- Floating Button Text -->
              <div class="config-row">
                <label for="floating_button_text">Button Text (Optional)</label>
                <input
                  type="text"
                  id="floating_button_text"
                  .configValue=${'floating_button_text'}
                  .value=${this.config.floating_button_text || ''}
                  @input=${this._valueChanged}
                  placeholder="Leave empty to show icon"
                />
                <div class="helper-text">
                  Optional text to display on the floating button (shown next to the icon)
                </div>
              </div>
            `
          : ''}

        ${triggerType === 'entity'
          ? html`
              <hr />
              <h3>Entity Trigger Settings</h3>

              <!-- Trigger Entity -->
              <div class="config-row">
                <label for="trigger_entity">Trigger Entity</label>
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{ entity: {} }}
                  .value=${this.config.trigger_entity || ''}
                  @value-changed=${(e: CustomEvent) => this._entityChanged(e, 'trigger_entity')}
                ></ha-selector>
                <div class="helper-text">
                  Entity to display as the trigger. Click on it to open the popup.
                </div>
              </div>
            `
          : ''}

        ${triggerType === 'auto'
          ? html`
              <hr />
              <h3>Auto Open Settings</h3>

              <!-- Auto Open -->
              <div class="config-row checkbox-config">
                <label for="auto_open">Auto Open on Load</label>
                <div class="helper-text">
                  Automatically open the popup when the dashboard loads
                </div>
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    id="auto_open"
                    .configValue=${'auto_open'}
                    .checked=${this.config.auto_open === true}
                    @change=${this._valueChanged}
                  />
                  <span>Enable auto open</span>
                </label>
              </div>
            `
          : ''}
      </div>
    `;
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      h3 {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin: 8px 0 0 0;
      }

      .config-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .checkbox-config {
        gap: 4px;
      }

      label {
        font-weight: 500;
        font-size: 14px;
        color: var(--primary-text-color);
      }

      input[type='text'],
      select,
      ha-selector {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background: var(--card-background-color, white);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        box-sizing: border-box;
      }

      ha-selector {
        padding: 0;
        border: none;
      }

      input[type='text']:focus,
      select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .helper-text {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
        margin-top: 0;
      }

      hr {
        width: 100%;
        border: none;
        border-top: 1px solid var(--divider-color, #e0e0e0);
        margin: 8px 0;
      }

      select {
        cursor: pointer;
      }

      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 14px;
      }

      .checkbox-label input[type='checkbox'] {
        width: auto;
        height: auto;
        margin: 0;
        cursor: pointer;
      }

      .checkbox-label span {
        color: var(--primary-text-color);
        font-weight: normal;
      }

      .gui-editor-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: var(--primary-color);
        color: var(--text-primary-color, white);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
      }

      .gui-editor-button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }

      .gui-editor-button ha-icon {
        --mdc-icon-size: 18px;
      }
    `;
  }
}
