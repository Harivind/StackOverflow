import { Answer } from './answer';
import { Question } from './question';

export class Post {
  constructor(
    public question: Question,
    public answers: Answer[]) { }
}

export class PostAdapter {
  adapt(item: any): Post {
    item.answers.map(a => new Answer(a._id, a.questionID, a.user, a.description, a.images, a.upvotes, a.downvotes))
    item.question.map(q => new Question(q._id, q.user, q.heading, q.description, q.images, q.keywords, q.upvotes, q.downvotes))
    return new Post(item.question, item.answer)
  }
}