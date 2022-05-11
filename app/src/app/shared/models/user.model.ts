export class UserSession{
    wallet: string;
    uuid: string;
    appVersion: string;
    platform: string;
    tokenJWT: string;
    role: number;

    constructor() { }
}

export class AdminUser{
    name: string;
    surname: string;
    dni: string;

    constructor() {}
}

export class ClientUser {
    name: string;
    surname: string;
    dni: string;
    balance: number;
    socialParams: ClientParams;
    
    constructor(element) {
        if(element){}
        else this.socialParams = new ClientParams();
    }
}

export class ClientParams {
    gender: string;
    salary: string;
    age: number;
    
    constructor() {}
}