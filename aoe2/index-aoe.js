$(document).ready(function(){	
	addPersonalMods();
	addUnitsPopover();
});


function addUnitsPopover() {
	addPopover("jaguar_warrior", "infantry", "https://ageofempires.wikia.com/wiki/Jaguar_Warrior");
	addPopover("longbowman", "archer", "https://ageofempires.wikia.com/wiki/Longbowman_(Age_of_Empires_II)");
	addPopover("cataphract", "cavalry", "https://ageofempires.wikia.com/wiki/Cataphract_(Age_of_Empires_II)");
	addPopover("woad_raider", "infantry", "https://ageofempires.wikia.com/wiki/Woad_Raider");
	addPopover("chu_ko_nu", "archer", "https://ageofempires.wikia.com/wiki/Chu_Ko_Nu_(Age_of_Empires_II)");
	addPopover("throwing_axeman", "infantry", "https://ageofempires.wikia.com/wiki/Throwing_Axeman_(Age_of_Empires_II)");
	addPopover("huskarl", "infantry", "https://ageofempires.wikia.com/wiki/Huskarl_(Age_of_Empires_II)");
	addPopover("tarkan", "cavalry", "https://ageofempires.wikia.com/wiki/Tarkan");
	addPopover("samurai", "infantry", "https://ageofempires.wikia.com/wiki/Samurai_(Age_of_Empires_II)");
	addPopover("war_wagon", "archer", "https://ageofempires.wikia.com/wiki/War_Wagon_(Age_of_Empires_II)");
	addPopover("turtle_ship", "ship", "https://ageofempires.wikia.com/wiki/Turtle_Ship");
	addPopover("plumed_archer", "archer", "https://ageofempires.wikia.com/wiki/Plumed_Archer");
	addPopover("mangudai", "archer", "https://ageofempires.wikia.com/wiki/Mangudai");
	addPopover("war_elephant", "cavalry", "https://ageofempires.wikia.com/wiki/War_Elephant_(Age_of_Empires_II)");
	addPopover("mameluke", "cavalry", "https://ageofempires.wikia.com/wiki/Mameluke_(Age_of_Empires_II)");
	addPopover("conquistador", "archer", "https://ageofempires.wikia.com/wiki/Conquistador_(Age_of_Empires_II)");
	addPopover("missionary", "monk", "https://ageofempires.wikia.com/wiki/Missionary_(Age_of_Empires_II)");
	addPopover("teutonic_knight", "infantry", "https://ageofempires.wikia.com/wiki/Teutonic_Knight");
	addPopover("janissary", "archer", "https://ageofempires.wikia.com/wiki/Janissary_(Age_of_Empires_II)");
	addPopover("berserk", "infantry", "https://ageofempires.wikia.com/wiki/Berserk");
	addPopover("longboat", "ship", "https://ageofempires.wikia.com/wiki/Longboat_(Age_of_Empires_II)");
}


function addPopover(id, unitType, wikiLink) {
	// UnitType can be: archer, infantry, or cavalry
	if (unitType.toLowerCase() === "archer") {
		generatePopover(id,
			"<table class=\"table table-borderless table-hover\">\
			<tr><td><a target=\"_blank\" href=\"" + wikiLink + "\">Wiki Link</a></td></tr>\
			<tr><td>Archer</td><td><span class=\"wood\">(25&nbsp;W&nbsp;</span><span class=\"gold\">45&nbsp;G)</span></td></tr>\
			<tr><td>Skirmisher</td><td><span class=\"wood\">(35&nbsp;W&nbsp;</span><span class=\"food\">25&nbsp;F)</span></td></tr>\
			<tr><td>Cavalry Archer</td><td><span class=\"wood\">(40&nbsp;W&nbsp;</span><span class=\"gold\">70&nbsp;G)</span></td></tr>\
			<tr><td>Hand Cannoneer</td><td><span class=\"food\">(45&nbsp;W&nbsp;</span><span class=\"gold\">50&nbsp;G)</span></td></tr>\
			</table>");
	}
	else if (unitType.toLowerCase() === "infantry") {
		generatePopover(id, 
			"<table class=\"table table-borderless table-hover\">\
			<tr><td><a target=\"_blank\" href=\"" + wikiLink + "\">Wiki Link</a></td></tr>\
			<tr><td>Champion</td><td><span class=\"food\">(60&nbsp;F&nbsp;</span><span class=\"gold\">20&nbsp;G)</span></td></tr>\
			<tr><td>Halberdier</td><td><span class=\"food\">(35&nbsp;F&nbsp;</span><span class=\"wood\">25&nbsp;W)</span></td></tr>\
			<tr><td>Eagle Warrior</td><td><span class=\"food\">(20&nbsp;F&nbsp;</span><span class=\"gold\">50&nbsp;G)</span></td></tr>\
			</table>");
	}
	else if (unitType.toLowerCase() === "cavalry") {
		generatePopover(id,
			"<table class=\"table table-borderless table-hover\">\
			<tr><td><a target=\"_blank\" href=\"" + wikiLink + "\">Wiki Link</a></td></tr>\
			<tr><td>Light Cavalry</td><td><span class=\"food\">(80&nbsp;F)</span></td></tr>\
			<tr><td>Knight</td><td><span class=\"food\">(60&nbsp;F&nbsp;</span><span class=\"gold\">75&nbsp;G)</span></td></tr>\
			<tr><td>Camel</td><td><span class=\"food\">(55&nbsp;F&nbsp;</span><span class=\"gold\">60&nbsp;G)</span></td></tr>\
			</table>");
	}
	else if (unitType.toLowerCase() === "ship") {
		generatePopover(id,
			"<table class=\"table table-borderless table-hover\">\
			<tr><td><a target=\"_blank\" href=\"" + wikiLink + "\">Wiki Link</a></td></tr>\
			<tr><td>Galley</td><td><span class=\"wood\">(90&nbsp;W&nbsp;</span><span class=\"gold\">30&nbsp;G)</span></td></tr>\
			<tr><td>Fire Ship</td><td><span class=\"wood\">(75&nbsp;W&nbsp;</span><span class=\"gold\">45&nbsp;G)</span></td></tr>\
			<tr><td>Demolition Ship</td><td><span class=\"wood\">(70&nbsp;W&nbsp;</span><span class=\"gold\">50&nbsp;G)</span></td></tr>\
			</table>");
	}
	else if (unitType.toLowerCase() === "monk") {
		generatePopover(id,
			"<table class=\"table table-borderless table-hover\">\
			<tr><td><a target=\"_blank\" href=\"" + wikiLink + "\">Wiki Link</a></td></tr>\
			<tr><td>Monk</td><td><span class=\"gold\">100&nbsp;G)</span></td></tr>\
			</table>");
	}
	else {
		alert("Incorrect unit type");
	}
}


