export interface DateRangeSelectorCardConfig extends Record<string, any> {
  type: string;
  start_entity: string;
  end_entity: string;
  show_arrows?: boolean;
  today_button_type?: 'icon' | 'text';
  hide_background?: boolean;
  show_custom_range?: boolean;
  disable_future?: boolean;
  min_date?: string;
}

export type PresetType = 'day' | 'week' | 'month' | 'year' | 'custom';

export interface HomeAssistant {
  callService(domain: string, service: string, data?: any): Promise<void>;
  states: {
    [entity_id: string]: HassEntity;
  };
  // Add other properties as needed
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    [key: string]: any;
  };
  last_changed: string;
  last_updated: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'date-range-selector-card': any;
    'date-range-selector-editor': any;
  }
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: DateRangeSelectorCardConfig): void;
}
