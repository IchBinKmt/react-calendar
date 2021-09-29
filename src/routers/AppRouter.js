import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import React from 'react';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRouter';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <h5>Espere...</h5>;
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path="/login" component={LoginScreen} isAuth={!!uid} />
                    <PrivateRoute exact path="/" component={CalendarScreen} isAuth={!!uid} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};