/**
 * Add a popover to the units
 */
function generatePopover(id, content_input) {
	delay_int = 100;
	placement_location = "top";
	$("#" + id).popover({
		animation: false,
		title: id.replace("_", " ").toUpperCase(),
		content: content_input,
		html: true,
		trigger: "click",
		placement: placement_location,
	})
	// When mouse enters, show the popover
	.on('click', function() {
		var _this = this;
		// If the window is visible
		if (!$('.popover:visible').length) {
			$(_this).popover('hide');
		}
		else {
			$(this).popover('show');
			$('.popover').on('mouseleave', function() {
				$(_this).popover('hide');
			})
		}
	}).on('mouseleave', function() {
		// Close the popover if the mouse leaves the original link
		var _this = this;
		setTimeout(function(){
			// If you are no longer hovering the popover
			if (!$('.popover:hover').length) {
				$(_this).popover('hide');
			}
		}, delay_int);
	});
}


function addPersonalMods() {
	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=153265246",
						"Ozhara's Full Texture Pack V4",
						"A nice texture pack so the game looks decent for the modern days.")
	$("#modList").append(li);


	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=549369672",
						"P*ssywood Pack (Small Trees Pack)",
						"Make the trees smaller so you can see more things.")
	$("#modList").append(li);
	
	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=466219059",
						"Original Resource Icons",
						"So you can clearly distinguish between food icon and wood icon. NOTE: You must put the priority of this mod above other mods! To do this, go into AoE2 &#8594; Steam Workshop, then move the priority of the mod &quot;Original Resource Icons&quot; all the way up.")
	$("#modList").append(li);


	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=1270057352",
						"Displayed Hotkeys - HD Black",
						"Display your hotkeys when you select villager build or when you select a building")
	$("#modList").append(li);
	
	var li = createLi	("https://steamcommunity.com/sharedfiles/filedetails/?id=643159206",
						"Maximum Extended Help (AoC Base Game)",
						"More useful displayed information. This is for the base AoC game. For AoE2 HD expansions, go <a href=\"http://steamcommunity.com/sharedfiles/filedetails/?id=649570924\">here</a>)."
						)
	$("#modList").append(li);
	
	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=176712202",
						"Alignment Grid",
						"Adds a Grid for alignment purposes/range checking.")
	$("#modList").append(li);
	
	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=473358292",
						"Custom AI - ResonanceBot 5-1c",
						"Custom AI that's worth checking out.")
	$("#modList").append(li);


	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=649570924",
						"Tech Tree UI",
						"Display a tech tree for your civ when you select any unit/building.")
	$("#modList").append(li);
	
	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=658998239",
						"Green Arabia",
						"Arabia custom map with slightly more trees.")
	$("#modList").append(li);

	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=567576680",
						"Fast Castle Tutorial",
						"Interactive tutorial on fast castling.")
	$("#modList").append(li);
}


function createLi(link, name, description) {
	var li = $('<li/>');
	var aaa = $('<a/>')
		.attr("href", link)
		.attr("target", "_blank")
		.html(name)
		.appendTo(li);
	var ppp = $('</p>')
		.append("<strong>Description:</strong> " + description)
		.appendTo(li);
	return li;
}

// Reference
// https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	// Default scroll distance is 20
	var scrollDistance = 200;  // 20 = default
	if (document.body.scrollTop > scrollDistance || document.documentElement.scrollTop > scrollDistance) {
		document.getElementById("toTopButton").style.display = "block";
	} else {
		document.getElementById("toTopButton").style.display = "none";
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
