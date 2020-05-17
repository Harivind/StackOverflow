export class Question {
    constructor(
        public _id: number,
        public user: string,
        public heading: string,
        public description: string,
        public images: string[],
        public keywords: string[],
        public upvotes: number,
        public downvotes: number) { }
}
