import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest'
import { setupServer } from 'msw/node'
import authRequests from './src/msw/auth.msw'
import productRequests from './src/msw/product.msw'
import userRequests from './src/msw/user.msw'
import matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/extend-expect'

import { cleanup } from '@testing-library/react'

// eslint-disable-next-line import/no-unresolved
import 'vitest-canvas-mock'
import './src/i18n/i18n'

expect.extend(matchers)
const server = setupServer(...authRequests, ...productRequests, ...userRequests)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))
/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addListener: function () {},
      removeListener: function () {}
    }
  }
