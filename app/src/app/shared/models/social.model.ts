export enum SocialTypes {
    GENDER = 0,
    SALARY = 1,
    AGE = 2,
}

export class Social {
    id: number;
    created: boolean;
    creator: string;
    title: string;
    description: string;
    creationDate: Date;
    tokens: number;
    imageURL: string;
    condition: SocialCondition;
    
    constructor() {}
}

export class SocialCondition {
    condition_type: number;
    minRange: number;
    maxRange: number;
    param: string;
}