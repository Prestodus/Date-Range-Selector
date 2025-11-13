# GitHub Copilot Instructions for Date Range Selector Card

## Project Overview

This is a custom Lovelace card for Home Assistant that provides an intuitive interface for selecting date ranges. The card is built as a web component and integrates with Home Assistant's frontend framework.

**Key Features:**
- Preset date ranges (Day, Week, Month, Year)
- Modern date pickers using Home Assistant's native components (ha-date-input)
- Helper integration with automatic updates for range and offset entities
- ApexCharts ready with built-in support for offset and range helpers
- Navigation arrows for moving through time periods
- Flexible range modes to show/hide specific range buttons
- Display modes (Default and Compact layouts)
- Smart entity selection with domain filtering and create-on-the-spot capability
- Future date control and minimum date restrictions
- ISO week support (Monday-Sunday)
- Theme-aware styling using Home Assistant CSS variables

## Technology Stack

- **Language**: TypeScript (target: ES2020)
- **UI Framework**: [Lit](https://lit.dev/) - Web components library with reactive properties and decorators
- **Date Handling**: [date-fns](https://date-fns.org/) - Modern date utility library
- **Build Tool**: [Rollup](https://rollupjs.org/) - Module bundler with TypeScript support
- **Linting**: ESLint with TypeScript parser
- **Formatting**: Prettier

## Development Setup

### Prerequisites
- Node.js v16 or higher
- npm or yarn

````instructions
# GitHub Copilot Instructions for Date Range Selector Card

## Project Overview

This is a custom Lovelace card for Home Assistant that provides an intuitive interface for selecting date ranges. The card is built as a web component and integrates with Home Assistant's frontend framework.

**Key Features:**
- Preset date ranges (Day, Week, Month, Year)
- Modern date pickers using Home Assistant's native components (ha-date-input)
- Helper integration with automatic updates for range and offset entities
- ApexCharts ready with built-in support for offset and range helpers
- Navigation arrows for moving through time periods
- Flexible range modes to show/hide specific range buttons
- Display modes (Default and Compact layouts)
- Smart entity selection with domain filtering and create-on-the-spot capability
- Future date control and minimum date restrictions
- ISO week support (Monday-Sunday)
- Theme-aware styling using Home Assistant CSS variables

## Technology Stack

- **Language**: TypeScript (target: ES2020)
- **UI Framework**: [Lit](https://lit.dev/) - Web components library with reactive properties and decorators
- **Date Handling**: [date-fns](https://date-fns.org/) - Modern date utility library
- **Build Tool**: [Rollup](https://rollupjs.org/) - Module bundler with TypeScript support
- **Linting**: ESLint with TypeScript parser
- **Formatting**: Prettier

## Development Setup

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation
```bash
npm install
```

### Build Commands
- `npm run build` - Build the production bundle
- `npm run watch` - Build in watch mode for development
- `npm run lint` - Run ESLint on TypeScript files
- `npm run format` - Format TypeScript files with Prettier

### Project Structure
```
src/
├── date-range-selector-card.ts  # Main card component
├── editor.ts                    # Visual editor for card configuration
└── types.ts                     # TypeScript type definitions

dist/
└── date-range-selector-card.js  # Built output (bundled)
```

## Code Style Guidelines

### TypeScript Standards
- Use strict TypeScript settings (strict mode enabled)
- Enable experimental decorators for Lit
- Target ES2020 with ESNext modules
- Prefer explicit types over `any`
- Use noUnusedLocals and noUnusedParameters

### Lit Component Patterns
- Use `@customElement` decorator for custom element registration
- Use `@property` for public reactive properties
- Use `@state` for internal reactive state
- Implement `render()` method with `html` template literals
- Use static `styles` with `css` template literals
- Follow Lit lifecycle methods (willUpdate, updated, etc.)

### Date Handling
- Always use `date-fns` functions for date manipulation
- Use ISO week format (startOfWeek with weekStartsOn: 1 for Monday)
- Format dates consistently using `format(date, 'yyyy-MM-dd')`
- Handle timezone considerations for Home Assistant integration

### Home Assistant Integration
- Extend `LitElement` for custom cards
- Accept `hass` property of type `HomeAssistant` for state access
- Use `hass.callService()` for updating entity states
- Implement `setConfig()` for card configuration
- Provide `getConfigElement()` and `getStubConfig()` static methods
- Use `ha-entity-picker` for entity selection with domain filtering
- Use `ha-date-input` for modern, native date picker components
- Support `ha-selector` for configuration UI with entity creation

## Configuration Options

The card supports these configuration options:
- `start_entity` (required): Entity ID for start date (input_datetime) - No default value in stub config
- `end_entity` (required): Entity ID for end date (input_datetime) - No default value in stub config
- `range_entity` (optional): Entity ID for storing range in days (input_number)
- `offset_entity` (optional): Entity ID for storing offset in days from today (input_number)
- `show_arrows` (optional, default: true): Show navigation arrows
- `today_button_type` (optional, default: 'icon'): 'icon' or 'text' - When 'text', button label changes based on selected mode
- `show_custom_range` (optional, default: false): Show custom button with modern date pickers
- `hide_background` (optional, default: false): Remove the card background, shadow, and border
- `disable_future` (optional, default: false): Prevent future date selection
- `min_date` (optional): Minimum selectable date (YYYY-MM-DD format)
- `display_mode` (optional, default: 'default'): 'default' or 'compact'
- `visible_range_modes` (optional, all true by default): Control which range buttons to show (day/week/month/year)
- `default_range_mode` (optional): Default range mode selection ('day', 'week', 'month', 'year')

### Dynamic "Today" Button
The button that returns to the current period now adapts based on the selected mode:
- In Day mode or Custom mode: Shows "Today"
- In Week mode: Shows "This Week"
- In Month mode: Shows "This Month"
- In Year mode: Shows "This Year"
This makes it clear that clicking the button will navigate to the current period in the active mode.

## Helper Integration and ApexCharts Support

The card supports optional helper entities for advanced use cases like ApexCharts integration:

### Range and Offset Helpers
- **Range Helper** (`range_entity`): Automatically updated with the number of days in the selected range (end - start + 1)
- **Offset Helper** (`offset_entity`): Automatically updated with days from today to the start date (0 = today, -7 = 7 days ago)
- These helpers enable dynamic chart periods in ApexCharts without automation scripts

### ApexCharts Integration Example
```yaml
type: custom:apexcharts-card
graph_span: ${range_entity}
span:
   end: day
   offset: ${offset_entity}
```

This allows charts to automatically update their time range when the date selector changes.

## Testing Approach

**Current State:** This project does not have automated tests.

**When Adding Tests:**
- Consider using Web Test Runner for web component testing
- Test Lit component rendering and reactive properties
- Test date calculations and range selection logic
- Test Home Assistant service calls and entity updates
- Mock the `hass` object for isolated component testing
- Test configuration validation in the editor

## Common Tasks

### Adding a New Configuration Option
1. Add the option to `DateRangeSelectorCardConfig` interface in `types.ts`
2. Update `getStubConfig()` in both the main component and editor (leave entity fields empty)
3. Add UI controls in `editor.ts` using appropriate selectors:
    - Use `ha-selector` for entity selection with creation support
    - For boolean options, use a structured layout: label above, helper text, then checkbox with descriptive span
    - Group related options under `<h3>` section headers
    - Use `mwc-button` for action buttons
4. Implement the functionality in the main component
5. Update README.md documentation
6. Update these copilot instructions if the change is architecturally significant

### Editor UI Organization
The editor is organized into logical sections with headers:
1. **Required Entities**: Start and End date entities
2. **Range Mode Configuration**: Which modes are visible and default mode
3. **Display Options**: Visual appearance settings (display mode, button types, checkboxes for features)
4. **Date Constraints**: Future date and minimum date restrictions
5. **Optional Helper Entities**: Range and offset entities for ApexCharts integration

For boolean options, use the checkbox-config pattern:
- Main label at the top
- Helper text explaining the option
- Checkbox with a descriptive span inside a checkbox-label

### Modifying Date Range Logic
1. Use date-fns functions consistently
2. Respect `disable_future` and `min_date` constraints
3. Test edge cases (month boundaries, leap years, ISO weeks)
4. Update navigation arrow disabled states accordingly
5. **Important**: When navigating between periods, recalculate the full range instead of just shifting dates to avoid carrying over truncated ranges from disable_future constraints
6. **Race Condition Prevention**: Use the `isUpdating` state to prevent concurrent updates when user rapidly clicks buttons

### Preventing Race Conditions
The card implements a locking mechanism to prevent issues when users rapidly interact with controls:
1. An `isUpdating` state variable tracks if an entity update is in progress
2. All interactive controls (buttons, date pickers) are disabled while `isUpdating` is true
3. The `_setDateRange()` method checks if an update is in progress and returns early if so
4. After all service calls complete, a 100ms timeout ensures Home Assistant has processed updates before re-enabling controls
5. This prevents ranges from becoming corrupted when navigating quickly

### Styling Changes
1. Use Home Assistant CSS custom properties:
    - `--primary-color`: Active/selected state
    - `--ha-card-background`: Card background
    - `--primary-text-color`: Main text
    - `--secondary-text-color`: Helper text
    - `--divider-color`: Borders
2. Keep styles within the component's shadow DOM
3. Use `css` tagged template literals in static styles
4. Support multiple display modes (default and compact)
5. When `hide_background` is true, remove card background, shadow, and border

### Working with Modern Date Pickers
1. Use Home Assistant's native `ha-date-input` component for date selection
2. Pass the `hass` object to date input components
3. Handle date change events with `@value-changed` listener
4. Format dates consistently using `format(date, 'yyyy-MM-dd')` - not ISO strings
5. Set `min` and `max` attributes based on `min_date` and `disable_future` settings
6. Set `disabled` property to match `isUpdating` state to prevent race conditions

## Build and Release Process

### Building
- Run `npm run build` to create production bundle
- Output: `dist/date-range-selector-card.js`
- This file is distributed via HACS and GitHub releases

### Code Quality
- Always run `npm run lint` before committing
- Use `npm run format` to maintain formatting
- Ensure TypeScript compilation succeeds without errors

## Git workflow & release process

Follow this workflow to keep the repository history clean and reproducible.

- Ignore build artifacts and node_modules locally. Commit only source files.
- Use feature branches (feat/, fix/, chore/) and open PRs against `main`.
- Keep commits small and focused. Use `git add -p` to stage hunks.
- Rebase/squash locally before merging to keep `main` readable:
   - `git rebase -i origin/main` (use fixup/squash as needed)

Preferred handling of `dist/` (built bundle):

- Option A (recommended): Do NOT commit `dist/`.
   - Add `/dist` to `.gitignore` (this repo uses this approach by default).
   - Build artifacts are produced by CI on release and uploaded to the GitHub Release as assets.

- Option B (allowed for some custom-card workflows): Commit `dist/` only on release commits.
   - Build locally, then create a single commit that updates `dist/` and tag the release.
   - Avoid mixing source and build commits.

Release steps (CI-backed, recommended):

1. Update code on a feature branch and open a PR.
2. Merge to `main` after CI checks (lint, typecheck, tests) pass.
3. Create an annotated tag for release, e.g. `git tag -a v1.2.3 -m "v1.2.3"` and push the tag.
4. GitHub Actions (configured) will build the bundle and attach `dist/date-range-selector-card.js` to the Release.

Local quick-release (if you must build & commit `dist/`):

```powershell
git checkout -b release/v1.2.3
npm ci; npm run build
git add dist
git commit -m "chore(release): build dist for v1.2.3"
git tag -a v1.2.3 -m "Release v1.2.3"
git push origin release/v1.2.3
git push origin --tags
```

Pre-commit & CI checks

- Use `lint-staged` + `husky` to run formatting/lint only on staged files to keep hooks fast.
- Required checks in CI: `npm ci`, `npm run lint`, `npm run build`, `npm test` (if tests exist).

Checklist for contributors

- [ ] Work on a feature branch
- [ ] Run `npm ci` before local development
- [ ] Run `npm run lint` and fix issues before commit
- [ ] Run `npm run build` if you are preparing a local release (not required for regular PRs)
- [ ] Create a single release commit for `dist/` (if following Option B)

Security

- Never commit secrets. Use GitHub Secrets for CI credentials.

If you want, I can add a GitHub Actions workflow that builds on tags and uploads the `dist` bundle to Releases, plus a `.gitignore` and a Husky + lint-staged config to enforce checks locally.

## Integration with Home Assistant

### Entity Types
- Works with `input_datetime` entities (has_date: true, has_time: false)
- Optionally works with `input_number` entities for range and offset helpers
- Updates entity values using `input_datetime.set_datetime` service
- Updates number entities using `input_number.set_value` service
- Reads current values from `hass.states[entityId].state`
- Automatically calculates and updates range (days) and offset (days from today)

### Custom Card Requirements
- Register as a custom card with `customElements.define()`
- Implement static methods for card configuration UI
- Handle configuration updates reactively
- Provide proper card type in configuration

## Best Practices for Contributors

1. **Minimal Changes**: Make the smallest possible changes to achieve the goal
2. **TypeScript First**: Leverage TypeScript's type system for safety
3. **Reactive Properties**: Use Lit's reactive system rather than manual DOM manipulation
4. **Date Immutability**: date-fns functions return new dates; never mutate dates
5. **Home Assistant Context**: Test changes in actual Home Assistant environment when possible
6. **Documentation**: Update README.md when adding user-facing features
7. **Backwards Compatibility**: Don't break existing card configurations

## Security Considerations

- Validate all configuration inputs (especially dates)
- Sanitize any user-provided strings before rendering
- Use Lit's built-in XSS protection (template literals)
- Don't expose sensitive Home Assistant data
- Follow Home Assistant's security guidelines for custom cards

## Troubleshooting Common Issues

### Build Failures
- Clear `node_modules` and reinstall dependencies
- Check Node.js version (>= 16)
- Verify TypeScript configuration is correct

### Card Not Loading in Home Assistant
- Check browser console for errors
- Verify the card is properly registered in resources
- Ensure the built file is accessible at the URL
- Clear browser cache

### Date Calculation Issues
- Verify timezone handling
- Check ISO week calculations (weekStartsOn: 1)
- Test month/year boundaries
- Validate date-fns function usage

## Additional Resources

- [Lit Documentation](https://lit.dev/)
- [date-fns Documentation](https://date-fns.org/)
- [Home Assistant Custom Card Development](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/)
- [HACS Documentation](https://hacs.xyz/) 

````
