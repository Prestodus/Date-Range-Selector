export interface DateRangeSelectorCardConfig extends Record<string, any> {
  type: string;
  start_entity: string;
  end_entity: string;
  range_entity?: string; // New: entity for storing range (number of days)
  offset_entity?: string; // New: entity for storing offset (days from start)
  show_arrows?: boolean;
  today_button_type?: "icon" | "text";
  hide_background?: boolean;
  hide_date_display?: boolean;
  date_display_position?: "above" | "below";
  show_custom_range?: boolean;
  disable_future?: boolean;
  min_date?: string;
  display_mode?: "default" | "compact" | "in-header"; // New: display mode
  visible_range_modes?: RangeModeVisibility; // New: which range modes to show
  default_range_mode?: PresetType; // New: default range mode selection
  use_button_group?: boolean; // New: use connected button groups
  floating_mode?: boolean; // New: enable floating button with popup
  floating_button_position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"; // New: position of floating button
  floating_button_icon?: string; // New: custom icon for floating button
  floating_button_text?: string; // New: custom text for floating button
  popup_title?: string; // New: custom title for floating popup
  popup_icon?: string; // New: custom icon for floating popup header
}

export interface RangeModeVisibility {
  day?: boolean;
  week?: boolean;
  month?: boolean;
  year?: boolean;
}

export type PresetType = "day" | "week" | "month" | "year" | "custom";

export interface HomeAssistant {
  callService(domain: string, service: string, data?: any): Promise<void>;
  states: {
    [entity_id: string]: HassEntity;
  };
  locale: {
    language: string;
    number_format: string;
    time_format: string;
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
    "date-range-selector-card": any;
    "date-range-selector-editor": any;
  }
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: DateRangeSelectorCardConfig): void;
}
