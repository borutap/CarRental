import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MainView } from '@components/MainView/MainView';
import { HistoryView } from '@components/HistoryView/HistoryView';
import { RentedView } from '@components/RentedView/RentedView';

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/history">
                    <HistoryView testString="History" />
                </Route>
                <Route exact path="/rented">
                    <RentedView testString="Rented" />
                </Route>
                <Route exact path="/">
                    <MainView testString="SEARCH" />
                </Route>
                <Route path="*">
                    <div>404</div>
                </Route>
            </Switch>
        </Router>
    );
};
