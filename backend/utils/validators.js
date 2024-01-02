
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

const isEmpty = (string) => {
    if (!string) return true;
    if (String(string).trim() === '') return true;
    else return false;
};

const isShort = (string, len) => {
    if (!string) return true;
    if (String(string).length < len) return true;
    else return false;
};



module.exports = {

    validateLoginData: (data) => {
        let errors = {};

        if (isEmpty(data.email)) errors.email = 'Email must not be empty!';
        if (!isEmail(data.email)) errors.email = 'Email must be valid!';
        if (isShort(data.password, 6)) errors.password = 'Password must be 6 characters!';
        if (isEmpty(data.password)) errors.password = 'Password must not be empty!';



        return {
            errors,
            valid: Object.keys(errors).length === 0 ? true : false
        };
    },

    validateSignupData: (data) => {
        let errors = {};
        if (isEmpty(data.firstName)) errors.firstName = 'First Name must not be empty!';
        if (isEmpty(data.lastName)) errors.lastName = 'Last Name must not be empty!';
        if (isEmpty(data.email)) errors.email = 'Email must not be empty!';
        if (isShort(data.password, 8)) errors.password = 'Password must be 8 characters!';
        if (isEmpty(data.password)) errors.password = 'Password must not be empty!';

        return {
            errors,
            valid: Object.keys(errors).length === 0 ? true : false
        };
    }

}
