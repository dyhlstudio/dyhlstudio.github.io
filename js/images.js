// Active project slideshow

$(document).ready(function() {
	var urls = [];
	var count = 1;
	$('active-project').css('background-image', 'url("' + urls[0] + '")');
	setInterval(function(), {
		$('activeproject').css('background-image', 'url("' + urls[count] + '")');
		count == urls.length-1 ? count = 0 : count++;
	}, 5000);
});


var images = createReactClass({
	getInitialState: function() {

	}
	render() {
		return e()
	}
}