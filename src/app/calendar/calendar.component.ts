import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import Event from './calendar.model'




@Component({
  selector: 'ng-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],

})
export class CalendarComponent {

	ngCalendar 
	today: Date;
	firstDay : Date;
	currentMonth : string;
	month; previousMonth; nextMonth; todayDay :number;
	previousMonthLastDay; monthLastDay : number;
	previousMonthLastDate; monthLastDate; calendarFirstDate; calendarLastDate :Date;

	eventsSelected ;
	ready:boolean;

	@Input() events:Event[];
	@Output() periodChange = new EventEmitter();
	@Input() refDate : Date;

	constructor(){}


	ngOnInit(){


		this.setCalendar();



	}

	ngOnChanges(changes: SimpleChanges){
		this.setCalendar();
		


	}

	setCalendar(){

		this.refDate ? '' : this.refDate = new Date();

		this.ready=false;
		this.setDateVariables();
		this.initCalObject();
		this.setEventToCalObject();
		this.changeMonthDisplay();  

		this.ready=true;

		console.log('ngCalendar cree :');
		console.log(this.ngCalendar);


	}

	initCalObject(){
		this.ngCalendar= new Array();
		var currentDay = 1 ;

		var lastWeek = this.getWeekOfTheMonth(this.monthLastDate)  ;
//		for (var i = 0 ; i< 6; i++){
		for (var i = 0 ; i< lastWeek+1; i++){
			var D = this.firstDay.getDay();

			this.ngCalendar[i] = {'display': false, 'events': null, 'days':new Array() };
//			this.ngCalendar[i] = new Array();
			

			for (var j = 0; j <7; j++ ){

				var dayPreviousMonth ;

				i==0&& this.previousMonthLastDay >= j && D > j ? ( dayPreviousMonth = this.previousMonthLastDate.getDate()- (this.previousMonthLastDay-j) , this.ngCalendar[i].days[j]={'day': dayPreviousMonth , 'month':this.previousMonthLastDate.getMonth(), 'events' : new Array()}) : '';

				//i==0&& D > j ? (this.ngCalendar[i].days[j]={'day': '' , 'month':this.today.getMonth()-1}):'';

				// first day of the month i=0 first week of the calendar D == j le premier jour du mois et égale au jour du calendrier

				i==0 && D == j ? (this.ngCalendar[i].days[j]={'day': 1 , 'month':this.month, 'events' : new Array()}, currentDay +=1):'';
				i== 0 && D < j ? (this.ngCalendar[i].days[j]={'day': currentDay , 'month':this.month, 'events' : new Array()}, currentDay +=1 ):'';
				debugger;
				i ==lastWeek && this.monthLastDay > j ? (this.ngCalendar[i].days[j]={'day': currentDay , 'month':this.month, 'events' : new Array()}, currentDay +=1 ):'';
				i ==lastWeek && this.monthLastDay == j ? (this.ngCalendar[i].days[j]={'day': currentDay , 'month':this.month, 'events' : new Array()}, currentDay =1 ):'';
				i== lastWeek && this.monthLastDay < j ? (this.ngCalendar[i].days[j]={'day': currentDay , 'month':this.month+1, 'events' : new Array()}, currentDay +=1):'';
				i> lastWeek  ? (this.ngCalendar[i].days[j]={'day': currentDay , 'month':this.nextMonth, 'events' : new Array()}, currentDay +=1):'';

				i > 0 && i < lastWeek  ? (this.ngCalendar[i].days[j]={'day': currentDay , 'month':this.month, 'events' : new Array()}, currentDay +=1 ) :'';





			}




		}

		this.calendarFirstDate = new Date(this.previousMonthLastDate.getFullYear(), this.ngCalendar[0].days[0].month, this.ngCalendar[0].days[0].day);

		var yearEndOfCalendar ;
		this.nextMonth == 11 ? yearEndOfCalendar = this.refDate.getFullYear()+1: yearEndOfCalendar = this.refDate.getFullYear();
	//	this.calendarLastDate = new Date(yearEndOfCalendar, this.ngCalendar[5].days[6].month, this.ngCalendar[5].days[6].day)
		this.calendarLastDate = new Date(yearEndOfCalendar, this.ngCalendar[lastWeek].days[6].month, this.ngCalendar[lastWeek].days[6].day)




	}

