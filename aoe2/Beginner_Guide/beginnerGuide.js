var maxMobileWindowWidth = 575;

// Remember which military civilization was shown last
var lastShownCivCardId1 = "#aztecsContent";

// The alphabetically sorted list of civs
// Used for loadCivTabs() and loadCivMilitaryComposition()
var civList = ["Aztecs","Berbers","Britons","Burmese","Byzantines","Celts","Chinese",
	"Ethiopians","Franks","Goths","Huns","Incas","Indians","Italians","Japanese","Khmer",
	"Koreans","Magyars","Malay","Malians","Mayans","Mongols","Persians","Portuguese",
	"Saracens","Slavs","Spanish","Teutons","Turks","Vietnamese","Vikings"];
var activeCiv = "Aztecs";

$(document).ready(function(){
	addSidebarActive();

	// Check for initial window width
	addDynamicResizing();
	// Then when window changes size, check dynamically
	$(window).resize(addDynamicResizing);

	addSidebarButtonToggleFunctionality();
	addSidebarLinkClickHandler();

	addMilitaryCardUnitFunc();

	loadCivTabs();
	loadCivMilitaryComposition();
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


/**
 * Add functionality to the military cards
 */
function addMilitaryCardUnitFunc() {
	$("#aztecsBerbersTab a").on("click", function(e) {
		e.preventDefault();
		// Obtain the ID associated with the tab
		var tabId = $(this)[0]["hash"];

		// Turn off previously active card
		$(lastShownCivCardId1).removeClass("active");
		// Save the currently shown tab
		lastShownCivCardId1 = tabId;

		// Only show the current tab
		$(tabId).addClass("active");
	});
}


/**
 * Load each civ tabs
 */
function loadCivTabs() {
	for (let civ of civList) {
		var civId = civ.toLowerCase() + "Tab";
		var civHref = "#" + civ.toLowerCase() + "Content";

		$("ul#civMilitaryTabs").append(
			$('<li>').attr("class", "nav-item")
					 .append(
				$('<a>').attr("class", "nav-link")
						.attr("id", civId)
						.attr("data-toggle", "tab")
						.attr("href", civHref)
						.attr("role", "tab")
						.append(civ)
			)
		);

		// Add an active pane
		if (civ === activeCiv) {
			$("ul#civMilitaryTabs li a").addClass("active");
		}
	}
}


/**
 * Load each civilization's military composition
 */
function loadCivMilitaryComposition() {
	// Load the JSON that contains civ military composition
	$.getJSON("civComposition.json", function(data, textStatus, jqXHR) {
		var civJsonData = data;
		
		for (let civ of civList) {
			if (civ !== "Aztecs") break;
			var civId = civ.toLowerCase() + "Content";

			var curCivData = civJsonData[civ];
			var primary = curCivData["primary"];
			var supportingUnits = curCivData["support"];
			var notes = curCivData["notes"];

			$("div#civMilitaryContent").append(
				$('<div>').attr("class", "tab-pane card col-sm-10 card-body normalFontWeight")
						  .attr("id", civId)
						  .attr("role", "tabpanel")
						  .append(
							$('<p>').append("<strong>Primary Units: </strong>")
								    .append(primary)
						  ).append(
							$('<p>').append("<strong>Supporting Units: </strong>")
								    .append(supportingUnits)
						  ).append(
							$('<p>').append("<strong>Notes: </strong>")
								    .append(notes)
						  )
			);

			// Add an active pane
			if (civ === activeCiv) {
				$("div#civMilitaryContent div").addClass("active");
			}
		}
	});
}
