import { Locator, Page } from '@playwright/test'
import { AuthPage } from './auth-page'

export class OrderNotFoundPage extends AuthPage {
  readonly notFoundTitle: Locator
  readonly logoutButton: Locator
  readonly notFoundDescription: Locator

  constructor(page: Page, orderPopUpTrackingButton: Locator, logoutButton: Locator) {
    super(page, orderPopUpTrackingButton)
    this.notFoundTitle = page.getByRole('heading', { name: 'Order not found' })
    this.notFoundDescription = page.getByText('Check the tracking code')
    this.logoutButton = page.getByTestId('logout-button')
  }
}
