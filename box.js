function showBox(text) {
    var box = $($("#boxTemplate").html());
    box.find("span").text(text);

    box.click(function(){
        var that = $(this);
        that.addClass("removed");
        setTimeout(function() {
            that.remove();
        }, 200);
    })

    $("#boxContainer").append(box);
}

showBox("HACKA LÖKEN");