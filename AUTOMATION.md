# Cloud Automation

This repository is set up to refresh a daily reporting briefing from GitHub Actions, so the schedule can run even when the owner's home computer is off.

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

## Graph Engineering Shape

The briefing update is organized as a small editorial graph:

1. Read the current pages and recent history.
2. Fan out into policy, filing, company-cluster, and statistics searches.
3. Validate source rank, dates, numbers, duplicated angles, and owner-written articles.
4. Fan verified material back into cross-comparison pitch cards.
5. Mark unresolved points as remaining verification.
6. Leave the final article decision to the reporter.

The public `index.html` includes a `작업 그래프` panel so the visible briefing shows which production gates the current cards passed.
