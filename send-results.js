const axios = require("axios");
const fs = require("fs");

// Récupérer le token Xray depuis les variables d'environnement
const xrayApiToken = process.env.XRAY_API_TOKEN;

if (!xrayApiToken) {
  console.error('XRAY_API_TOKEN is not set');
  process.exit(1); // Quitter avec une erreur si le token n'est pas défini
}

// Fonction pour envoyer les résultats à Xray
async function sendResults() {
  const results = fs.readFileSync("xray-report.json", "utf8");
  const response = await axios.post(
    "https://eu.xray.cloud.getxray.app/api/v2/import/execution",
    results,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${xrayApiToken}`, // Utilisation du token
      },
    }
  );

  console.log("Results sent to Xray:", response.data);
}

sendResults().catch(console.error);
