export const validateLogin = (email: string, password: string) => {

    if(email.length == 0 || email.length > 64) {
        throw new Error("Email is not valid");
    }

    if(password.length == 0 || password.length > 64){
        throw new Error("Password is not valid");
    }
}