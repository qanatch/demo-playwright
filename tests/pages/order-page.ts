import { Locator, Page } from '@playwright/test'
import { AuthPage } from './auth-page'

export class OrderPage extends AuthPage {
  readonly statusButton: Locator
  readonly orderCreatorName: Locator
  readonly orderCreatorPhone: Locator
  readonly orderCreatorComment: Locator
  readonly orderCreatorButton: Locator
  readonly formErrorName: Locator
  readonly formErrorPhone: Locator

  constructor(page: Page) {
    super(page)
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.orderCreatorName = this.page.getByTestId('username-input')
    this.orderCreatorPhone = this.page.getByTestId('phone-input')
    this.orderCreatorComment = this.page.getByTestId('comment-input')
    this.orderCreatorButton = this.page.getByTestId('createOrder-button')
    this.formErrorName = this.page.getByTestId('username-input-error')
    this.formErrorPhone = this.page.getByTestId('phone-input-error')
  }
}

// constructor(page: Page, orderPopUpTrackingButton: Locator, formErrorPhone: Locator) {
// super(page, orderPopUpTrackingButton)
//     constructor(page: Page) {
//     super(page)
//     this.statusButton = page.getByTestId('openStatusPopup-button')
//     this.orderCreatorName = this.page.getByTestId('username-input')
//     this.orderCreatorPhone = this.page.getByTestId('phone-input')
//     this.orderCreatorComment = this.page.getByTestId('comment-input')
//     this.orderCreatorButton = this.page.getByTestId('createOrder-button')
//     this.formErrorName = this.page.getByTestId('username-input-error')
//     this.formErrorPhone = this.page.getByTestId('phone-input-error')
//    }
// }
