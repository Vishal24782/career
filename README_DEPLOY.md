# Career Stability Assessment - GitHub Bundle

Upload these files to your GitHub Pages repository.

## Public User Page

- `index.html`
- Public URL: `https://vishal24782.github.io/Career/`
- Users complete the assessment here.
- Users only see the thank-you page after submission.
- Their responses are sent to your Google Sheet.

## Admin Console

- `admin.html`
- Admin URL: `https://vishal24782.github.io/Career/admin.html`
- Use it to load responses from the Google Sheet and generate snapshots.

Important: GitHub Pages does not provide true admin security. Anyone with the exact `admin.html` URL can open it. The admin response loader requires your token, but keep the token private.

## Apps Script Backend

- `google_sheets_submission_backend.gs`
- Paste this into Apps Script.
- Change this line before deploying:

```js
var ADMIN_TOKEN = "CHANGE_THIS_ADMIN_TOKEN";
```

Use a private token such as a long phrase or password.

Then deploy as Web App:

- Execute as: Me
- Who has access: Anyone

## Admin Snapshot Workflow

1. User submits the public form.
2. Open `admin.html`.
3. Go to `Snapshot Reveal`.
4. Enter your admin token.
5. Click `Load Latest Responses`.
6. Select the respondent.
7. Click `Use Selected Response`.
8. Copy, print, or save the generated snapshot.
