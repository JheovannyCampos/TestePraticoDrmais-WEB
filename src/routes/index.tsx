import React from 'react';
import { Switch } from 'react-router-dom';

import { Dashboard } from '../screens/Dashboard';
import { NewProject } from '../screens/NewProject';

import  Route  from './Route';

const Routes: React.FC = () => (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/new-project" component={NewProject} />
    </Switch>
  );
  
export default Routes;