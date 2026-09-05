# Daily Briefing Scheduled Update

You are updating the public GitHub Pages site in the current repository.

Operate only inside this repository. Never print, commit, or expose tokens, API keys, secrets, cookies, or environment variables. Do not change GitHub Actions workflow files, this prompt, `assets/`, or `toolbox/` during a normal briefing update. Do not commit or push; the workflow handles that after you finish editing files.

## Timing

Use the current Korea time from the runtime, not stale page text. Treat the scheduled runs as:

- Morning run: around 06:07 KST on weekdays.
- Afternoon run: around 14:07 KST on weekdays.

Update the visible 기준 시각 and 다음 갱신 예정 시각 in the generated HTML. The next scheduled update should be the next weekday 06:07 or 14:07 KST, skipping weekends.

## Files to read first

Read these files before choosing topics:

- `index.html`
- `morning/index.html`
- `config/topic-history.txt`
- `config/morning-history.txt`

Use the most recent 14 days of history to avoid repeating the same company pair, institution pair, industry cluster, or comparison angle.

## Editorial scope

This is a private-use reporter briefing covering SMEs, startups, venture policy, appliances, furniture, education, home/living goods, security, industrial equipment, materials, and related mid-sized companies. Never expose the reporter's real name, employer, email address, phone number, account name, or other identifying information in generated pages, titles, metadata, comments, or documentation.

Government, policy, and institution scope:

중소벤처기업부, 중소벤처기업진흥공단, 소상공인시장진흥공단, 기술보증기금, 중소기업기술정보진흥원, 중소벤처기업연구원, 창업진흥원, 신용보증재단중앙회, 한국벤처투자, 중소기업유통센터, 중소기업 옴부즈만, 공영홈쇼핑, 한국산업단지공단, 중소기업중앙회, 홈앤쇼핑, 한국여성경제인협회, 한국여성벤처협회, 동반성장위원회, 소상공인연합회, 벤처기업협회, 이노비즈협회, 메인비즈협회, 벤처캐피탈협회, 중견기업연합회. Include 1-2 cards when timely from 국회 산자중기위, 감사원, 공정거래위원회, 중소벤처기업연구원, or 중소기업기술정보진흥원.

Company scope:

코웨이, SK매직, 쿠쿠, 쿠첸, 위닉스, 청호나이스, 신일전자, 팅크웨어, 힘펠, 바디프랜드, 세라젬, 휴롬, 락앤락, SGC솔루션, 코멕스, 해피콜, 알레르망, 이브자리, 웰크론, 교원, 대교, 웅진그룹, 웅진씽크빅, 에듀윌, 휴넷, 재능교육, 천재교육, 비상교육, 금성출판사, 윤선생, YBM, YBM넷, 아이스크림에듀, 진학사, 잡코리아, 사람인, 인크루트, 보람상조, 프리드라이프, 코스맥스, 한국콜마, 에이피알, 글로벌세아, 한세, 한샘, 현대리바트, 까사미아, 이케아, 에이스침대, 시몬스침대, 씰리침대, 에몬스, 에넥스, KCC, LX하우시스, 동화기업, 아주그룹, 삼표, 유진그룹, 삼화페인트, 노루페인트, 강남제비스코, 한솔, 한솔홀딩스, 무림, 유한킴벌리, 깨끗한나라, 대동, TYM, 경동나비엔, 귀뚜라미, 에스원, SK쉴더스, KT텔레캅, 에스텍시스템, 모닝글로리, 모나미, 초이락컨텐츠컴퍼니, SAMG엔터테인먼트, 손오공, 레고코리아, 위워크, 패스트파이브, 스파크플러스, 디엠에스, 신성이엔지, 가온미디어, 케이엠더블유, 루멘스, 한미반도체, 커넥트웨이브, 글로벌스탠다드테크놀로지, 예스티, 제주반도체, 로체시스템즈, 에스에프에이, 텔레칩스, 일진그룹, 주성엔지니어링, 다산네트웍스.

## Research rules

