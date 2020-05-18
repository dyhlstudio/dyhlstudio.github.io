function renderTime(){

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
	var montharray = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

	var myClock = document.getElementbyId("clockDisplay");
	myClock.textContent = "" + dayarray[day] + " " + daym + " " +montharray[month]+ " " + year;
	myClock.innerText = "" + dayarray[day] + " " + daym + " " +montharray[month]+ " " + year;

	setTimeout("renderTime()", 1000);

}
renderTime();