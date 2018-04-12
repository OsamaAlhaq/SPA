import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button } from 'reactstrap';
import "../styles/form.css"

// component that decorates redux form input field
const renderInput = ({ input, label }) => {
    return (
        <input
            className={"text-box "}
            {...input}
            placeholder={label}
            type={"text"}
            required={true}
            name={label}
        />
    );
};

// create new contact form
const CreateContact = props => {
    const { handleSubmit } = props;

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Create Contact:</h3>
            <div className="inputs">
                <Field
                    component={renderInput}
                    label="First Name"
                    name="FirstName"
                />
                <Field
                    component={renderInput}
                    label="Last Name"
                    name="LastName"
                />
            </div>
            <h6>Gender:</h6>
            <div className="gender">
                <p>Male:</p>
                <Field name="sex" component="input" type="radio" value="male" />
                <p>Female:</p>
                <Field name="sex" component="input" type="radio" value="female" />
            </div>
            <h6>Birthday:</h6>
            <div className="inputs">
                <Field
                    component={renderInput}
                    label="Month(MM)"
                    name="Month"
                />
                <Field
                    component={renderInput}
                    label="Day(DD)"
                    name="Day"
                />
                <Field
                    component={renderInput}
                    label="Year(YYYY)"
                    name="Year"
                />
            </div>
            <Button>Create</Button>
        </form >
    );
};

// connect to redux form
export default reduxForm({
    form: "create"
})(CreateContact);
