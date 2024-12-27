import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, SERVICE_URL, USERNAME } from '../../config/env-data'
import { OrderFoundPage } from '../pages/order-found-page'

let authPage: LoginPage

test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

// test('signIn button disabled when incorrect data inserted', async ({}) => {
//   await authPage.usernameField.fill(faker.lorem.word(2))
//   await authPage.passwordField.fill(faker.lorem.word(7))
//   await expect(authPage.signInButton).toBeDisabled()
// })

// test('error message displayed when incorrect credentials used in order page', async ({}) => {
//   const orderCreationPage = await authPage.signIn(USERNAME,PASSWORD)
//   await orderCreationPage.orderCreatorName.fill(faker.lorem.word(0))
//   await orderCreationPage.orderCreatorPhone.fill(faker.lorem.lines(4))
//   await expect.soft(orderCreationPage.formErrorName).toBeHidden()
//   await expect.soft(orderCreationPage.formErrorPhone).toBeHidden()
// })
//
// test('login with correct credentials and verify order creation page', async ({}) => {
//   const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
//   await expect(orderCreationPage.statusButton).toBeVisible()
//   await expect.soft(orderCreationPage.orderCreatorName).toBeVisible()
//   await expect.soft(orderCreationPage.orderCreatorComment).toBeVisible()
//   await expect.soft(orderCreationPage.orderCreatorPhone).toBeVisible()
//   await expect.soft(orderCreationPage.orderCreatorButton).toBeVisible()
// })

// test('login and create order', async ({}) => {
//   const orderCreationPage = await authPage.signIn(USERNAME,PASSWORD)
//   await orderCreationPage.orderCreatorName.fill(faker.lorem.word(4))
//   await orderCreationPage.orderCreatorPhone.fill(faker.lorem.lines(6))
//   await orderCreationPage.orderCreatorComment.fill(faker.lorem.word(6))
//   await orderCreationPage.orderCreatorButton.click()
//   await expect.soft(orderCreationPage.orderCreatorPopUp).toBeVisible()
// })

test('logout', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  await expect.soft(authPage.signInButton).toBeVisible()
})

test('login and create order and show status', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.click()
  await orderCreationPage.searchPopUpInputField.fill('1942')
  await orderCreationPage.popUpTrackingButton.click()
  const orderFoundPage = orderCreationPage.orderFoundPage()
  await expect.soft(orderFoundPage)
})
