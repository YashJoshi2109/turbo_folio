# turbo_folio

## Email setup for contact form

The contact form sends emails using Resend.

1. Create an account and get an API key: `https://resend.com`
2. Add the API key to your environment:

   - For local development, create a `.env.local` file in the project root with:

     ```
     RESEND_API_KEY=your_resend_api_key_here
     ```

3. Restart the dev server so Next.js picks up the env var.

Notes:

- Emails are sent from `Portfolio Contact <onboarding@resend.dev>` to `yashjosh7486@gmail.com`.
- The route is `src/app/api/contact/route.ts` and the form posts to `/api/contact`.
