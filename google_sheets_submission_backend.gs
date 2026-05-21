var ADMIN_TOKEN = "CHANGE_THIS_ADMIN_TOKEN";

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Responses");
  }

  var payload = {};
  try {
    payload = JSON.parse(e.postData.contents || "{}");
  } catch (err) {
    payload = e.parameter || {};
  }

  var headers = [
    "Submission ID",
    "Submitted At",
    "Name",
    "Email",
    "Role",
    "Industry",
    "Experience",
    "Age Band",
    "Country",
    "Biggest Fear",
    "Total Score",
    "Risk Category",
    "Dominant Pattern",
    "Raw JSON"
  ];

  for (var i = 1; i <= 25; i++) {
    headers.push("Q" + i);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  var profile = payload.profile || {};
  var answers = payload.answers || {};
  var risk = payload.riskCat || payload.rc || {};
  var pattern = payload.pattern || payload.pat || {};

  var row = [
    payload.submissionId || "",
    payload.submittedAt || new Date().toISOString(),
    profile.name || "",
    profile.email || "",
    profile.role || "",
    profile.industry || "",
    profile.exp || "",
    profile.age || "",
    profile.country || "",
    profile.fear || "",
    payload.total || "",
    risk.label || risk.lbl || "",
    pattern.name || pattern.n || "",
    JSON.stringify(payload)
  ];

  for (var q = 1; q <= 25; q++) {
    row.push(answers["q" + q] || "");
  }

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, submissionId: payload.submissionId || "" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var params = e.parameter || {};
  var callback = params.callback || "callback";

  if (params.action !== "list") {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: "Unknown action" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (!params.token || params.token !== ADMIN_TOKEN) {
    return ContentService
      .createTextOutput(callback + "(" + JSON.stringify({ ok: false, error: "Unauthorized" }) + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
  if (!sheet || sheet.getLastRow() < 2) {
    return ContentService
      .createTextOutput(callback + "(" + JSON.stringify({ ok: true, rows: [] }) + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  var values = sheet.getDataRange().getValues();
  var headers = values[0];
  var rawIndex = headers.indexOf("Raw JSON");
  var rows = [];

  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    rows.push({
      rowNumber: i + 1,
      submissionId: row[headers.indexOf("Submission ID")] || "",
      submittedAt: row[headers.indexOf("Submitted At")] || "",
      name: row[headers.indexOf("Name")] || "",
      email: row[headers.indexOf("Email")] || "",
      totalScore: row[headers.indexOf("Total Score")] || "",
      riskCategory: row[headers.indexOf("Risk Category")] || "",
      dominantPattern: row[headers.indexOf("Dominant Pattern")] || "",
      rawJson: rawIndex >= 0 ? row[rawIndex] : ""
    });
  }

  rows = rows.reverse().slice(0, 50);

  return ContentService
    .createTextOutput(callback + "(" + JSON.stringify({ ok: true, rows: rows }) + ")")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
