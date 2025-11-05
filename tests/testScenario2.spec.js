import { test } from '@playwright/test';
import { SliderSteps } from '../steps/sliderSteps.js';

test.describe('LambdaTest Drag & Drop Slider Assessment', () => {
  test('should drag default slider to value 95 successfully', async ({ page }) => {
    const sliderSteps = new SliderSteps(page);

    await sliderSteps.openLambdaTestPlayground();
    await sliderSteps.openDragDropSliders();
    await sliderSteps.moveSliderAndValidate();
  });
});
