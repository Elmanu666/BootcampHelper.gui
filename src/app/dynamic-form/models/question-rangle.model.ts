import { QuestionBase } from './question-base.model';

export class RangeSimpleQuestion extends QuestionBase<string> {
  controlType = 'simpleRange';
  options: {min: number, max: number, step:number};

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}