import './App.css';

import Main from './components/main';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

const store = ConfigureStore();
const history = createBrowserHistory();

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
