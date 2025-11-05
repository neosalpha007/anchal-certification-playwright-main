// pages/inputFormPage.js
export default class InputFormPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.inputFormLink = 'a[href*="input-form-demo"]';
    this.submitButton = '#seleniumform button[type="submit"]';
    this.errorMessage = 'p.text-danger'; // or '.help-block' if the message changes
    this.successMessage = 'div#success-message, div.alert-success';

    // Form fields
    this.nameField = 'input[name="name"]';
    this.emailField = 'input[name="email"]';
    this.passwordField = 'input[name="password"]';
    this.companyField = 'input[name="company"]';
    this.websiteField = 'input[name="website"]';
    this.countryDropdown = 'select[name="country"]';
    this.cityField = 'input[name="city"]';
    this.address1Field = 'input[name="address_line1"]';
    this.address2Field = 'input[name="address_line2"]';
    this.stateField = 'input[name="state"]';
    this.zipField = 'input[name="zip"]';
  }

  async openInputFormDemo() {
    await this.page.click(this.inputFormLink);
    await this.page.waitForURL(/.*input-form-demo.*/, { timeout: 5000 });
  }

  async clickSubmit() {
    await this.page.click(this.submitButton);
  }

  async getErrorMessage() {
    const error = await this.page.textContent(this.errorMessage);
    return error ? error.trim() : '';
  }

  async fillFormDetails(data) {
    const {
      name,
      email,
      password,
      company,
      website,
      country,
      city,
      address1,
      address2,
      state,
      zip,
    } = data;

    await this.page.fill(this.nameField, name);
    await this.page.fill(this.emailField, email);
    await this.page.fill(this.passwordField, password);
    await this.page.fill(this.companyField, company);
    await this.page.fill(this.websiteField, website);
    await this.page.selectOption(this.countryDropdown, { label: country });
    await this.page.fill(this.cityField, city);
    await this.page.fill(this.address1Field, address1);
    await this.page.fill(this.address2Field, address2);
    await this.page.fill(this.stateField, state);
    await this.page.fill(this.zipField, zip);
  }

  async getSuccessMessage() {
    const msg = await this.page.textContent(this.successMessage);
    return msg ? msg.trim() : '';
  }
}
