// Active project slideshow

$(document).ready(function() {
	var urls = [];
	var count = 1;
	$('active-project').css('background-image', 'url("' + urls[] + '")');
	setInterval(function(), {
		$('activeproject').css('background-image', 'url("' + urls[count] + '")');
		count == urls.length-1 ? count = 0 : count++;
	}, 5000);
});