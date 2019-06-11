import gql from 'graphql-tag';

export const currentUserParams = `
  id
  fullName
  firstName
  lastName
  email
  phone
  isAdmin
  hasVerifiedEmail
  hasVerifiedPhone
`;

// queries
export const currentUserQuery = (params = currentUserParams) => {
  return gql`
    {
      currentUser {
        ${params}
      }
    }
  `;
}

// mutations
export const LOGIN = gql`
  mutation Login($input: UserCredentials!) {
    login(input: $input) {
      user {
        ${currentUserParams}
      }
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      user {
        ${currentUserParams}
      }
      token
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      user {
        ${currentUserParams}
      }
      token
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      status
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordCredentials!) {
    resetPassword(input: $input) {
      user {
        ${currentUserParams}
      }
      token
    }
  }
`;

export const UPDATE_CURRENT_USER = gql`
  mutation UpdateCurrentUser($input: CurrentUserInput!) {
    updateCurrentUser(input: $input) {
      user {
        ${currentUserParams}
      }
      token
    }
  }
`;

export const DESTROY_CURRENT_USER = gql`
  mutation DestroyCurrentUser($input: DestroyInput!) {
    destroyCurrentUser(input: $input) {
      id
    }
  }
`;
