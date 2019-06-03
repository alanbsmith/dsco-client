import gql from 'graphql-tag';
import { currentUserParams } from '../../providers/CurrentUser/query';

export function verifyEmailMutation(params = currentUserParams) {
  return gql`
    mutation VerifyEmail($input: VerifyEmailInput!) {
      verifyEmail(input: $input) {
        user {
          ${params}
        }
        token
      }
    }
  `;
}
