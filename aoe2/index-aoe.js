$(document).ready(function(){	
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
});


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
