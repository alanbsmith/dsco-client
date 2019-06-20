import gql from 'graphql-tag';

export const userSubscriptionParams = `
  id
  userId
  groupId
  subscriptionId
`;

// queries
export function userSubscriptionsQuery(params = userSubscriptionParams) {
  return gql`
    {
      userSubscriptions {
        ${params}
      }
    }
  `;
};

// mutations
export const CREATE_USER_SUBSCRIPTION = gql`
  mutation CreateOrganizer($input: CreateUserSubscriptionInput!) {
    createUserSubscription(input: $input) {
      ${userSubscriptionParams}
    }
  }
`;

export const DESTROY_USER_SUBSCRIPTION = gql`
  mutation DestroyMember($input: DestroyUserSubscriptionInput!) {
    destroyUserSubscription(input: $input) {
      id
    }
  }
`;
