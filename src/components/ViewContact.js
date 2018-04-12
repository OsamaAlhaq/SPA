import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../actions";

// Component to display individual contact details
class ViewContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resource: props.contact,
            name: ""
        };
        this.deleteContact = this.deleteContact.bind(this);
    }

    componentDidMount() {
        // get the contact details
        this.props.getContactDetails(this.state.resource);
    }

    // update the state if the props update
    componentWillReceiveProps(nextProps) {
        if (this.props.details !== nextProps.details) {
            // update the state once contact loads
            this.setState({ name: nextProps.details.names[0].displayName });
        }
    }

    // delete the contact
    deleteContact() {
        this.props.deleteContact(this.state.resource);
        // callback to previous dom
        this.props.onClick();
    }

    render() {
        return (
            <div>
                <div className="contact-button">
                    <Button onClick={this.props.onClick}>Go Back</Button>
                    <Button onClick={() => this.deleteContact()}>Delete Contact</Button>
                </div>
                <div>
                    <h4>Details:</h4>
                    <p>{this.state.name}</p>
                </div>
            </div>
        );
    }
}

// get the reducer state
const mapStateToProps = state => {
    return {
        details: state.contact
    };
};

export default connect(mapStateToProps, actions)(ViewContact);
