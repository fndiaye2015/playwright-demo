import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly newUserSignupHeading: Locator;
  readonly signUpNameFied: Locator;
  readonly signUpEmailFied: Locator;
  readonly signUpButton: Locator;
  readonly loginHeading: Locator;
  readonly loginEmailField: Locator;
  readonly loginPasswordField: Locator;
  readonly loginButton: Locator;
  readonly loginErrorTxtMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newUserSignupHeading = page.getByText("New User Signup!");
    this.signUpNameFied = page.getByTestId("signup-name");
    this.signUpEmailFied = page.getByTestId("signup-email");
    this.signUpButton = page.getByTestId("signup-button");
    this.loginHeading = page.getByText("Login to your account");
    this.loginEmailField = page.getByTestId("login-email");
    this.loginPasswordField = page.getByTestId("login-password");
    this.loginButton = page.getByTestId("login-button");
    this.loginErrorTxtMsg = page.getByText("Your email or password is incorrect!");
  }

  async VerifySignUpHeading() {
    await expect(this.newUserSignupHeading).toBeVisible();
  }

  async newUserSignup(userName: string, email: string) {
    await this.signUpNameFied.fill(userName);
    await this.signUpEmailFied.fill(email);
    await this.signUpButton.click();
  }

  async userLogin(email:string, password:string) {
    await this.loginEmailField.fill(email);
    await this.loginPasswordField.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginErrorMsg() {
    await expect(this.loginErrorTxtMsg).toBeVisible();
  }

}

export default LoginPage;
