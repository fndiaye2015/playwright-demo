const axios = require("axios");

async function getXrayToken() {
  const clientId = process.env.XRAY_CLIENT_ID;
  const clientSecret = process.env.XRAY_CLIENT_SECRET;

  try {
    const response = await axios.post(
      "https://xray.cloud.getxray.app/api/v2/authenticate",
      {
        client_id: clientId,
        client_secret: clientSecret,
      }
    );
    return response.data; // Le token est renvoyé en tant que chaîne
  } catch (error) {
    console.error("Failed to get Xray token:", error);
    process.exit(1);
  }
}

getXrayToken().then((token) => {
  console.log(`::add-mask::${token}`); // Masquer le token dans les logs GitHub Actions
  console.log(`XRAY_API_TOKEN=${token}`); // Imprimer le token pour l'utiliser dans les étapes suivantes
});
