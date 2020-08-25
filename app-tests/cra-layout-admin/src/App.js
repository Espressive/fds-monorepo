import React from 'react';
import { Admin } from '@espressive/cascara';

function App() {
  return (
    <Admin>
      <Admin.Header>
        <h1>{process.env.REACT_APP_NAME}</h1>
      </Admin.Header>
      <Admin.Nav>{'Admin.Nav'}</Admin.Nav>
      <Admin.Main>{'Admin.Main'}</Admin.Main>
    </Admin>
  );
}

export default App;
