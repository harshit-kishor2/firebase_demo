export const getMessageFromErrorCode = errorCode => {
  switch (errorCode) {
    case 'auth/ERROR_EMAIL_ALREADY_IN_USE':
    case 'auth/account-exists-with-different-credential':
    case 'auth/email-already-in-use':
      return 'Email already used. Go to login page.';
    case 'auth/ERROR_WRONG_PASSWORD':
    case 'auth/wrong-password':
      return 'Wrong email/password combination.';
    case 'auth/ERROR_USER_NOT_FOUND':
    case 'auth/user-not-found':
      return 'No user found with this email.';
    case 'ERROR_USER_DISABLED':
    case 'auth/user-disabled':
      return 'User disabled.';
    case 'auth/ERROR_TOO_MANY_REQUESTS':
    case 'auth/operation-not-allowed':
      return 'Too many requests to log into this account.';
    case 'auth/ERROR_OPERATION_NOT_ALLOWED':
    case 'auth/operation-not-allowed':
      return 'Server error, please try again later.';
    case 'auth/ERROR_INVALID_EMAIL':
    case 'auth/invalid-email':
      return 'Email address is invalid.';
    default:
      return 'Login failed. Please try again.';
  }
};
