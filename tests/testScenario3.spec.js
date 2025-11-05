import { test } from '@playwright/test';
import { InputFormSteps } from '../steps/inputFormSteps.js';

test.describe('LambdaTest Input Form Scenario', () => {
  test('should validate error', async ({ page }) => {
    const formSteps = new InputFormSteps(page);

    await formSteps.openLambdaTestPlayground();
    await formSteps.openInputFormDemo();

    // Step 1: Try submitting empty form
    await formSteps.submitEmptyFormAndValidateError();
  });
  
  test('submit the form successfully', async ({ page }) => {
    const formSteps = new InputFormSteps(page);

    await formSteps.openLambdaTestPlayground();
    await formSteps.openInputFormDemo();

    // Step 2: Fill all fields and submit
    await formSteps.fillAndSubmitForm();
  });
});
