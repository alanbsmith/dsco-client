import gql from 'graphql-tag';

export const locationsParams = `
  id
  name
  fullAddress
  address
  city
  state
  zip
  lat
  lng
  website
`;

export function locationsQuery(params = locationsParams) {
  return gql`
    {
      locations {
        ${params}
      }
    }
  `;
}

export function locationQuery(id, params = locationsParams) {
  return gql`
    {
      location(id: ${id}) {
        ${params}
      }
    }
  `;
}
