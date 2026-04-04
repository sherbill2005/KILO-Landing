# Supabase Waitlist Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect the landing page waitlist form to Supabase so submitted emails are stored in the `waitlist` table using the publishable client key and existing RLS policy.

**Architecture:** Keep the Supabase integration client-side for this landing page. Add a focused browser client helper and a small waitlist submission module that owns validation, trimming, insert calls, and friendly error mapping, then call that module from the hero form in `app/page.tsx`.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Supabase JS, Vitest

---

## Chunk 1: Testable Waitlist Logic

### Task 1: Add the test harness

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add the failing test command dependencies**

Add `vitest` as a dev dependency and add a `test` script to `package.json`.

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: install succeeds and lockfile updates

### Task 2: Write the failing waitlist submission tests

**Files:**
- Create: `lib/waitlist.test.ts`
- Test: `lib/waitlist.test.ts`

- [ ] **Step 1: Write the failing test**

Cover these behaviors:
- trims a valid email and inserts it into `waitlist`
- returns a duplicate-email message for Supabase error code `23505`
- rejects an invalid email before calling Supabase

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run`
Expected: FAIL because `lib/waitlist.ts` does not exist yet

### Task 3: Implement the minimal waitlist module

**Files:**
- Create: `lib/waitlist.ts`
- Test: `lib/waitlist.test.ts`

- [ ] **Step 1: Write minimal implementation**

Create:
- `submitWaitlistEmail(client, rawEmail)`
- `getWaitlistErrorMessage(error)`

Behavior:
- trim the email
- reject empty or invalid addresses
- insert into `waitlist`
- map `23505` to a friendly duplicate message
- map other failures to a generic message

- [ ] **Step 2: Run tests to verify they pass**

Run: `npm test -- --run`
Expected: PASS

## Chunk 2: Supabase Client and Landing Page Wiring

### Task 4: Add the browser Supabase client helper

**Files:**
- Create: `lib/supabase/client.ts`
- Modify: `.env.example`

- [ ] **Step 1: Add the failing dependency**

Add `@supabase/supabase-js` to dependencies in `package.json`.

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: install succeeds and lockfile updates

- [ ] **Step 3: Implement the helper**

Create a lazy browser client getter that reads:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

Update `.env.example` comments so local setup is clear.

### Task 5: Wire the hero form to the waitlist module

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update the hero component state**

Add:
- `isSubmitting`
- `submitError`

- [ ] **Step 2: Replace the local-only submit behavior**

Use the browser Supabase client plus `submitWaitlistEmail(...)`.

Behavior:
- disable controls while submitting
- show a pending label
- preserve input on failure
- clear the error before retry
- show the existing success panel on success

- [ ] **Step 3: Keep non-scope UI unchanged**

Leave the Google button presentation-only.

## Chunk 3: Verification

### Task 6: Run full verification

**Files:**
- Verify only

- [ ] **Step 1: Run unit tests**

Run: `npm test -- --run`
Expected: PASS

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS
