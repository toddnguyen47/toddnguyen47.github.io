$(document).ready(function() {
	$("#topMenu").load("/header.html", function(responseText, textStatus, jqXHR) {
		setActivePage();
		addSubMenuFunctionality();
	});
});

/**
 * Set the current active page on the navigation bar
 */
function setActivePage() {
	var dictPages = {
		"": "#navbarHome",
		"ff6": "#navbarGamesDropdownMenuLink",
		"aoe2": "#navbarGamesDropdownMenuLink",
		"dnd": "#navbarDnD"
	};

	// Current page that we are on
	var pgUrl = window.location.pathname.substr(1, window.location.pathname.lastIndexOf("/") - 1).trim();
	var activePage = dictPages[pgUrl];

	$(activePage).addClass("active");
	// TODO: Do we have to remove any current active classes?
}


/**
 * Add submenu functionality
 * Reference: https://stackoverflow.com/q/44467377
 */
function addSubMenuFunctionality() {
	// Any dropdown toggle after dropdown-menu, i.e. a submenu!
	$(".dropdown-menu a.dropdown-toggle").on("click", function(e) {
		// Right now, we are at the anchor link
		// Close ALL other submenus
		if (!$(this).next().hasClass('show')) {
			$(this).parents(".dropdown-menu").first().find(".show").removeClass("show");
		}

		// Show/hide the current interested submenu
		var submenu = $(this).next(".dropdown-menu");
		submenu.toggleClass("show");

		// If parent closes, close the submenus
		// $(this).parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown", function(e) {
			// $(".dropdown-submenu .show").removeClass("show");
		// });
		
		e.stopPropagation();
	});
}
