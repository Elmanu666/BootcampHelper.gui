import { QuestionBase } from './question-base.model';

export class TextAreaQuestion extends QuestionBase<string> {
  controlType = 'textarea';
  type: string;
  row: number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || 'text';
    this.row = options['row'] || 3;
  }
}