import React from 'react';
import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigation';

const App = () => {
  return (
    <>
      <RootNavigator />
      <Toast position="bottom" bottomOffset={60} />
    </>
  );
};

export default App;
