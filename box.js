function removeBox() {
    var that = $(this);
    var top = parseInt(that.css('top'), 10);
    if(top <= 10 ) {
        that.addClass("removed");
        
        setTimeout(function() {
            that.remove();
            scheduler.completeStep(scheduler.getCurrentStep().id);
        }, 200);
        return false;
    } else {
        $(this).data("dragging", false);
    }
    return true;
}

function showBox(text) {
    var box = $($("#boxTemplate").html());
    box.find("span").text(text);

    setTimeout(function() {
        box.addClass("show");
    }, 200)

    box.click(function() {
        if(!$(this).data("dragging")) {
            removeBox.apply(this);
        }
    });

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
        start: function() {
           $(this).data("dragging", true);
        }
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