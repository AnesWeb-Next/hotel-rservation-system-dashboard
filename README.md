# Hotel Reservation Dashboard

Administrative dashboard for the hotel reservation backend.

## Run locally

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_API_URL` to your backend API base URL, without a trailing slash.
3. Run `npm run dev` (use `npm.cmd run dev` in PowerShell when script execution is restricted).

Open `/login` in the dashboard and sign in with the existing administrator's email and password. The dashboard verifies the account with `GET /auth/check` and only allows users with the `admin` role. Sign-in tokens are kept for the browser session by default; selecting “Remember me” stores the token on the device until logout. Use the Log out button to clear it.

The dashboard requests `GET {NEXT_PUBLIC_API_URL}/admin/dashboard`. It sends the saved `auth_token` as a bearer token when one exists, and also includes cookies. The Express server must mount `adminRouter` at `/admin` and allow the dashboard origin through CORS (`FRONTEND_DOMAIN=http://localhost:3000` in local development).

## Admin pages

- `/bookings` manages reservations.
- `/rooms` lists rooms and supports creating, editing, and deleting them. Create the hotel first; room numbers are kept unchanged while editing so existing availability dates are preserved.
- `/hotels` supports creating, editing, and deleting hotels. The API prevents deleting hotels that still have rooms.
- `/ratings` lists guest ratings with pagination and allows administrators to delete a rating.

## Checks

```text
npm run lint
npm run build
```

## Migration note

The copied Book Store pages have been retained for reference under `src/legacy/pages`. They are deliberately excluded from the active Next.js dashboard build while the Hotel Dashboard routes are rebuilt against the backend API contract.
