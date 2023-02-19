import './App.css';

import Main from './components/main';

import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { Router } from 'react-router-dom';

const store = ConfigureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
