import React, { Component } from 'react';
import CSSBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, withRouter } from 'react-router-dom';

import FourOFour from './Pages/Errors/404.js';
import LoginPage from './Pages/Login/LoginPage.js';
import LandingPage from './Pages/Landing/LandingPage.js';


class App extends Component
{
    render()
    {
        // TODO: Use Routes instead.
        return (
            <div>
                <CSSBaseline/>

                <Switch>
                    <Route exact path="/login" render={() => <LoginPage/>}/>
                    <Route exact path="/landing" render={() => <LandingPage/>}/>
                    <Route component={FourOFour}/>
                </Switch>

            </div>
        );
    }
}

export default withRouter(App);
