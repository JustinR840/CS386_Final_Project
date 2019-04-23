import React, { Component } from 'react';
import CSSBaseline from '@material-ui/core/CssBaseline';
import { Route, Link } from 'react-router-dom';

import LoginPage from './Login/LoginPage.js';
import LandingPage from './Landing/LandingPage.js';


class App extends Component {
    render()
    {
        // TODO: Use Routes instead.
        return (
            <div>
                <CSSBaseline/>
                <Route exact path="/" component={LoginPage}/>
                <Route path="/landing" component={LandingPage}/>
                {/*{this.state.login_successful === false ?*/}
                    {/*<Route path="/login" render={(props) => <LoginRoute {...props} data={this.loginSuccessful}/>}/> :*/}
                    {/*<Route path="/landing" component={LandingPageRoute}/>}*/}
            </div>
        );
    }
}

export default App;
