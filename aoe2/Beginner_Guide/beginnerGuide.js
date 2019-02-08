$(document).ready(function() {
	addSidebarActive();

	var dynamicResizeObj = addDynamicResizing();
	// Check for initial window width
	dynamicResizeObj.windowWidthFunc();
	
	// Then when window changes size, check dynamically
	$(window).resize(dynamicResizeObj.windowWidthFunc);

	dynamicResizeObj.addSidebarLinkClickHandler();
	addSidebarButtonToggleFunctionality();

	militaryCivObject = getMilitaryCivObject();
	militaryCivObject.loadCivTabs();
	militaryCivObject.loadCivMilitaryComposition();
	militaryCivObject.addMilitaryCardUnitFunc();
});


/**
 * Set the sidebar to active whenever it is clicked
 */
function addSidebarActive() {
	$(".sidebarNav .nav-item a.nav-link").on("click", function(e) {
		// Remove all active classes
		$(this).parents(".nav").first().find("a.nav-link").removeClass("active");
		// Add the current class to be the only active class
		$(this).addClass("active");
	});
}


/**
 * Add dynamic resizing options for the page.
 */
function addDynamicResizing() {
	var maxMobileWindowWidth = 575;

	var windowWidthFunc = function() {
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
	 * MOBILE ONLY
	 * When you click on a sidebar link, hide the sidebar
	 */
	var addSidebarLinkClickHandler = function() {
		$(".nav-item a.nav-link").on("click", function(e) {
			var $windowWidth = $(window).width();
			// If mobile, hide the sidebar
			if ($windowWidth < maxMobileWindowWidth) {
				$(this).parents(".sidebarNav").addClass("customHidden");
			}
		});
	}

	return {
		addSidebarLinkClickHandler: addSidebarLinkClickHandler,
		windowWidthFunc: windowWidthFunc
	};
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
 * Pseudo-object that deals with civilizations
 */
function getMilitaryCivObject() {
	// The alphabetically sorted list of civs
	// Used for loadCivTabs() and loadCivMilitaryComposition()
	var m_civList = ["Aztecs","Berbers","Britons","Burmese","Byzantines","Celts","Chinese",
		"Ethiopians","Franks","Goths","Huns","Incas","Indians","Italians","Japanese","Khmer",
		"Koreans","Magyars","Malay","Malians","Mayans","Mongols","Persians","Portuguese",
		"Saracens","Slavs","Spanish","Teutons","Turks","Vietnamese","Vikings"];
	// Randomly choose a last shown civ
	var randomIndex = Math.floor(Math.random() * m_civList.length);
	var m_activeCivId = m_civList[randomIndex].toLowerCase();

	getCivList = function() {
		return m_civList;
	}

	getActiveCiv = function() {
		return m_activeCivId;
	}


	/**
	 * Add functionality to the military cards
	 */
	addMilitaryCardUnitFunc = function() {
		$("#civMilitaryTabs li a").on("click", function(e) {
			e.preventDefault();
			// Obtain the ID associated with the tab
			var curCiv = $(this).text().toLowerCase();

			// Turn off previously active card's tab's content
			$("#" + m_activeCivId + "Content").removeClass("active");
			// Remove the bottom border
			$("#" + m_activeCivId + "Tab").parent().removeClass("bottomBorder");

			// Only show the current tab's content
			$("#" + curCiv + "Content").addClass("active");
			// Add the bottom border to the tab
			$("#" + curCiv + "Tab").parent().addClass("bottomBorder");

			// Save the currently shown tab
			m_activeCivId = curCiv;
		});
	}


	/**
	 * Load each civ tabs
	 * 
	 * @param m_civList -> The alphabetically-sorted list of all civilizations
	 */
	loadCivTabs = function() {
		for (let civ of m_civList) {
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
			if (civ.toLowerCase() === m_activeCivId.toLowerCase()) {
				var curAnchorLink = "ul#civMilitaryTabs li a#" + civId;
				$(curAnchorLink).addClass("active");
				$(curAnchorLink).parent("li.nav-item").addClass("bottomBorder");
			}
		}
	}


	/**
	 * Load each civilization's military composition
	 */
	loadCivMilitaryComposition = function() {
		$.ajax({
			type: "GET",
			url: "civComposition.xml",
			dataType: "xml",
			success: function(xmlData) {
				civs = $(xmlData).find("civ");
				for (i = 0; i < civs.length; i++) {
					var curCiv = civs[i];
					var civName = $(curCiv).find("name").text();
					var primaryUnits = $(curCiv).find("primary").text();
					var supportingUnits = $(curCiv).find("support").text();
					var notes = $(curCiv).find("notes").text();
					
					var civId = civName.toLowerCase() + "Content";

					$("div#civMilitaryContent").append(
						$('<div>').attr("class", "tab-pane card card-body normalFontWeight")
						.attr("id", civId)
						.attr("role", "tabpanel")
						.append(
							$('<p>').append("<strong>PRIMARY UNITS: </strong>")
							.append(primaryUnits)
						).append(
							$('<p>').append("<strong>SUPPORTING UNITS: </strong>")
							.append(supportingUnits)
						).append(
							$('<p>').append("<strong>NOTES: </strong>")
							.append(notes)
						)
					);

					// Add an active pane
					if (civName.toLowerCase() === m_activeCivId.toLowerCase()) {
						$("div#" + civId).addClass("active");
					}
				}
			}
		});
	}

	return {
		getCivList: getCivList,
		getActiveCiv: getActiveCiv,
		addMilitaryCardUnitFunc: addMilitaryCardUnitFunc,
		loadCivTabs: loadCivTabs,
		loadCivMilitaryComposition: loadCivMilitaryComposition
	};
}