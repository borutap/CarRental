import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MainView } from '@components/MainView/MainView';
import { HistoryView } from '@components/HistoryView/HistoryView';
export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/history">
                    <HistoryView testString="History" />
                </Route>
                <Route exact path="/rented">
                    <MainView testString="Rented" />
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
