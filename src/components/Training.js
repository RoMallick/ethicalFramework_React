import React, { Component } from 'react';
import { Link } from "gatsby";

import './Survey.css';

import CustomModal from './CustomModal_Training.js';

let clickCount = 0;

export default class Training extends Component {
    constructor(props) {
        super(props);
        this.sliderChange = this.sliderChange.bind(this);
        this.state = {
            title: 
                "Welcome to the TRACE Research Group Ethical Frameworks Study!",
            description_uno: 
                "In this study you will be presented with an Ethical Dilemma and will be asked to use the slider provided to demonstrate the degree of which option you agree with most. \
                Please note that there are no right answers and that as you deviate from the middle, your preference gets stronger for that designated option.",
            description_dos:
                "After hitting submit once, the AI agent will then make its decision through its designated slider. The aggregate of your two decisions will influence the final decision made in that scenario.", 
            description_tres: 
                "For further clarification, there is a dynamic text box that changes with the aggregate slider decision. During this time you are free to change your answer to influence the aggregate. \
                Once you are satisfied please hit the submit button again to move on to the next dilemma.", 
            description_quatro:
                "Please note that you cannot move the AI or aggregate sliders, just your designated slider. \
                At the end of the study, you will see a debriefing form. Once read, please go back to the survey in qualtrics. This training page allows you to get a feel for the study. Please hit “Start Session” when you are ready to begin.",
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
                    <h3>{this.state.title}</h3>
                    <p>{this.state.description_uno}</p>
                    <p>{this.state.description_dos}</p>
                    <p>{this.state.description_tres}</p>
                    <p>{this.state.description_quatro}</p>
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

                    <div id="buttonContainer">
                        <button className="submitBtn" onClick={this.handleClick}>
                            Submit
                        </button>

                        <CustomModal
                        className="customModal"></CustomModal>
                    </div>
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