const e = React.createElement;

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
	return e('div', {key: parseInt(project.no, 10), id: project.no}, 
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