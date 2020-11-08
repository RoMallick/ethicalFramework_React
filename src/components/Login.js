import React, { Component } from 'react'
import {Link} from 'gatsby'
import SEO from "../components/seo"

import "../components/Login.css"
import TRACEimg from '../images/TRACE_overview.png'

export class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let params = new URLSearchParams(document.location.search.substring(1));

        console.log(params.get('id'));
        console.log(params.get('condition'));
        localStorage.setItem('pid', params.get('id'));
        localStorage.setItem('condition', params.get('condition'));
    }

    componentDidMount() {
        document.location.href = '/Training';
    }

    storeId() {
        localStorage.setItem('pid', document.getElementById('pid').value);
        document.location.href = '/Training';
    }

    render() {
        return (
            <div>
                <img src={TRACEimg} className="traceimg"/>
                <div className="login-component">
                    <div>Redirecting...</div>
                </div>
            </div>
        )
    }
}

export default Login;
