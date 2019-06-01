import gql from 'graphql-tag';

export const currentUserParams = `
  id
  fullName
  firstName
  lastName
  email
  phone
  isOrganizer
  hasVerifiedEmail
  hasVerifiedPhone
`;

export function currentUserQuery(params = currentUserParams) {
  return gql`
    {
      currentUser {
        ${params}
      }
    }
  `;
}
