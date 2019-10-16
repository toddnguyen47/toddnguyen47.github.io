// o-----------------------o
// | Function Declarations |
// o-----------------------o

/**
 * Load the navbar.
 */
var loadNavbar = function() {
	$("div#navbarLocation").load( "/navbar1.html div#topNavMenu" );
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

// o----------------o
// | Event Handlers |
// o----------------o
var bindAllButtons = function() {
	$(window).on("resize", function(e) {
		console.log($("#overlay").width());
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
	let deferredObj = $.Deferred();
	deferredObj
		.then (function() {
			return loadUsingDefers(loadNavbar);
		}).then (function() {
			return loadUsingDefers(bindAllButtons);
		});
	
	// Run the code
	deferredObj.resolve();
});

/**
 * Load using a defer statement.
 * @param {function} fn pointer to a function
 */
function loadUsingDefers(fn) {
	let internalDeferred = $.Deferred();
	fn();
	return internalDeferred.resolve();
}

