# Date Range Selector Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)

A custom Lovelace card for Home Assistant that provides an intuitive interface for selecting date ranges. Perfect for filtering historical data, setting report periods, or any scenario where you need to work with date ranges.

## Features

- 🎯 **Preset Date Ranges**: Quick access to Day, Week, Month, and Year ranges
- 📅 **Custom Range Selection**: Optional date pickers for manual date selection
- ⬅️➡️ **Navigation Arrows**: Move forward and backward through time periods
- 🚫 **Future Date Control**: Optional restriction to prevent future date selection
- 📍 **Minimum Date**: Set the earliest selectable date
- 🎨 **Customizable Appearance**: Hide background, choose icon or text for "Today" button
- 🌐 **ISO Week Support**: Properly handles ISO weeks (Monday-Sunday)
- ⚡ **Reactive**: Updates automatically when entities change

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

1. Download the `date-range-selector-card.js` file from the [latest release](https://github.com/Prestodus/Date-Range-Selector/releases)
2. Copy it to your `config/www` folder
3. Add the following to your Lovelace resources:

```yaml
resources:
  - url: /local/date-range-selector-card.js
    type: module
```

4. Restart Home Assistant

## Prerequisites

This card requires two `input_datetime` helper entities to store the start and end dates. Create them in your `configuration.yaml`:

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

## Usage

### Basic Configuration

```yaml
type: custom:date-range-selector-card
start_entity: input_datetime.date_range_start
end_entity: input_datetime.date_range_end
```

### Full Configuration Example

```yaml
type: custom:date-range-selector-card
start_entity: input_datetime.date_range_start
end_entity: input_datetime.date_range_end
show_arrows: true
today_button_type: icon
show_custom_range: true
hide_background: false
disable_future: true
min_date: '2020-01-01'
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `start_entity` | string | **Required** | Entity ID for the start date (must be an `input_datetime` helper) |
| `end_entity` | string | **Required** | Entity ID for the end date (must be an `input_datetime` helper) |
| `show_arrows` | boolean | `true` | Show previous/next navigation arrows |
| `today_button_type` | string | `icon` | Display "Today" button as `icon` or `text` |
| `show_custom_range` | boolean | `false` | Show "Custom" button with date pickers |
| `hide_background` | boolean | `false` | Remove card background and shadow |
| `disable_future` | boolean | `false` | Prevent selection of future dates (caps at today) |
| `min_date` | string | - | Minimum selectable date in `YYYY-MM-DD` format |

### Option Details

#### `start_entity` & `end_entity`
These are the entity IDs of your `input_datetime` helpers. The card will update these entities when date ranges are selected.

#### `show_arrows`
When enabled, displays left and right arrow buttons for navigating through time periods. For example, if "Week" is selected, the arrows will move one week backward or forward.

#### `today_button_type`
- `icon`: Shows a calendar icon (mdi:calendar-today)
- `text`: Shows the text "Today"

#### `show_custom_range`
Adds a "Custom" button that, when clicked, reveals two date pickers for manual start and end date selection.

#### `hide_background`
Removes the card's background and shadow, making it blend seamlessly with your dashboard background. Useful for creating cleaner, more integrated layouts.

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

The date range entities can be used as filters in other cards. For example, with the History Card:

```yaml
type: history-graph
entities:
  - entity: sensor.temperature
hours_to_show: 168
title: Temperature History
# Note: You'll need custom automation/scripts to use the date range entities with cards
```

Or create automations that trigger when the date range changes to update other sensors or perform calculations.

## Styling

The card uses Home Assistant's built-in CSS theme variables, so it automatically adapts to your theme:

- `--primary-color`: Active button color
- `--ha-card-background`: Card background
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
