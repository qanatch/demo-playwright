import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderFoundPage } from '../pages/order-found-page'
import { OrderNotFoundPage } from '../pages/order-not-found-page'

let authPage: LoginPage
let signInUrl = 'https://fe-delivery.tallinn-learning.ee/signin'

test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

test.describe('Login and order creation tests', () => {
  test('signIn button disabled when incorrect data inserted', async ({}) => {
    await authPage.usernameField.fill(faker.lorem.word(2))
    await authPage.passwordField.fill(faker.lorem.word(7))
    await expect(authPage.signInButton).toBeDisabled()
  })

  test('error message displayed when incorrect credentials used', async ({}) => {
    await authPage.usernameField.fill('Username')
    await authPage.passwordField.fill('Password123')
    await authPage.signInButton.click()
    await expect.soft(authPage.popupIncorrectLogin).toBeVisible()
  })

  test('login with correct credentials and verify order creation page', async ({}) => {
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await expect.soft(orderCreationPage.statusButton).toBeVisible()
    await expect.soft(orderCreationPage.orderCreatorName).toBeVisible()
    await expect.soft(orderCreationPage.orderCreatorPhone).toBeVisible()
    await expect.soft(orderCreationPage.createOrderButton).toBeVisible()
    await expect.soft(orderCreationPage.orderCreatorComment).toBeVisible()
  })

  // test('login and create order', async ({}) => {
  //   const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  //   await orderCreationPage.orderCreatorName.fill(faker.lorem.word(2))
  //   await orderCreationPage.orderCreatorPhone.fill(faker.lorem.word(6))
  //   await orderCreationPage.orderCreatorComment.fill(faker.lorem.word(6))
  //   await orderCreationPage.createOrderButton.click()
  //   expect.soft(orderCreationPage.createPopupButton).toBeVisible()
  // })

  // test('error message on name invalid input', async ({}) => {
  //   const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  //   await orderCreationPage.orderCreatorName.fill(faker.lorem.word(1))
  //   expect.soft(orderCreationPage.usernameInputError).toBeVisible()
  // })

  // test('error message on phone invalid input', async ({}) => {
  //   const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  //   await orderCreationPage.orderCreatorName.fill(faker.lorem.word(2))
  //   await orderCreationPage.orderCreatorPhone.fill(faker.lorem.word(5))
  //   expect.soft(orderCreationPage.phoneInputError).toBeVisible()
  // })

  test('login and logout', async ({ page }) => {
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await orderCreationPage.logoutButton.click()
    await expect(page).toHaveURL(signInUrl)
  })

  // test('login and check existing order status', async ({ page }) => {
  //   const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  //   await orderCreationPage.statusButton.click()
  //   await orderCreationPage.searchPopupInput.fill('2694')
  //   await orderCreationPage.searchPopupSubmitButton.click()
  //   const orderFoundPage = new OrderFoundPage(page)
  //   await expect(orderFoundPage.uselessField).toBeVisible()
  // })

  test('login and check not existing order status', async ({ page }) => {
    const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
    await orderCreationPage.statusButton.click()
    await orderCreationPage.searchPopupInput.fill('0')
    await orderCreationPage.searchPopupSubmitButton.click()
    const orderNotFoundPage = new OrderNotFoundPage(page)
    await expect(orderNotFoundPage.notFoundTitle).toBeVisible()
    await expect(orderNotFoundPage.logoutButton).toBeVisible()
    await expect(orderNotFoundPage.notFoundDescription).toBeVisible()
  })
})
