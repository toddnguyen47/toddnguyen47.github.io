$(document).ready(function(){
	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=153265246",
						"Ozhara's Full Texture Pack V4",
						"A nice texture pack so the game looks decent for the modern days.")
	$("#modList").append(li);


	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=549369672",
						"P*ssywood Pack (Small Trees Pack)",
						"Make the trees smaller so you can see more things.")
	$("#modList").append(li);


	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=1270057352",
						"Displayed Hotkeys - HD Black",
						"Display your hotkeys when you select villager build or when you select a building")
	$("#modList").append(li);


	var li = createLi(	"https://steamcommunity.com/sharedfiles/filedetails/?id=649570924",
						"Maximum Extended Help (Expansions)",
						"More useful displayed information")
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