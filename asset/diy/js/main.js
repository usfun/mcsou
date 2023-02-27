function autoScroll(a) {
    $(a).find("ul").animate({
        marginTop: "-25px"
    }, 500, function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this);
    });
}
$(function() {
    timer = setInterval('autoScroll(".fodong_tips")', 3E3);
});