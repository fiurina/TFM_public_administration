export class Poll {
    id: number;
    created: boolean;
    creator: string;
    title: string;
    description: string;
    creationDate: Date;
    imageURL: string;
    question: string;
    answerOptions: Array<string>;
    results: Array<number>;
    
    constructor(element) {
        if(element){

        }else {
            this.answerOptions = new Array<string>();
            this.results = new Array<number>();
        }
    }
}
