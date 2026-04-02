---
title: "Nova's Next Phase: The Personal AI Agent for Recruiting"
slug: nova-vision
excerpt: "Nova is building the recruiting operating layer: one system that connects to your tools, coordinates across specialised capabilities, and gets better every time you use it."
publishedDate: "2026-04-02"
tags:
  - Nova
  - AI
  - Recruiting
estimatedReadingTime: "6 min"
---

People are running personal AI agents across all their tools. Email, Slack, calendar, CRM, files. One agent that remembers context, connects to your services, and actually does things across all of them. That shift is permanent.

We are building that for recruiting.

## Where recruiting is today

Outside recruiting, people already have agents that manage their inbox, coordinate their calendar, and take actions across dozens of tools. Inside recruiting, the tools still do not talk to each other.

Most AI recruiting tools, including parts of what we have built so far, are still isolated flows. One page for sourcing. Another for talent pool search. Another for scoring. Another for outreach. Each one works, but they do not talk to each other. You and your team are the glue.

## Where we are headed

Nova becomes your recruiting agent.

Specialised capabilities underneath: sourcing, market mapping, talent pool rediscovery, scoring, enrichment, outreach, ATS operations, pipeline management. Each one tuned for its specific job. Each one backed by years of engineering work: search quality, candidate scoring, ATS ingestion and indexing, feedback calibration, data structuring.

That is what makes this actually reliable, not just a language model wrapper.

You connect your tools. Nova coordinates across all of them.

Instead of switching between five different pages, you describe what you need:

> Pipeline is drying up. Find me another batch. Cross-check who we have already contacted. Keep it in the UK. Add the strongest ones to the ATS. Draft outreach for the top ten.

Nova handles it. Inside your product, inside Slack, inside Teams, wherever you work.

Or from the other direction:

> We have 200,000 candidates in our ATS. Find the three strongest for this brief. Check if any have been contacted recently. Flag anyone who has moved since we last spoke.

Same system. Different capability underneath. You do not need to know which sub-agent is doing the work.

## Why this is genuinely hard

A lot of people are excited about agents in recruiting. Much fewer are building the systems required to make them reliable.

The difference between a demo and a product is everything underneath:

### Talent data infrastructure

CVs are unstructured. Profiles decay. People change jobs, move countries, learn new skills. Internal databases hold years of stale, duplicated records scattered across ATS, CRM, LinkedIn, email, and notes. Making that data continuously structured, enriched, deduplicated, and searchable is one of the hardest practical problems in the industry. Without it, nothing above works.

### Retrieval and search

Hybrid retrieval combining keyword precision, semantic understanding, structured filters, and reranking. A search for "backend engineers with distributed systems experience" should find candidates who describe their work differently but have the right background. Different retrieval strategies for different situations, combined intelligently.

### Scoring and evaluation

Not a black-box number. A reasoning trail the hiring team can inspect and trust. Calibrated against feedback, improving per-customer over time.

### Agent orchestration

Interpreting the task correctly. Choosing the right strategies. Inspecting results. Reflecting on quality. Trying alternative paths when the first approach is weak. Applying hard constraints (geography, compliance, permissions) consistently. Keeping context across sessions.

### The behaviour layer

Many teams have access to the same models. The difference is in the evals, the prompting, the skills, the decision-making, and the thousands of hours of iteration required to make agents produce consistent, trustworthy results in real recruiting environments. That work is invisible but it is the actual moat.

## Both paradigms, one system

Nova is designed to support both:

- A more traditional search and review experience where precision and control matter.
- An agentic experience where you hand the problem over and let the system iterate, explore, and come back with something strong.

The same infrastructure powers both. Over time, the centre of gravity shifts toward the agent. But good product design respects that adoption is gradual.

## The compounding advantage

Every search, every piece of feedback, every placement teaches the system what "good" looks like.

Not generically. For a specific desk, role type, client, or team. A system that learns and improves per-customer over time does not just get better at finding candidates. It gets better at understanding what each team actually needs.

That compounding intelligence is probably not something a competitor can replicate by switching on a model.

## Why now

The dominant search technology in recruiting is 15+ years old and architecturally stuck on keyword matching and Boolean logic.

LinkedIn Recruiter costs £9-13K per seat per year, and the ROI is increasingly questioned.

AI can now genuinely reason about unstructured career data. Not just extract keywords, but understand trajectories, context, and fit.

Agencies operate on placement-fee margins where finding the right person faster directly equals revenue. In-house TA teams have frozen headcount and need to do more with less.

And outside recruiting, the shift from disconnected tools to coordinated AI systems is already happening. It is not a question of whether this pattern arrives in recruiting. It is a question of who builds it properly.

## What we are building

A recruiting agent backed by a real operating layer. One agent that connects to your tools, coordinates across specialised capabilities, learns from your workflow, and gets better every time you use it.

We are still early. What you use today is a real product, but it is also teaching us what to build next. The feedback, the things that feel clunky, the moments where you wish it just did the next step automatically, go straight into what we ship.

That is the future of Nova. Now back to making it real.

*Andreas Asprou, Co-founder & CTO*