	setDateVariables(){


		this.today = new Date();

		var j = this.refDate.getDay();

		this.month= this.refDate.getMonth();
		this.month > 0 && this.month < 11 ? (this.previousMonth = this.month -1, this.nextMonth = this.month + 1) : (this.month == 0 ? (this.previousMonth = 11, this.nextMonth = 1) :(this.previousMonth = 0, this.nextMonth = 2) );
		this.firstDay = new Date(this.refDate.getFullYear(), this.refDate.getMonth(), 1)
		this.todayDay = this.refDate.getDate();
		
	//	this.refDate.getMonth() == 11 ? (this.monthLastDate = new Date(this.refDate.getFullYear()+1, 0, 0),this.monthLastDay = this.monthLastDate.getDay() ) : (this.refDate.getMonth() == 0 ? (this.monthLastDate = new Date(this.refDate.getFullYear()-1, 11, 0),this.monthLastDay = this.monthLastDate.getDay() ) :  (this.monthLastDate = new Date(this.refDate.getFullYear(), this.refDate.getMonth()+1, 0),this.monthLastDay = this.monthLastDate.getDay()));
		this.refDate.getMonth() == 11 ? (this.monthLastDate = new Date(this.refDate.getFullYear(), 11, 31),this.monthLastDay = this.monthLastDate.getDay() ) : (this.monthLastDate = new Date(this.refDate.getFullYear(), this.refDate.getMonth()+1, 0),this.monthLastDay = this.monthLastDate.getDay());

		var LastDateOfPreviousTheMonth; this.previousMonthLastDay
		this.previousMonthLastDate = new Date(this.refDate.getFullYear(), this.refDate.getMonth(), 0)
		this.previousMonthLastDay = this.previousMonthLastDate.getDay() ;
		this.eventsSelected = new Array();

		// for (var v = 0; v <6; v++){

		// 	this.eventsSelected[v]= {'display': false, 'events': null};

		// }

		// console.log(this.eventsSelected);



	}

	setEventToCalObject(){

	
		if (this.events != undefined){

			for (var i=0; i < this.events.length; i++){

				if ((this.events[i].startDate >= this.calendarFirstDate) && (this.events[i].startDate <= this.calendarLastDate)){

					this.ngCalendar[this.getWeekOfTheMonth(this.events[i].startDate)].days[this.events[i].startDate.getDay()].events == null ? this.ngCalendar[this.getWeekOfTheMonth(this.events[i].startDate)].days[this.events[i].startDate.getDay()].events[0] = this.events[i]:  this.ngCalendar[this.getWeekOfTheMonth(this.events[i].startDate)].days[this.events[i].startDate.getDay()].events.push(this.events[i]);


				}


			}

		}

		else {
					

			
		}



	}

	displayCalMonthItems(i, dayEvent){

		for (var j = 0 ; j < 6 ; j++){

			j==i && dayEvent.events.length > 0 ? (this.ngCalendar[j]['display'] = true , this.ngCalendar[j].events = dayEvent.events ): this.ngCalendar[j].display = false;
		}

		


	}


	getWeekOfTheMonth(date:Date){

		var firstDateOfTheMonth = new Date(date.getFullYear(), date.getMonth(), 1);
		var day = date.getDate();
	//	var m = Math.floor((day+(firstDateOfTheMonth.getDay()))/7);
		var m = Math.floor((day-1+(firstDateOfTheMonth.getDay()))/7);

			return m



	}

	changePeriodCalendar(changeType:string){

		var month : number;
		var  year : number;
		var today= new Date();

		var message = changeType;

		changeType == 'today' ?this.refDate = new Date():'';
		changeType == 'next' ?this.refDate  = this.changeMonth(this.refDate, true) : '';
		changeType == 'previous' ?this.refDate  = this.changeMonth(this.refDate, false) : '';
	

	//	this.periodChange.emit();
	//	this.periodChange.emit(message);
		this.periodChange.emit(this.refDate);
		this.setCalendar();


	}



	changeMonthDisplay(){
		var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December'];


		this.currentMonth = monthList[this.refDate.getMonth()];
	}

	changeMonth(date :Date, next : boolean){

		var newMonth, newMonthPlOne, newYear, newYearPlOne, newDate  : number;
		var lastDayOfNewMonth : Date;

		if (next){

			newMonth = date.getMonth()+1;

			newMonth >11 ? (newMonth = 0, newYear = date.getFullYear()+1): newYear =  date.getFullYear() ;

			newMonth > 10 ? (newMonthPlOne= 0,newYearPlOne = newYear + 1): (newMonthPlOne = newMonth +1 ,newYearPlOne = newYear);

			lastDayOfNewMonth = new Date (newYearPlOne, newMonthPlOne, 0 );

			date.getDate() > lastDayOfNewMonth.getDate() ? newDate = lastDayOfNewMonth.getDate() : newDate = date.getDate();

		}

		else {

			newMonth = date.getMonth()-1;

			newMonth < 0 ? (newMonth = 11, newYear = date.getFullYear()-1): newYear =  date.getFullYear() ;

			newMonth > 10 ? (newMonthPlOne= 0,newYearPlOne = newYear + 1): (newMonthPlOne = newMonth +1 ,newYearPlOne = newYear);

			lastDayOfNewMonth = new Date (newYearPlOne, newMonthPlOne, 0 );

			date.getDate() > lastDayOfNewMonth.getDate() ? newDate = lastDayOfNewMonth.getDate() : newDate = date.getDate();


		}

		var changedMonth = new Date(newYear, newMonth, newDate);

		return changedMonth
	}





}