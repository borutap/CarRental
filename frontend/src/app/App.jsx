import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { FaBeer } from 'react-icons/fa';

export const App = () => {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Update the count (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  // Return the App component.
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="App">
            <header className="App-header">
              <p>
                Wypożyczalnia otwarta przez <code>{count}</code> sekund <FaBeer />.
              </p>
            </header>
          </div>
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  );
}
