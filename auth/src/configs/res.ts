import { COMMON_MESSAGES } from '@piyushr.webdev/common'

export default {
  ERRORS: {
    USR_EXIST: `User already exist`,
    USR_NOT_EXIST: `User does'nt exist or not active with email`,
    PASS_INCORRECT: `Email or Password is incorrect`,
    NO_TOKEN: `Auth token not found!!`,
    NOT_VALID: COMMON_MESSAGES.ERRORS.NOT_VALID,
    INVALID_DATA: COMMON_MESSAGES.ERRORS.NO_TOKEN,
  },
  SUC: {
    SIGN_UP: 'Sign up successfully !!',
    LOG_IN: 'Log in successfully !!',
    USER_DETAILS: 'User details fetched successfully !!',
  },
}
