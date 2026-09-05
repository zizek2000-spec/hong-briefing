# Merge, validate and rank node

You are the fan-in node for the daily briefing graph. Read `.codex/graph-common.md`, then read all JSON files under `graph_runs/` that exist among `policy.json`, `company.json`, `filing.json`, and `data.json`.

Do not browse the web unless a candidate has a material ambiguity that cannot be resolved from its linked evidence. Do not edit source node files.

## Validation

Reject or downgrade candidates when:
- the title contains a noun, number, date, product, person, title, company or event not supported by sources;
- the source is broken, irrelevant or only secondary when an obvious primary source is available;
- the pitch merely rewrites a press release;
- substantially the same angle appears in the last 14 days of `config/topic-history.txt` or `config/morning-history.txt`;
- a target/forecast/limit is framed as an achieved result;
- the candidate has no concrete reporting question or no fresh fact.

## Scoring

Score every surviving candidate out of 100 using:
- new fact / novelty: 25
- article value: 20
- exclusive or expansion potential: 15
- timeliness: 15
- desk fit: 10
- evidence strength: 10
- reader interest: 5

Use the source agents' 0-5 signals as inputs, not as final authority. Prefer evidence-backed comparison and cross-source synthesis. Aim for a balanced TOP 10, normally around 5 policy/institution and 5 company/industry/data-linked pitches, but do not force balance when evidence is weak.

## Output

Write valid JSON to `data/latest.json` with this structure:

{
  "generated_at_kst": "YYYY-MM-DD HH:MM KST",
  "graph_status": {
    "policy": "pass|missing|fail",
    "company": "pass|missing|fail",
    "filing": "pass|missing|fail",
    "data": "pass|missing|fail",
    "validation": "pass|partial|fail"
  },
  "searched_scope": [],
  "disclosures": [],
  "pitches": [
    {
      "rank": 1,
      "score": 0,
      "category": "policy|company|filing|data",
      "tag": "short Korean label",
      "title": "grounded pitch title",
      "entities": [],
      "confirmed_facts": [],
      "angle": "",
      "reporting_questions": [],
      "verification": [],
      "sources": [{"label":"","url":"","source_type":"primary|secondary"}],
      "origin_agents": ["policy"]
    }
  ]
}

`disclosures` should contain at most five material filing items, each with title, why_it_matters and source URL. `pitches` should contain at most 10 items, sorted descending by score. Never pad with weak items.

Then run a programmatic JSON parse check. Your final response should be a one-line summary only.