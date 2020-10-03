import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import AdminPage from './pages/Admin'

const Router = () => {
    const user = useTracker(() => Meteor.user());

    return (
        <Switch>
            <Route exact path='/'>
                <HomePage />
            </Route>
            <Route exact path='/login'>
                <LoginPage />
            </Route>
            <Route exact path='/register'>
                <RegisterPage />
            </Route>
            <Route exact path='/admin'>
                {user 
                    ? <AdminPage />
                    : <Redirect to='/login' />
                }
            </Route>
      </Switch>
    )
}

export default Router