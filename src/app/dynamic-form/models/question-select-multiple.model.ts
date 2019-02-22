import { QuestionBase } from './question-base.model';

export class SelectMultipleQuestion extends QuestionBase<string> {
  controlType = 'SelectMultiple';
  type: string;
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || 'text';
    this.options = options['options'];
    debugger;

  }
}