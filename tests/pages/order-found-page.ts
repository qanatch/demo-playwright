import { Locator, Page } from '@playwright/test'
import { AuthPage } from './auth-page'

export class OrderFoundPage extends AuthPage {
  readonly uselessField: Locator


  constructor(page: Page, orderPopUpTrackingButton: Locator) {
    super(page, orderPopUpTrackingButton)

    this.uselessField = this.page.getByTestId('useless-input')
  }
}