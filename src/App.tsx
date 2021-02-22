import React from 'react';
import { Title } from './components/ui';
import * as Screens from './screens';
import { Store } from './store';
import { IStore } from './store/types';
import { useApp } from './useApp';

function App() {
  const { store } = React.useContext<IStore>(Store);
  useApp();
  React.useEffect(() => {
    // console.clear();
    console.log(store, 'store');
  }, [store]);

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
}

export default App;
