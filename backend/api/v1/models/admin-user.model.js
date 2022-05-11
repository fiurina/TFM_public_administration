const { decryptData } = require("../utils/crypto.util");

function AdminUser(adminUser, privateKey) {
    if(adminUser){
        this.name = (privateKey) ? decryptData(adminUser.name, privateKey) : adminUser.name;
        this.surname = (privateKey) ? decryptData(adminUser.surname, privateKey) : adminUser.surname;
        this.dni = (privateKey) ? decryptData(adminUser.dni, privateKey) : adminUser.dni;
        this.registered= adminUser.registered;
        this.role= parseInt(adminUser.role);
    }
}

module.exports = {
    AdminUser,
}
