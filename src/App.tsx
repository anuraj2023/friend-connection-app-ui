import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
//import { Toaster } from "./components/shadcn/components/ui/toaster";
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import LogoutPage from './components/LogoutPage';
//import { setupAuthToken } from './services/api';

function App() {
  // useEffect(() => {
  //   setupAuthToken();
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
          <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/logout" component={LogoutPage} />
          </Switch>
        </Layout>
        {/* <Toaster /> */}
      </Router>
    </Provider>
  );
}

export default App;