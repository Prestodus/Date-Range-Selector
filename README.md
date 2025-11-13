# Date Range Selector Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow.svg)](https://www.buymeacoffee.com/prestodus)

A custom Lovelace card for Home Assistant that provides an intuitive interface for selecting date ranges. Perfect for filtering historical data, setting report periods, or any scenario where you need to work with date ranges.

**Now includes a Popup Wrapper card** that can wrap any Home Assistant card in a beautiful popup!

## Features

### Date Range Selector Card

- 🎯 **Preset Date Ranges**: Quick access to Day, Week, Month, and Year ranges
- 📅 **Modern Date Pickers**: Beautiful popup date pickers using Home Assistant's native components
- 🔧 **Helper Integration**: Automatic updates for range (days) and offset helper entities
- 📊 **ApexCharts Ready**: Built-in support for chart integration with offset and range helpers
- ⬅️➡️ **Navigation Arrows**: Move forward and backward through time periods
- 🎛️ **Flexible Range Modes**: Show/hide specific range buttons (day/week/month/year)
- 🚫 **Future Date Control**: Optional restriction to prevent future date selection
- 📍 **Minimum Date**: Set the earliest selectable date
- 🎨 **Display Modes**: Choose between Default, Compact, and In-Header layouts
- 🎨 **Customizable Appearance**: Hide background and border, choose icon or text for "Today" button
- 🔗 **Connected Button Groups**: Modern, connected button group style (NEW!)
- 🎈 **Floating Mode**: Show as a floating action button with popup (NEW!)
- 🔧 **Smart Entity Selection**: Entity selectors with domain filtering and create-on-the-spot capability
- 🌐 **ISO Week Support**: Properly handles ISO weeks (Monday-Sunday)
- ⚡ **Reactive**: Updates automatically when entities change

### Popup Wrapper Card (NEW!)

- 📦 **Wrap Any Card**: Put any Home Assistant card inside a beautiful popup
- 🎈 **Floating Button Trigger**: Access via a customizable floating action button
- 🎯 **Entity Trigger**: Display an entity card that opens the popup on click
- ⚡ **Auto-Open**: Automatically open the popup on dashboard load
- 🎨 **Responsive Design**: Mobile-friendly with smooth animations
- 🔧 **Fully Customizable**: Custom icons, text, positioning, and titles

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend"
3. Click the three dots in the top right corner and select "Custom repositories"
4. Add this repository URL: `https://github.com/Prestodus/Date-Range-Selector`
5. Select category: "Lovelace"
6. Click "Add"
7. Find "Date Range Selector" in the list and click "Install"
8. Restart Home Assistant

### Manual Installation

