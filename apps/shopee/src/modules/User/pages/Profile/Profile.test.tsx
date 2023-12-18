import { screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { logScreen, renderWithRouter } from '@/utils/testUtils'
import Profile from './Profile'
import path from '@/configs/path'
import { setAccessTokenToLS } from '@/utils/auth'
import { access_token } from '@/msw/auth.msw'

describe('Profile', () => {
  it('should render correctly', async () => {
    setAccessTokenToLS(access_token)
    const { container } = renderWithRouter({ route: path.profile })
    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe('Huy Hùng')
    })
  })
})
