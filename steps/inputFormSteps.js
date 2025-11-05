// steps/inputFormSteps.js
import { expect } from '@playwright/test';
import InputFormPage from '../pages/inputFormPage.js';

export class InputFormSteps {
  constructor(page) {
    this.page = page;
    this.formPage = new InputFormPage(page);
  }

  async openLambdaTestPlayground() {
    await this.page.goto('https://www.lambdatest.com/selenium-playground');
  }

  async openInputFormDemo() {
    await this.formPage.openInputFormDemo();
    await expect(this.page).toHaveURL(/.*input-form-demo.*/);
  }

  async submitEmptyFormAndValidateError() {
    await this.formPage.clickSubmit();
    const errorText = await this.formPage.getErrorMessage();

    // Example message — adjust if site uses a different text
    expect(errorText).toContain('Please fill in the fields');
  }

  async fillAndSubmitForm() {
    const testData = {
      name: 'Anchal Tester',
      email: 'anchal.tester@example.com',
      password: 'Lambda@123',
      company: 'LambdaTest',
      website: 'https://www.lambdatest.com',
      country: 'United States',
      city: 'New York',
      address1: '123 Broadway',
      address2: 'Apt 4B',
      state: 'NY',
      zip: '10001',
    };

    await this.formPage.fillFormDetails(testData);

    await this.formPage.clickSubmit();

    // Wait for success message and assert
    await this.page.waitForSelector(this.formPage.successMessage, { state: 'visible', timeout: 5000 });
    const successText = await this.formPage.getSuccessMessage();
    expect(successText).toContain('Thanks for contacting us, we will get back to you shortly.');
  }
}
