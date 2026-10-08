# Registration storage

The form currently validates entries and shows a frontend thank-you confirmation. It does not send or store registration details while backend work is deferred.

The prepared `/api/registrations` endpoint is not currently called by the form. When connected later, it returns success only after Supabase confirms a stored record. Missing configuration returns 503, and storage failures return 502. Retrying the same submission ID does not create another record.

## Setup

1. Create or select a Supabase project.
2. Run `supabase/registrations.sql` in its SQL editor.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` for local development and in the Vercel project environment for production.
4. Restart the development server or redeploy after setting the variables.
5. Reconnect the form submission handler to `/api/registrations`, using a stable submission ID for retries and showing confirmation only after a matching storage receipt.
6. Submit a test registration, verify the matching ID in `supporter_registrations`, and remove the test row.

Keep the service role key server-only. Never use a `NEXT_PUBLIC_` prefix. Row level security and revoked public grants prevent browsers from reading registration data directly.

The form retains client-side validation, optional address and email fields, a support checkbox, and a honeypot. The prepared endpoint adds server-side validation and an 8 KB body limit. Before activating storage, update the privacy note and consent wording to describe the collection and contact purpose, confirm the campaign's privacy contact and retention policy, and configure production rate limiting on the hosting platform.
