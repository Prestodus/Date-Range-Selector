import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DateRangeSelectorCardConfig, HomeAssistant } from './types';

@customElement('date-range-selector-editor')
export class DateRangeSelectorEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: DateRangeSelectorCardConfig;

  public setConfig(config: DateRangeSelectorCardConfig): void {
    this.config = config;
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

  protected render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <!-- Start Entity -->
        <div class="config-row">
          <label for="start_entity">Start Entity (Required)</label>
          <input
            type="text"
            id="start_entity"
            .configValue=${'start_entity'}
            .value=${this.config.start_entity || ''}
            @input=${this._valueChanged}
            placeholder="input_datetime.date_range_start"
          />
          <div class="helper-text">
            Entity ID for the start date (must be an input_datetime helper)
          </div>
        </div>

        <!-- End Entity -->
        <div class="config-row">
          <label for="end_entity">End Entity (Required)</label>
          <input
            type="text"
            id="end_entity"
            .configValue=${'end_entity'}
            .value=${this.config.end_entity || ''}
            @input=${this._valueChanged}
            placeholder="input_datetime.date_range_end"
          />
          <div class="helper-text">
            Entity ID for the end date (must be an input_datetime helper)
          </div>
        </div>

        <hr />

        <!-- Show Arrows -->
        <div class="config-row toggle-row">
          <label for="show_arrows">Show Navigation Arrows</label>
          <input
            type="checkbox"
            id="show_arrows"
            .configValue=${'show_arrows'}
            .checked=${this.config.show_arrows !== false}
            @change=${this._valueChanged}
          />
          <div class="helper-text">
            Display previous/next arrows to navigate through date ranges
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
            Show the "Today" button as an icon or text label
          </div>
        </div>

        <!-- Show Custom Range -->
        <div class="config-row toggle-row">
          <label for="show_custom_range">Show Custom Range Option</label>
          <input
            type="checkbox"
            id="show_custom_range"
            .configValue=${'show_custom_range'}
            .checked=${this.config.show_custom_range === true}
            @change=${this._valueChanged}
          />
          <div class="helper-text">
            Display a "Custom" button that reveals date pickers for manual selection
          </div>
        </div>

        <!-- Hide Background -->
        <div class="config-row toggle-row">
          <label for="hide_background">Hide Card Background</label>
          <input
            type="checkbox"
            id="hide_background"
            .configValue=${'hide_background'}
            .checked=${this.config.hide_background === true}
            @change=${this._valueChanged}
          />
          <div class="helper-text">
            Remove the card background and shadow to blend with the dashboard
          </div>
        </div>

        <hr />

        <!-- Disable Future -->
        <div class="config-row toggle-row">
          <label for="disable_future">Disable Future Dates</label>
          <input
            type="checkbox"
            id="disable_future"
            .configValue=${'disable_future'}
            .checked=${this.config.disable_future === true}
            @change=${this._valueChanged}
          />
          <div class="helper-text">
            Prevent selection of dates in the future (caps ranges at today)
          </div>
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

      .config-row {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .toggle-row {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .toggle-row label {
        flex: 1;
      }

      label {
        font-weight: 500;
        font-size: 14px;
        color: var(--primary-text-color);
      }

      input[type='text'],
      input[type='date'],
      select {
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

      input[type='text']:focus,
      input[type='date']:focus,
      select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      input[type='checkbox'] {
        width: 40px;
        height: 24px;
        cursor: pointer;
      }

      .helper-text {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
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
    `;
  }
}
