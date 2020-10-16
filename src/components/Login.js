import React, { Component } from 'react'
import {Link} from 'gatsby'
import SEO from "../components/seo"

import "../components/Login.css"
import TRACEimg from '../images/TRACE_overview.png'

export class Login extends Component {
    constructor(props) {
        super(props);
    }

    
    storeId() {
        localStorage.setItem('pid', document.getElementById('pid').value);
        document.location.href = '/Survey';
    }

    render() {
        return (
            <div>
                <img src={TRACEimg} className="traceimg"/>
                <div className="login-component">
                    {/* <SEO title="Login" /> */}
                    <label id="pidlabel">Participant ID: </label>
                    <input type="text" id="pid" name="pid" defaultValue=' ' ></input>
                    <br />
                    <br />
                    <button onClick={this.storeId} className="button">Login</button>
                </div>
            </div>
        )
    }
}

export default Login;
