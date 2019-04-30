import React, { Component } from 'react';
import CSSBaseline from '@material-ui/core/CssBaseline';
import { Route, Redirect, Switch } from 'react-router-dom';

import FourOFour from './Pages/Errors/404.js';
import LoginPage from './Pages/Login/LoginPage.js';
import LandingPage from './Pages/Landing/LandingPage.js';


class App extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            user: null
        };

        this.setUser = this.setUser.bind(this);
    }


    setUser(user)
    {
        console.log(user);
        this.setState({user: user});
    }


    render()
    {
        // TODO: Use Routes instead.
        return (
            <div>
                <CSSBaseline/>

                <Switch>
                    <Route path="/landing" render={() => <LandingPage/>}/>
                    <Route path="/login" render={() => <LoginPage setUser={this.setUser}/>}/> :
                    {
                        // TODO: Try and use the authentication cookie?
                        this.state.user === null ?
                        <Redirect to="/login"/> :
                        <Redirect to="/landing"/>
                    }
                    <Route component={FourOFour}/>
                </Switch>

            </div>
        );
    }
}

export default App;
