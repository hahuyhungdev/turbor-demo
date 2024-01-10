import {
  DESKTOP_SCREEN_1500,
  DESKTOP_SCREEN_HD,
  DESKTOP_SCREEN_UHD,
  MOBILE_SCREEN,
  TABLET_SCREEN
} from '@/configs/breakpoints'

export const isMatchBreakpoint = (breakpoint: number): boolean => window.innerWidth < breakpoint

export const deviceController = () => {
  return {
    [MOBILE_SCREEN]: isMatchBreakpoint(MOBILE_SCREEN),
    [TABLET_SCREEN]: isMatchBreakpoint(TABLET_SCREEN),
    [DESKTOP_SCREEN_HD]: isMatchBreakpoint(DESKTOP_SCREEN_HD),
    [DESKTOP_SCREEN_1500]: isMatchBreakpoint(DESKTOP_SCREEN_1500),
    [DESKTOP_SCREEN_UHD]: isMatchBreakpoint(DESKTOP_SCREEN_UHD)
  }
}
// example usage
//   const isTablet = deviceController()[TABLET_SCREEN];
