<!-- Hero / Logo placeholder -->
<!-- If you have a logo or screenshot, place it here -->

# Date Range Selector (Lovelace Card)

[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz/)
[![Latest Release](https://img.shields.io/github/v/release/Prestodus/Date-Range-Selector.svg?display_name=release&sort=semver)](https://github.com/Prestodus/Date-Range-Selector/releases/latest)
[![Issues](https://img.shields.io/github/issues/Prestodus/Date-Range-Selector.svg)](https://github.com/Prestodus/Date-Range-Selector/issues)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Sponsor-yellow.svg)](https://www.buymeacoffee.com/prestodus)

A modern, theme-aware custom Lovelace card for Home Assistant to select date ranges quickly and precisely. Perfect for filtering historical data, driving charts, and building report-like dashboards.

This repository includes two frontend cards:
- Date Range Selector Card (`custom:date-range-selector-card`)
- Popup Wrapper Card (`custom:popup-wrapper-card`) — wrap any card in a responsive popup with a floating trigger

## Features

### Date Range Selector
- Preset ranges: Day, Week (ISO), Month, Year
- Native HA date pickers (`ha-date-input`) for custom ranges
- Optional helper updates:
  - Range (days): end − start + 1
  - Offset (days from today to start date)
- ApexCharts-friendly via range + offset helpers
- Navigation arrows with min/max (no future) constraints
- Display modes: Default, Compact, In-Header
- “Today” button adapts to mode (This Week/Month/Year)
- Optional connected button group styling
- Floating mode with popup (mobile friendly)
- Theme-aware styling using HA CSS variables

### Popup Wrapper
- Wrap any card in a responsive popup
- Floating action button, entity card trigger, or auto-open on load
- Click-outside-to-close, custom icons/titles, smooth animations

## Prerequisites

For the Date Range Selector you need two `input_datetime` helpers (date-only) to store the start and end dates.

Create via UI (recommended): Settings → Devices & Services → Helpers → “+ Create Helper” → Date and/or time (date only)

Or define in `configuration.yaml`:

```yaml
input_datetime:
  date_range_start:
    name: Date Range Start
    has_date: true
    has_time: false

  date_range_end:
    name: Date Range End
    has_date: true
    has_time: false
```

Optional helpers for advanced use (e.g. ApexCharts):

```yaml
input_number:
  date_range_days:
    name: Date Range Days
    min: 1
    max: 3650
    step: 1
    mode: box

  date_range_offset:
    name: Date Range Offset
    min: -3650
    max: 0
    step: 1
    mode: box
```

## Installation

### 1. HACS (Custom repository)

1. Open HACS in Home Assistant → Frontend.
2. Click the three dots → “Custom repositories”.
3. Repository: `https://github.com/Prestodus/Date-Range-Selector`, Category: `Lovelace`.
4. Click “Add”. Then find “Date Range Selector” and click “Install”.
5. Restart Home Assistant when prompted.

HACS usually handles resources automatically. If not, add a Lovelace resource manually (see “Resources” below).

### 2. Manual

1. Download assets from the [latest release](https://github.com/Prestodus/Date-Range-Selector/releases):
   - `date-range-selector-card.js`
   - `popup-wrapper-card.js` (optional, for wrapper card)
2. Copy files to `config/www/`.
3. Add Lovelace resources (see below) and restart Home Assistant.

### Resources

Add to your dashboard resources if not auto-added by HACS:

```yaml
resources:
  - url: /local/date-range-selector-card.js
    type: module
  - url: /local/popup-wrapper-card.js  # Optional
    type: module
```

When installed via HACS, resources are typically served from `/hacsfiles/…` and may be auto-registered.

## Usage

### Date Range Selector — Basic

```yaml
type: custom:date-range-selector-card
start_entity: input_datetime.date_range_start
end_entity: input_datetime.date_range_end
```

### Connected Button Group

```yaml
type: custom:date-range-selector-card
start_entity: input_datetime.date_range_start
end_entity: input_datetime.date_range_end
use_button_group: true
show_arrows: true
```

### Floating Mode (Popup)

```yaml
type: custom:date-range-selector-card
start_entity: input_datetime.date_range_start
end_entity: input_datetime.date_range_end
floating_mode: true
floating_button_position: bottom-right
floating_button_icon: mdi:calendar-range
floating_button_text: Select Range
popup_title: Date Range Selector
popup_icon: mdi:calendar-range
```

### Full Configuration Example

```yaml
type: custom:date-range-selector-card
start_entity: input_datetime.date_range_start
end_entity: input_datetime.date_range_end
range_entity: input_number.date_range_days
offset_entity: input_number.date_range_offset
show_arrows: true
today_button_type: icon
show_custom_range: true
hide_background: false
hide_date_display: false
date_display_position: above
disable_future: true
min_date: '2020-01-01'
display_mode: default  # default | compact | in-header
use_button_group: true
visible_range_modes:
  day: true
  week: true
  month: true
  year: false
default_range_mode: week
```

### Popup Wrapper — Floating Button

```yaml
type: custom:popup-wrapper-card
trigger_type: floating
floating_button_position: bottom-right
floating_button_icon: mdi:chart-line
floating_button_text: Charts
popup_title: My Charts
popup_icon: mdi:chart-line
card:
  type: custom:apexcharts-card
  series:
    - entity: sensor.temperature
```

### Popup Wrapper — Entity Trigger

```yaml
type: custom:popup-wrapper-card
trigger_type: entity
trigger_entity: sensor.temperature
popup_title: Temperature Details
card:
  type: history-graph
  entities:
    - sensor.temperature
    - sensor.humidity
```

### Popup Wrapper — Auto Open on Load

```yaml
type: custom:popup-wrapper-card
trigger_type: auto
auto_open: true
popup_title: Important Notice
card:
  type: markdown
  content: |
    # Welcome!
    This is your dashboard.
```

## Configuration Options

### Date Range Selector

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `start_entity` | string | — | Required. `input_datetime` (date-only) for start date |
| `end_entity` | string | — | Required. `input_datetime` (date-only) for end date |
| `range_entity` | string | — | Optional `input_number` storing days in range |
| `offset_entity` | string | — | Optional `input_number` storing days from today to start |
| `show_arrows` | boolean | `true` | Show previous/next period arrows |
| `today_button_type` | `icon` | `icon` | `icon` or `text` (adapts per mode) |
| `show_custom_range` | boolean | `false` | Show “Custom” with modern date pickers |
| `hide_background` | boolean | `false` | Remove card background/border/shadow |
| `hide_date_display` | boolean | `false` | Hide date range label |
| `date_display_position` | `above` | `above` | `above` or `below` |
| `disable_future` | boolean | `false` | Prevent selecting future dates |
| `min_date` | string | — | Minimum selectable date `YYYY-MM-DD` |
| `display_mode` | `default` | `default` | `default`, `compact`, or `in-header` |
| `use_button_group` | boolean | `false` | Connected button group styling |
| `floating_mode` | boolean | `false` | Show as floating button + popup |
| `floating_button_position` | enum | `bottom-right` | `top-left` | `top-right` | `bottom-left` | `bottom-right` |
| `floating_button_icon` | string | `mdi:calendar-range` | Icon for floating button |
| `floating_button_text` | string | — | Optional label next to icon |
| `popup_title` | string | `Date Range Selector` | Popup header title |
| `popup_icon` | string | — | Popup header icon |
| `visible_range_modes` | object | all `true` | Show/hide `day/week/month/year` |
| `default_range_mode` | string | — | Starting mode; falls back to smallest visible |

### Popup Wrapper

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `card` | object | — | Required. The wrapped card configuration |
| `trigger_type` | enum | `floating` | `floating` | `entity` | `auto` |
| `trigger_entity` | string | — | Entity to show as trigger (entity mode) |
| `popup_title` | string | `Card` | Popup header title |
| `popup_icon` | string | — | Popup header icon |
| `close_on_click_outside` | boolean | `true` | Close popup on outside click |
| `auto_open` | boolean | `false` | Auto-open on dashboard load |
| `floating_button_position` | enum | `bottom-right` | `top-left` | `top-right` | `bottom-left` | `bottom-right` |
| `floating_button_icon` | string | `mdi:card` | Floating button icon |
| `floating_button_text` | string | — | Label next to icon |

## Date Calculations & Constraints

- Day/Week (ISO Mon–Sun)/Month/Year ranges using `date-fns`
- Respects `disable_future` and `min_date`
- Navigation buttons auto-disable at boundaries

## Using with Other Cards

### ApexCharts

With range/offset helpers you can create dynamic charts:

```yaml
type: custom:apexcharts-card
graph_span: sensor.date_range_days
span:
  offset: sensor.date_range_offset
series:
  - entity: sensor.temperature
    name: Temperature
```

## Theming

Uses HA theme variables (examples):
- `--primary-color`
- `--ha-card-background`
- `--primary-text-color`
- `--secondary-text-color`
- `--divider-color`

## Development

Requirements: Node.js >= 18.12

```bash
npm install
npm run build
npm run watch
```

## Support

- Issues & feature requests: https://github.com/Prestodus/Date-Range-Selector/issues

## License

MIT — see `LICENSE`.

## Credits

- [Lit](https://lit.dev/)
- [date-fns](https://date-fns.org/)
- [Rollup](https://rollupjs.org/)
