import {test, expect, Page} from '@playwright/test'
import { faker } from "@faker-js/faker";

const email = faker.internet.email();
const password = "passer123";
const name = faker.person.fullName();
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

async function verifierHomePage(page: Page) {
  await expect(page).toHaveURL("https://automationexercise.com/");
}

async function acceptConsent(page: Page) {
  const consent = page.getByLabel("Consent", { exact: true });
  const loginButton = page.getByRole("link", { name: " Signup / Login" });
  if (await consent.isVisible()) {
    await consent.click();
    await loginButton.click();
  } else {
    await loginButton.click();
  }
}

async function cliquerSurLoginButton(page: Page) {
  await page.getByRole("link", { name: " Signup / Login" }).click();
}

async function registerUser(page: Page) {
  await expect(page.getByText("New User Signup!")).toBeVisible();
  await page.getByTestId("signup-name").fill(name);
  await page.getByTestId("signup-email").fill(email);
  await page.getByTestId("signup-button").click();
  await expect(page.getByText("Enter Account Information")).toBeVisible();
  await page.locator("#id_gender1").check();
  await expect(page.getByTestId("name")).toHaveValue(name);
  await expect(page.getByTestId("email")).toHaveValue(email);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("days").selectOption("4");
  await page.getByTestId("months").selectOption("September");
  await page.getByTestId("years").selectOption("2000");
  await page.locator("#newsletter").check();
  await page.getByTestId("first_name").fill(firstName);
  await page.getByTestId("last_name").fill(lastName);
  await page.getByTestId("company").fill("ADEO");
  await page.getByTestId("address").fill("28 Rue Gambetta, 59260 Lezennes");
  await page.getByTestId("address2").fill("Appt 2");
  await page.getByTestId("country").selectOption("United States");
  await page.getByTestId("state").fill("Ohio");
  await page.getByTestId("city").fill("Ohio");
  await page.getByTestId("zipcode").fill("59260");
  await page.getByTestId("mobile_number").fill("59260");
  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("Account Created!")).toBeVisible();
  // await page.getByTestId("continue-button").click();
  // await expect(page.getByText(name)).toBeVisible();
}

async function verifyUserIsLogin(page: Page) {
  await page.getByTestId("continue-button").click();
  await expect(page.getByText(name)).toBeVisible();
}

async function deleteAccount(page: Page) {
  await page.getByRole("link", { name: " Delete Account" }).click();
  await expect(page.getByText("Account Deleted!")).toBeVisible();
}

async function loginUser(page: Page) {
  //await expect(page.getByRole("heading", { name: "Login to your account" })).toBeVisible();
  // await expect(page.getByText("Login to your account")).toBeVisible();
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-button").click();
  // await expect(page.getByText(textMessage)).toBeVisible();
}

async function testFunction(page: Page) {
  await expect(page.getByText("Login to your account")).toBeVisible();
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-button").click();
}

module.exports = {
  verifierHomePage,
  acceptConsent,
  cliquerSurLoginButton,
  registerUser,
  verifyUserIsLogin,
  deleteAccount,
  loginUser,
};