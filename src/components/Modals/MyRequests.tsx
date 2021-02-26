import React from 'react';
import { Store } from '../../store';
import { StoreAction } from '../../store/StoreAction';
import { IStore, IUser } from '../../store/types';
import { CloseIcon } from '../svgs/Close';
import { ButtonDefault } from '../ui';
import * as Styles from './styles';

interface MyRequestsProps {
  data?: IUser[];
  closeHandler: () => void;
  title: string;
}

export const MyRequests: React.FC<MyRequestsProps> = ({ closeHandler, title }) => {
  const { store, dispatch } = React.useContext<IStore>(Store);
  const [loading, setLoading] = React.useState(false);
  const Actions = new StoreAction(dispatch);

  const removeHandler = React.useCallback(
    async (user: IUser, position: number) => {
      try {
        setLoading(true);
        const newUsers = store.users.filter((userInner) => {
          const d = !(
            userInner.id === user.id &&
            userInner.numberTable === user.numberTable &&
            userInner.dateReserve === user.dateReserve
          );
          return d;
        });

        const newMyReq = store.myRequests.filter((userInner) => {
          const d = !(
            userInner.id === user.id &&
            userInner.numberTable === user.numberTable &&
            userInner.dateReserve === user.dateReserve
          );
          return d;
        });

        Actions.setUsers(newUsers);
        Actions.setMyRequests(newMyReq);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [Actions]
  );

  const body = React.useMemo(() => {
    if (store.myRequests && Array.isArray(store.myRequests) && store.myRequests[0]) {
      return store.myRequests.map((itm, i) => (
        <tr key={itm.id}>
          <td>{i + 1}</td>
          <td>{itm.dateReserve}</td>
          <td>{itm.numberTable}</td>
          <td style={{ width: '100px' }}>
            {new Date(itm.dateReserve).getTime() < new Date().getTime() ? null : (
              <ButtonDefault onClick={() => removeHandler(itm, i)} title={'Відмінити'} />
            )}
          </td>
        </tr>
      ));
    }

    return (
      <tr>
        <td
          colSpan={4}
          style={{ textAlign: 'center', fontSize: '18px', color: 'black', padding: '40px 0' }}
        >
          У Вас нема заявок{' '}
        </td>
      </tr>
    );
  }, [store.myRequests, removeHandler]);
  return (
    <Styles.ModalWrapperS>
      <Styles.ModalInnerS>
        <Styles.ModalHeaderS>
          <Styles.ModalTitleS>{title}</Styles.ModalTitleS>
          <Styles.ModalCloseBtnS onClick={closeHandler}>
            <CloseIcon />
          </Styles.ModalCloseBtnS>
        </Styles.ModalHeaderS>
        <Styles.ModalBodyS>
          <table cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th>#</th>
                <th>Дата</th>
                <th>Мiсце</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{body}</tbody>
          </table>
        </Styles.ModalBodyS>
        {/* <Styles.ModalFooterS>
          <ButtonDefault title="Закрити" onClick={closeHandler} />
        </Styles.ModalFooterS> */}
        {loading ? <Styles.LoadingWrapperS>Зачекайте ...</Styles.LoadingWrapperS> : null}
      </Styles.ModalInnerS>
    </Styles.ModalWrapperS>
  );
};
