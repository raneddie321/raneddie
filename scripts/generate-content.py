#!/usr/bin/env python3
"""
Generates the RanEddie product catalogue, the docs library and product illustrations.

  python3 scripts/generate-content.py

Writes:
  src/data/products.json        default products (editable later in RanEddie Studio)
  src/data/docs-library.json    built-in docs (Studio saves only the pages you change)
  public/images/products/*.svg  product illustrations
"""
import json
import math
import os
import re
import sys
import unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts", "content"))
from products import PRODUCTS  # noqa: E402
from topics import TOPICS  # noqa: E402

ID = "https://id.raneddie.com"
SECTION_PREFIX = {
    "AI at RanEddie": "ai",
    "Sign-in & RanEddie ID": "sign-in",
    "Privacy": "privacy",
    "Security": "security",
    "Data & storage": "data",
    "Billing & subscriptions": "billing",
    "Families": "families",
    "Accessibility": "accessibility",
    "Developers": "developers",
}
# Shown in the docs under these section names
SECTION_NAME = {"Sign-in & RanEddie ID": "RanEddie ID"}


def slugify(s):
    s = unicodedata.normalize("NFKD", s.lower())
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:80]


def bullets(items):
    return "\n".join(f"- {i}" for i in items)


def steps(items):
    return "\n".join(f"{n}. {i}" for n, i in enumerate(items, 1))


def doc(slug, section, title, description, body):
    return {"slug": slug, "section": section, "title": title, "description": description, "body": body.strip()}


