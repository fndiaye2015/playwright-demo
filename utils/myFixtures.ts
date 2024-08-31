import { test as base } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { RegisterPage } from "../pages/registerPage";
import { faker } from "@faker-js/faker";


type myFixture = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  userData;
  goToTheLoginPage;
};

export const test = base.extend<myFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  goToTheLoginPage: async({homePage, loginPage}, use) => {
    await homePage.acceptConsent();
    await homePage.clickSignUpLink();
    await loginPage.VerifySignUpHeading();
    await use(homePage,loginPage)
  },

  userData: async ({}, use) => {
    const user = {
        username: faker.person.fullName(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: 'passer@123',
        correctEmail : process.env.VALIDEMAIL,
        correctPassword : process.env.VALIDPASSWORD,
        invalidEmail : process.env.INVALIDEMAIL,
        invalidPassword : process.env.INVALIDPASSWORD,
    };
    await use(user);
  },
});


export {expect} from '@playwright/test'