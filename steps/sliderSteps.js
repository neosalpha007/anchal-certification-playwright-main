import { expect } from '@playwright/test';
import { SliderPage } from '../pages/sliderPage.js';

export class SliderSteps {
  constructor(page) {
    this.page = page;
    this.sliderPage = new SliderPage(page);
  }

  async openLambdaTestPlayground() {
    await this.sliderPage.navigateToPlayground();
  }

  async openDragDropSliders() {
    await this.sliderPage.openDragDropSliders();
    await expect(this.page).toHaveURL(/.*drag-drop-range-sliders.*/);
  }

  async moveSliderAndValidate() {
    const targetValue = 95;
    await this.sliderPage.moveDefaultSliderTo(targetValue);

    // 🔹 Add a random wait between 1000ms and 3000ms
    const randomWait = Math.floor(Math.random() * 2000) + 1000; // 1000–3000 ms
    console.log(`⏳ Waiting ${randomWait}ms before validating...`);
    await this.page.waitForTimeout(randomWait);

    const actualValue = await this.sliderPage.getSliderValue();
    expect(Number(actualValue.trim())).toBe(targetValue);
  }
}
