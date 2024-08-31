import {test, expect}  from '@playwright/test'
import { faker } from "@faker-js/faker";
import {HomePage} from '../pages/homePage'
import {LoginPage} from '../pages/loginPage'
import {RegisterPage} from '../pages/registerPage'

let homePage;
let loginPage;
let registerPage;

// const loginUsername = 'John DOE';
const validEmail = "doe@yopmail.com";
const validPassword = "Pa$$w0rd!";
const invalidEmail = "incorrect@yopmail.com";
const invalidPassword = "dope";
const userName = faker.person.fullName();
const email = faker.internet.email();
const password = "passer123";
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();


test.beforeEach(async ({page}) => {
    await page.goto("http://automationexercise.com");
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
})


test("TC01 - Register User", async () => {
    await homePage.acceptConsent();
    await homePage.clickSignUpLink();
    await loginPage.VerifySignUpHeading();
    await loginPage.newUserSignup(userName, email);
    await registerPage.verifyPageHeading();
    await registerPage.registerUser(userName, email, password, firstName, lastName);
    await registerPage.VerifyUserIsCreated();
    await registerPage.clickContinueBtn();
    await homePage.verifyLoggedInUsername();
    await homePage.deleteAccount();
    await homePage.verifyAccountIsDeleted();
    await registerPage.clickContinueBtn();
})


test("TC02 - Login User with correct email and password", async () => {
    await homePage.acceptConsent();
    await homePage.clickSignUpLink();
    //await loginPage.VerifySignUpHeading();
    await loginPage.userLogin(validEmail, validPassword);
    //await homePage.verifyLoggedInUsername();
    // await homePage.deleteAccount();
    // await homePage.verifyAccountIsDeleted();
});

test("TC03 - Login User with incorrect email and password", async ({page}) => {
    await homePage.acceptConsent();
    await homePage.clickSignUpLink();
    await loginPage.userLogin(invalidEmail, invalidPassword);
    await loginPage.verifyLoginErrorMsg()
});


test("TC04 - Logout User", async ({ page }) => {
    await homePage.acceptConsent();
    await homePage.clickSignUpLink();
    await loginPage.userLogin(validEmail, validPassword);
    await homePage.loggOut();
});