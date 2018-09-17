$(function(){
    $("#topMenu").load("/menu.html");

    function activeNav() {
        var pgUrl = window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/") + 1);
        console.log(pgUrl);
        $("#topMenu div a").each(function(){
            console.log($(this).attr("href"));
            if ($(this).attr("href") === pgUrl || $(this).attr("href") === "/") {
                // If we want to change some CSS. Hard to do with bootstrap
                // $(this).addClass("active");
                var curPageText = $(this).text();
                var maxLength = 12;
                if (curPageText.length > maxLength) {
                    curPageText = curPageText.substr(0, maxLength) + "...";
                }
                $("#menuBtn").html(curPageText);
            }
        });
    };

    // See which link is active
    setTimeout(activeNav, 100);
});
