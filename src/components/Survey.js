import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import CustomModal from './CustomModal.js';
// import { Link } from 'react-router';     

import { Link } from "gatsby";
import axios from 'axios';

import Popup from './Popup';

import './Survey.css';

const qtracker = [false, false, false, false, false, false, false];
let dilemmaCount = 0;

export default class Survey extends Component {
    constructor(props) {
        super(props);
        this.getQuestions = this.getQuestions.bind(this);
        this.sliderChange = this.sliderChange.bind(this);
        this.state = {
            description: "",
            option_uno: "",
            option_dos: "",
            data: [],
            currentQuestion: 0
        }
    }

    componentWillMount() {
        this.getQuestions();
    }

    // API get call axios
    getQuestions() {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/get_dilemma',
            params: {
                'pid': localStorage.getItem('pid')
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then((response) => {
            console.log(response.data);
            // TODO: check that the ruleset makes it here from the flaskapp
            this.setState( {data: response.data});
        }, (error) => {
            console.log(error);
        });
    }

    // API post call axios
    postResponse() {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/post_response',
            params: {
                'pid': localStorage.getItem('pid'),
                'condition': localStorage.getItem('condition'),
                'qNum': this.currentQuestion,
                'qid': this.state.data['id'],
                'humanSliderPos': document.getElementById('slider_human').value,
                'aggregateSliderPos': document.getElementById('slider_aggregate').value,
                'aiSliderPos': document.getElementById('slider_ai').value
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
        .then((response) => {
            if(response.data === 'Data recorded') {

            } else {
                this.setState({data: response.data});
            }
        }, (error) => {
            console.log(error);
        });
    }

    handleClick = () => {
        if (dilemmaCount < 15) {
            if ((dilemmaCount % 2) === 0) {                        // Only show Human slider
                document.getElementById('aggregate_label').removeAttribute('hidden');
                document.getElementById('ai_label').removeAttribute('hidden');

            } else if ((dilemmaCount % 2) === 1) {                 // Show AI and Aggregate slider with human 
                this.postResponse();
                this.setState({ 
                    currentQuestion: Math.floor(dilemmaCount / 2),
                    description: this.state.data['Description'],
                    option_uno: this.state.data['Option_0'],
                    option_dos: this.state.data['Option_1']
                });
                document.getElementById('sliderValue').innerHTML = 'Indifferent';
                document.getElementById('slider_human').value = 0;
                document.getElementById('slider_aggregate').value = 0;
                document.getElementById('slider_ai').value = 0;
                document.getElementById('aggregate_label').setAttribute('hidden', true);
                document.getElementById('ai_label').setAttribute('hidden', true);
            }
            dilemmaCount++;
        } 
        else {
            console.log("here")
            document.getElementById("questionbox").style.display =
            "none"
            document.getElementById("thankyoubox").style.display =
            "block"
        }
        console.log(dilemmaCount);
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
                    <p> {this.state.data['Description']} </p>
                    <br />

                    <div id="options_container">
                        <p className="option_uno"> {this.state.data['Option_0']} </p>
                        <p className="option_dos"> {this.state.data['Option_1']} </p>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    
                    <CustomModal
                        //ruleSet = {this.state.data.ruleset}
                    ></CustomModal>

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
