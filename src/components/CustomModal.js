import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const summaries = {
    dilemma_zero: "You are in an autonomous vehicle that is about to crash and you must choose which group of people your car should crash into.",
    dilemma_one: "You are asked to donate a kidney to save a person's life.",
    dilemma_two: "You are asked whether or not you will steal food to feed starving people.",
    dilemma_three: "You are asked to steal from a pharmacy to obtain essential medication.",
    dilemma_four: "You are asked to choose whether or not to accept or return a gift you do not like.",
    dilemma_five: "You are asked to personally kill an individual to save the life of another.",
    diemma_six: "You are pickpocketed and have to choose between chasing after the pickpocket or reporting the crime."
}

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        // var subtitle;
        // const [modalIsOpen, setIsOpen] = React.useState(false);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.state = {
            subtitle: '',
            modalIsOpen: false,
            setIsOpen: false
        }
        console.log(this.props.ruleset);
    }
    
    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    render() {
        return(
            <div>
                <button className="openModal" onClick={this.openModal}>Open Ruleset</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2>RuleSet</h2>
                    <div>
                        <p>Dilemma # : Left Option Dilemma, Right Option Dilemma</p>
                        <p>
                            Dilemma 0 : {this.props.ruleset[0][0]} , {this.props.ruleset[0][1]} <br/>
                            Dilemma 1 : {this.props.ruleset[1][0]} , {this.props.ruleset[1][1]} <br/>
                            Dilemma 2 : {this.props.ruleset[2][0]} , {this.props.ruleset[2][1]} <br/>
                            Dilemma 3 : {this.props.ruleset[3][0]} , {this.props.ruleset[3][1]} <br/>
                            Dilemma 4 : {this.props.ruleset[4][0]} , {this.props.ruleset[4][1]} <br/>
                            Dilemma 5 : {this.props.ruleset[5][0]} , {this.props.ruleset[5][1]} <br/>
                            Dilemma 6 : {this.props.ruleset[6][0]} , {this.props.ruleset[6][1]} 
                        </p>
                        <p>
                            {summaries.dilemma_zero} <br/>
                            {summaries.dilemma_one} <br/>
                            {summaries.dilemma_two} <br/>
                            {summaries.dilemma_three} <br/>
                            {summaries.dilemma_four} <br/>
                            {summaries.dilemma_five} <br/>
                            {summaries.dilemma_six} <br/>
                        </p>
                    </div>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div >
        );
    }
}
// export default CustomModal;