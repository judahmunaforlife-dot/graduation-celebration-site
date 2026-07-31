import { expect, test } from '@playwright/test'

test('launches, shows the guestbook walls, and hides the RSVP section', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('button', { name: 'Launch Celebration' })).toBeVisible()
  await page.getByRole('button', { name: 'Launch Celebration' }).click()

  await expect(page.getByRole('heading', { name: 'Moments Wall' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Blessings Wall' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Memories Wall' })).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Celebrate With Us' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Will you be there?' })).toHaveCount(0)
})
