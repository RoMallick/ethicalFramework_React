import React, { Component } from 'react';

// TODO: Fix linking pages with each other. Only the link func from gatsby works. This react-router doesn't want to work. 
// import { Link } from 'react-router';     

import { Link } from "gatsby";
import ReactSlider from 'react-slider'

import './Survey.css'


const qtracker = [false, false, false, false, false, false, false];
let count = 0;

export default class Survey extends Component {

    state = {
        quote: "Welcome to the TRACE Lab Ethical Frameworks Study! \n \
                In this study you will be presented with a Ethical Dilemma and asked to choose an option on the likert scale that you most agree with.\
                At the end of the study, you will see a button labeled 'End Session' please click that and read the debriefing form to finish particiating in this study.",
        option_uno: "Option 1",
        option_dos: "Option 2",
    }

    readData = () => {
        // var data = require('xml-loader!../data/questions.xml');
        var data = require("xml-loader!../data/dilemmas.xml")

        var rando = 0
        do {
            rando = Math.floor(Math.random() * 7)
        } while (qtracker[rando] == true)

        qtracker[rando] = true

        this.setState({
            quote: data.QuestionBank.Question[rando].QuestionContent[0],
            option_uno: data.QuestionBank.Question[rando].OptionContent[0]._,
            option_dos: data.QuestionBank.Question[rando].OptionContent[1]._,
        })
    }

    handleClick = () => {
        if (count < 7) {
            count++
            this.readData()
            console.log("count", count)
        } else {
            console.log("here")
            document.getElementById("questionbox").style.display =
            "none"
            document.getElementById("thankyoubox").style.display =
            "block"
        }
    }

    render () {
        return (
            <div className="QuestionFormat">
                <div id="questionbox">
                    <p>{this.state.quote}</p>
                    <br />

                    <div id="options_container">
                        <p class="option_uno"> {this.state.option_uno} </p>
                        <p class="option_dos"> {this.state.option_dos} </p>
                    </div>

                    <br />
                    <br />

                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        renderTrack={(props, state) => <div {...props}>{state.valueNow}</div>}
                        min= {-50}
                        max= {50}
                    />

                    <br />
                    <br />

                    <input className= "slider" type="range" defaultValue={0} max={50} min={-50}/>

                    <br /> 
                    <br />
                    <button id="clickme" onClick={this.handleClick}>
                    Submit
                    </button>
                </div>
                <div id="thankyoubox" style={{ display: "none" }}>
                    Thank you for participating!!
                    <br />
                    <br />
                    <Link to="/Debrief" className="debrief-button">End Session</Link>
                </div>
            </div>
        )
    }    
}