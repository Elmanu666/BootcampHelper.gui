import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

	@Input() duration: number ;
	durationSelected:{"hour":0, "minute":0, "second":30} ;
	initialDuration: number = 30;
	remainingDuration:number = 0;

  	 private interval;
  	 private stop:boolean = false;
  	 clockPurcentage: number=0;  
  	 private playEnable; pauseEnable; stopEnable: boolean = false;


  constructor() {}


  ngOnInit() {

  	this.durationSelected = {"hour":0, "minute":0, "second":30};
  	this.playEnable = false;
  }

  startCountDown(){

  	//this.duration = this.durationSelected;	
  	this.tickTick(this.durationSelected);
  }

  pauseCountDown(){
  	this.stop=true

  }

  stopCountDown(){
  	this.stop=true;


  }




	tickTick(duration:{"hour":number, "minute":number, "second":number}) {
		console.log(duration);

		this.duration = this.jsonToNumber(duration);
		console.log(this.duration)
		this.initialDuration = this.duration;
		if (this.duration > 0) {
			this.interval = setInterval(() => {
				this.duration = this.duration - 1
				if (this.duration <= 0 || this.stop) {
					clearInterval(this.interval)
					this.stop=false;
					// perform next actions
				}
				this.durationSelected = this.numberToJson(this.duration);
				console.log(this.duration);
				this.clockPurcentage = 100 - ((this.duration/this.initialDuration)*100);

			}, 1000);
		}
	}

	numberToJson(timeNumber:number):any{

		let timeJson = {"hour":0, "minute":0, "second":0};
		if(timeNumber>3600){

			timeJson["hour"]=Math.floor(timeNumber / 3600)
		}

		if(timeNumber % 3600 > 0){

			timeJson["minute"]= Math.floor((timeNumber % 3600)/60)
		}

		timeJson["second"]=(timeNumber % 3600) %60

		return timeJson


	}

	jsonToNumber(timeJson:{"hour":number, "minute":number, "second":number}):number
	{
		var hours = timeJson['hour'] * 3600 ;
		var minutes = timeJson['minute'] * 60;

		var timeInSecondes = hours + minutes + timeJson['second'];

		return timeInSecondes


		}

		


}
