const e = React.createElement;

//Propagate list of projects
function tagMaker(projectEntry) {
	var tagsText = ''; 
	for(i = 0; i < projectEntry.length; i++) {
		if(i < projectEntry.length - 1) {
			tagsText += projectEntry[i] + ', ';
		} else {
			tagsText += projectEntry[i];
		};
	}
	return tagsText;
}

var bottomList = projectsList.map(function(project){
	return e('div', {key: parseInt(project.no, 10), id: project.no, className: 'project-wrapper'}, 
		e('ul', {className:'project-entry row'}, 
			e('li', {className:'entry-no d-none d-sm-block col col-sm-2'}, project.no),
			e('li', {className:'entry-year col col-sm-2'}, project.year),
			e('li', {className:'entry-title col col-sm-4'}, project.title),
			e('li', {className:'entry-tags d-none d-md-block col col-sm-4'}, tagMaker(project.tags))
		)
	);
});
 
ReactDOM.render(
    bottomList,
    document.getElementById('react-archive')
);

//Selecting Project Event Handlers
var selection = 0;

$('project-wrapper').on("click", function() {
	var selection = $('project-wrapper').attr('id').parseInt();
	alert(selection);
	// open project
	$('content').addClass('hidden');
});

$('project-close').on("click", function() {
	// close project
	$('active-project').addClass('hidden');
});



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

var createReactClass = require('create-react-class');

var Images = createReactClass({
	getInitialState: function() {
		return {}
	}
	render: function() {
		return e()
	}
}