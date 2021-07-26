import { Route, Switch } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import ProjectPage from '../screens/ProjectPage';
import ProjectDetailsPage from '../screens/ProjectDetailsPage';
import ProjectEditPage from '../screens/ProjectEditPage';
import ContactPage from '../screens/ContactPage';
import LoginPage from '../screens/LoginPage';
import ProjectForm from './ProjectForm';

export default function Main() {
  return (
    <>
      <main>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/project" component={ProjectPage} />
          <Route exact path="/project/:id" component={ProjectDetailsPage} />
          <Route exact path="/project-edit/:id" component={ProjectEditPage} />
          <Route exact path="/project-form" component={ProjectForm} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </main>
    </>
  );
}
