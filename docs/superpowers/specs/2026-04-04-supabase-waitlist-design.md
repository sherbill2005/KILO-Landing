# Supabase Waitlist Design

## Summary

This change connects the landing page waitlist form to Supabase using a direct client-side insert. The existing Supabase project already has a `waitlist` table protected by Row Level Security, and the user prefers using the publishable anonymous key rather than a server-side API route.

## Goals

- Save submitted waitlist emails to Supabase.
- Keep the current landing page UX simple and fast.
- Rely on the existing RLS policy to allow safe inserts from the browser.
- Show useful success and error feedback in the form.

## Non-Goals

- No server-side waitlist API route.
- No admin dashboard or read path for the waitlist.
- No auth or Google sign-in flow.
- No payment or analytics integration.

## Current State

- The landing page lives primarily in `app/page.tsx`.
- The hero form currently only toggles local success state.
- There is no Supabase client configured in the project.
- The repository already uses Next.js, React, and TypeScript.

## Recommended Approach

Use Supabase directly from the client with the public publishable key and the existing RLS policy. The hero form will submit the entered email to the `waitlist` table. Only the `email` column will be sent; `id` and `created_at` will be handled by database defaults.

This is the lightest-weight option for a landing page because it avoids introducing a server route or extra backend logic. It matches the user preference and keeps the integration focused on a single action.

## Data Model

Target table: `waitlist`

Relevant columns:

- `id`
- `email` (`text`)
- `created_at`

Insert payload:

```ts
{ email: string }
```

## Environment Variables

The integration will read:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

These values should be available in `.env.local` for local development and in the deployment environment for production.

## UX Behavior

The hero waitlist form will support these states:

- Idle: default input and submit button.
- Submitting: disable input/button and show a pending label.
- Success: show the existing confirmation card.
- Error: show a friendly inline error and preserve the email input.

The Google button will remain unchanged because it is currently presentation-only and outside the scope of the waitlist integration.

## Error Handling

The form should handle:

- Empty or invalid email input on the client.
- Duplicate email insert failures returned by Supabase.
- Generic network or database errors.

User-facing messages should stay short and friendly. The form should not clear the input on failure.

## Security Model

The app will use the publishable Supabase key in the browser. This is acceptable for this use case because inserts are constrained by the existing Row Level Security policy on the `waitlist` table.

This approach assumes:

- RLS is enabled on `waitlist`.
- The policy permits only the intended insert behavior.
- Sensitive administrative operations are not exposed to the client.

## File-Level Plan

Expected additions and changes:

- Create a small Supabase client helper for browser usage.
- Update `.env.example` to document the required Supabase variables.
- Update the hero form logic in `app/page.tsx` to perform the insert and show submission states.

## Testing Strategy

Implementation should follow a test-first flow where practical:

- Add a small testable helper for waitlist submission behavior or response mapping.
- Verify failure before implementation.
- Run lint and build after wiring the feature.

Because this repository does not currently include an application test harness, the initial implementation may need to keep the test surface small and focused unless a minimal test runner is added as part of the work.

## Open Assumptions

- `waitlist.id` and `waitlist.created_at` are populated automatically by Supabase defaults.
- The existing RLS policy already allows inserts using the publishable client key.
- No additional fields beyond `email` are required for this first version.
