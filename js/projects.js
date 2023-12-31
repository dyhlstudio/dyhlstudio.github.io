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

function fontScrambler() {
    var fonts = ["iA Writer Mono", "stratos", "Fluxisch Else Bold", "Ortica Light", "freight-display-pro"];
    for (let i = fonts.length - 1; i > 0; i--) { // fisher yates shuffle
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [fonts[i], fonts[j]] = [fonts[j], fonts[i]];
    }

    var fontorder = '';
    for (i = 0; i < fonts.length; i++) {
        fontorder += fonts[i] + ', ';
    }

    fontorder += ' Helvetica, sans-serif'
    $('body').css('font-family', fontorder);
}

var bottomList = projectsList.map(function(project) {
    return e('div', { key: parseInt(project.no, 10), id: project.no, className: 'link-wrapper', role: 'button' },
        e('ul', { className: 'project-entry row ' + typeClass(project.type) },
            e('li', { className: 'entry-no d-none d-sm-block col col-2 project-link' }, project.no),
            e('li', { className: 'entry-year col col-2 project-link' }, project.year),
            e('li', { className: 'entry-title col col-6 col-sm-4 project-link' }, project.title),
            e('li', { className: 'entry-tags d-none d-lg-block col col-4 project-link' }, tagMaker(project.tags)[1]),
            e('li', { className: 'entry-tags d-lg-none col col-4 project-link' }, tagMaker(project.tags)[0])
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
var tempered = false;
var touched = false;


//nav-4 variables
var onSlides = false;
var onHome = true;

// unset overflow on body
var unsetBounds = false;

$(document).ready(function() {
    fontScrambler();
    // reorient image aspect-ratio
    // info-imgs 
    document.documentElement.style.setProperty('--threetwo-info', $('.img-wrapper-end').width() * 2 / 3 + 'px');
    // middle thumb
    document.documentElement.style.setProperty('--bigtextH', $('#big-text').height() + 'px');
    document.documentElement.style.setProperty('--threetwo-thumb', $('.thumb-wrapper').width() * 2 / 3 + 'px');
    document.documentElement.style.setProperty('--sixteennine-thumb', $('.thumb-wrapper').width() * 9 / 16 + 'px');

    // responsive fixes
    $(window).resize(function() {
        // info-imgs 
        document.documentElement.style.setProperty('--threetwo-info', $('.img-wrapper-end').width() * 2 / 3 + 'px');
        // middle thumb
        document.documentElement.style.setProperty('--bigtextH', $('#big-text').height() + 'px');
        document.documentElement.style.setProperty('--threetwo-thumb', $('.thumb-wrapper').width() * 2 / 3 + 'px');
        document.documentElement.style.setProperty('--sixteennine-thumb', $('.thumb-wrapper').width() * 9 / 16 + 'px');
    });

    // hides loading message caused by jquery mobile
    $.mobile.loading().hide();

    // When clicking/tapping anchors inside of parent .ui-checkbox element(s)
    $('#nav-0, #nav-1, #nav-2, #experiments').bind("tap click", function(event, data){
        event.stopPropagation();

        // Call jQuery Mobile's changePage function to send user off to the anchor's href destination
        $.mobile.changePage($(this).attr('href'));
    });

    $('#nav-4').on('vclick', function() {
        // close
        if ($('#nav-4').hasClass('on')) {
            $('#nav-4').removeClass('on');
            $('#nav-4 a').removeClass('links');
            $('#nav-1, #nav-2').addClass('d-md-block');
            $('#nav-0').removeClass('d-none');
            $('#nav-info').addClass('d-none');
            $('#nav-blank').removeClass('d-sm-block');
            if (onHome === true) {
                $('#home').addClass('d-flex').removeClass('d-none');
            }
            if (onSlides === true) {
                captionHighlight($('.active'));
                $('footer').removeClass('d-none');
            }
            $('#project-wrapper').removeClass('d-none');
            // open
        } else {
            $('#nav-container').removeClass('fs-no-line');
            $('#nav-1, #nav-2').removeClass('d-md-block');
            $('#nav-0, #home').addClass('d-none');
            $('#home').removeClass('d-flex');
            $('#nav-info').removeClass('d-none');
            $('#nav-blank').addClass('d-sm-block');
            $('#nav-4').addClass('on');
            $('#nav-4 a').addClass('links');
            $('#project-wrapper').addClass('d-none');
            if (onSlides === true) {
                $('a, p').removeClass('fs-highlight');
                $('a, p').removeClass('fsm-highlight');
                $('#nav-container').removeClass('fs-no-line');
                $('#nav-container').removeClass('fsm-no-line');
                $('footer').addClass('d-none');
            }
        }
    });
    // Prepare project

    $('.link-wrapper').on('vclick', function() {
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

        $('.view-links').on('vclick', function() {
            $('body').css('overflow', 'unset');
            onHome = false;
            // determine boundary for setUnsetBoundary
            // determineBoundary($('#active-slideshow > .active'));
            // setUnsetBoundary();
            captions(projectsList[selectionNo], (parseInt($('#active-slideshow').attr('dataactive'), 10) + 1));

            // show buttons
            $('.arrows').show(1000);
            setTimeout(function() {
                $('#home').removeClass('d-flex').addClass('d-none');
            }, 1000);
            // info button
            $('#info-link').on('vclick', function() {
                $('body').css('overflow', 'unset');
                onSlides = false;
                onInfo = true;
                $('html').css('overflow', 'unset');
                $('body').addClass('unframe');
                $('#active-info').removeClass('d-none');
                $('#react-footer, #active-slideshow').addClass('d-none');
                $('#project-wrapper').removeClass('slideshow');
                $('a, p').removeClass('fs-highlight');
                $('a, p').removeClass('fsm-highlight');
                $('#nav-container').removeClass('fs-no-line');
                $('#nav-container').removeClass('fsm-no-line');

                // overview images, aspect ratio fix upon load
                document.documentElement.style.setProperty('--threetwo-info', $('.img-wrapper-end').width() * 2 / 3 + 'px');
            });
            onSlides = true;
            // rendered project slide-in
            $('.return').css("transform", "translate(0)");
            $('.hide').css('transform', "translate(-100vw)");
            captionHighlight($('#active-slideshow > .active'));
            setTimeout(function() {
                $('#active-slideshow').focus()
            }, 1000);
        });
    });

    // filtering projects list

    $('#big-text').on('vclick', '.text-links', function() {

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

    $('.project-entry').on('vclick', function() {
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
    $('#thumb').attr('src', 'assets/whitethumb.png');
    $('#big-text')
        .text('Yuna Li is a New York-based designer and technologist creating experiments in ')
        .append('<a id="architecture" class="text-links" role="button">Architecture</a>, <a id="design" class="text-links" role="button">Graphic & Web Design</a>, and <a id="media" class="text-links" role="button">Interactive Media</a>.');
};

// create slideshow footer
function captions(project, slideNum) {
    ReactDOM.render(
        e('div', { id: 'footer-container', className: "container-fluid" },
            e('ul', { className: "row" },
                e('li', { key: 'f-title', className: "col col-10" },
                    e('a', { role: 'button', id: 'f-caption' }, slideNum + "/" + project.alt.length + " — " + project.alt[slideNum - 1])),
                e('li', { key: 'f-link', id: 'f-link', className: "text-right col col-sm-2" },
                    e('a', { id: "info-link", className: 'text-links', role: 'button' }, "Info",
                        e('span', { className: "link-arrow" }, )
                    ),
                )
            )
        ),
        document.getElementById('react-footer')
    );
};

function activateNextSlide(el, reset) {
    if (reset) {
        el.css("z-index", "201");
        el.addClass('active');
    } else {
        el.addClass('active');
    }
    captionHighlight(el);
    // determineBoundary(el);
}

function captionHighlight(el) {
    // footer mode based on fs/not fs image
    if (el.children().hasClass('fs-img') || el.children().hasClass('fs-vid')) {
        if ($('a, p').hasClass('fsm-highlight')) {
            $('a, p').removeClass('fsm-highlight');
            $('#nav-container').removeClass('fsm-no-line');
        }

        $('a, p').addClass('fs-highlight');
        $('#nav-container').addClass('fs-no-line');
    }
    if (el.children().hasClass('fsm-img')) {
        if ($('a, p').hasClass('fs-highlight')) {
            $('a, p').removeClass('fs-highlight');
            $('#nav-container').removeClass('fs-no-line');
        }
        $('a, p').addClass('fsm-highlight');
        $('#nav-container').addClass('fsm-no-line');

    }
    if (el.children().hasClass('sm-img') || el.children().hasClass('three-d-container')) {
        if ($('a, p').hasClass('fs-highlight')) {
            $('a, p').removeClass('fs-highlight');
            $('#nav-container').removeClass('fs-no-line');
        }
        if ($('a, p').hasClass('fsm-highlight')) {
            $('a, p').removeClass('fsm-highlight');
            $('#nav-container').removeClass('fsm-no-line');
        }
    }
}


// function determineBoundary(el) {
//     // determine boundary for setUnsetBoundary
//     if (el.hasClass('fs-frame')) {
//         unsetBounds = true;
//     } else {
//         unsetBounds = false;
//     }
// }

// function setUnsetBoundary() {
//     // fullscreen framing
//     if (unsetBounds) {
//         $('body').css('overflow', 'unset');
//     } else {
//         setTimeout(function() {
//             $('body').css('overflow', 'hidden');
//         }, 500);
//     }
// }

function compileProject() {

    // touch inputs
    var initialTouchPos = null;
    var lastTouchPos = null;

    // slideshow assets
    var slides = [];
    for (i = 0; i < projectsList[selectionNo].assets.length; i++) {
        if (projectsList[selectionNo].frame[i] === "fs") {
            if (i == 0) {
                slides.push(
                    e('div', { key: i, className: 'd-flex justify-content-center align-items-center frame fs-frame inactive active' },
                        e('img', { className: 'fs-img', src: projectsList[selectionNo].assets[i] })
                    )
                );
            } else {
                slides.push(
                    e('div', { key: i, className: 'd-flex justify-content-center align-items-center frame fs-frame inactive' },
                        e('img', { className: 'fs-img', src: projectsList[selectionNo].assets[i] })
                    )
                );
            }
        }
        if (projectsList[selectionNo].frame[i] === "fsm") {
            if (i == 0) {
                slides.push(
                    e('div', { key: i, className: 'd-flex justify-content-center align-items-center frame inactive active' },
                        // e('div', { className: 'frame-cut' },
                        e('img', { className: 'fsm-img', src: projectsList[selectionNo].assets[i] })
                        // )
                    )
                );
            } else {
                slides.push(
                    e('div', { key: i, className: 'd-flex justify-content-center align-items-center frame inactive' },
                        // e('div', { className: 'frame-cut' },
                        e('img', { className: 'fsm-img', src: projectsList[selectionNo].assets[i] })
                        // )
                    )
                );
            }
        }

        if (projectsList[selectionNo].frame[i] === "sm") {
            if (i == 0) {
                slides.push(
                    e('div', { key: i, className: 'd-flex justify-content-center align-items-center frame inactive active' },
                        e('img', { className: 'sm-img', src: projectsList[selectionNo].assets[i] })
                    )
                );
            } else {
                slides.push(
                    e('div', { key: i, className: 'd-flex justify-content-center align-items-center frame inactive' },
                        e('img', { className: 'sm-img', src: projectsList[selectionNo].assets[i] })
                    )
                );
            }
        }

        if (projectsList[selectionNo].frame[i] === "vid") {
            if (i == 0) {
                slides.push(
                    e('div', { key: i + 'video', className: 'd-flex justify-content-center align-items-center frame v-frame inactive active' },
                        e('iframe', { className: 'fs-vid', src: projectsList[selectionNo].assets[i], style: { width: 80 + "%", height: 80 + "%" }, frameBorder: 0, allow: 'fullscreen', allowFullScreen: '' })
                    )
                )
            } else {
                slides.push(
                    e('div', { key: i + 'video', className: 'd-flex justify-content-center align-items-center frame v-frame inactive' },
                        e('iframe', { className: 'fs-vid', src: projectsList[selectionNo].assets[i], style: { width: 80 + "%", height: 80 + "%" }, frameBorder: 0, allow: 'fullscreen', allowFullScreen: '' })
                    )
                )
            }
        }

        if (projectsList[selectionNo].frame[i] === "3d") {
            if (i == 0) {
                slides.push(
                    e('div', { key: i, className: 'three-d-frame d-flex justify-content-center align-items-center frame inactive active' },
                        e('iframe', { className: 'three-d-container', src: projectsList[selectionNo].assets[i] })
                    )
                );

            } else {
                slides.push(
                    e('div', { key: i, className: 'three-d-frame d-flex justify-content-center align-items-center frame inactive' },
                        e('iframe', { className: 'three-d-container', src: projectsList[selectionNo].assets[i] })
                    )
                );
            }
        }
    }


    // info overview text
    var infoText = [];
    for (i = 0; i < projectsList[selectionNo].description.length; i++) {
        infoText.push(e('p', { key: i, id: "desc" }, projectsList[selectionNo].description[i]));
    }
    infoText.unshift(
        e('h2', { key: "title", id: "title" }, projectsList[selectionNo].title),
        e('p', { key: "year", id: "year" }, projectsList[selectionNo].year),
        e('p', { key: "tags", id: "tags" }, tagMaker(projectsList[selectionNo].tags)[1]),
        e('br', { key: "br1", className: "d-none d-md-block" }, ),
        e('br', { key: "br2", className: "d-none d-md-block" }, )
    );

    // info overview imgs
    var infoImgs = [];
    for (i = 0; i < projectsList[selectionNo].assets.length; i++) {
        if (projectsList[selectionNo].frame[i] != 'vid' || projectsList[selectionNo].frame[i] != '3d') {
            if (i == projectsList[selectionNo].assets.length - 1) {
                infoImgs.push(e('div', { key: i, className: "img-wrapper-end" },
                    e('img', { className: "list-img responsive-img", src: projectsList[selectionNo].assets[i] })
                ));
            } else {
                infoImgs.push(e('div', { key: i, className: "img-wrapper" },
                    e('img', { key: i, className: "list-img responsive-img", src: projectsList[selectionNo].assets[i] })
                ));
            }
        }
        if (projectsList[selectionNo].frame[i] == 'vid') {
            if (i == projectsList[selectionNo].assets.length - 1) {
                infoImgs.push(e('div', { key: i, className: "img-wrapper-end" },
                    e('iframe', { className: 'video', src: projectsList[selectionNo].assets[i], style: { width: 100 + "%", height: 100 + "%" }, frameBorder: 0, allow: 'fullscreen', allowFullScreen: null })
                ));
            } else {
                infoImgs.push(e('div', { key: i, className: "img-wrapper" },
                    e('iframe', { className: 'video', src: projectsList[selectionNo].assets[i], style: { width: 100 + "%", height: 100 + "%" }, frameBorder: 0, allow: 'fullscreen', allowFullScreen: null })
                ));
            }
        }
        if (projectsList[selectionNo].frame[i] == '3d') {
            if (i == projectsList[selectionNo].assets.length - 1) {
                infoImgs.push(e('div', { key: i, className: "img-wrapper-end" },
                    e('iframe', { className: 'three-d-info', src: projectsList[selectionNo].assets[i], style: { width: 100 + "%", height: 100 + "%" } })
                ));
            } else {
                infoImgs.push(e('div', { key: i, className: "img-wrapper" },
                    e('iframe', { className: 'three-d-info', src: projectsList[selectionNo].assets[i], style: { width: 100 + "%", height: 100 + "%" } })
                ));
            }
        }
    }

    // react project class
    var Project = createReactClass({
        getInitialState: function() {
            return {
                dataactive: 0,
            };
        },

        // handleClick: function() {
        //     // clicks limited to 1 per 500ms
        //     if (tempered === true) {
        //         return false; // failed click
        //     }

        //     // successful keypress
        //     tempered = true;
        //     setTimeout(function() {
        //         tempered = false;
        //     }, 500);
        //     let slideNo = this.state.dataactive;
        //     if (this.state.dataactive + 1 < slides.length) {
        //         this.setState({ dataactive: this.state.dataactive + 1 });
        //         $('#active-slideshow').children().eq(slideNo + 1).addClass('active');
        //         // framing
        //         if ($('#active-slideshow').children().eq(slideNo + 1).hasClass('fs-frame')) {
        //             unsetBounds = true;
        //         } else {
        //             unsetBounds = false;
        //         }
        //         setTimeout(function() {
        //             $('#active-slideshow').children().eq(slideNo).removeClass('active');
        //         }, 500);
        //     } else {
        //         this.setState({ dataactive: 0 });
        //         $('#active-slideshow').children().eq(0).css("z-index", "201").addClass('active');
        //         // framing
        //         if ($('#active-slideshow').children().eq(0).hasClass('fs-frame')) {
        //             unsetBounds = true;
        //         } else {
        //             unsetBounds = false;
        //         }
        //         setTimeout(function() {
        //             $('#active-slideshow').children().eq(slides.length - 1).removeClass('active');
        //             $('#active-slideshow').children().eq(0).css("z-index", "200").addClass('active');
        //         }, 500);
        //     }

        //     // fullscreen framing
        //     if (unsetBounds) {
        //         $('body').css('overflow', 'unset');
        //     } else {
        //         setTimeout(function() {
        //             $('body').css('overflow', 'hidden');
        //         }, 500);
        //     }

        // },

        handleKeyDown: function(evt) {
            // keypresses limited to 1 per 500ms
            // failed keypress
            if (tempered === true) {
                return;
            }

            // successful keypress
            tempered = true;
            setTimeout(function() {
                tempered = false;
            }, 500);
            var looped = false;
            if (evt.keyCode === 39) {
                let slideNo = this.state.dataactive;
                if (this.state.dataactive + 1 < slides.length) {
                    looped = false;
                    this.setState({ dataactive: this.state.dataactive + 1 });
                    activateNextSlide($('#active-slideshow').children().eq(slideNo + 1), looped);
                    setTimeout(function() {
                        $('#active-slideshow').children().eq(slideNo).removeClass('active');
                    }, 500);
                    //footer
                    $('#f-caption').text((this.state.dataactive + 2) + "/" + projectsList[selectionNo].alt.length + "  —  " + projectsList[selectionNo].alt[this.state.dataactive + 1]);
                } else {
                    this.setState({ dataactive: 0 });
                    looped = true;
                    activateNextSlide($('#active-slideshow').children().eq(0), looped);
                    setTimeout(function() {
                        $('#active-slideshow').children().eq(slides.length - 1).removeClass('active');
                        $('#active-slideshow').children().eq(0).css("z-index", "200");
                    }, 500);
                    //footer
                    $('#f-caption').text("1" + "/" + projectsList[selectionNo].alt.length + " — " + projectsList[selectionNo].alt[0]);

                }
            }

            if (evt.keyCode === 37) {
                let slideNo = this.state.dataactive;
                if (this.state.dataactive - 1 >= 0) {
                    this.setState({ dataactive: this.state.dataactive - 1 });
                    looped = true;
                    activateNextSlide($('#active-slideshow').children().eq(slideNo - 1), looped);
                    setTimeout(function() {
                        $('#active-slideshow').children().eq(slideNo).removeClass('active');
                        $('#active-slideshow').children().eq(slideNo - 1).removeAttr("style");
                    }, 500);
                    $('#f-caption').text((this.state.dataactive) + "/" + projectsList[selectionNo].alt.length + " — " + projectsList[selectionNo].alt[this.state.dataactive - 1]);
                } else {
                    this.setState({ dataactive: slides.length - 1 });
                    looped = false;
                    // fs/fsm highlight
                    activateNextSlide($('#active-slideshow').children().eq(slides.length - 1), looped);
                    setTimeout(function() {
                        $('#active-slideshow').children().eq(0).removeClass('active');
                    }, 500);
                    $('#f-caption').text(projectsList[selectionNo].alt.length + "/" + projectsList[selectionNo].alt.length + " — " + projectsList[selectionNo].alt[projectsList[selectionNo].alt.length - 1]);
                }
            }
            // setUnsetBoundary();
        },

        handlePStart: function(evt) {
            evt.preventDefault();
            if (evt.touches && evt.touches.length > 1) {
                return;
            }

            if (tempered === true) {
                return;
            }

            evt.target.setPointerCapture(evt.pointerId);
            initialTouchPos = getGesturePointFromEvent(evt);
        },

        handlePMove: function(evt) {
            evt.preventDefault();

            if (!initialTouchPos) {
                return;
            }

            if (tempered === true) {
                return;
            }

            lastTouchPos = getGesturePointFromEvent(evt);
            dispX = initialTouchPos.x - lastTouchPos.x;
            if (Math.abs(dispX) >= 30) {
                tempered = true; // limit inputs
                if (dispX > 0) { // swipe action left (arrow right equivalent)
                    let slideNo = this.state.dataactive;
                    if (this.state.dataactive + 1 < slides.length) {
                        looped = false;
                        this.setState({ dataactive: this.state.dataactive + 1 });
                        activateNextSlide($('#active-slideshow').children().eq(slideNo + 1), looped);
                        setTimeout(function() {
                            $('#active-slideshow').children().eq(slideNo).removeClass('active');
                        }, 500);
                        //footer
                        $('#f-caption').text((this.state.dataactive + 2) + "/" + projectsList[selectionNo].alt.length + "  —  " + projectsList[selectionNo].alt[this.state.dataactive + 1]);
                    } else {
                        looped = true;
                        this.setState({ dataactive: 0 });
                        activateNextSlide($('#active-slideshow').children().eq(0), looped);
                        setTimeout(function() {
                            $('#active-slideshow').children().eq(slides.length - 1).removeClass('active');
                            $('#active-slideshow').children().eq(0).css("z-index", "200");
                        }, 500);
                        //footer
                        $('#f-caption').text("1" + "/" + projectsList[selectionNo].alt.length + " — " + projectsList[selectionNo].alt[0]);

                    }
                } else { // swipe action right (arrow left equivalent)
                    let slideNo = this.state.dataactive;
                    if (this.state.dataactive - 1 >= 0) {
                        this.setState({ dataactive: this.state.dataactive - 1 });
                        looped = true;
                        activateNextSlide($('#active-slideshow').children().eq(slideNo - 1), looped);
                        setTimeout(function() {
                            $('#active-slideshow').children().eq(slideNo).removeClass('active');
                            $('#active-slideshow').children().eq(slideNo - 1).removeAttr("style");
                        }, 500);
                        $('#f-caption').text((this.state.dataactive) + "/" + projectsList[selectionNo].alt.length + " — " + projectsList[selectionNo].alt[this.state.dataactive - 1]);
                    } else {
                        this.setState({ dataactive: slides.length - 1 });
                        looped = false
                        activateNextSlide($('#active-slideshow').children().eq(slides.length - 1), looped);
                        setTimeout(function() {
                            $('#active-slideshow').children().eq(0).removeClass('active');
                        }, 500);
                        $('#f-caption').text(projectsList[selectionNo].alt.length + "/" + projectsList[selectionNo].alt.length + " — " + projectsList[selectionNo].alt[projectsList[selectionNo].alt.length - 1]);
                    }
                }
            }
            // setUnsetBoundary();
        },

        handlePEnd: function(evt) {
            evt.preventDefault();
            if (evt.touches && evt.touches.length > 0) {
                return;
            }
            // Remove Event Listeners
            evt.target.releasePointerCapture(evt.pointerId);
            initialTouchPos = null;
            lastTouchPos = null;

            if (tempered === true) {
                setTimeout(function() {
                    tempered = false;
                }, 500);
                return;
            } else {
                tempered = true;
                setTimeout(function() {
                    tempered = false;
                    // reset temper in 500ms
                }, 500);
                //slideshow change
                let slideNo = this.state.dataactive;
                if (this.state.dataactive + 1 < slides.length) {
                    this.setState({ dataactive: this.state.dataactive + 1 });
                    looped = false;
                    activateNextSlide($('#active-slideshow').children().eq(slideNo + 1), looped);
                    setTimeout(function() {
                        $('#active-slideshow').children().eq(slideNo).removeClass('active');
                    }, 500);
                    //footer
                    $('#f-caption').text((this.state.dataactive + 2) + "/" + projectsList[selectionNo].alt.length + "  —  " + projectsList[selectionNo].alt[this.state.dataactive + 1]);
                } else {
                    this.setState({ dataactive: 0 });
                    looped = true;
                    activateNextSlide($('#active-slideshow').children().eq(0), looped);
                    setTimeout(function() {
                        $('#active-slideshow').children().eq(slides.length - 1).removeClass('active');
                        $('#active-slideshow').children().eq(0).css("z-index", "200").addClass('active');
                    }, 500);
                    //footer
                    $('#f-caption').text("1" + "/" + projectsList[selectionNo].alt.length + " — " + projectsList[selectionNo].alt[0]);
                }
                // setUnsetBoundary();
            }
        },

        render: function() {
            return [
                e('div', { key: "slideshow", id: 'active-slideshow', className: "container-fluid fs-image", tabIndex: 0, dataactive: this.state.dataactive, onKeyDown: this.handleKeyDown, onPointerDown: this.handlePStart, onPointerMove: this.handlePMove, onPointerUp: this.handlePEnd }, slides),
                e('div', { key: "info", id: 'active-info', className: "container-fluid d-none" },
                    e('div', { className: "row" },
                        e('div', { key: "info-text", id: "info-text", className: "col col-12 col-md-4 invisible-scrollbar" },
                            e('div', {key: "text-wrapper", id: "text-wrapper" }, infoText)
                        ),
                        e('div', { key: "info-imgs", id: "info-imgs", className: "col col-12 col-md-8 invisible-scrollbar" }, infoImgs)
                    )
                )
            ];

        }
    });

    ReactDOM.render(
        e(Project),
        document.getElementById('project-wrapper')
    );

    // 3d model controls set attributes fix
    if($("model-viewer").length) {
        document.querySelector("model-viewer").setAttribute("shadow-intensity", "1");
        document.querySelector("model-viewer").setAttribute("camera-controls", "");
        document.querySelector("model-viewer").setAttribute("touch-action", "pan-y");
    }

};

function getGesturePointFromEvent(evt) {
    var point = {};

    if (evt.targetTouches) {
        // Prefer Touch Events
        point.x = evt.targetTouches[0].clientX;
        point.y = evt.targetTouches[0].clientY;
    } else {
        // Either Mouse event or Pointer Event
        point.x = evt.clientX;
        point.y = evt.clientY;
    }

    return point;
};