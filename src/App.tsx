import React from 'react';
import { Title } from './components/ui';
import { Home } from './screens';
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

  return (
    <>
      <Title title="Робота в офiсi" />
      <Home />
    </>
  );
}

export default App;
