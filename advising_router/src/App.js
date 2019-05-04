import React, { Component } from 'react';
import CSSBaseline from '@material-ui/core/CssBaseline';

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
        console.log("Setting user to: ");
        console.log(user);
        this.setState({user: user});
    }

    getHTMLToReturn()
    {
        if(this.state.user === null)
        {
            return <LoginPage setUser={this.setUser}/>;
        }
        else
        {
            let role = this.state.user['role'];
            if(role === "advisor")
            {
                return <LandingPage user={this.state.user}/>;
            }
            else if(role === "advisee")
            {
                return <h3>ADIVSEE VIEW</h3>;
            }
        }
    }

    render()
    {
        // TODO: Use Routes instead.
        return (
            <div>
                <CSSBaseline/>
                {this.getHTMLToReturn()}
            </div>
        );
    }
}

export default App;
