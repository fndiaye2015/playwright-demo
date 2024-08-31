import  { test, expect } from "@playwright/test";


// Définir une fixture personnalisée
const myTest = test.extend({
  // Ajouter une fixture 'context' qui est partagée par tous les tests
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
  // Ajouter une fixture 'page' qui utilise la fixture 'context'
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});

myTest("test example 3", async ({ page }) => {
  // Test utilisant les fixtures personnalisées
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(
    "Fast and reliable end-to-end testing for modern web apps | Playwright"
  );
});

myTest("test example 4", async ({ page }) => {
  // Un autre test utilisant les mêmes fixtures
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveURL("https://playwright.dev/");
});
