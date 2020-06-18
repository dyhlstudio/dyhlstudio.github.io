const e = React.createElement;

//Propagate list of projects
function tagMaker(projectEntry) {

    // get main tag
    var oneTag = projectEntry[0];
    // get list of tags as string
    var tagsText = '';
    for (i = 0; i < projectEntry.length; i++) {
        if (i < projectEntry.length - 1) {
            tagsText += projectEntry[i] + ', ';
        } else {
            tagsText += projectEntry[i];
        }
    }
    return [oneTag, tagsText];
}

function typeClass(projectEntry) {
    var typeText = '';
    for (i = 0; i < projectEntry.length; i++) {
        if (i < projectEntry.length - 1) {
            typeText += projectEntry[i] + ' ';
        } else {
            typeText += projectEntry[i];
        }
    }
    return typeText;
}

var bottomList = projectsList.map(function(project) {
    return e('div', { key: parseInt(project.no, 10), id: project.no, className: 'link-wrapper', role: 'button' },
        e('ul', { className: 'project-entry row ' + typeClass(project.type) },
            e('li', { className: 'entry-no col col-2 project-link' }, project.no),
            e('li', { className: 'entry-year col col-2 project-link' }, project.year),
            e('li', { className: 'entry-title col col-4 project-link' }, project.title),
            e('li', { className: 'entry-tags d-none d-md-block col col-4 project-link' }, tagMaker(project.tags)[1]),
            e('li', { className: 'entry-tags d-md-none col col-4 project-link' }, tagMaker(project.tags)[0])
        )
    );
});

ReactDOM.render(
    bottomList,
    document.getElementById('react-archive')
);



//Selecting Project Event Handlers
var selectionNo = 0;
var briefed = false;
var selected = 999;
var clicked = false;
var pressed = false;

$(document).ready(function() {
    // reorient image aspect-ratio
    // info-imgs 
    document.documentElement.style.setProperty('--threetwo-info', $('.img-wrapper').width() * 2 / 3 + 'px');
    // middle thumb
    document.documentElement.style.setProperty('--bigtextH', $('#big-text').height() + 'px');
    document.documentElement.style.setProperty('--threetwo-thumb', $('.thumb-wrapper').width() * 2 / 3 + 'px');
    document.documentElement.style.setProperty('--sixteennine-thumb', $('.thumb-wrapper').width() * 9 / 16 + 'px');

    // responsive fixes
    $(window).resize(function() {
        // info-imgs 
        document.documentElement.style.setProperty('--threetwo-info', $('.img-wrapper').width() * 2 / 3 + 'px');
        // middle thumb
        document.documentElement.style.setProperty('--bigtextH', $('#big-text').height() + 'px');
        document.documentElement.style.setProperty('--threetwo-thumb', $('.thumb-wrapper').width() * 2 / 3 + 'px');
        document.documentElement.style.setProperty('--sixteennine-thumb', $('.thumb-wrapper').width() * 9 / 16 + 'px');
    });
    // Prepare project

    $('.link-wrapper').click(function() {
        selectionNo = parseInt($(this).attr("id"), 10) - 1;

        // toggle project brief
        if (!briefed && selected != selectionNo) { // no project --> selected project
            selected = selectionNo;
            $(this).addClass('selected');
            projectBrief();
            briefed = true;
        } else if (briefed && selected == selectionNo) { // unselecting selected project
            selected = 999;
            $(this).removeClass('selected');
            projectUnbrief();
            briefed = false;
        } else { // selected project a --> selected project b
            selected = selectionNo;
            $('.link-wrapper.selected').removeClass('selected');
            $(this).addClass('selected');
            projectBrief();
            briefed = true;
        }

        compileProject();

        let btH = $('#big-text').height();
        document.documentElement.style.setProperty('--bigtextH', `${btH}px`);


        // Open project

        $('.view-links').click(function() {
            captions(projectsList[selectionNo], (parseInt($('#active-slideshow').attr('dataactive'), 10) + 1));
            // info button
            $('#info-link').click(function() {
                $('html').css('overflow', 'unset');
                $('body').addClass('unframe');
                $('#active-info').removeClass('d-none');
                $('#home').removeClass('d-flex').addClass('d-none');
                $('#react-footer, #active-slideshow').addClass('d-none');
                $('#project-wrapper').removeClass('slideshow');
                $('a, p, li').removeClass('white');
                $('#nav-container').removeClass('white-line');

                // overview images, aspect ratio fix upon load
                document.documentElement.style.setProperty('--threetwo-info', $('.img-wrapper').width() * 2 / 3 + 'px');
            });

            // rendered project slide-in
            $('.return').css("transform", "translate(0)");
            $('.hide').css('transform', "translate(-100vw)");
            $('a, p, li').addClass('white');
            $('#nav-container').addClass('white-line');
            setTimeout(function() {
                $('#active-slideshow').focus()
            }, 1000);
        });
    });

    // filtering projects list

    $('#big-text').on('click', '.text-links', function() {

        if ($(this).hasClass('filtered')) {

            // unapplying filter
            $(this).removeClass('filtered');
            let filter = '.' + $(this).attr('id');
            $('.project-entry.filtered').removeClass('filtered');
        } else {

            // clear filters
            $('.text-links').not($(this)).removeClass('filtered');
            $('.project-entry.filtered').removeClass('filtered');

            // apply new filter
            $(this).addClass('filtered');
            let filter = '.' + $(this).attr('id');
            $('.project-entry' + filter).addClass('filtered');
        }
    });


    //clear filter on user selecting non-filtered entry

    $('.project-entry').on('click', function() {
        if (!($(this).hasClass('filtered'))) {
            $('.project-entry.filtered').removeClass('filtered');
        }
    });
});



