import { test } from '@playwright/test';
import { FormSteps } from '../steps/simpleFormSteps.js';

test.describe('LambdaTest Simple Form Assessment', () => {
  test('should display the entered message correctly', async ({ page }) => {
    const formSteps = new FormSteps(page);
    await formSteps.openLambdaTestPlayground();
    await formSteps.openSimpleFormDemo();
    await formSteps.submitMessageAndValidate();
  });
});
