import React, { Component } from 'react';
import CSSBaseline from '@material-ui/core/CssBaseline';

import LoginPage from './Pages/Login/LoginPage.js';
import AdvisorLandingPage from "./Pages/Advisor/AdvisorLandingPage";


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

    // Should only be called by the LoginPage component
    setUser(user)
    {
        this.setState({user: user});
    }

    getHTMLToReturn()
    {
        // Check if a user is logged in, if not give them the LoginPage
        if(this.state.user === null)
        {
            return <LoginPage setUser={this.setUser}/>;
        }
        else
        {
            // Determine if we need to give the AdvisorLandingPage for an Advisor or Advisee
            let role = this.state.user['role'];
            if(role === "advisor")
            {
                return <AdvisorLandingPage user={this.state.user}/>;
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
