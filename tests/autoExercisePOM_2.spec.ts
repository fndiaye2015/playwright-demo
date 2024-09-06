import {test, expect} from '../utils/myFixtures'

require("dotenv").config(); 


test.beforeEach(async ({page}) => {
    await page.goto("http://automationexercise.com");
})

test("@KAN-6 TC01 - Register User", async ({homePage, loginPage, registerPage, userData}) => {
    await homePage.acceptConsent();
    await homePage.clickSignUpLink();
    await loginPage.VerifySignUpHeading();
    await loginPage.newUserSignup(userData.username, userData.email);
    await registerPage.verifyPageHeading();
    await registerPage.registerUser(userData.username, userData.email, userData.password, userData.firstName, userData.lastName);
    await registerPage.VerifyUserIsCreated();
    await registerPage.clickContinueBtn();
    await homePage.verifyLoggedInUsername(userData.username);
    await homePage.deleteAccount();
    await homePage.verifyAccountIsDeleted();
    await registerPage.clickContinueBtn();
})


test("@KAN-1 TC02 - Login User with correct email and password", async ({homePage, loginPage, userData, goToTheLoginPage,}) => {
  goToTheLoginPage;
  await loginPage.userLogin(userData.correctEmail, userData.correctPassword);
  await homePage.verifyLoggedInUsername(userData.loginUsername);
  // await homePage.deleteAccount();
  // await homePage.verifyAccountIsDeleted();
});

test("@KAN-5 TC03 - Login User with incorrect email and password", async ({homePage, loginPage, userData}) => {
    await homePage.acceptConsent();
    await homePage.clickSignUpLink();
    await loginPage.userLogin(userData.invalidEmail, userData.invalidPassword);
    await loginPage.verifyLoginErrorMsg()
});


test("@KAN-7 TC04 - Logout User", async ({ homePage, loginPage, userData }) => {
    await homePage.acceptConsent();
    await homePage.clickSignUpLink();
    await loginPage.userLogin(userData.correctEmail, userData.correctPassword);
    await homePage.loggOut();
});