function projectBrief() {
    $('#thumb').attr('src', projectsList[selectionNo].thumb);
    var excerpt = projectsList[selectionNo].title + ": " + projectsList[selectionNo].logline + ". ";
    $('#big-text')
        .text(excerpt)
        .append('<a class="view-links">View&nbsp;Project</a><span class="link-arrow"></span>');
};

function projectUnbrief() {
    $('#thumb').attr('src', 'data:,');
    $('#big-text')
        .text('Daniel Yunhua Li is a New York-based designer and technologist creating experiments in ')
        .append('<a id="architecture" class="text-links" role="button">Architecture</a>, <a id="design" class="text-links" role="button">Graphic & Web Design</a>, and <a id="media" class="text-links" role="button">Interactive Media</a>.');
};

function compileProject() {
    // slideshow assets
    var slides = [];
    for (i = 0; i < projectsList[selectionNo].assets.length; i++) {
        if (i == 0) {
            slides.push(e('img', { key: i, src: projectsList[selectionNo].assets[i], className: 'inactive active' }));
        } else {
            slides.push(e('img', { key: i, src: projectsList[selectionNo].assets[i], className: 'inactive' }));
        };
    }

    // info overview text
    var infoText = [
        e('h2', { key: "title", id: "title" }, projectsList[selectionNo].title),
        e('p', { key: "year", id: "year" }, projectsList[selectionNo].year),
        e('p', { key: "tags", id: "tags" }, tagMaker(projectsList[selectionNo].tags)[1]),
        e('br', { key: "br1", className: "d-none d-md-block" }, ),
        e('br', { key: "br2", className: "d-none d-md-block" }, ),
        e('p', { key: "desc", id: "desc" }, projectsList[selectionNo].description)
    ];

    // info overview imgs
    var infoImgs = [];
    for (i = 0; i < projectsList[selectionNo].assets.length; i++) {
        if (i == projectsList[selectionNo].assets.length - 1) {
            infoImgs.push(e('div', { key: i, className: "img-wrapper-end" },
                e('img', { className: "list-img responsive-img", src: projectsList[selectionNo].assets[i] })
            ));
        } else {
            infoImgs.push(e('div', { key: i, className: "img-wrapper" },
                e('img', { key: i, className: "list-img responsive-img", src: projectsList[selectionNo].assets[i] })
            ));
        }
    };

    // react project class
    var Project = createReactClass({
        getInitialState: function() {
            return { dataactive: 0 };
        },

        handleClick: function() {
            // clicks limited to 1 per 500ms
            if (clicked === true) {
                return false; // failed click
            }

            // successful keypress
            clicked = true;
            setTimeout(function() {
                clicked = false;
            }, 500);
            let slideNo = this.state.dataactive;
            if (this.state.dataactive + 1 < slides.length) {
                this.setState({ dataactive: this.state.dataactive + 1 });
                $('#active-slideshow').children().eq(slideNo + 1).addClass('active');
                setTimeout(function() {
                    $('#active-slideshow').children().eq(slideNo).removeClass('active');
                }, 500);
            } else {
                this.setState({ dataactive: 0 });
                $('#active-slideshow').children().eq(0).css("z-index", "201").addClass('active');
                setTimeout(function() {
                    $('#active-slideshow').children().eq(slides.length - 1).removeClass('active');
                    $('#active-slideshow').children().eq(0).css("z-index", "200").addClass('active');
                }, 500);
            }
        },

        handleKeyDown: function(evt) {
            // keypresses limited to 1 per 500ms
            // failed keypress
            if (pressed === true) {
                return false;
            }

            // successful keypress
            pressed = true;
            setTimeout(function() {
                pressed = false;
            }, 500);
            if (evt.keyCode === 39) {
                let slideNo = this.state.dataactive;
                if (this.state.dataactive + 1 < slides.length) {
                    this.setState({ dataactive: this.state.dataactive + 1 });
                    $('#active-slideshow').children().eq(slideNo + 1).addClass('active');
                    setTimeout(function() {
                        $('#active-slideshow').children().eq(slideNo).removeClass('active');
                    }, 500);
                } else {
                    this.setState({ dataactive: 0 });
                    $('#active-slideshow').children().eq(0).css("z-index", "201").addClass('active');
                    setTimeout(function() {
                        $('#active-slideshow').children().eq(slides.length - 1).removeClass('active');
                        $('#active-slideshow').children().eq(0).css("z-index", "200");
                    }, 500);
                }
            }

            if (evt.keyCode === 37) {
                let slideNo = this.state.dataactive;
                if (this.state.dataactive - 1 >= 0) {
                    this.setState({ dataactive: this.state.dataactive - 1 });
                    $('#active-slideshow').children().eq(slideNo - 1).css("z-index", "201").addClass('active');
                    setTimeout(function() {
                        $('#active-slideshow').children().eq(slideNo).removeClass('active');
                        $('#active-slideshow').children().eq(slideNo - 1).removeAttr("style");
                    }, 500);
                } else {
                    this.setState({ dataactive: slides.length - 1 });
                    $('#active-slideshow').children().eq(slides.length - 1).addClass('active');
                    setTimeout(function() {
                        $('#active-slideshow').children().eq(0).removeClass('active');
                    }, 500);
                }
            }

        },

        render: function() {
            return [
                e('div', { key: "slideshow", id: 'active-slideshow', className: "container-fluid fs-image", tabIndex: 0, onClick: this.handleClick, dataactive: this.state.dataactive, onKeyDown: this.handleKeyDown }, slides),
                e('div', { key: "info", id: 'active-info', className: "container-fluid d-none" },
                    e('div', { className: "row" },
                        e('div', { key: "info-text", id: "info-text", className: "col col-12 col-md-4" }, infoText),
                        e('div', { key: "info-imgs", id: "info-imgs", className: "col col-12 col-md-8" }, infoImgs)
                    )
                )
            ];

        }
    });

    ReactDOM.render(
        e(Project),
        document.getElementById('project-wrapper')
    );
};

// create slideshow footer
function captions(project, slideNum) {
    ReactDOM.render(
        e('div', { id: 'footer-container', className: "container-fluid" },
            e('ul', { className: "row" },
                e('li', { key: 'fd-title', className: "d-none d-md-block col col-sm-10" }, project.title + ": " + project.logline),
                e('li', { key: 'fm-title', className: "d-md-none col col-sm-10" }, slideNum + "/" + project.alt.length + " — " + project.alt[slideNum - 1]),
                e('li', { key: 'f-link', id: 'f-link', className: "text-right col col-sm-2" },
                    e('a', { id: "info-link", className: 'text-links', role: 'button' }, "Info"),
                    e('span', { className: "link-arrow" }, )
                )
            )
        ),
        document.getElementById('react-footer')
    );
};