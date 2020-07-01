var stageD = 0;
var stageM = 0;
var tick = 0;
var navdesktop = document.getElementById("desktop-nav");
var navmobile = document.getElementById("mobile-nav");

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
    if(daym < 10) {
        daym = "0" + daym;
    }

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
    var mobiletext = ["Daniel Yunhua Li", "Experiments in Architecture, Design, & Media", currentdate, currenttime];
    var textflavors = text.concat(flavors);
    var mobileflavors = mobiletext.concat(flavors);
    var duration = 12; // timer value should be a multiplier of 500ms
    // 5s rotation
    if (tick < duration) { // time to switch
        tick++;
    } else {
    	stageD++;
        stageM++;
    	if (stageD >= textflavors.length) {
    		stageD = 0;
    	}
        if(stageM >= mobileflavors.length) {
            stageM = 0;
        }

    	navdesktop.innerHTML = textflavors[stageD];
        navmobile.innerHTML = mobileflavors[stageM];
        tick = 0;
    }

    //refresh time per second
    if(stageD == 2) {
    	navdesktop.innerHTML = textflavors[stageD];
    }

    if(stageM == 3) {
        navmobile.innerHTML = mobileflavors[stageM];
    }

    if(tick == 0) {
    	$(navdesktop).fadeIn(500);
        $(navmobile).fadeIn(500);
    } else if (tick == duration - 1) {
    	$(navdesktop).fadeOut(500);
        $(navmobile).fadeOut(500);
    }


}
renderTime();