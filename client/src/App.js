import './App.css';

import Main from './components/main';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { Router } from 'react-router-dom';

import { createBrowserHistory } from "history";
import ReactGA from 'react-ga';

// Initialize Google Analytics
ReactGA.initialize('UA-190725914-1');
ReactGA.pageview("/");

// Track history change
const history = createBrowserHistory();
history.listen((location) => {
    ReactGA.pageview(location.pathname + location.search);
});

const store = ConfigureStore();

// Track login event
const Login = (preview, uni = null) => {
    if (preview){
        ReactGA.event({
            category: "Login",
            action: "Logged in with preview"
        });
    }else{
        ReactGA.event({
            category: "Login",
            action: "Logged in with username",
            label: uni
        });
    }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <Main Login={Login} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
