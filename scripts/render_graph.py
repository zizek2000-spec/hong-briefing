#!/usr/bin/env python3
import json
import html
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "latest.json"
OUT = ROOT / "index.html"


def esc(value):
    return html.escape(str(value or ""), quote=True)


def list_html(items):
    if not items:
        return "<p>자료에 없음</p>"
    return "<ul>" + "".join(f"<li>{esc(x)}</li>" for x in items) + "</ul>"


def sources_html(sources):
    links = []
    for src in sources or []:
        url = str(src.get("url", "")).strip()
        if not url.startswith(("http://", "https://")):
            continue
        label = esc(src.get("label") or "원문")
        links.append(f'<a href="{esc(url)}" target="_blank" rel="noopener">{label}</a>')
    return "".join(links) or "<span>원문 링크 없음</span>"


def card_html(p):
    score = int(p.get("score", 0) or 0)
    tag = esc(p.get("tag") or p.get("category") or "발제")
    title = esc(p.get("title") or "제목 없음")
    origin = ", ".join(p.get("origin_agents") or [])
    return f'''<article class="card" data-score="{score}">
<span class="tag">{tag}</span><span class="score">우선 {score}</span>
<h3>{title}</h3>
<div class="label">확인된 사실</div>{list_html(p.get("confirmed_facts") or [])}
<div class="label">새 기사 각도</div><p>{esc(p.get("angle") or "자료에 없음")}</p>
<div class="label">추가 취재</div>{list_html(p.get("reporting_questions") or [])}
<div class="label">남은 검증</div>{list_html(p.get("verification") or [])}
<div class="sources">{sources_html(p.get("sources") or [])}</div>
<div class="graph-origin">그래프 노드: {esc(origin or "unknown")}</div>
</article>'''


def disclosure_html(items):
    if not items:
        return '<div class="notice"><b>기사화할 주요 공시 없음</b><br>그래프 공시 노드에서 기사 가치가 확인된 신규 중요 공시가 없었습니다.</div>'
    rows = []
    for item in items[:5]:
        url = str(item.get("url") or item.get("source") or "").strip()
        link = f' <a href="{esc(url)}" target="_blank" rel="noopener">원문</a>' if url.startswith(("http://", "https://")) else ""
        rows.append(f'<li><b>{esc(item.get("title") or "공시")}</b> — {esc(item.get("why_it_matters") or "")}{link}</li>')
    return '<div class="notice"><ul>' + "".join(rows) + '</ul></div>'


def status_html(status):
    labels = {"policy":"정책·기관", "company":"담당기업", "filing":"DART·KIND", "data":"통계·연구", "validation":"최종검증"}
    chips = []
    for key in ["policy", "company", "filing", "data", "validation"]:
        value = status.get(key, "missing")
        chips.append(f'<span class="graph-chip {esc(value)}">{labels[key]} {esc(value.upper())}</span>')
    return "".join(chips)


def main():
    if not DATA.exists():
        raise SystemExit(f"missing {DATA}")
    data = json.loads(DATA.read_text(encoding="utf-8"))
    pitches = data.get("pitches") or []
    pitches = sorted(pitches, key=lambda x: int(x.get("score", 0) or 0), reverse=True)[:10]
    generated = esc(data.get("generated_at_kst") or datetime.now().strftime("%Y-%m-%d %H:%M KST"))
    status = data.get("graph_status") or {}
    searched = data.get("searched_scope") or []
    scope_note = " · ".join(esc(x) for x in searched[:8]) if searched else "그래프 조사 범위 정보 없음"

    policy = [p for p in pitches if p.get("category") == "policy"]
    company = [p for p in pitches if p.get("category") != "policy"]

    doc = f'''<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>데일리 종합 브리핑</title>
<link rel="stylesheet" href="assets/briefing.css">
<link rel="stylesheet" href="assets/graph.css">
</head><body>
<header><div class="wrap"><h1>데일리 종합형·공시 브리핑</h1><p>기준 시각 {generated} · 그래프 엔지니어링 자동 발제</p><div class="nav"></div></div></header>
<main class="wrap">
<section class="graph-status"><div><b>리서치 그래프 상태</b><p>정책·기업·공시·통계를 병렬 조사한 뒤 검증·점수화해 상위 발제를 선정합니다.</p></div><div class="graph-chips">{status_html(status)}</div></section>
<div class="summary"><b>이번 실행 조사 범위</b><br>{scope_note}<br><br><b>선정 결과</b> 검증을 통과한 발제 {len(pitches)}건을 점수순으로 표시했습니다. 카드의 '기사화·보류·폐기' 상태는 이 브라우저에 저장됩니다.</div>
<h2 class="section-title">주요 공시</h2>{disclosure_html(data.get("disclosures") or [])}
<h2 class="section-title">정책·기관 발제</h2><div class="grid">{''.join(card_html(p) for p in policy) if policy else '<div class="notice">이번 실행에서 검증을 통과한 정책·기관 발제가 없습니다.</div>'}</div>
<h2 class="section-title">기업·산업·데이터 발제</h2><div class="grid">{''.join(card_html(p) for p in company) if company else '<div class="notice">이번 실행에서 검증을 통과한 기업·산업 발제가 없습니다.</div>'}</div>
<footer>자동 수집 결과는 취재 출발점입니다. 기사 송고 전 원문·공시·통계의 숫자와 날짜를 다시 확인하십시오.</footer>
</main><script src="assets/briefing.js" defer></script><script src="assets/graph.js" defer></script></body></html>'''
    OUT.write_text(doc, encoding="utf-8")
    print(f"rendered {len(pitches)} pitches to {OUT}")


if __name__ == "__main__":
    main()
