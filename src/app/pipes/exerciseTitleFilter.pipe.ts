import {Pipe} from "@angular/core";
import {PipeTransform} from "@angular/core";
import Exercise from '../models/exercise.model';

@Pipe({name: 'exerciseTitleFilter'})
export class ExerciseTitleFilter implements PipeTransform {

    transform(items: Exercise[], searchText: string) {
    	if(!items) return [];
    	if(!searchText) return items;
		searchText = searchText.toLowerCase();
		return items.filter( it => {
      				return it.title.toLowerCase().includes(searchText);
    		});
    }

}