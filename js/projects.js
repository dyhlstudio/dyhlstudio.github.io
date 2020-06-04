const e = React.createElement;

function propagateProjects() {
	return e('div',{id: 'entry' + projectsList[1].no}, projectsList[1].title);
}

ReactDOM.render(
	propagateProjects(),
	document.getElementById('react-archive')
);