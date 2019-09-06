// o-----------------------o
// | Function Declarations |
// o-----------------------o

/**
 * Load the navbar.
 */
var loadNavbar = function() {
	$("div#navbarLocation").load( "/navbar1.html div#topNavMenu" );
};

// o----------------o
// | Event Handlers |
// o----------------o
var bindBtnNavbar = function() {
	$("button#btnNavbar").click(function (e) { 
		e.preventDefault();

		let divNavLinks = $("div#navLinks");
		let cssDisplayVal = divNavLinks.css( "display" );

		if (cssDisplayVal == "none") {
			$(divNavLinks).show();
		} else {
			$(divNavLinks).hide();
		}
	});
}


/**
 * When the DOM finishes loading.
 */
$( document ).ready( function() {
	let deferredObj = $.Deferred();
	deferredObj
		.then (function() {
			let internalDeferred = $.Deferred();
			// Load navbar
			loadNavbar();
			// We don't need .promise() yet; just resolve the deferred
			return internalDeferred.resolve();
		}).then (function() {
			let internalDeferred = $.Deferred();
			bindBtnNavbar();
			return internalDeferred.resolve();
		});
	
	// Run the code
	deferredObj.resolve();
});
