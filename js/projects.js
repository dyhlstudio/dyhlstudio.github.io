const e = React.createElement;


var root = projectsList.map(function(){
	return e('div', {key: projectsList.key}, 
		e('ul', {className:'project-entry row'}, 
			e('li', {className:'entry-no d-none d-sm-block col col-sm-2'}, projectsList.no),
			e('li', {className:'entry-year col col-sm-2'}, projectsList.year),
			e('li', {className:'entry-title col col-sm-4'}, projectsList.title),
			e('li', {className:'entry-tags d-none d-md-block col col-sm-4'}, projectsList.tags),
		)
	);
});

ReactDOM.render(
    root,
    document.getElementById('react-archive')
);