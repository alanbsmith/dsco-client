import gql from 'graphql-tag';

export const subscriptionParams = `
  id
  name
  description
`;

// queries
export function subscriptionsQuery(params = subscriptionParams) {
  return gql`
    {
      subscriptions {
        ${params}
      }
    }
  `;
}