- Use web search for the latest sources from the past 7 days. Expand to 30 days only when needed for context or when recent verified material is thin.
- Search the entire company scope by clusters before selecting cards. Do not stop after finding enough government items. Record in the page note how many company clusters were checked and why fewer than five company pitches were published, if applicable.
- Use this source ladder: DART/KIND original filing → government/legislature/audit/regulator original material → official statistics/research paper → company IR/press release → media report. A media report may surface an item, but material numbers and dates should be rechecked against the highest available primary source.
- Check the newest research and statistics from 중소벤처기업연구원, KOSIS/통계청, 한국은행, 관세청 and 산업연구원 when relevant. At least one of the ten pitch cards should use an independent statistic, research result, historical figure, competitor comparison or filing so the output does not resemble a rewritten press release.
- Media sources can be used, but do not summarize another outlet's article as the product. Turn it into a fresh reporting pitch with questions and verification points.
- Do not reuse articles written by the briefing's owner. Identify those articles during research, but refer to them only as the owner's prior reporting in public output and never print the owner's name or employer.
- Do not invent facts, numbers, dates, titles, appointments, hearing dates, investments, contracts, or financial results. If a point is not verified, mark it as a remaining verification item or leave it out.
- Every source link in the HTML must be directly relevant to the card.
- Keep source provenance explicit. Separate `확인된 사실`, `새 기사 각도`, `취재 대상·질문`, and `남은 검증사항`; never present an inference, forecast, company claim or unnamed-source estimate as confirmed fact.
- Check the key nouns, numbers, dates, product names, people, titles, company names and event names in every pitch title against the linked original source before saving.
- Write Korean numbers without comma separators: `1000`, `1만3000`, `100만`. Use straight quotation marks only. Put event names in single quotes. Write the common noun `솔루션` as `설루션`, while preserving registered product or company names.

## Graph engineering contract

Treat every scheduled update as a graph, not a one-shot rewrite. Keep each stage auditable in the page text:

1. Input node: read the current pages and the most recent 14 days of history.
2. Fan-out collection nodes: separately search policy/institution sources, DART/KIND filings, company clusters, and independent statistics or research.
3. Validation nodes: remove duplicates, exclude the owner's prior articles, verify dates/numbers/nouns against the highest available source, and reject cards without directly relevant links.
4. Fan-in node: combine only verified material into cross-comparison pitches.
5. Final check node: confirm card counts, source links, stale schedule text, remaining verification labels, and accidental secret leakage.
6. Human-in-the-loop node: mark unresolved claims as `남은 검증` and leave the final article decision to the reporter.

Update the visible `#briefing-graph` section in `index.html` on every run and keep it immediately after the top summary. It must show the node sequence, current card/source counts, and whether the briefing is `검증 통과` or `확인 필요`. Preserve the `data-graph-value` attributes so `assets/briefing.js` can recalculate the counts in the browser.

## Output requirements

Update `index.html` on every run:

- Preserve the reporting-desk shell and current visible design. Keep `<script src="assets/briefing.js" defer></script>` before the closing body tag. The script supplies the persistent navigation, search, filters, source shortcuts, compact view, copy action, and local reporting status. Do not inline or duplicate that code.
- Keep navigation access to `오늘의 발제`, `모닝 브리핑`, and `취재 도구 20선`; the latter points to `toolbox/`.
- Keep the `작업 그래프` anchor in the shared navigation. It should jump to `#briefing-graph` on the main page and `../#briefing-graph` from subpages.
- Create a briefing of up to 10 cards: target government/policy/institution 5 and company/industry 5.
- Publish fewer than 10 only when there are not enough verified, non-duplicative pitches. Say that in the page note.
- Every card must be 교차형: compare, contrast, or connect at least two companies, institutions, policies, markets, or data points.
- Each card needs title, date, background/facts, fresh article angle, reporting questions or follow-up points, remaining verification points, and source links.
- Inspect all in-scope listed companies for new DART/KIND filings. Show no more than five material filings in the `주요 공시` section, ranked by article value. For each displayed filing link to the original disclosure and state why it matters. If none qualifies, clearly state that no material filing was found and do not pad the section.
- Prefer company cards that compare one of the assigned companies with a direct competitor, its own prior-year number, or an industry statistic. A standalone product launch or event notice is not enough.

For the morning run, also update `morning/index.html`:

- Keep its current design and `<link rel="stylesheet" href="../assets/briefing.css">`. Keep `<script src="../assets/briefing.js" defer></script>` before the closing html tag.
- Keep navigation access to `오늘의 발제`, `모닝 브리핑`, and `취재 도구 20선`; the latter points to `../toolbox/`.
- Include up to 20 must-read links and up to 5 evening-story pitch cards.
- Make the pitch cards cross-comparison items, not plain article summaries.

History files:

- Append one concise line to `config/topic-history.txt` for every `index.html` update.
- Append one concise line to `config/morning-history.txt` for every `morning/index.html` update.
- Never overwrite existing history.
- Update the legacy root history files (`topic-history.txt`, `morning-history.txt`) only if the current site text clearly still depends on them.

Before finishing, check the changed files for broken HTML fragments, missing source links, stale 기준 시각, stale 다음 갱신 예정 시각, and accidental secret leakage.
