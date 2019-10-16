// o-----------------------o
// | Function Declarations |
// o-----------------------o

/**
 * Load the navbar.
 */
var loadNavbar = function() {
	$("div#navbarLocation").load("/navbar1.html div#topNavMenu",
		function(responseText, textStatus, jqXHR){
			if (jqXHR.readyState === 4)
				bindAllButtons();
		});
};


/**
 * Open the navigation top menu.
 */
var openNav = function() {
	$("#overlay").width($('body').outerWidth());
}


/**
 * Close the navigation bar.
 */
var closeNav = function() {
	$("#overlay").width("0%");
}

/**
 * Handle what happens after the page finishes loading.
 */
var handlePostLoad = function() {
	bindAllButtons();
}


// o----------------o
// | Event Handlers |
// o----------------o
var bindAllButtons = function() {
	$(window).on("resize", function(e) {
		if ($("#overlay").width() !== 0)
			openNav();
	});

	$("button#btnNavbar").click(function (e) { 
		e.preventDefault();
		openNav();
	});

	$("button#closeBtn").click(function(e) {
		e.preventDefault();
		closeNav();
	});
}


/**
 * When the DOM finishes loading.
 */
$(document).ready( function() {
	loadNavbar();
});
