const axios = require("axios");
const fs = require("fs");

async function sendResults() {
  const results = fs.readFileSync("xray-report.json", "utf8");
  const response = await axios.post(
    "https://eu.xray.cloud.getxray.app/api/v2/import/execution",
    results,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnQiOiIzZjY0MzVkNi02MWI4LTNiM2MtYWVjNi1iZGJhZDcwMzM1ZmUiLCJhY2NvdW50SWQiOiI2MWRkYWZmNDEyNWIxMjAwNzE0MjI0NmYiLCJpc1hlYSI6ZmFsc2UsImlhdCI6MTcyNTExOTE1NiwiZXhwIjoxNzI1MjA1NTU2LCJhdWQiOiJCNTRFNDYzODlGM0Q0RkE3OTk0NjMwMDA0NkI3RTAwOSIsImlzcyI6ImNvbS54cGFuZGl0LnBsdWdpbnMueHJheSIsInN1YiI6IkI1NEU0NjM4OUYzRDRGQTc5OTQ2MzAwMDQ2QjdFMDA5In0.79acK4gz8LVHHRNLXIUxc_zT-pkUVIxduCuNb0BTeTk",
      },
    }
  );

  console.log("Results sent to Xray:", response.data);
}

sendResults().catch(console.error);
