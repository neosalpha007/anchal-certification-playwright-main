import { expect } from '@playwright/test';
import { SimpleFormPage } from '../pages/simpleFormPage.js';

export class FormSteps {
  constructor(page) {
    this.page = page;
    this.formPage = new SimpleFormPage(page);
  }

  async openLambdaTestPlayground() {
    await this.formPage.navigateToPlayground();
  }

  async openSimpleFormDemo() {
    await this.formPage.openSimpleFormDemo();
    await expect(this.page).toHaveURL(/.*simple-form-demo.*/);
  }

  async submitMessageAndValidate() {
    const testMessage = 'Welcome to LambdaTest';
    await this.formPage.enterMessage(testMessage);
    await this.formPage.clickGetCheckedValue();
    const output = await this.formPage.getDisplayedMessage();
    expect(output.trim()).toBe(testMessage, { timeout: 5000 });
  }
}
