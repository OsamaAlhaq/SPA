import {
    LOAD_CONTACT,
    LIST_CONTACTS,
    DELETE_CONTACT,
    CREATE_CONTACT
} from "./actionTypes";

// get the list of contacts, optional param to get from certain page
export function listConnectionNames(pageToken) {
    return dispatch => {
        window.gapi.client.load('people', 'v1', () => {
            // get the list of connections with fields name, gender, birhtday
            window.gapi.client.people.people.connections.list({
                'resourceName': 'people/me',
                'pageSize': 10,
                'personFields': 'names,genders,birthdays',
                'sortOrder': 'FIRST_NAME_ASCENDING',
                'pageToken': pageToken
            }).then(response => {
                dispatch({
                    type: LIST_CONTACTS,
                    payload: response.result
                });
            }).catch(error => {
                // dispatch error
                console.log(error);
            });
        });
    }
}

// get details of a contact given their resourceName
export function getContactDetails(resource) {
    return dispatch => {
        window.gapi.client.load('people', 'v1', () => {
            // get the contact by resource name
            window.gapi.client.people.people.get({
                'resourceName': resource,
                'personFields': 'names,emailAddresses'
            }).then(response => {
                dispatch({
                    type: LOAD_CONTACT,
                    payload: response.result
                });
            }, function (reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        });
    }
}

// create contact
export function createContact(gender, birthday, name) {
    return dispatch => {
        window.gapi.client.load('people', 'v1', () => {
            window.gapi.client.people.people.createContact({
                "genders": [
                    {
                        "value": gender,
                        "formattedValue": gender
                    }
                ],
                "birthdays": [
                    {
                        "date": {
                            "day": birthday.day,
                            "year": birthday.year,
                            "month": birthday.month
                        },
                    }
                ],
                "names": [
                    {
                        "displayName": name.first + " " + name.last,
                        "familyName": name.last,
                        "givenName": name.first,
                        "middleName": "",
                    }
                ]
            }).then(response => {
                dispatch({
                    type: CREATE_CONTACT,
                    payload: response.result
                });
                console.log("CREATED");
            }, function (reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        });
    }
}

// delete contact given resource name
export function deleteContact(resource) {
    return dispatch => {
        window.gapi.client.load('people', 'v1', () => {
            // get the contact by resource name
            window.gapi.client.people.people.deleteContact({
                'resourceName': resource,
            }).then(response => {
                dispatch({
                    type: DELETE_CONTACT,
                    payload: resource
                });
            }, function (reason) {
                console.log('Error: ' + reason.result.error.message);
            });
        });
    }
}