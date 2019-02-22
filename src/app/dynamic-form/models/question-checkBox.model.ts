import { QuestionBase } from './question-base.model';

export class CheckBoxQuestion extends QuestionBase<string> {
  controlType = 'checkBox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || 'checkBox';
  }
}