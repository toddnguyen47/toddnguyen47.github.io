$(function(){
    $("#topMenu").load("/menu.html");

    function activeNav() {
        var pgUrl = window.location.href.substr(window.location.href.lastIndexOf("/"));
        $("#topMenu ul li a").each(function(){
            if ($(this).attr("href") === pgUrl || $(this).attr("href") === "") {
                $(this).addClass("active");
            }
        });
    };

    // See which link is active
    setTimeout(activeNav, 100);
});
