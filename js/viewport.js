window.addEventListener('resize', () => {
    // 1vh of viewport height
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document

    var listCount = $("#numbers > li").length
    var countHeight = $("#numbers li:first-child").height();
    var listHeight = listCount * countHeight;

    var headerHeight = $("#archive-categories").height();
    var botHeight = $("content").height()/2;

    if (botHeight - headerHeight >= listHeight) {
    	document.documentElement.style.setProperty('--height', `${listHeight}px`);
    } else {
        document.documentElement.style.setProperty('--height', `${botHeight-headerHeight}px`);
    }
});

//var(--vh, 1vh) * 30