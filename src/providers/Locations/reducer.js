import * as ActionTypes from './ActionTypes';

export const initialState = {
  locations: [],
  loading: null,
};

function updateLocation(state, updated) {
  return state.locations.map(loc => {
    if (loc.id === updated.id) {
      return updated;
    }
    return loc;
  })
}

function destroyLocation(state, id) {
  return state.locations.filter(loc => (loc.id !== id));
}

export function reducer(state, action) {
  switch (action.type) {
    // fetch locations
    case ActionTypes.FETCH_LOCATIONS_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FETCH_LOCATIONS_SUCCESS:
      return {
        locations: action.payload,
        loading: false,
      };
    case ActionTypes.FETCH_LOCATIONS_FAILURE:
      return { ...state, loading: false };

    // create location
    case ActionTypes.CREATE_LOCATION_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.CREATE_LOCATION_SUCCESS:
      return {
        locations: state.locations.concat(action.payload),
        loading: false,
      };
    case ActionTypes.CREATE_LOCATION_FAILURE:
      return { ...state, loading: false };

    // update location
    case ActionTypes.UPDATE_LOCATION_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.UPDATE_LOCATION_SUCCESS:
      return {
        locations: updateLocation(state, action.payload),
        loading: false,
      };
    case ActionTypes.UPDATE_LOCATION_FAILURE:
      return { ...state, loading: false };

    // destroy location
    case ActionTypes.DESTROY_LOCATION_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.DESTROY_LOCATION_SUCCESS:
      return {
        locations: destroyLocation(state, action.payload),
        loading: false,
      };
    case ActionTypes.DESTROY_LOCATION_FAILURE:
      return { ...state, loading: false };

    // default  
    default:
      return state;
  }
}
