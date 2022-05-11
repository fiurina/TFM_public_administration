const { decryptData } = require("../utils/crypto.util");

function CitizenUser(user, privateKey) {
    if(user){
        // console.log('User', user)
        this.name = (privateKey) ? decryptData(user.name, privateKey) : user.name;
        this.surname = (privateKey) ? decryptData(user.surname, privateKey) : user.surname;
        this.dni = (privateKey) ? decryptData(user.dni, privateKey) : user.dni;
        this.socialParams = new SocialParams(user.socialParams);
        this.registered= user.registered;
        this.role= parseInt(user.role);
    }
}

function SocialParams(element) {
    if(element){
        this.gender = element.gender;
        this.salary = element.salary;
        this.age = parseInt(element.age);
    }
}

module.exports = {
    CitizenUser,
}
