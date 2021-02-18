import { EActionTypes, IAction, IModal, IUser } from './types';
export class StoreAction {
  dispatch: IAction | any;
  constructor(dispatch: IAction | any) {
    this.dispatch = dispatch;
  }

  setUser = (payload: IUser) =>
    this.dispatch({
      type: EActionTypes.SET_USER,
      payload,
    });

  setLoading = (payload: boolean) =>
    this.dispatch({
      type: EActionTypes.SET_LOADING,
      payload,
    });

  setUsers = (payload: IUser[]) =>
    this.dispatch({
      type: EActionTypes.SET_USERS,
      payload,
    });

  openModal = (payload: IModal) =>
    this.dispatch({
      type: EActionTypes.SET_MODAL,
      payload,
    });
}
