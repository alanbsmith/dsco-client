import * as ActionTypes from './ActionTypes';

export const initialState = {
  members: [],
  loading: null,
};

function destroyMember(state, id) {
  return state.members.filter(member => (member.id !== id));
}

function updateMember(state, updated) {
  return state.locations.map(loc => {
    if (loc.id === updated.id) {
      return updated;
    }
    return loc;
  })
}

export function reducer(state, action) {
  switch (action.type) {
    // fetch members
    case ActionTypes.FETCH_MEMBERS_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FETCH_MEMBERS_SUCCESS:
      return {
        members: action.payload,
        loading: false,
      };
    case ActionTypes.FETCH_MEMBERS_FAILURE:
      return { ...state, loading: false };

    // fetch member
    case ActionTypes.FETCH_MEMBER_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.FETCH_MEMBER_SUCCESS:
      return {
        members: updateMember(state, action.payload),
        loading: false,
      };
    case ActionTypes.FETCH_MEMBER_FAILURE:
      return { ...state, loading: false };

    // destroy member
    case ActionTypes.DESTROY_MEMBER_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.DESTROY_MEMBER_SUCCESS:
      return {
        members: destroyMember(state, action.payload),
        loading: false,
      };
    case ActionTypes.DESTROY_MEMBER_FAILURE:
      return { ...state, loading: false };

    // create organizer
    case ActionTypes.CREATE_ORGANIZER_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.CREATE_ORGANIZER_SUCCESS:
      return {
        members: updateMember(state, action.payload),
        loading: false,
      };
    case ActionTypes.CREATE_ORGANIZER_FAILURE:
      return { ...state, loading: false };

    // remove organizer
    case ActionTypes.REMOVE_ORGANIZER_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.REMOVE_ORGANIZER_SUCCESS:
      return {
        members: updateMember(state, action.payload),
        loading: false,
      };
    case ActionTypes.REMOVE_ORGANIZER_FAILURE:
      return { ...state, loading: false };

    // default
    default:
      return state;
  }
}
