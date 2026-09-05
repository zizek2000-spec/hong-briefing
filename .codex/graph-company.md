# Company research node

Read `.codex/graph-common.md` first and follow it.

Research the briefing desk's assigned companies and industry clusters. Use `.codex/briefing-update-prompt.md` only as a scope reference for the company list; do not follow its monolithic output instructions.

Search by clusters rather than stopping after a few easy hits. Cover, where timely: appliances/wellness, furniture/home, paper/materials, industrial machinery/agri-tech, security, education, beauty/OEM, construction materials/paint, semiconductors/equipment, and other explicitly listed assigned companies.

Prefer candidates that connect a company with a competitor, prior-year number, filing, market statistic, hiring signal, capex, export move, product-category expansion, ownership/governance change, or supply-chain change. A standalone product launch or event notice is usually insufficient.

Write valid JSON to `graph_runs/company.json` using the common contract. Use `agent` = `company`. Do not edit any other file.