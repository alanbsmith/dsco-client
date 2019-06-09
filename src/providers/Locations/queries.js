import gql from 'graphql-tag';

export const locationParams = `
  id
  name
  fullAddress
  googleMapsLink
  address
  city
  state
  zip
  lat
  lng
  website
`;

// queries
export function locationsQuery(params = locationParams) {
  return gql`
    {
      locations {
        ${params}
      }
    }
  `;
}

export function locationQuery(id, params = locationParams) {
  return gql`
    {
      location(id: ${id}) {
        ${params}
      }
    }
  `;
}

// mutations
export function createLocation(params = locationParams) {
  return gql`
    mutation CreateLocation($input: LocationInput!) {
      createLocation(input: $input) {
        ${params}
      }
    }
  `;
}

export function updateLocation(params = locationParams) {
  return gql`
    mutation UpdateLocation($input: LocationInput!) {
      updateLocation(input: $input) {
        ${params}
      }
    }
  `;
}

export function destroyLocation() {
  return gql`
    mutation DestroyLocation($id: ID!) {
      destroyLocation(id: $id) {
        id
      }
    }
  `;
}
