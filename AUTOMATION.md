# Cloud Automation

This repository is set up to refresh `hong-briefing` from GitHub Actions, so the schedule can run even when the owner's home computer is off.

## Schedule

- Weekdays around 06:07 KST
- Weekdays around 14:07 KST
- Manual run is available from GitHub Actions with `workflow_dispatch`.

The schedule is defined in `.github/workflows/update-briefing.yml`.

## Required secret

The workflow needs one GitHub Actions secret:

- `OPENAI_API_KEY`

Add it at:

`Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`

The secret is not stored in the code and must never be committed.

## What The Workflow Changes

On each run, Codex reads the current HTML pages and history files, researches current public sources, updates the briefing pages, appends the history files, commits the changed briefing files, pushes to `main`, and checks that the GitHub Pages URL responds.
