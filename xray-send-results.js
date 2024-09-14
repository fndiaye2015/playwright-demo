const axios = require("axios"); // Axios est utilisé pour faire des requêtes HTTP.
const fs = require("fs"); // Le module fs permet d'accéder au système de fichiers pour lire des fichiers.
require("dotenv").config(); 

// Fonction pour obtenir le token depuis Xray
async function getXrayToken(clientId, clientSecret) {
  try {
    // Envoi d'une requête POST à l'API Xray pour récupérer un token
    const response = await axios.post(
      "https://xray.cloud.getxray.app/api/v2/authenticate", // URL de l'API Xray pour s'authentifier
      {
        client_id: clientId, // Le client ID, fourni par l'environnement Xray
        client_secret: clientSecret, // Le client secret, fourni par l'environnement Xray
      }
    );
    const token = response.data; // Récupération du token depuis la réponse
    console.log(`XRAY_TOKEN obtenu avec succès.`); // Message pour indiquer que le token a été récupéré
    return token; // Retourne le token pour une utilisation ultérieure
  } catch (error) {
    // Gestion des erreurs en cas d'échec de la requête
    console.error("Erreur lors de la récupération du token Xray:", error);
    process.exit(1); // Termine le script en cas d'échec
  }
}

// Fonction pour envoyer les résultats à Xray
async function sendResults(token) {
  try {
    // Lecture du fichier contenant les résultats (xray-report.json)
    const results = fs.readFileSync("xray-report.json", "utf8"); // Lit le fichier JSON avec les résultats de tests
    // Envoi d'une requête POST à l'API Xray pour importer les résultats
    const response = await axios.post(
      "https://eu.xray.cloud.getxray.app/api/v2/import/execution", // URL d'importation des résultats
      results, // Les données du fichier JSON sont envoyées dans la requête
      {
        headers: {
          "Content-Type": "application/json", // Le type de contenu est du JSON
          Authorization: `Bearer ${token}`, // Le token est utilisé pour s'authentifier
        },
      }
    );
    console.log("Résultats envoyés à Xray:", response.data); // Message de succès avec les détails de la réponse
  } catch (error) {
    // Gestion des erreurs lors de l'envoi des résultats
    console.error("Erreur lors de l'envoi des résultats:", error);
    process.exit(1);
  }
}

// Paramètres client_id et client_secret (à remplacer par vos valeurs ou à passer en argument)
const clientId = process.env.XRAY_CLIENT_ID || "votre-client-id";
const clientSecret = process.env.XRAY_CLIENT_SECRET || "votre-client-secret";

// Exécution du script : Récupération du token puis envoi des résultats
(async () => {
  const token = await getXrayToken(clientId, clientSecret); // Appelle la fonction pour obtenir le token
  await sendResults(token); // Utilise le token pour envoyer les résultats à Xray
   console.log(`::set-output name=XRAY_API_TOKEN::${token}`);
})();
