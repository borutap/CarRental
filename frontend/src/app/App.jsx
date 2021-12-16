import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MainView } from '@components/MainView/MainView';
import { RentedView } from '@components/RentedView/RentedView';
import { HistoryView } from '@components/HistoryView/HistoryView'
// import { RentModal } from '../components/RentModal/RentModal';
// import { ReturnModal } from '../components/ReturnModal/ReturnModal';

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/history">
                    <History testString="History" />
                </Route>
                <Route exact path="/rented">
                    {/* Dla klienta jego wypozyczone, dla pracownika wszystkie wypozyczone */}
                    <RentedView testString="Rented" />
                    {/* <ReturnModal isOpen={true}/> */}
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
