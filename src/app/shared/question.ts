export class Question{
    id : number;
    user: string;
    heading : string;
    description : string;
    images : string[];
    keywords : string[];
    upvotes:number;
    downvotes:number
    bestAnswerID : number;
}