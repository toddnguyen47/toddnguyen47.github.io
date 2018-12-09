$(function(){
	$("#topMenu").load("/header.html");

	function activeNav() {
		var pgUrl = window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/") + 1);
		$("#topMenu div a").each(function() {
			if ($(this).attr("href") === pgUrl || $(this).attr("href") === "/") {
				// If we want to change some CSS. Hard to do with bootstrap
				// $(this).addClass("active");
				var curPageText = $(this).text();
				var maxLength = 15;
				if (curPageText.length > maxLength) {
					// We want to subtract 3 to accommodate for the ellipses
					curPageText = curPageText.substr(0, maxLength - 3) + "...";
				}
				$("#menuBtn").html(curPageText);
			}
		});
	};

	// See which link is active
	setTimeout(activeNav, 100);
});
