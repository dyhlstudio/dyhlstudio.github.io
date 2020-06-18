let vw = window.innerWidth * 0.01;
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--vw', `${vw}px`);

window.addEventListener('resize', () => {
    // 1vh of viewport height
    let vw = window.innerWidth * 0.01;
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);

    // fix article#project-wrapper lag during resize
    $('#project-wrapper').css('transition', 'transform 0s');
    setTimeout(function() {
    	$('#project-wrapper').css('transition', 'transform 1s ease');
    }, 500);

    // fix main#home lag during resize
    $('#home').css('transition', 'transform 0s') ;
    setTimeout(function() {
    	$('#home').css('transition', 'transform 1s ease');
    }, 500);
});