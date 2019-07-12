import gql from 'graphql-tag';

export const memberParams = `
  id
  userId
  groupId
  isOrganizer
  user {
    fullName
    hasVerifiedEmail
  }
`;

// queries
export function membersQuery(params = memberParams) {
  return gql`
    {
      members {
        ${params}
      }
    }
  `;
}

export function memberQuery(id, params = memberParams) {
  return gql`
    {
      member(id: ${id}) {
        ${params}
      }
    }
  `;
}

// mutations
export const DESTROY_MEMBER = gql`
  mutation DestroyMember($id: ID!) {
    destroyMember(id: $id) {
      id
    }
  }
`;

export const CREATE_ORGANIZER = gql`
  mutation CreateOrganizer($input: MemberInput!) {
    createOrganizer(input: $input) {
      ${memberParams}
    }
  }
`;

export const REMOVE_ORGANIZER = gql`
  mutation RemoveOrganizer($input: MemberInput!) {
    removeOrganizer(input: $input) {
      ${memberParams}
    }
  }
`;
