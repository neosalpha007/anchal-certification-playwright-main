export class SliderPage {
  constructor(page) {
    this.page = page;
    this.dragDropLink = 'a[href*="drag-drop-range-sliders"]';
    this.defaultSlider = 'input[value="15"]';  // Slider with default value 15
    this.rangeValue = '#rangeSuccess';         // ID of the displayed value
  }

  async navigateToPlayground() {
    await this.page.goto('https://www.lambdatest.com/selenium-playground');
  }

  async openDragDropSliders() {
    await this.page.click(this.dragDropLink);
  }

  async moveDefaultSliderTo(value) {
    const slider = this.page.locator(this.defaultSlider);
    await slider.waitFor({ state: 'visible', timeout: 5000 });

    // Get bounding box and range attributes
    const { box, min, max, current } = await slider.evaluate(el => {
      const rect = el.getBoundingClientRect();
      return {
        box: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        min: el.getAttribute('min') !== null ? Number(el.getAttribute('min')) : 0,
        max: el.getAttribute('max') !== null ? Number(el.getAttribute('max')) : 100,
        current: el.value ? Number(el.value) : (el.getAttribute('value') ? Number(el.getAttribute('value')) : 0)
      };
    });

    if (box.width === 0) throw new Error('Slider bounding box width is zero.');
    if (isNaN(min) || isNaN(max) || min === max)
      throw new Error(`Invalid slider range: min=${min}, max=${max}`);

    const target = Math.max(min, Math.min(max, Number(value)));

    const proportion = (target - min) / (max - min);
    const targetX = box.x + Math.round(proportion * box.width);
    const centerY = box.y + box.height / 2;

    const startX = box.x + Math.round(((current - min) / (max - min)) * box.width || 0.5 * box.width);
    await this.page.mouse.move(startX, centerY);
    await this.page.waitForTimeout(500);
    await this.page.mouse.down();

    // Move slowly toward target
    const totalDistance = targetX - startX;
    const steps = 45;
    const stepSize = totalDistance / steps;

    for (let i = 1; i <= steps; i++) {
      const intermediateX = startX + i * stepSize;
      await this.page.mouse.move(intermediateX, centerY);
      await this.page.waitForTimeout(40);
    }

    // --- Fine-tune section ---
    // Slightly reverse or nudge until we reach exactly 96
    let sliderValue = await slider.evaluate(el => Number(el.value));
    if (sliderValue > value) {
      // Move back slightly (slider overshot)
      for (let px = 0; px < 5 && sliderValue > value; px++) {
        await this.page.mouse.move(targetX - px, centerY);
        await this.page.waitForTimeout(80);
        sliderValue = await slider.evaluate(el => Number(el.value));
      }
    } else if (sliderValue < value) {
      // Move forward slightly (undershot)
      for (let px = 0; px < 5 && sliderValue < value; px++) {
        await this.page.mouse.move(targetX + px, centerY);
        await this.page.waitForTimeout(80);
        sliderValue = await slider.evaluate(el => Number(el.value));
      }
    }

    await this.page.mouse.up();
    await this.page.waitForTimeout(1000);
  }


  async getSliderValue() {
    // Wait for the slider value element to be visible and stable
    const valueElement = await this.page.waitForSelector(this.rangeValue, {
      state: 'visible',
      timeout: 5000
    });

    // Extract its text content and trim it
    const text = await valueElement.textContent();
    return text ? text.trim() : '';
  }

}
