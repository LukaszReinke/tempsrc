// upon addition of new protected route fill up Middleware.ts config
export const PROTECTED_ROUTE = '/crew';

export const ROUTES = {
  CONTESTS: '/contests',
  CLASSES: '/classes',
  WORKSHOPS: '/workshops',
  HOME: '/',
  SIGN_IN: '/sign_in',
  RESET_PASSWORD: '/reset_password',
  CONTACT: '/contact',

  GET_WORKSHOP_PAGE: (workshop_id: string) => `${ROUTES.WORKSHOPS}/${workshop_id}`,
  GET_CONTEST_PAGE: (contest_id: string) => `${ROUTES.CONTESTS}/${contest_id}`,

  // protected routes have to have PROTECTED_ROUTE prefix [or any other prefix defined in middleware]
  CREW_DASHBOARD: `${PROTECTED_ROUTE}/request_board`,
  CREW_HR_MANAGEMENT: `${PROTECTED_ROUTE}/crew_members`,
  CREW_CONTEST_MANAGEMENT: `${PROTECTED_ROUTE}/contest_management`,
  CREW_WORKSHOP_MANAGEMENT: `${PROTECTED_ROUTE}/workshop_management`,
  CREW_EDIT_PROFILE: `${PROTECTED_ROUTE}/edit_profile`,

  API: {
    LOGIN: '/api/login',
    ROLES: '/api/roles',
    USERS: '/api/users',
    LOGOUT: '/api/logout',
    CONTESTS: '/api/contests',
    WORKSHOPS: '/api/workshops',
    CONTESTS_ALL: '/api/contests/all',
    WORKSHOPS_ALL: '/api/workshops/all',
    PROFILE: '/api/profile',

    GET_USER: (user_id: string) => `/api/users/${user_id}`,
    GET_CONTEST: (contest_id: string) => `/api/contests/${contest_id}`,
    GET_WORKSHOP: (workshop_id: string) => `/api/workshops/${workshop_id}`,
  },
};