# ----------------------------------------------------------------------------------- product docs
def product_docs(p):
    n, s, sec = p["name"], p["slug"], p["section"]
    page = f"/{s}"
    feats = p["docFeatures"]
    out = []
    has_base_start = s in ("fizz", "snake-brawl")
    start_slug = f"{s}-getting-started" if has_base_start else f"{s}-get-started"
    trouble = f"{s}-troubleshooting"

    out.append(doc(f"{s}-overview", sec, f"{n} overview", p["summary"], f"""
{p['summary']}

## What's included
{bullets(f"**{f['title']}** — {f['text']}" for f in p['features'])}

## Where you can use it
{bullets(p['platforms'])}

## Next steps
- [Get started with {n}]({'/docs/' + start_slug})
- [Visit the {n} page]({page})
"""))

    if not has_base_start:
        out.append(doc(start_slug, sec, f"Get started with {n}", f"Everything you need for your first day with {n}.", f"""
{n}: {p['tagline']}

## Before you start
- A RanEddie ID — [create one](/docs/raneddie-id-create-account) if you don't have one yet.
- One of the supported platforms: {', '.join(p['platforms'])}.

## Set up
{steps(["Open " + n + " on your device.", "Choose Sign in and sign in with your RanEddie ID.", "Follow the short welcome tour."])}

## Try these first
{bullets(f"[{f['n']}](/docs/{s}-{slugify(f['n'])}) — {f['d']}." for f in feats[:4])}
"""))

    out.append(doc(f"{s}-availability-and-requirements", sec, f"{n} availability and requirements", f"Where {n} is available and what you need to use it.", f"""
## Platforms
{bullets(p['platforms'])}

## What you need
- A RanEddie ID.
- An internet connection for sign-in, sync and updates.
- The latest version of {n} and of your device's software.

## Availability
Features and availability can vary by country and region. Some features may arrive in your region later.
"""))

    out.append(doc(f"{s}-sign-in", sec, f"Sign in to {n} with your RanEddie ID", f"Use your RanEddie ID to sign in to {n}.", f"""
## Sign in
{steps(["Open " + n + ".", "Choose Sign in.", "Sign in at id.raneddie.com — you're returned to " + n + " automatically."])}

## On a TV or console
Choose Sign in, then enter the code shown on screen at id.raneddie.com on your phone. See [Sign in on a TV or console](/docs/sign-in-on-a-tv-or-console).

## Trouble signing in?
- [Reset your password](/docs/raneddie-id-reset-password)
- [Why does the sign-in page keep loading?](/docs/sign-in-why-does-the-sign-in-page-keep-loading)
"""))

    out.append(doc(f"{s}-privacy", sec, f"{n} and your privacy", f"What {n} stores and how you control it.", f"""
## What {n} stores
{n} stores {p['data']}.

## How it's used
To run {n}, keep your account secure and, if you allow it, personalise your experience.

## Your controls
- See and download your data from your [Account Center]({ID}/account).
- Delete individual items inside {n}.
- Turn off personalised recommendations under Privacy.

## Learn more
- [RanEddie's privacy commitments](/docs/privacy-raneddie-s-privacy-commitments)
- [Download your data](/docs/privacy-download-your-data)
"""))

    out.append(doc(f"{s}-download-or-delete-your-data", sec, f"Download or delete your {n} data", f"Get a copy of your {n} data, or remove it.", f"""
## Download a copy
{steps(["Open Privacy in your [Account Center](" + ID + "/account).", "Select Download your data.", "Choose " + n + " and select Create export."])}

## Delete items
Delete individual items inside {n} at any time.

## Delete everything
Deleting your RanEddie ID deletes your {n} data too. See [Delete your RanEddie ID](/docs/sign-in-delete-your-raneddie-id).
"""))

    out.append(doc(f"{s}-security", sec, f"Keep your {n} account secure", f"Simple steps to protect your {n} account.", f"""
## Protect your RanEddie ID
Your {n} account is your RanEddie ID, so securing it protects {n} too.
{bullets(["Use a unique password of at least 15 characters.", "Turn on [two-step verification](/docs/sign-in-two-step-verification-explained).", "Review [recent sign-ins](/docs/sign-in-review-recent-sign-ins) regularly.", "Keep " + n + " updated."])}

## Watch out for scams
RanEddie will never ask for your password or a verification code. Learn to [recognise phishing](/docs/security-recognise-phishing).
"""))

    out.append(doc(f"{s}-ai-features", sec, f"AI features in {n}", f"How {n} uses AI and how to control it.", f"""
## How {n} uses AI
{p['ai']}

## Stay in control
- Review AI suggestions before you use them.
- Turn AI features on or off in {n}'s settings.
- Delete your AI activity from your Account Center.

## Learn more
- [How RanEddie uses AI](/docs/ai-how-raneddie-uses-ai)
- [Turn AI features on or off](/docs/ai-turn-ai-features-on-or-off)
"""))

    out.append(doc(f"{s}-accessibility", sec, f"Accessibility in {n}", f"Features that make {n} easier to use.", f"""
## Built in
{bullets(["Support for screen readers on supported platforms", "Keyboard navigation where a keyboard is available", "Respect for your device's text size, dark mode and reduced motion settings", "Captions wherever " + n + " plays video"])}

## Feedback
Something hard to use? [Report an accessibility problem](/docs/accessibility-report-an-accessibility-problem).
"""))

    out.append(doc(f"{s}-plans-and-billing", sec, f"Plans and billing for {n}", f"Manage what you pay for in {n}.", f"""
## See your plan
Open Payments & plans in your [Account Center]({ID}/account) to see any {n} plan, its renewal date and payment method.

## Change or cancel
- [Change your plan](/docs/billing-change-your-plan)
- [Cancel a subscription](/docs/billing-cancel-a-subscription)

## Receipts
Find every receipt under Payments & plans > History.
"""))

    out.append(doc(f"{s}-for-families", sec, f"{n} for families", f"Use {n} safely with your family.", f"""
## Family settings
Manage children's use of {n} from [Family settings](/docs/families-family-settings-overview): time limits, purchase approvals and age-appropriate content.

## Tips
{bullets(["Create separate accounts or profiles for each person", "Approve purchases before they happen", "Talk to children about what they share online"])}
"""))

    out.append(doc(f"{s}-tips", sec, f"Tips for getting the most out of {n}", f"Small things that make a big difference in {n}.", f"""
{bullets(f"**{f['n']}:** {f['t']}" for f in feats)}

## Keep exploring
[See everything {n} can do]({page}).
"""))

    out.append(doc(f"{s}-faq", sec, f"{n} FAQ", f"Answers to common questions about {n}.", "\n\n".join(
        [f"## {q}\n{a}" for q, a in p["faq"]] + [
            f"## Do I need a RanEddie ID for {n}?\nA RanEddie ID lets you sign in, sync and keep your purchases. [Create one](/docs/raneddie-id-create-account).",
            f"## How do I get help with {n}?\nStart with [Troubleshooting {n}](/docs/{trouble}), or [get help](/docs/{s}-get-help).",
        ])))

    out.append(doc(f"{s}-glossary", sec, f"{n} glossary", f"Terms you'll see in {n}.", "\n".join(
        [f"- **{t}** — {d}" for t, d in p["glossary"]] + ["- **RanEddie ID** — the account you use across every RanEddie product."])))

    out.append(doc(trouble, sec, f"Troubleshooting {n}", f"Fix common problems with {n}.", f"""
## Try these first
{steps(["Check your internet connection.", "Update " + n + " and your device to the latest version.", "Sign out and sign back in with your RanEddie ID.", "Restart your device."])}

## Common problems
{bullets(f"[{f['sym']}](/docs/{s}-{slugify('fix ' + f['sym'])})" for f in feats)}

## Still need help?
[Get help with {n}](/docs/{s}-get-help).
"""))

    out.append(doc(f"{s}-get-help", sec, f"Get help with {n}", f"Ways to get support for {n}.", f"""
## Self-help
- [Troubleshooting {n}](/docs/{trouble})
- [{n} FAQ](/docs/{s}-faq)

## Contact us
Email [contact@raneddie.com](mailto:contact@raneddie.com) with:
{bullets(["Your RanEddie ID username", "Which device and version of " + n + " you use", "What you were doing and what happened", "Screenshots of any error"])}

Support will never ask for your password or verification codes.
"""))

    for f in feats:
        fs = slugify(f["n"])
        fix = slugify("fix " + f["sym"])
        out.append(doc(f"{s}-{fs}", sec, f["n"], f"In {n}: {f['d']}.", f"""
With {n} you can {f['d']}.

## How to
{steps(f['s'])}

## Tip
{f['t']}

## Having trouble?
See [{f['sym']}](/docs/{s}-{fix}).
"""))
        out.append(doc(f"{s}-{fix}", sec, f["sym"], f"{n}: what to do when this happens.", f"""
## Why it happens
{bullets(f['c'])}

## How to fix it
{steps(f['f'])}

## Related
- [{f['n']}](/docs/{s}-{fs})
- [Troubleshooting {n}](/docs/{trouble})
"""))
    return out


