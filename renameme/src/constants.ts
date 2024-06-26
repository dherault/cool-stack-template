/* ---
  Common
--- */

export const APP_URL = 'https://renameme.com'

/* ---
  Authentication
--- */

export const authenticationErrorCodeToError = {
  default: 'An error occurred, please try again',
  terms: 'You must accept the Terms and Conditions',
  'auth/email-already-in-use': 'This email is already in use',
  'auth/invalid-email': 'You must provide a valid email',
  'auth/weak-password': 'Your password must be at least 8 characters',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'This account does not exist, please sign up',
  'auth/wrong-password': 'Your password is incorrect',
}

/* ---
  Legal
--- */

export const LEGAL_COMPANY_NAME = 'Rename me'

export const LEGAL_DATE = '1 June 2024'

export const LEGAL_LAST_UPDATED_DATE = '1 June 2024'

/* ---
  Misc
--- */

export const FADER_DURATION = 300
