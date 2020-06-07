const e = React.createElement;

//Propagate list of projects
function tagMaker(projectEntry) {
    var tagsText = '';
    for (i = 0; i < projectEntry.length; i++) {
        if (i < projectEntry.length - 1) {
            tagsText += projectEntry[i] + ', ';
        } else {
            tagsText += projectEntry[i];
        };
    }
    return tagsText;
}

var bottomList = projectsList.map(function(project) {
    return e('div', { key: parseInt(project.no, 10), id: project.no, className: 'link-wrapper', role: 'button' },
        e('ul', { className: 'project-entry row' },
            e('li', { className: 'entry-no d-none d-sm-block col col-sm-2 project-link' }, project.no),
            e('li', { className: 'entry-year col col-sm-2 project-link' }, project.year),
            e('li', { className: 'entry-title col col-sm-4 project-link' }, project.title),
            e('li', { className: 'entry-tags d-none d-md-block col col-sm-4 project-link' }, tagMaker(project.tags))
        )
    );
});

ReactDOM.render(
    bottomList,
    document.getElementById('react-archive')
);




//Selecting Project Event Handlers
var selectionNo = 0;
var slideNo = 0;

$(document).ready(function() {
    $('.link-wrapper').click(function() {
        // selectionNo = parseInt($('.link-wrapper').attr("id"), 10);
        
        alert($('.link-wrapper').attr("id"));
        // create project
        $('content').addClass('hidden');
        $('project-wrapper').removeClass('hidden');

        var projectCaptions = captions(projectsList[selectionNo], slideNo);

        // ReactDOM.render(
        //     e(ProjectSlides),
        //     document.getElementById('body')
        // );

    });
});

// var createReactClass = require('create-react-class');

var ProjectSlides = createReactClass({
    getInitialState: function() {
        slideNo = 0;
        return { style: 'backgroundImage: url("' + projectsList[selectionNo].assets[slideNo] + '")' };
    },

    handleClick: function() {
        slideNo++;
        this.setState({ style: 'backgroundImage: url("' + projectsList[selectionNo].assets[slideNo] + '")' });
    },

    render: function() {
        return e('article', { id: 'active-project', className: "container-fluid fs-image", style: this.state.backgroundImage });
    }
});

ReactDOM.render(
    e(ProjectSlides),
    document.getElementById('project-wrapper'));

function captions(project, slideNum) {
    return e('footer', null,
        e('div', { id: 'footer-container', className: "container-fluid" },
            e('ul', { className: "row" },
                e('li', { key: 'fd-title', className: "d-none d-md-block col col-sm-10" }, project.title + ": " + project.logline),
                e('li', { key: 'fm-title', className: "d-md-none col col-sm-10" }, ),
                e('li', { key: 'f-link', id: 'f-link', className: "text-right col col-sm-2" },
                    e('a', { className: 'project-wrapper', role: 'button' }, "Info")
                )
            )
        )
    )
};
// $('project-close').on("click", function() {
// 	// close project
// 	$('active-project').addClass('hidden');
// });

// Active project slideshow


// $(document).ready(function() {
// 	var urls = projectsList[selectionNo].assets;
// 	var count = 1;
// 	$('active-project').css('background-image', 'url("' + urls[0] + '")');
// 	setInterval(function(), {
// 		$('activeproject').css('background-image', 'url("' + urls[count] + '")');
// 		count == urls.length-1 ? count = 0 : count++;
// 	}, 5000);
// });