export class SimpleFormPage {
  constructor(page) {
    this.page = page;
    this.simpleFormLink = 'a[href*="simple-form-demo"]';
    this.messageInput = '#user-message';
    this.getValueButton = '#showInput';
    this.displayedMessage = '#message';
  }

  async navigateToPlayground() {
    await this.page.goto("https://www.lambdatest.com/selenium-playground", { waitUntil: 'domcontentloaded' });
  }

  async openSimpleFormDemo() {
    await this.page.click(this.simpleFormLink);
  }

  async enterMessage(text) {
    await this.page.fill(this.messageInput, text);
  }

  async clickGetCheckedValue() {
    await this.page.click(this.getValueButton);
  }

  async getDisplayedMessage() {
    // Wait for the message element to appear and be visible
    const msgElement = await this.page.waitForSelector(this.displayedMessage, {
      state: 'visible',
      timeout: 5000
    });

    // Extract and return its text content (trimmed)
    const text = await msgElement.textContent();
    return text ? text.trim() : '';
  }

}
