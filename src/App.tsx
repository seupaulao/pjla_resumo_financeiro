/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';

import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Detalhes from './pages/Detalhes';
import Historico from './pages/Historico';
import Home from './pages/Home';
import { IonReactRouter } from '@ionic/react-router';
import NovaSimulacao from './pages/NovaSimulacao';
import React from 'react';
import { database } from './services/database';

setupIonicReact();

const App: React.FC = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    database.init().then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} exact />
          <Route path="/nova-simulacao" component={NovaSimulacao} exact />
          <Route path="/historico" component={Historico} exact />
          <Route path="/detalhes/:id" component={Detalhes} exact />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
