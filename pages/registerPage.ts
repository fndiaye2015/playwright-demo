import { Page, Locator, expect } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly genderRadioBtn: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly daySelectBtn: Locator;
  readonly monthSelectBtn: Locator;
  readonly yearSelectBtn: Locator;
  readonly newsletterCheckboxBtn: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly companyField: Locator;
  readonly addressField: Locator;
  readonly address2Field: Locator;
  readonly countrySelectBtn: Locator;
  readonly stateField: Locator;
  readonly cityField: Locator;
  readonly zipCodeField: Locator;
  readonly mobileNumberField: Locator;
  readonly createAccountBtn: Locator;
  readonly successTxtMessage: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByText("Enter Account Information");
    this.genderRadioBtn = page.locator("#id_gender1");
    this.nameField = page.getByTestId("name");
    this.emailField = page.getByTestId("email");
    this.passwordField = page.getByTestId("password");
    this.daySelectBtn = page.getByTestId("days");
    this.monthSelectBtn = page.getByTestId("months");
    this.yearSelectBtn = page.getByTestId("years");
    this.newsletterCheckboxBtn = page.locator("#newsletter");
    this.firstNameField = page.getByTestId("first_name");
    this.lastNameField = page.getByTestId("last_name");
    this.companyField = page.getByTestId("company");
    this.addressField = page.getByTestId("address");
    this.address2Field = page.getByTestId("address2");
    this.countrySelectBtn = page.getByTestId("country");
    this.stateField = page.getByTestId("state");
    this.cityField = page.getByTestId("city");
    this.zipCodeField = page.getByTestId("zipcode");
    this.mobileNumberField = page.getByTestId("mobile_number");
    this.createAccountBtn = page.getByRole("button", {
      name: "Create Account",
    });
    this.successTxtMessage = page.getByText("Account Created!");
    this.continueBtn = page.getByTestId("continue-button");
  }

  async verifyPageHeading() {
    await expect(this.pageHeading).toBeVisible();
  }

  async registerUser(
    name: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    await this.genderRadioBtn.check();
    await expect(this.nameField).toHaveValue(name);
    await expect(this.emailField).toHaveValue(email);
    await this.passwordField.fill(password);
    await this.daySelectBtn.selectOption("4");
    await this.monthSelectBtn.selectOption("September");
    await this.yearSelectBtn.selectOption("2000");
    await this.newsletterCheckboxBtn.check();
    await this.firstNameField.fill(firstname);
    await this.lastNameField.fill(lastname);
    await this.companyField.fill("ADEO");
    await this.addressField.fill("28 Rue Gambetta, 59260 Lezennes");
    await this.address2Field.fill("Appt 2");
    await this.countrySelectBtn.selectOption("United States");
    await this.stateField.fill("Ohio");
    await this.cityField.fill("Ohio");
    await this.zipCodeField.fill("59260");
    await this.mobileNumberField.fill("59260");
    await this.createAccountBtn.click();
  }

  async clickContinueBtn() {
    await this.continueBtn.click();
  }
  
  async VerifyUserIsCreated() {
    await expect(this.successTxtMessage).toBeVisible();
  }
}

export default RegisterPage;
