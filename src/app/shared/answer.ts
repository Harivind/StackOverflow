export class Answer {
    constructor(
        public _id: number,
        public questionID: number,
        public user: string,
        public description: string,
        public images: string[],
        public upvotes: number,
        public downvotes: number) { }
}
