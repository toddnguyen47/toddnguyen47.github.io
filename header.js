$(document).ready(function() {
	// Load the pseudo navigation bar,
	// Then set the title once the load is compplete
	$("#topMenu").load("/header.html", null, setTitleNavBar);
	
	
	/**
	 * Submenu code
	 * Reference: https://stackoverflow.com/a/45755948
	 */	
	console.log("DELETE ME");
	// When the dropdown toggle is clicked
	$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
		console.log("WE IN EHRE");
		// If the very next sibling element does not have the show class
		if (!$(this).next().hasClass('show')) {
			// Obtain the first parent that has the dropdown-menu class
			// then find the descendants of that first parent and remove all
			// show class
			$(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
		}
	
		// The submenu is the next dropdown menu, e.g. never the initial button
		var $subMenu = $(this).next("dropdown-menu");
		$subMenu.toggleClass('show');  // TOGGLE, not solely turning it on!
	
		// More stuff
		console.log($subMenu.attr('class'));
	});
	console.log("DELETE ME 2");


	/**
	 * Set the title of the "nav bar" according to what page it is currently on.
	 */
	function setTitleNavBar() {
		var titleDict = {
			"": "Home",
			"aoe2": "Age of Empires 2",
			"dnd" : "Dungeons and Dragons Spells",
			"ff6" : "Final Fantasy VI Advance Utilities",
			"replaceSlashes": "Replace Slashes"
		};

		// Current page that we are on
		var pgUrl = window.location.pathname.substr(1, window.location.pathname.lastIndexOf("/") - 1).trim();
		var properTitle = titleDict[pgUrl];

		var maxLength = 15;
		if (properTitle.length > maxLength) {
			// We want to subtract 3 to accommodate for the ellipses
			properTitle = properTitle.substr(0, maxLength - 3) + "...";
		}

		$("#menuBtn span.menuBtnText").text(properTitle);
	}
});
