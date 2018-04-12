import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";
import {
  Button,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Contacts from "./Contacts.js"
import CreateContact from "./CreateContact.js"
import '../styles/App.css';
import config from '../config.js';
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list.connections,
      dropdownOpen: false,
      showForm: false
    };
    this.toggle = this.toggle.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  // When the component mounts check if they have authenticated
  componentDidMount() {
    window.gapi.load('client', () => {
      this.checkAuth(this.handleAuth.bind(this));
    });
  }

  // update the state if the props update
  componentWillReceiveProps(nextProps) {
    if (this.props.list.connections !== nextProps.list.connections) {
      // update the state once contacts load
      this.setState({ list: nextProps.list.connections });
    }
  }

  // function to handle if user got authenticated
  handleAuth(authResult) {
    // if user is authenticated
    if (authResult && !authResult.error) {
      // get the list of contacts
      this.props.listConnectionNames();
    }
  }

  // helper function to authorize the API client library
  checkAuth(callback) {
    window.gapi.auth.authorize({
      'discoveryDocs': config.discoveryDocs,
      'client_id': config.clientId,
      'scope': config.scope
    }, callback);
  }

  // toggle the dropdown to open/close
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  // function that gets the form values
  submitForm(values) {
    const { FirstName, LastName, sex, Month, Day, Year } = values;
    // create the contact name and birthday object
    const birthday = {
      day: Day,
      month: Month,
      year: Year
    };
    const name = {
      first: FirstName,
      last: LastName
    };
    // create the contact
    this.props.createContact(sex, birthday, name);
  }

  // function to filter the state array
  sortBy(filter) {
    // sort using lodash 
    let sortedObjs = [];
    if (filter === "name") {
      sortedObjs = _.sortBy(this.state.list, ['names[0].displayName']);
    } else if (filter === "gender" ) {
      sortedObjs = _.sortBy(this.state.list, ['genders[0].value']);
    } else {
      sortedObjs = _.sortBy(this.state.list, ['birthdays[0].date.year']);
    }
    // update our state
    this.setState({ list: sortedObjs });
  }

  render() {
    return (
      <Container>
        <Row className="header">
          <Col>
            <h5 className="title">
              SPA Application
          </h5>
          </Col>
          <Col>
            <Button color="primary" onClick={() => this.setState({ showForm: !this.state.showForm })} >
              Create Contact
            </Button>
          </Col>
          <Col>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                Filter
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.sortBy("name")} >Name</DropdownItem>
                <DropdownItem onClick={() => this.sortBy("gender")} >Gender</DropdownItem>
                <DropdownItem onClick={() => this.sortBy("birthday")} >Birthday</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="App">
          {this.state.showForm ? <CreateContact onSubmit={this.submitForm} /> : null}
        </Row>
        <Row className="App">
          <Contacts contacts={this.state.list} />
        </Row>
        <p onClick={() => this.props.listConnectionNames(this.props.list.nextPageToken)} >Load More</p>
      </Container>
    );
  }
}

// get the reducer state
const mapStateToProps = state => {
  return {
    list: state.list
  };
};

export default connect(mapStateToProps, actions)(App);