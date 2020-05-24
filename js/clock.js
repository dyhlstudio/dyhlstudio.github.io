var stage = 0;
var tick = 0;
var elem = document.getElementById("nameclocktime");

function renderTime() {

    // date
    var mydate = new Date();
    var year = mydate.getYear();
    if (year < 1000) {
        year += 1900;
    }
    var day = mydate.getDay();
    var month = mydate.getMonth();
    var daym = mydate.getDate();
    var dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var montharray = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");

    //time
    var ampm = "";
    var currentTime = new Date();
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var s = currentTime.getSeconds();
    //am pm
    if (h < 12) {
        ampm = "AM";
    } else {
        ampm = "PM";
    }
    //12 hr time
    if (h == 0) {
        h = 12;
    }
    if (h > 12) {
        h = h - 12;
    }
    // two digits
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    setTimeout("renderTime()", 1000);

    // newly updated date/time per call
    var currentdate = "Today is " + dayarray[day] + ", " + montharray[month] + "." + daym + "." + year;
    var currenttime = "The time is now " + h + "." + m + "." + s + " " + ampm;

    // change per 5 seconds -- not sure why tick < 10 works but tick < 5 is too fast
    var text = ["Daniel Yunhua Li", currentdate, currenttime];
    var duration = 12; // timer value should be a multiplier of 500ms
    // 5s rotation
    if (tick < duration) { // time to switch
        tick++;
    } else {
    	stage++;
    	if (stage >= text.length) {
    		stage = 0;
    	}
    	elem.innerHTML = text[stage];
        tick = 0;
    }

    //refresh time per second
    if(stage == 2) {
    	elem.innerHTML = text[stage];
    }

    if(tick == 0) {
    	$(elem).fadeIn(500);
    } else if (tick == duration - 1) {
    	$(elem).fadeOut(500);
    }


}
renderTime();