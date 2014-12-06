function removeBox() {
    var that = $(this);
    var top = parseInt(that.css('top'), 10);
    if(top <= 0) {
        that.addClass("removed");
        setTimeout(function() {
            that.remove();
            scheduler.completeStep(scheduler.getCurrentStep().id);
        }, 200);
        return false;
    }
    return true;
}

function showBox(text) {
    var box = $($("#boxTemplate").html());
    box.find("span").text(text);

    box.click(removeBox);

    box.draggable({
        axis: "y",
        revert: removeBox,
        drag: function() {
            var that = $(this);
            var ref =  $("#boxContainer").offset().top + 80;
            var top = parseInt(that.css('top'), 10);
            if(top <= 0) {
                var opacity = (top + ref) / ref;
                that.css("opacity", opacity);
            } else {
                that.css("opacity", 1);
            }
        },
    });

    $("#boxContainer").append(box);
}

scheduler.onChange(function() {
    var step = scheduler.getCurrentStep();
    if(step) {
        showBox(step.description);
    }
    
})

showBox(scheduler.getCurrentStep().description);