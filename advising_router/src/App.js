import React, { Component } from 'react';
import CSSBaseline from '@material-ui/core/CssBaseline';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

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
        this.pushHistory("/landing");

        this.setState({user: user});
    }


    pushHistory(location)
    {
        this.props.history.push(location);
    }


    render()
    {
        // TODO: Use Routes instead.
        return (
            <div>
                <CSSBaseline/>

                {console.log(this.state.user)}

                <Switch>
                    <Route exact path="/landing" render={() => <LandingPage userType={this.state.user !== null ? this.state.user['role'] : "none"}/>}/>
                    <Route exact path="/login" render={() => <LoginPage setUser={this.setUser}/>}/> :
                    <Route component={FourOFour}/>
                </Switch>

            </div>
        );
    }
}

export default withRouter(App);
