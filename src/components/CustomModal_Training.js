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

    rulesetDiv = () => {

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
                        <p>
                            In this popup, you will be presented with the ruleset. This ruleset represents the different paths of dilemmas that are possible once a decision is made. <br />
                            In reading this popup box, the aggregate (combination of your input and the teammate input) will make the decision on your next dilemma. 
                            The left coloumn represents the dilemma you are on, and the following numbers shows which dilemma you will venture towards should that option be chosen. <br />
                            For instance : "Dilemma 3 : 5 , 6" means that you are on dilemma 3 and if the aggregate chooses the left option, your next dilemma will be dilemma 5. However if the aggregate chooses the right option, your next dilemma will be #6.
                        </p>
                        <p>Dilemma # : Left Option Dilemma, Right Option Dilemma</p>
                        <p>
                            NOTE : SAMPLE DILEMMA RULESET <br/>
                            Dilemma 0 : 4 , 5 <br/>
                            Dilemma 1 : 1 , 2 <br/>
                            Dilemma 2 : 6 , 2 <br/>
                            Dilemma 3 : 2 , 5 <br/>
                            Dilemma 4 : 3 , 2 <br/>
                            Dilemma 5 : 0 , 1 <br/>
                            Dilemma 6 : 4 , 6
                        </p>
                    </div>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div >
        );
    }
}
// export default CustomModal;