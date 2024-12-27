import { BasePage } from './base-page'
import { Locator, Page } from '@playwright/test'

export class AuthPage extends BasePage {
  readonly logoutButton: Locator
  readonly searchPopUp: Locator
  readonly searchPopUpInputField: Locator
  readonly popUpTrackingButton: Locator
  readonly popUpCloseButton: Locator

  constructor(page: Page, orderPopUpTrackingButton: Locator) {
    super(page)
    this.logoutButton = this.page.getByTestId('logout-button')
    this.searchPopUp = this.page.getByTestId('orderSuccessfullyCreated-popup')
    this.searchPopUpInputField = this.page.getByTestId('searchOrder-input')
    this.popUpTrackingButton = this.page.getByTestId('searchOrder-submitButton')
    this.popUpCloseButton = this.page.getByTestId('searchOrder-popup-close-button')
  }
}
