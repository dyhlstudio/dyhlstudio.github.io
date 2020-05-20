$(document).ready(function renderTime(){

	// date
	var mydate = new Date();
	var year = mydate.getYear();
		if(year < 1000){
			year += 1900
		}
	var day = mydate.getDay();
	var month = mydate.getMonth();
	var daym = mydate.getDate();
	var dayarray = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
	var montharray = new Array("01","02","03","04","05","06","07","08","09","10","11","12");

	var myClock = document.getElementById("clockDisplay");
	myClock.textContent = "Today is "+dayarray[day]+", "+montharray[month]+"\/"+daym+"\/"+year;
	myClock.innerText = "Today is "+dayarray[day]+", "+montharray[month]+"\/"+daym+"\/"+year;

	setTimeout("renderTime()", 1000);
	renderTime();

});