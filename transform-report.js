const fs = require("fs");
const path = require("path");

// Fonction pour encoder les captures d'écran en base64
function encodeScreenshotToBase64(filePath) {
  if (fs.existsSync(filePath)) {
    return formatBase64String(fs.readFileSync(filePath, "base64"));
  }
  return null;
}

function formatBase64String(base64String) {
  return base64String.match(/.{1,76}/g).join("\n");
}

// Fonction pour mapper les résultats de Playwright au format Xray
function transformPlaywrightReportToXrayFormat(playwrightReport) {
  const xrayReport = {
    tests: [],
    info: {
      summary: "Automated Playwright Test Execution",
      description: "Results of Playwright automated tests",
      startDate: new Date().toISOString(),
      finishDate: new Date().toISOString(),
    },
  };

  playwrightReport.suites.forEach((suite) => {
    suite.specs.forEach((spec) => {
      spec.tests.forEach((test) => {
        const status = test.results.some((result) => result.status === "failed")
          ? "FAILED"
          : "PASSED";
        const screenshotAttachments = test.results
          .filter((result) => result.status === "failed")
          .flatMap((result) => result.attachments)
          .filter(
            (attachment) =>
              attachment.name === "screenshot" &&
              attachment.contentType === "image/png"
          )
          .map((attachment) => ({
            data: encodeScreenshotToBase64(
              path.resolve(attachment.path)
            ).replace(/\s+/g, ""),
            filename: path.basename(attachment.path),
            contentType: attachment.contentType,
          }));

        const xrayTest = {
          testKey: spec.tags[0], // Associez chaque test à une clé de test Xray, modifiez ceci selon vos besoins
          status: status,
          comment: spec.title,
          steps: test.results.map((result, index) => ({
            //index: index + 1,
            status: result.status === "failed" ? "FAILED" : "PASSED",
            comment: result.error
              ? result.error.message
                  .replace(/\u001b\[.*?m/g, "")
                  .replace(/\n/g, "")
              : "Step passed successfully",
            actualResult:
              result.status === "failed"
                ? result.error.message
                    .replace(/\u001b\[.*?m/g, "")
                    .replace(/\n/g, "")
                : "Expected result met",
            evidences: screenshotAttachments,
          })),
        };
        xrayReport.tests.push(xrayTest);
      });
    });
  });

  return xrayReport;
}

// Lecture du fichier Playwright JSON
const playwrightReport = JSON.parse(
  fs.readFileSync("playwright-report.json", "utf8")
);

// Transformation du rapport Playwright au format Xray
const xrayReport = transformPlaywrightReportToXrayFormat(playwrightReport);

// Sauvegarde du rapport transformé dans un nouveau fichier
fs.writeFileSync("xray-report.json", JSON.stringify(xrayReport, null, 2));

console.log("Report transformed and saved to xray-report.json");

