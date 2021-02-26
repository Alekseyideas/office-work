import React from 'react';
import { Title } from './components/ui';
import * as Screens from './screens';
import { Store } from './store';
import { IStore } from './store/types';
import { useApp } from './useApp';

interface AppProps {
  email: string;
}

export const App: React.FC<AppProps> = ({ email }) => {
  const { store } = React.useContext<IStore>(Store);
  useApp({ email });

  const renderPage = React.useMemo(() => {
    if (store.page === 'createRequest') {
      return <Screens.Request />;
    }
    return <Screens.Home />;
  }, [store.page]);

  return (
    <>
      <Title title="Робота в офiсi" />
      {renderPage}
    </>
  );
};

export default App;
