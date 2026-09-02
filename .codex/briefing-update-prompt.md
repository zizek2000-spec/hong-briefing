# Hong Briefing Scheduled Update

You are updating the public GitHub Pages site for `zizek2000-spec/hong-briefing`.

Operate only inside this repository. Never print, commit, or expose tokens, API keys, secrets, cookies, or environment variables. Do not change GitHub Actions workflow files or this prompt during a normal briefing update. Do not commit or push; the workflow handles that after you finish editing files.

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

This is a reporter briefing for Hong Seok-hee covering SMEs, startups, venture policy, appliances, furniture, education, home/living goods, security, industrial equipment, materials, and related mid-sized companies.

Government, policy, and institution scope:

중소벤처기업부, 중소벤처기업진흥공단, 소상공인시장진흥공단, 기술보증기금, 중소기업기술정보진흥원, 중소벤처기업연구원, 창업진흥원, 신용보증재단중앙회, 한국벤처투자, 중소기업유통센터, 중소기업 옴부즈만, 공영홈쇼핑, 한국산업단지공단, 중소기업중앙회, 홈앤쇼핑, 한국여성경제인협회, 한국여성벤처협회, 동반성장위원회, 소상공인연합회, 벤처기업협회, 이노비즈협회, 메인비즈협회, 벤처캐피탈협회, 중견기업연합회. Include 1-2 cards when timely from 국회 산자중기위, 감사원, 공정거래위원회, 중소벤처기업연구원, or 중소기업기술정보진흥원.

Company scope:

코웨이, SK매직, 쿠쿠, 쿠첸, 위닉스, 청호나이스, 신일전자, 팅크웨어, 힘펠, 바디프랜드, 세라젬, 휴롬, 락앤락, SGC솔루션, 코멕스, 해피콜, 알레르망, 이브자리, 웰크론, 교원, 대교, 웅진그룹, 웅진씽크빅, 에듀윌, 휴넷, 재능교육, 천재교육, 비상교육, 금성출판사, 윤선생, YBM, YBM넷, 아이스크림에듀, 진학사, 잡코리아, 사람인, 인크루트, 보람상조, 프리드라이프, 코스맥스, 한국콜마, 에이피알, 글로벌세아, 한세, 한샘, 현대리바트, 까사미아, 이케아, 에이스침대, 시몬스침대, 씰리침대, 에몬스, 에넥스, KCC, LX하우시스, 동화기업, 아주그룹, 삼표, 유진그룹, 삼화페인트, 노루페인트, 강남제비스코, 한솔, 한솔홀딩스, 무림, 유한킴벌리, 깨끗한나라, 대동, TYM, 경동나비엔, 귀뚜라미, 에스원, SK쉴더스, KT텔레캅, 에스텍시스템, 모닝글로리, 모나미, 초이락컨텐츠컴퍼니, SAMG엔터테인먼트, 손오공, 레고코리아, 위워크, 패스트파이브, 스파크플러스, 디엠에스, 신성이엔지, 가온미디어, 케이엠더블유, 루멘스, 한미반도체, 커넥트웨이브, 글로벌스탠다드테크놀로지, 예스티, 제주반도체, 로체시스템즈, 에스에프에이, 텔레칩스, 일진그룹, 주성엔지니어링, 다산네트웍스.

## Research rules

- Use web search for the latest sources from the past 7 days. Expand to 30 days only when needed for context or when recent verified material is thin.
- Prefer primary sources: government releases, institution notices, DART/KIND filings, company IR/press releases, official statements, and legislature/audit/regulator material.
- Media sources can be used, but do not summarize another outlet's article as the product. Turn it into a fresh reporting pitch with questions and verification points.
- Do not reuse articles written by Hong Seok-hee.
- Do not invent facts, numbers, dates, titles, appointments, hearing dates, investments, contracts, or financial results. If a point is not verified, mark it as a remaining verification item or leave it out.
- Every source link in the HTML must be directly relevant to the card.

## Output requirements

Update `index.html` on every run:

- Preserve the existing visual design and CSS structure unless a small HTML validity fix is necessary.
- Create a briefing of up to 10 cards: target government/policy/institution 5 and company/industry 5.
- Publish fewer than 10 only when there are not enough verified, non-duplicative pitches. Say that in the page note.
- Every card must be 교차형: compare, contrast, or connect at least two companies, institutions, policies, markets, or data points.
- Each card needs title, date, background/facts, fresh article angle, reporting questions or follow-up points, remaining verification points, and source links.
- Update the "주요 공시" section from DART/KIND or clearly state no material filing was found.

For the morning run, also update `morning/index.html`:

- Keep its current design.
- Include up to 20 must-read links and up to 5 evening-story pitch cards.
- Make the pitch cards cross-comparison items, not plain article summaries.

History files:

- Append one concise line to `config/topic-history.txt` for every `index.html` update.
- Append one concise line to `config/morning-history.txt` for every `morning/index.html` update.
- Never overwrite existing history.
- Update the legacy root history files (`topic-history.txt`, `morning-history.txt`) only if the current site text clearly still depends on them.

Before finishing, check the changed files for broken HTML fragments, missing source links, stale 기준 시각, stale 다음 갱신 예정 시각, and accidental secret leakage.
