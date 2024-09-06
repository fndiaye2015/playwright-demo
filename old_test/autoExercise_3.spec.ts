import {test, expect, Page} from '@playwright/test'
import { faker } from "@faker-js/faker";


const email = faker.internet.email();
const password = "passer123";
const name = faker.person.fullName();
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

const {verifierHomePage,
  acceptConsent,
  registerUser,
  verifyUserIsLogin,
  deleteAccount,
  } = require('../functions/myFunctions')



test.beforeEach(async({page}) => {
	await page.goto("http://automationexercise.com");
})

test("TC01 - Register User", async ({page}) => {
	verifierHomePage(page);
	acceptConsent(page);
	registerUser(page)
	verifyUserIsLogin(page)
	deleteAccount(page)
	await page.getByTestId("continue-button").click();
});


test("TC02 - Login User with correct email and password", async ({ page }) => {
	verifierHomePage(page);
	acceptConsent(page);
	registerUser(page);
	verifyUserIsLogin(page);
	await page.getByRole("link", { name: " Logout" }).click();
	// loginUser(page)
	await expect(page.getByText("Login to your account")).toBeVisible();
	await page.getByTestId("login-email").fill(email);
	await page.getByTestId("login-password").fill(password);
	await page.getByTestId("login-button").click();
	await expect(page.getByText(name)).toBeVisible();
	deleteAccount(page);

});


test("TC03 - Login User with incorrect email and password", async ({page}) => {
	verifierHomePage(page);
	acceptConsent(page);

	await expect(page.getByText("Login to your account")).toBeVisible();
	await page.getByTestId("login-email").fill("Bademail@yahoo.com");
	await page.getByTestId("login-password").fill(password);
	await page.getByTestId("login-button").click();
	await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
});


test("TC04 - Logout User", async ({ page }) => {
	verifierHomePage(page);
	acceptConsent(page);
	registerUser(page);

	verifyUserIsLogin(page);
	await page.getByRole("link", { name: " Logout" }).click();

	await expect(page.getByText("Login to your account")).toBeVisible();
	await page.getByTestId("login-email").fill(email);
	await page.getByTestId("login-password").fill(password);
	await page.getByTestId("login-button").click();
	await expect(page.getByText(name)).toBeVisible();
	await page.getByRole("link", { name: " Logout" }).click();
	await expect(page).toHaveURL("https://automationexercise.com/login");
});


