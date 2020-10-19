import React, { Component } from 'react';

// TODO: Fix linking pages with each other. Only the link func from gatsby works. This react-router doesn't want to work. 
// import { Link } from 'react-router';     

import { Link } from "gatsby";
import axios from 'axios';

import './Survey.css';

const qtracker = [false, false, false, false, false, false, false];
let dilemmaCount = 0;
let flag = true;

export default class Survey extends Component {
    constructor(props) {
        super(props);
        this.sliderChange = this.sliderChange.bind(this);
        this.state = {
            description: "Welcome to the TRACE Lab Ethical Frameworks Study! \n \
                    In this study you will be presented with a Ethical Dilemma and asked to choose an option on the likert scale that you most agree with.\
                    At the end of the study, you will see a button labeled 'End Session' please click that and read the debriefing form to finish particiating in this study.",
            option_uno: "Option 1",
            option_dos: "Option 2",
            data: [],
            currentQuestion: 0
        }
    }

    

    // API call axios
    getQuestions() {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/get_data',
            params: {
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then((response) => {
            console.log(response)
            this.setState( {data: response.data} );
            console.log(this.state.data[0].Description);
        }, (error) => {
            console.log(error);
        });
    }


    componentDidMount() {
        this.getQuestions();
    }

    // handleClick = () => {
    //     if (dilemmaCount < 7) {
    //         if (flag) {
    //             document.getElementById('aggregate_label').removeAttribute('hidden');
    //             document.getElementById('ai_label').removeAttribute('hidden');

    //         } else {
    //             dilemmaCount++;
    //             this.setState({ 
    //                 currentQuestion: dilemmaCount,
    //                 description: this.state.data[dilemmaCount].Description,
    //                 option_uno: this.state.data[dilemmaCount].Option_0,
    //                 option_dos: this.state.data[dilemmaCount].Option_1
    //             });
    //             document.getElementById('sliderValue').innerHTML = 'Indifferent';
    //             document.getElementById('slider_human').value = 0;
    //             document.getElementById('slider_aggregate').value = 0;
    //             document.getElementById('slider_ai').value = 0;
    //             document.getElementById('aggregate_label').setAttribute('hidden', true);
    //             document.getElementById('ai_label').setAttribute('hidden', true);
    //         }
            
    //         flag = !flag;
    //     } 
    //     else {
    //         console.log("here")
    //         document.getElementById("questionbox").style.display =
    //         "none"
    //         document.getElementById("thankyoubox").style.display =
    //         "block"
    //     }
    // }

    handleClick = () => {
        if (dilemmaCount < 15) {
            if ((dilemmaCount % 2) == 0) {
                document.getElementById('aggregate_label').removeAttribute('hidden');
                document.getElementById('ai_label').removeAttribute('hidden');

            } else if ((dilemmaCount % 2) == 1) {
                // count++;
                this.setState({ 
                    currentQuestion: count,
                    description: this.state.data[Math.ceil(dilemmaCount / 2)].Description,
                    option_uno: this.state.data[Math.ceil(dilemmaCount / 2)].Option_0,
                    option_dos: this.state.data[Math.ceil(dilemmaCount / 2)].Option_1
                });
                document.getElementById('sliderValue').innerHTML = 'Indifferent';
                document.getElementById('slider_human').value = 0;
                document.getElementById('slider_aggregate').value = 0;
                document.getElementById('slider_ai').value = 0;
                document.getElementById('aggregate_label').setAttribute('hidden', true);
                document.getElementById('ai_label').setAttribute('hidden', true);
            }
            dilemmaCount++;
            // flag = !flag;
        } 
        else {
            console.log("here")
            document.getElementById("questionbox").style.display =
            "none"
            document.getElementById("thankyoubox").style.display =
            "block"
        }
    }

    sliderChange() {
        let value = document.getElementById('slider_aggregate').value;
        if (value > 0) {
            document.getElementById('sliderValue').innerHTML = this.state.data[this.state.currentQuestion].Option_1;
        } else if (value < 0) {
            document.getElementById('sliderValue').innerHTML = this.state.data[this.state.currentQuestion].Option_0;
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
                    Thank you for participating!!
                    <br />
                    <br />
                    <Link to="/Debrief" className="debrief-button">End Session</Link>
                </div>
            </div>
        )
    }    
}
