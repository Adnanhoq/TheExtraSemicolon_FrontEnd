export const validateLogin = (email: string, password: string) => {

    if (email.length == 0 || email.length > 255) {
        throw new Error("Email is not valid length");
    }

    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (!regexp.test(email)) {
        throw new Error("Email is not valid format");
    }

    if (password.length == 0 || password.length > 64) {
        throw new Error("Password is not valid");
    }
}