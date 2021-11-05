import React from 'react';
import { Switch } from 'react-router-dom';
import { ChangeProject } from '../screens/ChangeProject';
import { Dashboard } from '../screens/Dashboard';
import { NewProject } from '../screens/NewProject';

import  Route  from './Route';

const Routes: React.FC = () => (
    <Switch>
      <Route exact path="/" component={ Dashboard } />
      <Route path="/new-project" component={ NewProject } />
      <Route path="/change-project" component={ ChangeProject } />
    </Switch>
  );
  
export default Routes;