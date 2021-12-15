import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MainView } from '@components/MainView/MainView';
// import { RentModal } from '../components/RentModal/RentModal';

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/history">
                    <MainView testString="History" />
                </Route>
                <Route exact path="/rented">
                    <MainView testString="Rented" />
                </Route>
                <Route exact path="/">
                    <MainView testString="SEARCH" />
                    {/* <RentModal isOpen={true}/> */}
                </Route>
                <Route path="*">
                    <div>404</div>
                </Route>
            </Switch>
        </Router>
    );
};
