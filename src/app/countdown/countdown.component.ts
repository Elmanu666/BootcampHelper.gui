import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

	@Input() duration: number ;
	@Input() playerEnable; playEnable; pauseEnable; stopEnable: boolean = false;
  	@Input() formEnable: boolean = false;
  	@Input() progressBarEnable: boolean = true;
	@Output() countDownStart = new EventEmitter<boolean>();
	@Output() countDownStop = new EventEmitter<boolean>();
	@Output() countDownPause = new EventEmitter<boolean>();
	@Output() countDownFinished = new EventEmitter<boolean>();

	durationSelected:{"hour":number, "minute":number, "second":number, "msecond" :number} ;
	durationSelected2Digit:{"hour":string, "minute":string, "second":string, "msecond" :string} ;
	initialDuration: number = 30;
	remainingDuration:number = 0;
	audio = new Audio();

  	 private interval;
  	 private stop:boolean = false;
  	 private pause:boolean = false;
  	 private start:boolean = false;
  	 clockPurcentage: number=0;
  	 private clockPrecision : number = 10;  
  	 private processRunning ;



  constructor() {}


  ngOnInit() {

  	this.duration ? this.setDuration(this.duration) : this.setDuration(0);
  	this.playEnable = false;
  	console.log('CountdownComponent')
  	console.log(this.progressBarEnable);
  }

  startCountDown(){  		  
  		this.start=true;	
  		this.tickTick(this.durationSelected);
  		this.stop=false;
  		this.pause=false;
  }

  pauseCountDown(){
  	debugger;
  	this.pause=true
  	let durationLasting = this.numberToJson(this.duration);
  	this.durationSelected = durationLasting[0];
  	clearInterval(this.interval);
  	this.countDownPause.emit(true)

  }

  stopCountDown(){

  	this.stop=true;
  	clearInterval(this.interval);
   	this.durationSelected.hour = 0;
 	this.durationSelected.minute = 0;
 	this.durationSelected.second = 0;
 	this.durationSelected.msecond = 0;
 	this.clockPurcentage = 100;
  	this.countDownStop.emit(true) ;



  }

  initAudio(){
    this.audio.src = "../../../assets/audio/pagerbeeps.mov";
    this.audio.load();
  }

  playAudio(){
    this.audio.play();
  }

  finishCountDown(){
  	clearInterval(this.interval);
  	this.countDownFinished.emit(true);

  }




	tickTick(duration:{"hour":number, "minute":number, "second":number, "msecond" : number}) {
		this.duration = this.jsonToNumber(duration);
		this.initialDuration = this.duration;

		if (this.duration > 0) {
			this.interval = setInterval(() => {
			
				this.duration = this.duration - this.clockPrecision
				if (this.duration <=-1){


					this.finishCountDown();
				}



				var duration=[];

				duration = this.numberToJson(this.duration);

				this.durationSelected = duration[0];
				this.durationSelected2Digit = duration[1];

				this.clockPurcentage = 100 - ((this.duration/this.initialDuration)*100);


				// }


			}, this.clockPrecision ) ;
		}
	}

	numberToJson(timeNumber:number):any{

		let timeJson = {"hour":0, "minute":0, "second":0, "msecond":0};
		let timeStringJson = {"hour":"00", "minute":"00", "second":"00", "msecond":"000"};
		let msecond = timeNumber%1000;



		timeJson.msecond = msecond;
		String(timeJson["msecond"]).length == 1 ? timeStringJson.msecond = "00"+String(timeJson["msecond"]) : (String(timeJson["msecond"]).length == 2 ? timeStringJson.msecond = "0"+String(timeJson["msecond"]) :timeStringJson.msecond = String(timeJson["msecond"]));


		let seconds = Math.floor(timeNumber/1000);

		if(seconds>3600){

			timeJson["hour"]=Math.floor(seconds / 3600);
			String(timeJson["hour"]).length == 1 ? timeStringJson.hour = "0"+String(timeJson["hour"]) :timeStringJson.hour = String(timeJson["hour"]);

		}

		if(seconds % 3600 > 0){

			timeJson["minute"]= Math.floor((seconds % 3600)/60);
			String(timeJson["minute"]).length == 1 ? timeStringJson.minute = "0"+String(timeJson["minute"]) :timeStringJson.minute = String(timeJson["minute"]);

		}

		timeJson["second"]=(seconds % 3600) %60;
		timeJson["second"] < 10 ? timeStringJson.second = "0"+String(timeJson["second"]) :timeStringJson.second = String(timeJson["second"]);

		var duration = [timeJson, timeStringJson];

		return duration;


	}

	jsonToNumber(timeJson:{"hour":number, "minute":number, "second":number, "msecond":number}):number
	{
		var hours = timeJson['hour'] * 3600 ;
		var minutes = timeJson['minute'] * 60;

		var timeInSecondes = (hours + minutes + timeJson['second'])*1000 + timeJson['msecond'];

		return timeInSecondes


		}


	setDuration(duration : number){
		this.duration = duration*1000 ;

		var d=[];

		d = this.numberToJson(this.duration);

		this.durationSelected = d[0];
		this.durationSelected2Digit = d[1];


		}


		


}
