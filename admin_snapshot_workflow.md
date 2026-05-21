# Private Admin Snapshot Workflow

Do not upload `career_stability_admin_console.html` to GitHub Pages. Keep it private on your machine.

## Public Flow

1. Users open the public link:
   `https://vishal24782.github.io/Career/`
2. They complete the assessment.
3. The public page sends their response to your Google Sheet.
4. Users only see the thank-you screen.

## Admin Flow

1. Open your Google Sheet.
2. Go to the `Responses` tab.
3. Open:
   `C:\Users\visha\Documents\HR Ops Tool\career_stability_admin_console.html`
4. Click `Snapshot Reveal`.
5. Enter your admin token.
6. Click `Load Latest Responses`.
7. Select a respondent.
8. Click `Use Selected Response`.
9. Generate, copy, print, or save the snapshot.

Manual fallback:

1. Open your Google Sheet.
2. Copy the value from the `Raw JSON` column for the respondent.
3. Paste it into the admin console under `Paste Raw JSON from Google Sheet`.
4. Click `Generate Snapshot`.

## Important

If your Google Sheet does not show `Raw JSON`, update the Apps Script code using:

`C:\Users\visha\Documents\HR Ops Tool\google_sheets_submission_backend.gs`

Then set `ADMIN_TOKEN` inside the Apps Script file and redeploy Apps Script as a new version.

Existing old responses will not have Raw JSON unless they were submitted after this update.
