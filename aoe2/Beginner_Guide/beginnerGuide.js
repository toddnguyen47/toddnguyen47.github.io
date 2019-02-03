var maxMobileWindowWidth = 575;

$(document).ready(function(){
	addSidebarActive();

	// Check for initial window width
	addDynamicResizing();
	// Then when window changes size, check dynamically
	$(window).resize(addDynamicResizing);

	addSidebarButtonToggleFunctionality();
	addSidebarLinkClickHandler();
});


/**
 * Set the sidebar to active whenever it is clicked
 */
function addSidebarActive() {
	$(".nav-item a.nav-link").on("click", function(e) {
		// Remove all active classes
		$(this).parents(".nav").first().find("a.nav-link").removeClass("active");
		// Add the current class to be the only active class
		$(this).addClass("active");
	});
}


/**
 * When you resize, hide certain elements
 */
function addDynamicResizing() {
	var $windowWidth = $(window).width();
	// If mobile
	if ($windowWidth < maxMobileWindowWidth) {
		$("div#sidebarNavContent").addClass("customHidden");
	}

	// If not mobile
	else {
		$("div#sidebarNavContent").removeClass("customHidden");
	}
}


/**
 * When you click on the sidebar toggle button, show the sidebar button
 * MOBILE ONLY
 */
function addSidebarButtonToggleFunctionality() {
	$("button#sidebarNavToggleMobile").on("click", function(e) {
		$("div#sidebarNavContent").toggleClass("customHidden");
	});
}


/**
 * MOBILE ONLY
 * When you click on a sidebar link, hide the sidebar
 */
function addSidebarLinkClickHandler() {
	$(".nav-item a.nav-link").on("click", function(e) {
		var $windowWidth = $(window).width();
		// If mobile, hide the sidebar
		if ($windowWidth < maxMobileWindowWidth) {
			$(this).parents(".sidebarNav").addClass("customHidden");
		}
	});
}
