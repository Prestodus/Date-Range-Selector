---
name: hacs-readme-audit
description: Audits the HACS repository code and restructures the active README.md.
agent: agent
model: GPT-5
---

You are an expert technical writer and senior developer for the Home Assistant Community Store (HACS). Your task is to perform a comprehensive audit of this repository's codebase and *completely rewrite* the currently active `README.md` file (`${file}`) to conform to the highest standards outlined in HACS and Home Assistant developer documentation.

Your goal is to perform a "gap analysis," identify all missing or outdated information in the current README, and generate a new, fully-synchronized, and professional `README.md` that follows the canonical structure.

### Phase 1: Codebase Audit (Source of Truth)

First, you *must* scan the repository's workspace (`@workspace`) to find and parse the following "source of truth" files. Do not hallucinate; base your analysis *only* on the content of these files.

1.  **HACS Manifest (`hacs.json`):**

    -   Find and parse `hacs.json` at the repository root.   

    -   Extract the HACS display `name`.   

    -   Note if `render_readme` is set to `true`. If it is not, you must add a temporary developer warning at the very top of your generated response.   

2.  **Home Assistant Manifest (`manifest.json`):**

    -   Find the integration's `domain` (the directory name under `custom_components/`).

    -   Find and parse `custom_components/[domain]/manifest.json`.

    -   Extract the official integration `name`, `version`, `domain`, `issue_tracker` link, `documentation` link, and the `config_flow` boolean.

    -   **Action:** Cross-reference `manifest.json[name]` and `hacs.json[name]`. If they differ, use the `manifest.json` name for the main title and the `hacs.json` name *only* in the HACS installation instructions.

3.  **Configuration Methods (The Bifurcation):**

    -   **UI (Config Flow):** Check for the *existence* of `custom_components/[domain]/config_flow.py` AND the `config_flow: true` key in `manifest.json`.

    -   **YAML (Schema):** Scan all `.py` files in `custom_components/[domain]/` (especially `__init__.py`, `sensor.py`, `switch.py`, etc.) for `PLATFORM_SCHEMA` or `CONFIG_SCHEMA` definitions.

4.  **Services (`services.yaml`):**

    -   Check for the *existence* of `custom_components/[domain]/services.yaml`.

    -   If it exists, parse *every* service defined. For each service, extract its `description` and all of its `fields`. For each field, extract its `description` and `example`.

### Phase 2: README Gap Analysis

Now, analyze the *current* `README.md` (the content of `${file}`) against your findings from Phase 1. Identify all discrepancies and missing information.

-   Is the `version` in the README (if any) out of sync with `manifest.json[version]`?

-   Does `config_flow: true` exist, but the README lacks a "Configuration via UI" section telling users to "Go to Settings -> Devices & Services"?

-   Do `PLATFORM_SCHEMA` definitions exist, but the README lacks a "Configuration via YAML" section with a complete and accurate code block?

-   Does `services.yaml` exist, but the "Services" section in the README is missing, incomplete, or fails to document all services and their fields?

-   Is the `issue_tracker` link missing or incorrect in the "Support" section?

### Phase 3: Generate the Optimal README

Based on your audit, *discard* the old structure and *rewrite* the *entire* `README.md` file. You must follow this canonical "dual-audience" structure precisely.

* * * * *

[Insert Logo/Hero Image Here - If one exists, preserve it. If not, add this as a placeholder.]

[Integration Name (from manifest.json 'name')]
==============================================

(https://img.shields.io/badge/HACS-Default-blue.svg)](https://hacs.xyz/) (<https://img.shields.io/github/v/release/OWNER/REPO.svg?display_name=release&sort=semver>)](<https://github.com/OWNER/REPO/releases/latest>) []('[Insert `issue_tracker` link from manifest.json]') (<https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Sponsor-yellow.svg>)](<https://www.buymeacoffee.com/YOUR_LINK>)

and the existing introduction. It must clearly state what the integration does.]

### Features

-   [Generate a bulleted list of key features based on entities created (from `sensor.py`, `switch.py`, etc.) and services provided (from `services.yaml`).]

-   ...

### Prerequisites

-   or `scheduler-card`). If so, list the required component here. Otherwise, state "None."]

### Installation

#### 1\. Installation via HACS (Recommended)

1.  Go to your Home Assistant instance.

2.  Navigate to **HACS** > **Integrations**.

3.  Click the "Explore & Add Repositories" button in the bottom right.

4.  Search for "****".   

5.  Select the integration and click "Install".

6.  **Restart Home Assistant** as prompted.

#### 2\. Manual Installation

1.  Download the [latest release `[version]` asset]([link to releases]) (where `[version]` is from `manifest.json`).

2.  Unzip the file.

3.  Copy the `custom_components/[domain]` folder into your Home Assistant `config/custom_components` directory.

4.  **Restart Home Assistant**.

### Configuration

:] This integration is configured via the UI.

1.  Go to **Settings** > **Devices & Services**.

2.  Click the **+ Add Integration** button in the bottom right.

3.  Search for "**[Integration Name (from manifest.json 'name')]**" and select it.

4.  Follow the on-screen prompts to complete the setup.

:]yaml

Example configuration.yaml entry
================================

[domain]: to create a documented example...]

host: 1.2.3.4
=============

api_key: "YOUR_KEY"
===================

```

### Services

:]
This integration does not expose any custom services.

:]
This integration exposes the following services:

]
#### `[domain].[service_name]`
[Insert `description` from services.yaml]

**Fields:**

| Field | Description | Example |
| :--- | :--- | :--- |
| `[field_name]` | [Insert `description` from field] | `[Insert example from field]` |
| `[field_name_2]` | [Insert `description` from field] | `[Insert example from field]` |
|... |... |... |

**Example Service Call (YAML):**
```yaml
service: [domain].[service_name]
data:
  [field_name]: [example_value]
  [field_name_2]: [example_value_2]

```

### Support

-   For bugs or feature requests, please open an issue in the('[Insert `issue_tracker` link from manifest.json]').

-   For questions or general discussion, please join us on(...) or the [Home Assistant Community Forum]([link to thread]).

* * * * *

[Place any developer-centric badges (CI, CodeCov, License) here at the very bottom.]

### Final Instruction

Produce *only* the new, complete `README.md` file content. Do not include this prompt's instructions or any text other than the final README markup.