import React, { Component } from "react";
import {
  Button, Row, Col
} from 'reactstrap';
import ViewContact from "./ViewContact.js"
import "../styles/contact.css"

// Component which renders the list of contacts
class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
      resourceName: "",
      contacts: props.contacts
    };
    this.submit = this.submit.bind(this);
  }

  // helper function to format the contact birthday field
  displayBirthday = date => {
    return date.day + " " + date.month + " " + date.year;
  }

  // function for when the view contact is pressed
  viewContact = contact => {
    // store the contact resource in the state
    this.setState({
      showDetails: true,
      resourceName: contact
    })
  };

  // callback for when the user wants to go back
  submit() {
    this.setState({
      showDetails: false
    })
  }

  // function to display each contact
  renderContacts = contacts => {
    return contacts.map(name => {
      return (
        <Row key={name.resourceName} className="contact-row">
          <Col>
            {name.names[0].displayName}
          </Col>
          <Col>
            {name.genders ? name.genders[0].formattedValue : "Gender Not Specified"}
          </Col>
          <Col>
            {name.birthdays ? this.displayBirthday(name.birthdays[0].date) : "Birthday Not Specified"}
          </Col>
          <Col>
            <Button onClick={() => this.viewContact(name.resourceName)}>
              View Contact
          </Button>
          </Col>
        </Row>
      );
    });
  };

  render() {
    return (
      <div>
        {this.state.showDetails
          ? <ViewContact
            onClick={this.submit}
            contact={this.state.resourceName}
          />
          : this.renderContacts(this.props.contacts)}
      </div>
    );
  }
}

export default Contacts;
