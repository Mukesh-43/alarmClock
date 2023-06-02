const select = document.getElementsByTagName('select');
const timesetter = document.getElementById('timesetter');
const displayTime = document.getElementById('displayTime');
const btn = document.querySelector('button');

let alarmTime, isAlarmSet = false;

// For Alarm Tone
let ringTone = new Audio("./The Dance Theme Of Madharasapattinam - Bgm.mp3");

// For Hours
for(let i = 12; i > 0; i--){

	i = i<10?"0"+i:i;	// zero before single digit	

	let option = `<option value="${i}">${i}</option>`;

	select[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// For Minutes
for(let i = 59; i > 0; i--){

	i = i<10?"0"+i:i;		// zero before single digit

	let option = `<option value="${i}">${i}</option>`;

	select[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// For AMPM
for(let i = 2; i > 0; i--){

	let ampm = i == 1?"AM":"PM";		

	let option = `<option value="${ampm}">${ampm}</option>`;

	select[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Setting up displayTime

setInterval(()=>{

	let hrs = new Date().getHours();   // Gives Hours
	let mins = new Date().getMinutes(); // Gives Minutes
	let secs = new Date().getSeconds(); // Gives Seconds
	ampm = "AM";

	if(hrs > 12){
		hrs -= 12;
		ampm = "PM";
	}

	hrs = hrs<10?hrs="0"+hrs:hrs;          // Adding zero before single digit
	mins = mins<10?mins="0"+mins:mins;
	secs = secs<10?secs="0"+secs:secs;

	displayTime.innerHTML = `${hrs}:${mins}:${secs} ${ampm}`;

	if(alarmTime == `${hrs}:${mins} ${ampm}`){
		ringTone.play();
		ringTone.loop = true;
	}

},1000);

// Working on Alarm

btn.addEventListener("click" , setAlarm);

function setAlarm(){

	if(isAlarmSet){
		alarmTime = "";
		ringTone.pause();
		timesetter.classList.remove("disable");
		btn.innerHTML = "Set Alarm";
		return isAlarmSet = false;
	}

	let time = `${select[0].value}:${select[1].value} ${select[2].value}`;

	if(time.includes("Hours") || time.includes("Minutes") || time.includes("AM/PM")){  // Gives Alert for invalid alarm time
		return alert("Enter a valid time");
	}

	isAlarmSet = true;
	alarmTime = time;

	timesetter.classList.add('disable');   // Makes the timesetter blur and disable using css
	btn.innerHTML = "Clear Alarm";
}

