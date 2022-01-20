import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MainView } from './components/MainView/MainView';
import { HistoryView } from './components/HistoryView/HistoryView';
import { RentedView } from './components/RentedView/RentedView';

export const UserContext = React.createContext();

export const App = () => {
    const [role, setRole] = useState(localStorage.getItem("role") || "guest");    

    return (
        <Router>
            <Switch>
                <UserContext.Provider value={role}>
                    <Route exact path="/history">
                        <HistoryView setRole={setRole} />
                    </Route>
                    <Route exact path="/rented">
                        <RentedView setRole={setRole} />
                    </Route>
                    <Route exact path="/">
                        <MainView setRole={setRole} />
                    </Route>
                    </UserContext.Provider>
                <Route path="*">
                    <div>404</div>
                </Route>
            </Switch>
        </Router>
    );
};
