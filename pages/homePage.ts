import {Page, Locator, expect} from '@playwright/test'

export class HomePage {
  readonly page: Page;
  readonly consentForm: Locator;
  readonly signUpLink: Locator;
  readonly LoggedInUserName: Locator;
  readonly logoutBtn: Locator;
  readonly deleteAccountBtn: Locator;
  readonly deleteTxtMessage: Locator;

  constructor(page:Page) {
    this.page = page;
    this.consentForm = page.getByRole("button", { name: "Consent" });
    this.signUpLink = page.getByRole("link", { name: " Signup / Login" });
    this.LoggedInUserName = page.getByText("hello");
    this.logoutBtn = page.getByRole("link", { name: " Logout" });
    this.deleteAccountBtn = page.getByRole("link", { name: " Delete Account" });
    this.deleteTxtMessage = page.getByText("Account Deleted!");
  }

  async acceptConsent() {
    if (await this.consentForm.isVisible()) {
      await this.consentForm.click();
      await this.signUpLink.click();
    } else {
      await this.signUpLink.click();
    }
  }

  async clickSignUpLink() {
    await this.signUpLink.click();
  }

  async verifyLoggedInUsername(name) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async loggOut() {
    await this.logoutBtn.click();
  }

  async deleteAccount() {
    await this.deleteAccountBtn.click();
  }

  async verifyAccountIsDeleted() {
    await expect(this.deleteTxtMessage).toBeVisible()
  }



}

export default HomePage