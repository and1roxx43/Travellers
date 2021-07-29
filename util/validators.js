module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === "") {
        errors.username = "Username cannot be empty";
    }
    if(email.trim() === "") {
        errors.email = "Email cannot be empty";
    } else {
        const regEx = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if(!email.match(regEx)) {
            errors.email = "Email must be a valid email address";
        }
    }
    if(password === '') {
        errors.password = "password cannot be empty"
    } else if(password !== confirmPassword) {
        errors.confirmPassword = "Password does not match, Please try again";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};

    if(username.trim() === "") {
        errors.username = "Username cannot be empty";
    }
    if(password === ""){
        errors.password = "Password cannot be empty";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}