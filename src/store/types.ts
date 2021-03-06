export interface IModal {
  title: string;
  message: string;
  open?: boolean;
  callBack?: () => void;
}

export interface IMe {
  email: string;
}

export interface IUser {
  id: number;
  email: string;
  fio: string;
  department: string;
  position: string;
  dateReserve: Date | string;
  numberTable: number;
  typeId: number;
  status: number;
}

export interface IState {
  user: IMe | null;
  users: IUser[];
  myRequests: IUser[];
  modal: IModal;
  page: 'home' | 'createRequest';
  readonly errors?: string | undefined;
  readonly loading: boolean;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IStore {
  store: IState;
  dispatch: IAction | any;
}

export interface ISetNameAction {
  payload: string;
}

export interface IModalAction {
  payload: IModal;
}

export enum EActionTypes {
  SET_LOADING = 'SET_LOADING',
  SET_USER = 'SET_USER',
  SET_USERS = 'SET_USERS',
  SET_MODAL = 'SET_MODAL',
  SET_PAGE = 'SET_PAGE',
  SET_MY_REQUESTS = 'SET_MY_REQUESTS',
}
