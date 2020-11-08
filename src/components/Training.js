import React, { Component } from 'react';
import { Link } from "gatsby";

import './Survey.css';

import CustomModal from './CustomModal.js';

let clickCount = 0;

export default class Training extends Component {
    constructor(props) {
        super(props);
        this.sliderChange = this.sliderChange.bind(this);
        this.state = {
            description: "Welcome to the TRACE Lab Ethical Frameworks Study! \n \
                    In this study you will be presented with a Ethical Dilemma and asked to choose an option on the likert scale that you most agree with.\
                    At the end of the study, you will see a button labeled 'End Session' please click that and read the debriefing form to finish particiating in this study.",
                    // "Welcome to the TRACE Research Group Ethical Frameworks Study! \n \
                    // "In this study you will be presented "
            
            option_uno: "Option 1",
            option_dos: "Option 2",
            data: {
                'Option_0': "Option 1",
                "Option_1": "Option 2"
            },
            currentQuestion: 0
        }
    }
    
    handleClick = () => {
        if (clickCount == 0) {
            document.getElementById('aggregate_label').removeAttribute('hidden');
            document.getElementById('ai_label').removeAttribute('hidden');
        }
        else if (clickCount == 1) {
            document.getElementById('sliderValue').innerHTML = 'Indifferent';
            document.getElementById('slider_human').value = 0;
            document.getElementById('slider_aggregate').value = 0;
            document.getElementById('slider_ai').value = 0;
            document.getElementById('aggregate_label').setAttribute('hidden', true);
            document.getElementById('ai_label').setAttribute('hidden', true);

            // console.log("here")
            document.getElementById("questionbox").style.display =
            "none"
            document.getElementById("thankyoubox").style.display =
            "block"
        }
        clickCount++;
    }

    sliderChange() {
        let value = document.getElementById('slider_aggregate').value;
        if (value > 0) {
            document.getElementById('sliderValue').innerHTML = this.state.data['Option_1'];
        } else if (value < 0) {
            document.getElementById('sliderValue').innerHTML = this.state.data['Option_0'];
        } else {
            document.getElementById('sliderValue').innerHTML = 'Indifferent';
        }
    
        // document.getElementById('sliderValue').innerHTML = document.getElementById('slider_human').value;
        document.getElementById('slider_aggregate').value = document.getElementById('slider_human').value * .5 + document.getElementById('slider_ai').value * .5;
    }

    render () {
        return (
            <div className="QuestionFormat">
                <div id="questionbox">
                    <p>{this.state.description}</p>
                    <br />

                    <div id="options_container">
                        <p className="option_uno"> {this.state.option_uno} </p>
                        <p className="option_dos"> {this.state.option_dos} </p>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    
                    <CustomModal></CustomModal>

                    <br />
                    <br />
                    <br />

                    <h1 id='sliderValue' className='sliderValue'>Indifferent</h1>
                    <label className='sliderLabel'>
                        Your Response:
                        <input id='slider_human' className="slider" type="range" onChange={this.sliderChange} defaultValue={0} max={50} min={-50}/>
                    </label>
                    <br />
                    <label id='aggregate_label' className='sliderLabel' hidden>
                        Aggregate Response:
                        <input id='slider_aggregate' className="slider" type="range" onChange={this.sliderChange} defaultValue={0} max={50} min={-50} disabled/>
                    </label>
                    <br />
                    <label id='ai_label' className='sliderLabel' hidden>
                        Teammate Response:
                        <input id='slider_ai' className="slider" type="range" onChange={this.sliderChange} defaultValue={0} max={50} min={-50} disabled/>
                    </label>

                    <br /> 
                    <br />
                    <button id="clickme" onClick={this.handleClick}>
                    Submit
                    </button>
                </div>
                <div id="thankyoubox" style={{ display: "none" }}>
                    <br />
                    <br />
                    <Link to="/Survey" className="debrief-button">Start Session</Link>
                </div>
            </div>
        )
    }
}