# ----------------------------------------------------------------------------------- topic docs
def topic_docs():
    out = []
    for section, articles in TOPICS.items():
        prefix = SECTION_PREFIX[section]
        name = SECTION_NAME.get(section, section)
        for title, desc, blocks in articles:
            parts = []
            for heading, content in blocks:
                if isinstance(content, tuple) and content[0] == "steps":
                    body = steps(content[1])
                elif isinstance(content, list):
                    body = bullets(content)
                else:
                    body = content
                parts.append(f"## {heading}\n{body}")
            slug = slugify(f"{prefix}-{title}")
            # avoid "ai-ai-..." style duplicates
            slug = re.sub(rf"^{prefix}-{prefix}-", f"{prefix}-", slug)
            out.append(doc(slug, name, title, desc, "\n\n".join(parts)))
    return out


# ----------------------------------------------------------------------------------- images
def svg_motif(motif, c1, c2):
    w = "#ffffff"
    if motif == "media":
        return f"""
<g transform="translate(600 300)">
  <circle cx="-210" cy="-10" r="120" fill="none" stroke="{c1}" stroke-width="8" opacity=".55"/>
  {''.join(f'<line x1="-210" y1="-10" x2="{-210+120*math.cos(a):.0f}" y2="{-10+120*math.sin(a):.0f}" stroke="{c1}" stroke-width="4" opacity=".45"/>' for a in [i*math.pi/4 for i in range(8)])}
  {''.join(f'<circle cx="{-210+120*math.cos(a):.0f}" cy="{-10+120*math.sin(a):.0f}" r="14" fill="{c2}"/>' for a in [i*math.pi/4 for i in range(8)])}
  <rect x="-40" y="-60" width="230" height="150" rx="14" fill="#0b1226" stroke="{w}" stroke-opacity=".3" stroke-width="3"/>
  <path d="M-40 -60 L190 -60 L180 -110 L-50 -110 Z" fill="{c1}"/>
  {''.join(f'<path d="M{-30+i*46} -110 L{-6+i*46} -60" stroke="#0b1226" stroke-width="16"/>' for i in range(5))}
  <circle cx="300" cy="-30" r="62" fill="{c2}"/><circle cx="252" cy="-82" r="26" fill="{c2}"/><circle cx="348" cy="-82" r="26" fill="{c2}"/>
  <circle cx="280" cy="-38" r="7" fill="#0b1226"/><circle cx="320" cy="-38" r="7" fill="#0b1226"/><ellipse cx="300" cy="-12" rx="16" ry="11" fill="#0b1226"/>
</g>"""
    if motif == "devices":
        return f"""
<g transform="translate(600 300)">
  <rect x="-330" y="-150" width="300" height="220" rx="22" fill="#11182a" stroke="{c1}" stroke-width="5"/>
  <rect x="-312" y="-132" width="264" height="184" rx="10" fill="url(#g)"/>
  <rect x="-20" y="-170" width="130" height="260" rx="26" fill="#11182a" stroke="{c1}" stroke-width="5"/>
  <rect x="-8" y="-152" width="106" height="224" rx="16" fill="url(#g)"/>
  <rect x="150" y="-90" width="110" height="128" rx="34" fill="#11182a" stroke="{c1}" stroke-width="5"/>
  <rect x="166" y="-74" width="78" height="96" rx="22" fill="url(#g)"/>
  <rect x="186" y="-130" width="38" height="40" rx="8" fill="{c1}" opacity=".6"/><rect x="186" y="38" width="38" height="40" rx="8" fill="{c1}" opacity=".6"/>
  <ellipse cx="320" cy="-20" rx="26" ry="34" fill="{w}"/><rect x="310" y="6" width="18" height="60" rx="9" fill="{w}"/>
  <ellipse cx="380" cy="-6" rx="26" ry="34" fill="{w}" opacity=".85"/><rect x="370" y="20" width="18" height="60" rx="9" fill="{w}" opacity=".85"/>
</g>"""
    if motif == "parts":
        teeth = "".join(f'<rect x="-22" y="-150" width="44" height="50" rx="8" fill="{c1}" transform="rotate({i*30})"/>' for i in range(12))
        return f"""
<g transform="translate(470 310)">{teeth}<circle r="115" fill="{c1}"/><circle r="50" fill="#1a0f05"/></g>
<g transform="translate(760 300) rotate(-35)">
  <rect x="-24" y="-40" width="48" height="300" rx="20" fill="{c2}"/>
  <path d="M-80 -60 a80 80 0 1 1 160 0 l-40 0 l0 -60 l-80 0 l0 60 z" fill="{c2}"/>
</g>"""
    if motif == "food":
        return f"""
<g transform="translate(560 320)">
  <path d="M-200 -150 L120 -150 L-40 170 Z" fill="#f7c873" stroke="#e39b3f" stroke-width="14" stroke-linejoin="round"/>
  <path d="M-180 -128 L100 -128 L-40 140 Z" fill="{c1}" opacity=".9"/>
  <circle cx="-90" cy="-80" r="24" fill="#b3261e"/><circle cx="20" cy="-90" r="22" fill="#b3261e"/><circle cx="-40" cy="10" r="22" fill="#b3261e"/>
  <circle cx="-120" cy="-30" r="10" fill="{c2}"/><circle cx="40" cy="-40" r="10" fill="{c2}"/><circle cx="-60" cy="70" r="10" fill="{c2}"/>
</g>
<g transform="translate(860 300)">
  <path d="M0 -120 C 40 -120 50 -60 46 -30 C 110 20 100 140 0 140 C -100 140 -110 20 -46 -30 C -50 -60 -40 -120 0 -120 Z" fill="{c2}"/>
  <rect x="-6" y="-170" width="12" height="54" rx="6" fill="#6b4b2a"/>
  <path d="M8 -150 C 50 -190 90 -160 90 -150 C 60 -140 30 -140 8 -150 Z" fill="#4c9a2a"/>
</g>"""
    if motif == "office":
        def card(x, y, kind, col):
            inner = ""
            if kind == "doc":
                inner = "".join(f'<rect x="{x+24}" y="{y+40+i*26}" width="{150 - (i%3)*30}" height="10" rx="5" fill="#cbd5e1"/>' for i in range(7))
            elif kind == "grid":
                inner = "".join(f'<rect x="{x+20+c*48}" y="{y+40+r*34}" width="42" height="28" rx="4" fill="{col if (r+c)%4==0 else "#e2e8f0"}"/>' for r in range(6) for c in range(4))
            else:
                inner = "".join(f'<rect x="{x+30+i*40}" y="{y+230-h}" width="26" height="{h}" rx="5" fill="{col}"/>' for i, h in enumerate([60, 110, 80, 150, 120]))
            return f'<rect x="{x}" y="{y}" width="220" height="260" rx="18" fill="#fff"/><rect x="{x}" y="{y}" width="220" height="22" rx="11" fill="{col}"/>{inner}'
        return f'<g transform="rotate(-6 600 330)">{card(250,200,"doc",c1)}{card(490,170,"grid",c2)}{card(730,200,"bars",c1)}</g>'
    if motif == "video":
        tracks = ""
        for r, row in enumerate([[(0, 220, c1), (230, 160, c2), (400, 260, c1)], [(60, 300, c2), (370, 290, c1)], [(0, 660, "#94a3b8")]]):
            for x, w_, col in row:
                tracks += f'<rect x="{270+x}" y="{300+r*58}" width="{w_}" height="44" rx="8" fill="{col}" opacity="{.95 if col!="#94a3b8" else .45}"/>'
        return f"""
<rect x="250" y="120" width="700" height="160" rx="16" fill="#140a26" stroke="{c2}" stroke-opacity=".5" stroke-width="3"/>
<path d="M570 160 L650 200 L570 240 Z" fill="{w}"/>
{tracks}
<rect x="560" y="280" width="4" height="200" fill="{w}"/><path d="M552 280 L572 280 L562 294 Z" fill="{w}"/>"""
    if motif == "console":
        return f"""
<g transform="translate(600 310)">
  <rect x="-330" y="-140" width="260" height="300" rx="34" fill="#0f1c14" stroke="{c1}" stroke-width="5"/>
  <rect x="-300" y="-110" width="200" height="12" rx="6" fill="{c1}"/><circle cx="-200" cy="90" r="18" fill="{c2}"/>
  <path d="M20 -40 C 60 -90 300 -90 340 -40 C 380 20 390 130 330 140 C 290 146 270 80 230 70 L130 70 C 90 80 70 146 30 140 C -30 130 -20 20 20 -40 Z" fill="#162a1e" stroke="{c1}" stroke-width="5"/>
  <rect x="78" y="-14" width="20" height="64" rx="5" fill="{w}"/><rect x="56" y="8" width="64" height="20" rx="5" fill="{w}"/>
  <circle cx="270" cy="-6" r="13" fill="{c1}"/><circle cx="300" cy="22" r="13" fill="{c2}"/><circle cx="240" cy="22" r="13" fill="#facc15"/><circle cx="270" cy="50" r="13" fill="#f43f5e"/>
</g>"""
    if motif == "drone":
        rotors = "".join(f'<line x1="0" y1="0" x2="{x}" y2="{y}" stroke="{c1}" stroke-width="16" stroke-linecap="round"/><circle cx="{x}" cy="{y}" r="74" fill="none" stroke="{w}" stroke-opacity=".7" stroke-width="5"/><ellipse cx="{x}" cy="{y}" rx="66" ry="10" fill="{c2}" opacity=".7"/>' for x, y in [(-190, -110), (190, -110), (-190, 110), (190, 110)])
        return f"""
<g transform="translate(600 300)">{rotors}
  <rect x="-80" y="-56" width="160" height="112" rx="40" fill="#1b1030" stroke="{c1}" stroke-width="5"/>
  <circle cx="0" cy="84" r="40" fill="#0b0717" stroke="{c2}" stroke-width="6"/><circle cx="0" cy="84" r="16" fill="{c2}"/>
</g>"""
    if motif == "cloud":
        return f"""
<path d="M380 360 C 300 360 300 250 380 240 C 390 160 500 140 540 200 C 580 120 720 130 730 230 C 820 230 830 360 740 360 Z" fill="{w}" opacity=".95"/>
<g transform="translate(780 230)">{''.join(f'<rect x="0" y="{i*70}" width="220" height="56" rx="12" fill="#0d1a33" stroke="{c1}" stroke-width="4"/><circle cx="30" cy="{28+i*70}" r="8" fill="{c2}"/><rect x="56" y="{24+i*70}" width="120" height="8" rx="4" fill="{c1}" opacity=".6"/>' for i in range(3))}</g>"""
    if motif == "chart":
        pts = [(260, 420), (340, 380), (420, 400), (500, 320), (580, 340), (660, 250), (740, 270), (820, 180), (900, 150)]
        path = " ".join(f"{'M' if i == 0 else 'L'}{x} {y}" for i, (x, y) in enumerate(pts))
        candles = "".join(f'<line x1="{x}" y1="{y-40}" x2="{x}" y2="{y+40}" stroke="{w}" stroke-opacity=".5" stroke-width="3"/><rect x="{x-10}" y="{y-20}" width="20" height="40" rx="3" fill="{c1 if i%3 else "#ef4444"}"/>' for i, (x, y) in enumerate(pts[1:-1]))
        return f'{candles}<path d="{path} L900 480 L260 480 Z" fill="{c1}" opacity=".18"/><path d="{path}" fill="none" stroke="{c2}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="900" cy="150" r="14" fill="{w}"/>'
    if motif == "mail":
        return f"""
<g transform="translate(600 300)">
  <rect x="-260" y="-150" width="520" height="320" rx="30" fill="{w}"/>
  <path d="M-250 -136 L0 50 L250 -136" fill="none" stroke="{c1}" stroke-width="22" stroke-linejoin="round"/>
  <circle cx="230" cy="-150" r="56" fill="{c2}"/><text x="230" y="-132" font-family="Arial" font-weight="900" font-size="54" fill="#1a0609" text-anchor="middle">r</text>
</g>"""
    if motif == "database":
        stack = "".join(f'<path d="M-170 {y} L-170 {y+80} A170 50 0 0 0 170 {y+80} L170 {y} Z" fill="{c1 if i%2==0 else c2}" opacity=".9"/><ellipse cx="0" cy="{y}" rx="170" ry="50" fill="{c2 if i%2==0 else c1}"/>' for i, y in enumerate([60, -40, -140][::-1]))
        return f'<g transform="translate(600 300)">{stack}<ellipse cx="0" cy="-140" rx="170" ry="50" fill="#e6fffb" opacity=".9"/></g>'
    if motif == "shield":
        return f"""
<g transform="translate(600 300)">
  <path d="M0 -190 L190 -120 C 190 40 120 150 0 200 C -120 150 -190 40 -190 -120 Z" fill="{c2}"/>
  <path d="M0 -190 L0 200 C -120 150 -190 40 -190 -120 Z" fill="{c1}"/>
  <path d="M-80 0 L-20 60 L100 -70" fill="none" stroke="{w}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
</g>"""
    return ""


