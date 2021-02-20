import { EActionTypes, IAction, IModal, IState } from './types';

export const initialModalState: IModal = {
  title: '',
  message: '',
  open: false,
};

export default function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case EActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case EActionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case EActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case EActionTypes.SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case EActionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
}
