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
    const token = response.data;
    console.log(`XRAY_TOKEN: ${token}`); // Debug : Affichez le token pour vérifier

    return token; // Retourne le token
  } catch (error) {
    console.error("Failed to get Xray token:", error);
    process.exit(1);
  }
}

getXrayToken().then((token) => {
  console.log(`::set-output name=XRAY_API_TOKEN::${token}`); // Définit l'output pour GitHub Actions
});