def product_svg(p):
    c1, c2, bg = p["palette"]
    motif = svg_motif(p["motif"], c1, c2)
    name = p["name"].upper()
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-label="{p['name']}">
<defs>
  <radialGradient id="bg" cx="65%" cy="35%" r="80%"><stop offset="0" stop-color="{c1}" stop-opacity=".55"/><stop offset=".55" stop-color="{bg}"/><stop offset="1" stop-color="{bg}"/></radialGradient>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient>
</defs>
<rect width="1200" height="675" fill="{bg}"/><rect width="1200" height="675" fill="url(#bg)"/>
<g opacity=".12" stroke="#fff" fill="none"><circle cx="600" cy="330" r="300"/><circle cx="600" cy="330" r="220"/></g>
{motif}
<text x="600" y="610" font-family="Arial,Helvetica,sans-serif" font-size="52" font-weight="900" letter-spacing="6" fill="#fff" text-anchor="middle">{name}</text>
</svg>"""


# ----------------------------------------------------------------------------------- build
def main():
    base_docs = json.load(open(os.path.join(ROOT, "scripts", "content", "base-docs.json")))
    docs = list(base_docs)
    for p in PRODUCTS:
        docs += product_docs(p)
    docs += topic_docs()

    # sanity: unique slugs, valid internal links
    seen = {}
    for d in docs:
        if d["slug"] in seen:
            raise SystemExit(f"duplicate doc slug: {d['slug']}")
        seen[d["slug"]] = d
    product_slugs = {p["slug"] for p in PRODUCTS}
    broken = []
    for d in docs:
        for href in re.findall(r"\]\((/[^)\s]*)\)", d["body"]):
            path = href.split("#")[0]
            if path.startswith("/docs/"):
                if path[6:] not in seen:
                    broken.append((d["slug"], href))
            elif path.strip("/") not in product_slugs and path not in ("/", "/docs"):
                broken.append((d["slug"], href))
    if broken:
        for b in broken[:30]:
            print("broken link:", b)
        raise SystemExit(f"{len(broken)} broken links")

    products = []
    for p in PRODUCTS:
        img = p.get("image") or (f"/images/products/{p['slug']}.svg" if p.get("motif") not in (None, "browser", "snake") else "")
        products.append({
            "slug": p["slug"], "name": p["name"], "category": p["category"], "tagline": p["tagline"],
            "summary": p["summary"], "body": p["body"].strip(), "visual": p.get("visual", "image"), "image": img,
            "primaryCta": p.get("primaryCta", {"label": "", "href": ""}),
            "secondaryCta": {"label": "Read the docs", "href": f"/docs/{p['slug']}-overview"},
            "features": p["features"], "platforms": p["platforms"],
            "status": p.get("status", "coming-soon"), "showOnHome": True,
        })
        if p.get("motif") not in (None, "browser", "snake"):
            with open(os.path.join(ROOT, "public", "images", "products", f"{p['slug']}.svg"), "w") as f:
                f.write(product_svg(p))

    os.makedirs(os.path.join(ROOT, "src", "data"), exist_ok=True)
    json.dump(products, open(os.path.join(ROOT, "src", "data", "products.json"), "w"), ensure_ascii=False, indent=1)
    json.dump(docs, open(os.path.join(ROOT, "src", "data", "docs-library.json"), "w"), ensure_ascii=False, separators=(",", ":"))

    by_section = {}
    for d in docs:
        by_section[d["section"]] = by_section.get(d["section"], 0) + 1
    print(f"products: {len(products)}  docs: {len(docs)} (new: {len(docs) - len(base_docs)})")
    for s, c in by_section.items():
        print(f"  {c:4d}  {s}")
    print(f"docs-library.json: {os.path.getsize(os.path.join(ROOT, 'src', 'data', 'docs-library.json')) // 1024} KB")


if __name__ == "__main__":
    main()
