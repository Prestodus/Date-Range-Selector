import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DateRangeSelectorCardConfig, HomeAssistant } from './types';

// Load HA components
const loadHaComponents = async () => {
  if (customElements.get('ha-selector')) return;
  const helpers = await (window as any).loadCardHelpers?.();
  if (!helpers) return;
  const card = await helpers.createCardElement({ type: 'entity' });
  if (!card) return;
  await card.getConfigElement();
};

@customElement('date-range-selector-editor')
export class DateRangeSelectorEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: DateRangeSelectorCardConfig;

  public setConfig(config: DateRangeSelectorCardConfig): void {
    this.config = config;
  }

  connectedCallback(): void {
    super.connectedCallback();
    loadHaComponents();
  }

  public static getStubConfig(): DateRangeSelectorCardConfig {
    return {
      type: 'custom:date-range-selector-card',
      start_entity: '',
      end_entity: '',
      show_arrows: true,
      today_button_type: 'icon',
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

    let newConfig: DateRangeSelectorCardConfig;

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

  private _rangeModeChanged(ev: CustomEvent): void {
    if (!this.config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const mode = target.dataset.mode;

    if (!mode) {
      return;
    }

    const newConfig: DateRangeSelectorCardConfig = {
      ...this.config,
      visible_range_modes: {
        ...this.config.visible_range_modes,
        [mode]: target.checked,
      },
    };

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
    
    const newConfig: DateRangeSelectorCardConfig = {
      ...this.config,
    };

    // If value is empty or undefined, remove the key from config
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

  protected render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <h3>Required Entities</h3>
        
        <!-- Start Entity -->
        <div class="config-row">
          <label for="start_entity">Start Entity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: ['input_datetime'] } }}
            .value=${this.config.start_entity || ''}
            @value-changed=${(e: CustomEvent) => this._entityChanged(e, 'start_entity')}
          ></ha-selector>
          <div class="helper-text">
            Entity for the start date (must be an input_datetime helper)
          </div>
        </div>

        <!-- End Entity -->
        <div class="config-row">
          <label for="end_entity">End Entity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: ['input_datetime'] } }}
            .value=${this.config.end_entity || ''}
            @value-changed=${(e: CustomEvent) => this._entityChanged(e, 'end_entity')}
          ></ha-selector>
          <div class="helper-text">
            Entity for the end date (must be an input_datetime helper)
          </div>
        </div>

        <hr />

        <h3>Range Mode Configuration</h3>

        <!-- Visible Range Modes -->
        <div class="config-row">
          <label>Visible Range Modes</label>
          <div class="helper-text">
            Choose which range mode buttons to display (at least one must be active)
          </div>
          <div class="checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                data-mode="day"
                .checked=${this.config.visible_range_modes?.day !== false}
                @change=${this._rangeModeChanged}
              />
              <span>Day</span>
            </label>
            <label class="checkbox-label">
              <input
                type="checkbox"
                data-mode="week"
                .checked=${this.config.visible_range_modes?.week !== false}
                @change=${this._rangeModeChanged}
              />
              <span>Week</span>
            </label>
            <label class="checkbox-label">
              <input
                type="checkbox"
                data-mode="month"
                .checked=${this.config.visible_range_modes?.month !== false}
                @change=${this._rangeModeChanged}
              />
              <span>Month</span>
            </label>
            <label class="checkbox-label">
              <input
                type="checkbox"
                data-mode="year"
                .checked=${this.config.visible_range_modes?.year !== false}
                @change=${this._rangeModeChanged}
              />
              <span>Year</span>
            </label>
          </div>
        </div>

        <!-- Default Range Mode -->
        <div class="config-row">
          <label for="default_range_mode">Default Range Mode</label>
          <select
            id="default_range_mode"
            .configValue=${'default_range_mode'}
            .value=${this.config.default_range_mode || ''}
            @change=${this._valueChanged}
          >
            <option value="">Auto (Smallest Visible)</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <div class="helper-text">
            Default range mode to select on load (defaults to smallest visible if not set)
          </div>
        </div>

        <!-- Show Custom Range -->
        <div class="config-row checkbox-config">
          <label for="show_custom_range">Show Custom Range Option</label>
          <div class="helper-text">
            Display a "Custom" button that reveals date pickers for manual selection
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="show_custom_range"
              .configValue=${'show_custom_range'}
              .checked=${this.config.show_custom_range === true}
              @change=${this._valueChanged}
            />
            <span>Enable custom date range picker</span>
          </label>
        </div>

        <hr />

        <h3>Display Options</h3>

        <!-- Display Mode -->
        <div class="config-row">
          <label for="display_mode">Display Mode</label>
          <select
            id="display_mode"
            .configValue=${'display_mode'}
            .value=${this.config.display_mode || 'default'}
            @change=${this._valueChanged}
          >
            <option value="default">Default</option>
            <option value="compact">Compact</option>
            <option value="in-header">In-Header (Ultra Compact)</option>
          </select>
          <div class="helper-text">
            Choose between default, compact, and in-header display modes
          </div>
        </div>

        <!-- Today Button Type -->
        <div class="config-row">
          <label for="today_button_type">Today Button Type</label>
          <select
            id="today_button_type"
            .configValue=${'today_button_type'}
            .value=${this.config.today_button_type || 'icon'}
            @change=${this._valueChanged}
          >
            <option value="icon">Icon</option>
            <option value="text">Text</option>
          </select>
          <div class="helper-text">
            Show the current period button as an icon or text label
          </div>
        </div>

        <!-- Show Navigation Arrows -->
        <div class="config-row checkbox-config">
          <label for="show_arrows">Show Navigation Arrows</label>
          <div class="helper-text">
            Display previous/next arrows to navigate through date ranges
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="show_arrows"
              .configValue=${'show_arrows'}
              .checked=${this.config.show_arrows !== false}
              @change=${this._valueChanged}
            />
            <span>Enable navigation arrows</span>
          </label>
        </div>

        <!-- Hide Background -->
        <div class="config-row checkbox-config">
          <label for="hide_background">Hide Card Background</label>
          <div class="helper-text">
            Remove the card background and shadow to blend with the dashboard
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="hide_background"
              .configValue=${'hide_background'}
              .checked=${this.config.hide_background === true}
              @change=${this._valueChanged}
            />
            <span>Hide card background</span>
          </label>
        </div>

        <hr />

        <h3>Date Constraints</h3>

        <!-- Disable Future -->
        <div class="config-row checkbox-config">
          <label for="disable_future">Disable Future Dates</label>
          <div class="helper-text">
            Prevent selection of dates in the future (caps ranges at today)
          </div>
          <label class="checkbox-label">
            <input
              type="checkbox"
              id="disable_future"
              .configValue=${'disable_future'}
              .checked=${this.config.disable_future === true}
              @change=${this._valueChanged}
            />
            <span>Disable future dates</span>
          </label>
        </div>

        <!-- Minimum Date -->
        <div class="config-row">
          <label for="min_date">Minimum Date</label>
          <input
            type="date"
            id="min_date"
            .configValue=${'min_date'}
            .value=${this.config.min_date || ''}
            @input=${this._valueChanged}
          />
          <div class="helper-text">
            Earliest selectable date (YYYY-MM-DD format). Leave empty for no limit.
          </div>
        </div>

        <hr />

        <h3>Optional Helper Entities</h3>

        <!-- Range Entity -->
        <div class="config-row">
          <label for="range_entity">Range Helper Entity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: ['input_number'] } }}
            .value=${this.config.range_entity || ''}
            @value-changed=${(e: CustomEvent) => this._entityChanged(e, 'range_entity')}
          ></ha-selector>
          <div class="helper-text">
            Entity for storing the range in days (must be an input_number helper). Useful for ApexCharts integration.
          </div>
        </div>

        <!-- Offset Entity -->
        <div class="config-row">
          <label for="offset_entity">Offset Helper Entity</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: ['input_number'] } }}
            .value=${this.config.offset_entity || ''}
            @value-changed=${(e: CustomEvent) => this._entityChanged(e, 'offset_entity')}
          ></ha-selector>
          <div class="helper-text">
            Entity for storing offset in days from today to start date (must be an input_number helper). 0 = today, -7 = 7 days ago. Useful for ApexCharts integration.
          </div>
        </div>
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
      input[type='date'],
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
      input[type='date']:focus,
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

      .checkbox-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 4px;
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
    `;
  }
}
