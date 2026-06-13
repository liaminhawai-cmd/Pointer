# Sync Field — original design notes (extracted from prior conversation)

These are the author's own design notes for the Sync Field interactive, recovered from an
earlier chat. The authoritative build instructions are in BUILD-SPEC.md §5; this file is the
underlying reasoning, kept so the intent behind each parameter is legible.

NOTE: the earliest version of these notes assumed Conway's Game of Life as the substrate.
That was later superseded — the substrate is **coupled phase-oscillators (Kuramoto-style
wave field)**, NOT a cellular automaton. Where these notes say "cells" or "Game of Life,"
read "oscillators / wave field." The *behavioural* design below all still holds.

## The figure

Not a rendered character — a pattern that reads as a person when coherent and as noise when
disturbed. The silhouette (seated/lotus) emerges from coherence. Feedback is purely
aesthetic: coherence vs noise. No numbers, no progress bar, no win screen.

## The three behavioural stages (felt, never announced)

1. Effortful trying
2. Accidental release
3. Grasping at the release

Cycling through these is where the recognition lives. The sharpest beat: about ten seconds of
something genuinely beautiful on screen, then the instinct kicks in to grab the mouse and
*maintain* it — which immediately breaks it. The recognition arrives, then the grasping at the
recognition destroys it. The glimpse, the lunge toward the glimpse, the loss.

## The three spatial stages: head → body → world

- **Head** syncs first. Cognitive chatter settling. Responds to the cursor technique. This is
  someone with intellectual clarity who hasn't embodied it yet.
- **Body** (heart + gut) next. Takes longer, goes deeper. The cursor technique that worked on
  the head produces diminishing returns here — the body has its own rhythm and can't be traced
  or followed into coherence, it needs something else.
- **World** last. The environment coming into phase with the settled internal system. The most
  beautiful stage, and the one that *can't be achieved by effort at all* — you can't control
  the world with a cursor. It only happens when internal coherence is stable enough.

Each stage feels like completion, so the player "wins" two or three times before the real
thing. The world stage arriving unexpectedly, once they've stopped trying to achieve anything,
is the actual teaching moment. Then the cursor disappears entirely — because there's no one
left to hold it.

## The core mechanic

Effortful intervention introduces new perturbations faster than it resolves old ones. The more
you do, the more chaotic the system becomes — not as punishment, but because that's just what
interference does to an emergent system. The sharp move: the system tracks the player's input
frequency and uses it as the hidden variable. More inputs = more chaos injected; fewer inputs
lets the natural synchronisation dynamics emerge.

## The central design problem

How do you stop the player from solving "do nothing" as a puzzle? If any UI element (timer,
progress bar, hint) suggests inaction is the strategy, players meta-game it immediately and
the realisation never lands as a *felt* thing. So: the game never states the win condition. It
looks like a standard optimisation puzzle — tools, patterns, obvious things to try. Frustration
builds naturally. At some point the player just stops, and notices the field resolving on its
own. No fanfare, no congratulations. The tutorial, if any, never ends and is always wrong; the
real instruction is nowhere in the game's text.

## Why oscillators are the right substrate

A field of unsynchronised oscillators finding phase synchrony when left alone is almost a
direct visualisation of settling into open awareness — not stillness exactly, but coherent
pulsing instead of noise. Stable patterns that sustain themselves through continuous change:
same structure, different moment. Like breathing.

## Connection to the author's own experience (context, not instruction)

This isn't a borrowed metaphor. In his own recent sitting practice the author reported
"multiple frequencies coming into phase" — a resonance/coherence phenomenon that he noted
"doesn't have a clean home in any of the three-centre maps; it's more resonance/coherence
language than location language." The Sync Field is, in effect, the visualisation of a
first-hand phenomenology he couldn't find an existing map for. Build it as something true to
that, not as a generic "meditation game."
