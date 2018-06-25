import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

	@Input() duration: number ;
	durationSelected:{"hour":number, "minute":number, "second":number, "msecond" :number} ;
	initialDuration: number = 30;
	remainingDuration:number = 0;

  	 private interval;
  	 private stop:boolean = false;
  	 private pause:boolean = false;
  	 clockPurcentage: number=0;
  	 private clockPrecision : number = 10;  
  	 private playEnable; pauseEnable; stopEnable: boolean = false;


  constructor() {}


  ngOnInit() {

  	this.durationSelected = {"hour":0, "minute":0, "second":30, "msecond" : 0};
  	this.playEnable = false;
  }

  startCountDown(){

  	//this.duration = this.durationSelected;	
  	this.tickTick(this.durationSelected);
  	this.stop=false;
  	this.pause=false;
  }

  pauseCountDown(){
  	this.pause=true
  	this.durationSelected = this.numberToJson(this.duration);

  }

  stopCountDown(){
  	this.stop=true;



  }


  tickTick2(duration:number){



  }

	tickTick(duration:{"hour":number, "minute":number, "second":number, "msecond" : number}) {
		console.log(duration);

		this.duration = this.jsonToNumber(duration);
		console.log(this.duration)
		this.initialDuration = this.duration;
		if (this.duration > 0) {
			this.interval = setInterval(() => {
				this.duration = this.duration - this.clockPrecision
				if (this.duration <= 0 || this.stop || this.pause) {
					clearInterval(this.interval);

					

					;
					// perform next actions
				}

				if (this.stop){
					this.durationSelected.hour = 0;
					this.durationSelected.minute = 0;
					this.durationSelected.second = 0;
					this.durationSelected.msecond = 0;
					this.clockPurcentage = 100;


				}

				else {

				this.durationSelected = this.numberToJson(this.duration);
				console.log(this.duration);
				this.clockPurcentage = 100 - ((this.duration/this.initialDuration)*100);


				}


			}, this.clockPrecision ) ;
		}
	}

	numberToJson(timeNumber:number):any{

		let timeJson = {"hour":0, "minute":0, "second":0, "msecond":0};
		let msecond = timeNumber%1000;

		timeJson.msecond = msecond;
		let seconds = Math.floor(timeNumber/1000);

		if(seconds>3600){

			timeJson["hour"]=Math.floor(seconds / 3600)
		}

		if(seconds % 3600 > 0){

			timeJson["minute"]= Math.floor((seconds % 3600)/60)
		}

		timeJson["second"]=(seconds % 3600) %60

		return timeJson


	}

	jsonToNumber(timeJson:{"hour":number, "minute":number, "second":number, "msecond":number}):number
	{
		var hours = timeJson['hour'] * 3600 ;
		var minutes = timeJson['minute'] * 60;

		var timeInSecondes = (hours + minutes + timeJson['second'])*1000 + timeJson['msecond'];

		return timeInSecondes


		}

		


}