1. Download the card files from the [latest release](https://github.com/Prestodus/Date-Range-Selector/releases):
   - `date-range-selector-card.js` for the date range selector
   - `popup-wrapper-card.js` for the popup wrapper (optional)
2. Copy them to your `config/www` folder
3. Add the following to your Lovelace resources:

```yaml
resources:
  - url: /local/date-range-selector-card.js
    type: module
  - url: /local/popup-wrapper-card.js  # Optional, only if using popup wrapper
    type: module
```

4. Restart Home Assistant

## Prerequisites

This card requires two `input_datetime` helper entities to store the start and end dates. You can create them either:

### Through the UI (Recommended)
1. Go to Settings → Devices & Services → Helpers
2. Click "+ CREATE HELPER"
3. Select "Date and/or time"
4. Create two helpers with date only (no time)

### Or in configuration.yaml

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

After adding these, restart Home Assistant or reload the input_datetime integration.

### Optional: Range and Offset Helpers

For advanced use cases (e.g., ApexCharts integration), you can also create two `input_number` helpers:

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

These helpers will automatically update with:
- **Range**: Number of days in the selected range (end - start + 1)
- **Offset**: Days from today to the start date (0 = today, -7 = 7 days ago)

## Usage

### Date Range Selector Card

#### Basic Configuration

```yaml
type: custom:date-range-selector-card
start_entity: input_datetime.date_range_start
end_entity: input_datetime.date_range_end
```

#### With Connected Button Group

```yaml
type: custom:date-range-selector-card
start_entity: input_datetime.date_range_start
end_entity: input_datetime.date_range_end
use_button_group: true  # Modern, connected button style
show_arrows: true
```

#### With Floating Mode

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

#### Full Configuration Example

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
disable_future: true
min_date: '2020-01-01'
display_mode: default
use_button_group: true
visible_range_modes:
  day: true
  week: true
  month: true
  year: false
default_range_mode: week
```

### Popup Wrapper Card

Wrap any Home Assistant card in a beautiful popup!

#### With Floating Button

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

#### With Entity Trigger

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

#### Auto-Open on Load

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

### Date Range Selector Card

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `start_entity` | string | **Required** | Entity ID for the start date (must be an `input_datetime` helper) |
| `end_entity` | string | **Required** | Entity ID for the end date (must be an `input_datetime` helper) |
| `range_entity` | string | - | Entity ID for storing range in days (must be an `input_number` helper) |
| `offset_entity` | string | - | Entity ID for storing offset in days from today (must be an `input_number` helper) |
| `show_arrows` | boolean | `true` | Show previous/next navigation arrows |
| `today_button_type` | string | `icon` | Display "Today" button as `icon` or `text` |
| `show_custom_range` | boolean | `false` | Show "Custom" button with modern date pickers |
| `hide_background` | boolean | `false` | Remove card background, shadow, and border |
| `hide_date_display` | boolean | `false` | Hide the date range display |
| `date_display_position` | string | `above` | Position of date display: `above` or `below` |
| `disable_future` | boolean | `false` | Prevent selection of future dates (caps at today) |
| `min_date` | string | - | Minimum selectable date in `YYYY-MM-DD` format |
| `display_mode` | string | `default` | Display mode: `default`, `compact`, or `in-header` |
| `use_button_group` | boolean | `false` | Use connected button group style |
| `floating_mode` | boolean | `false` | Show as floating button with popup |
| `floating_button_position` | string | `bottom-right` | Position: `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| `floating_button_icon` | string | `mdi:calendar-range` | Icon for floating button |
| `floating_button_text` | string | - | Optional text for floating button (shown alongside icon) |
| `popup_title` | string | `Date Range Selector` | Title displayed in the popup header (floating mode only) |
| `popup_icon` | string | - | Optional icon for the popup header (floating mode only) |
| `visible_range_modes` | object | All `true` | Control which range mode buttons to show (day/week/month/year) |
| `default_range_mode` | string | - | Default range mode on load (day/week/month/year). Defaults to smallest visible if not set |

### Popup Wrapper Card

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `card` | object | **Required** | Configuration of the card to wrap in the popup |
| `trigger_type` | string | `floating` | How to open popup: `floating`, `entity`, or `auto` |
| `trigger_entity` | string | - | Entity to display as trigger (for `entity` mode) |
| `popup_title` | string | `Card` | Title displayed in the popup header |
| `popup_icon` | string | - | Optional icon for the popup header |
| `close_on_click_outside` | boolean | `true` | Close popup when clicking outside |
| `auto_open` | boolean | `false` | Auto-open popup on dashboard load (for `auto` mode) |
| `floating_button_position` | string | `bottom-right` | Position: `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| `floating_button_icon` | string | `mdi:card` | Icon for floating button (for `floating` mode) |
| `floating_button_text` | string | - | Optional text for floating button (shown alongside icon) |

### Option Details

#### `use_button_group` (Date Range Selector)
When enabled, buttons are displayed in a connected group with no gaps between them, creating a modern segmented control appearance. The styling automatically adapts to all display modes (default, compact, in-header).

#### `floating_mode` (Date Range Selector)
Enables a floating action button that opens the date selector in a popup. Perfect for saving space on your dashboard while keeping the date selector easily accessible. The popup is fully responsive and mobile-friendly.

#### `start_entity` & `end_entity`
These are the entity IDs of your `input_datetime` helpers. The card will update these entities when date ranges are selected. Use the entity selector in the card editor to easily pick or create these helpers.

#### `range_entity` & `offset_entity`
Optional `input_number` helpers that automatically update with calculated values:
- **range_entity**: Stores the number of days in the current range (e.g., 7 for a week)
- **offset_entity**: Stores days from today to the start date (0 = today, -7 = 7 days ago, -30 = 30 days ago)

These are particularly useful for chart integrations like ApexCharts where you need to dynamically adjust the data range.

#### `show_arrows`
When enabled, displays left and right arrow buttons for navigating through time periods. For example, if "Week" is selected, the arrows will move one week backward or forward.

#### `today_button_type`
- `icon`: Shows a calendar icon (mdi:calendar-today)
- `text`: Shows the text "Today"

#### `show_custom_range`
Adds a "Custom" button that, when clicked, reveals modern date pickers for manual start and end date selection. The date pickers use Home Assistant's native `ha-date-input` component with a beautiful popup calendar interface.

**Smart Date Validation:**
- The end date picker automatically disables dates before the selected start date
- If you change the start date to be after the current end date, the end date automatically updates to match

#### `hide_background`
Removes the card's background, shadow, and border, making it blend seamlessly with your dashboard background. Useful for creating cleaner, more integrated layouts.

#### `display_mode`
Choose between two display modes:
- `default`: Standard layout with date range display above buttons
- `compact`: Condensed layout with smaller buttons and date range display below

#### `visible_range_modes`
Control which range mode buttons are displayed. Object with boolean values for each mode:
```yaml
visible_range_modes:
  day: true
  week: true
  month: false
  year: false
```
**Important:** At least one range mode must be visible. If only one mode is active and custom range is disabled, that mode's button will be hidden (since there are no alternatives to select).

#### `default_range_mode`
Sets which range mode is selected by default when the card loads. If not specified or if the specified mode is hidden, the card defaults to the smallest visible range mode (day → week → month → year).

#### `disable_future`
When enabled:
- All preset ranges that include the current date are capped at today
- The "Next" navigation arrow is disabled if it would go beyond today
- Custom date pickers have their max date set to today

#### `min_date`
Sets the earliest date that can be selected. Format: `YYYY-MM-DD` (e.g., `2020-01-01`)
- The "Previous" navigation arrow is disabled if it would go before this date
- Custom date pickers have their min date set to this value

## Date Range Calculations

The card uses the following logic for preset ranges:

- **Day**: Start and end of the selected day
- **Week**: ISO week (Monday to Sunday)
- **Month**: First day to last day of the month
- **Year**: January 1st to December 31st

All calculations respect the `disable_future` and `min_date` constraints.

## Using the Card with Other Cards

The date range entities can be used as filters in other cards.

### ApexCharts Integration

With the optional range and offset helpers, you can create dynamic charts that automatically adjust based on your selected date range:

```yaml
type: custom:apexcharts-card
graph_span: sensor.date_range_days  # Uses the range helper
span:
  offset: sensor.date_range_offset   # Uses the offset helper
series:
  - entity: sensor.temperature
    name: Temperature
```

This setup allows the chart to automatically update when you change the date range in the selector card!

### History Card

```yaml
type: history-graph
entities:
  - entity: sensor.temperature
hours_to_show: 168
title: Temperature History
# Note: You'll need custom automation/scripts to use the date range entities with history cards
```

### Automation Example

Create automations that trigger when the date range changes to update other sensors or perform calculations:

```yaml
automation:
  - alias: "Update Chart Data on Date Range Change"
    trigger:
      - platform: state
        entity_id: input_datetime.date_range_start
      - platform: state
        entity_id: input_datetime.date_range_end
    action:
      - service: homeassistant.update_entity
        entity_id: sensor.your_sensor
```

## Popup Wrapper Card Use Cases

The Popup Wrapper card is incredibly versatile and can enhance your dashboard in many ways:

### Hide Complex Cards Until Needed

Save dashboard space by keeping detailed cards (like charts, history graphs, or entity lists) in popups:

```yaml
type: custom:popup-wrapper-card
trigger_type: floating
floating_button_position: bottom-left
floating_button_icon: mdi:chart-timeline-variant
popup_title: Energy Usage Details
card:
  type: vertical-stack
  cards:
    - type: custom:apexcharts-card
      # ... your chart config
    - type: entities
      # ... your entities
```

### Create Dashboard "Drawers"

Use entity triggers to create expandable sections:

```yaml
type: custom:popup-wrapper-card
trigger_type: entity
trigger_entity: sensor.home_temperature
popup_title: Climate Control
card:
  type: thermostat
  entity: climate.home
```

### Display Important Notices

Auto-open popups for announcements or alerts:

```yaml
type: custom:popup-wrapper-card
trigger_type: auto
auto_open: true
popup_title: System Alert
card:
  type: markdown
  content: |
    ⚠️ **Maintenance Scheduled**
    The system will be offline tonight.
```

### Mobile-Optimized Controls

Place detailed controls in floating popups for better mobile UX:

```yaml
type: custom:popup-wrapper-card
trigger_type: floating
floating_button_position: bottom-right
floating_button_icon: mdi:lightbulb-group
popup_title: Lighting Control
card:
  type: entities
  entities:
    - light.living_room
    - light.bedroom
    - light.kitchen
```

## Styling

Both cards use Home Assistant's built-in CSS theme variables, so they automatically adapt to your theme:

- `--primary-color`: Active button color and floating button background
- `--ha-card-background`: Card and popup background
- `--primary-text-color`: Main text color
- `--secondary-text-color`: Helper text color
- `--divider-color`: Border colors

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
npm install
```

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run watch
```

## Support

If you encounter any issues or have feature requests, please [open an issue](https://github.com/Prestodus/Date-Range-Selector/issues) on GitHub.

## License

MIT License - see LICENSE file for details

## Credits

Built with:
- [Lit](https://lit.dev/) - Web components library
- [date-fns](https://date-fns.org/) - Modern date utility library
- [Rollup](https://rollupjs.org/) - Module bundler
