import { EActionTypes, IAction, IState } from './types';
export class StoreAction {
  dispatch: IAction | any;
  constructor(dispatch: IAction | any) {
    this.dispatch = dispatch;
  }

  setUser = (payload: IState['user']) =>
    this.dispatch({
      type: EActionTypes.SET_USER,
      payload,
    });

  setLoading = (payload: IState['loading']) =>
    this.dispatch({
      type: EActionTypes.SET_LOADING,
      payload,
    });

  setUsers = (payload: IState['users']) =>
    this.dispatch({
      type: EActionTypes.SET_USERS,
      payload,
    });

  openModal = (payload: IState['modal']) =>
    this.dispatch({
      type: EActionTypes.SET_MODAL,
      payload,
    });

  setPage = (payload: IState['page']) =>
    this.dispatch({
      type: EActionTypes.SET_PAGE,
      payload,
    });
}
