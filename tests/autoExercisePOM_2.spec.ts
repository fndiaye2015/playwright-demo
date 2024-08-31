import {test, expect} from '../utils/myFixtures'

require("dotenv").config(); 


test.beforeEach(async ({page}) => {
    await page.goto("http://automationexercise.com");
})

test("TC01 - Register User", async ({homePage, loginPage, registerPage, userData}) => {
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


test("TC02 - Login User with correct email and password", async ({homePage, loginPage, userData, goToTheLoginPage,}) => {
  goToTheLoginPage;
  await loginPage.userLogin(userData.correctEmail, userData.correctPassword);
  await homePage.verifyLoggedInUsername(process.env.USERNAME);
  // await homePage.deleteAccount();
  // await homePage.verifyAccountIsDeleted();
});

test("TC03 - Login User with incorrect email and password", async ({homePage, loginPage, userData}) => {
    await homePage.acceptConsent();
    await homePage.clickSignUpLink();
    await loginPage.userLogin(userData.invalidEmail, userData.invalidPassword);
    await loginPage.verifyLoginErrorMsg()
});


test("TC04 - Logout User", async ({ homePage, loginPage, userData }) => {
    await homePage.acceptConsent();
    await homePage.clickSignUpLink();
    await loginPage.userLogin(userData.correctEmail, userData.correctPassword);
    await homePage.loggOut();
});