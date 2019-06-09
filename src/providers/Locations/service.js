import * as ActionTypes from './ActionTypes';

class LocationService {
  constructor (dispatch, addAlert, create, update, destroy) {
    this.dispatch = dispatch;
    this.addAlert = addAlert;
    this.createMutation = create;
    this.updateMutation = update;
    this.destroyMutation = destroy;
  }

  async create(input) {
    this.dispatch({ type: ActionTypes.CREATE_LOCATION_REQUEST });

    await this.createMutation({ variables: { input } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: 'Location created!' });
        return this.dispatch({
          type: ActionTypes.CREATE_LOCATION_SUCCESS,
          payload: data.createLocation,
        })
      })
      .catch((err) => {
        console.warn(err);
        this.addAlert({ type: 'danger', message: 'Location was not created' });
        this.dispatch({ type: ActionTypes.CREATE_LOCATION_FAILURE });
      })
  }

  async update(input) {
    this.dispatch({ type: ActionTypes.UPDATE_LOCATION_REQUEST });

    await this.updateMutation({ variables: { input } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: 'Location updated!' });
        return this.dispatch({
          type: ActionTypes.UPDATE_LOCATION_SUCCESS,
          payload: data.updateLocation,
        })
      })
      .catch((err) => {
        console.warn(err);
        this.addAlert({ type: 'danger', message: 'Location was not updated' });
        this.dispatch({ type: ActionTypes.UPDATE_LOCATION_FAILURE });
      })
  }

  async destroy(id) {
    this.dispatch({ type: ActionTypes.DESTROY_LOCATION_REQUEST });

    await this.destroyMutation({ variables: { id } })
      .then(({ data }) => {
        this.addAlert({ type: 'success', message: 'Location deleted!' });
        return this.dispatch({
          type: ActionTypes.DESTROY_LOCATION_SUCCESS,
          payload: data.destroyLocation,
        })
      })
      .catch((err) => {
        console.warn(err);
        this.addAlert({ type: 'danger', message: 'Location was not deleted' });
        this.dispatch({ type: ActionTypes.DESTROY_LOCATION_FAILURE });
      })
  }
}

export default LocationService;