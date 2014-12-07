function removeBox() {
    var that = $(this);
    var top = parseInt(that.css('top'), 10);
    if(top <= 10 ) {
        that.addClass("removed");
        
        setTimeout(function() {
            that.remove();
            scheduler.completeStep(scheduler.getCurrentStep().id);
            if(!scheduler.getCurrentStep()) {
                if(scheduler.getProgress() == 1) {
                    showBox({description: "Smaklig måltid!"}, "done");
                } else {
                    showBox({description: "Väntar på timer"}, "waiting");
                }
                
            }
        }, 300);
        return false;
    } else {
        $(this).data("dragging", false);
    }
    return true;
}

function showBox(step, clazz) {
    var box = $($("#boxTemplate").html());
    box.find("span").text(step.description);
    box.addClass(clazz);

    for (var i = 0; step.tools && i < step.tools.length; i++) {
        var item = $("<li>");
        item.text(step.tools[i]);
        box.find("ul").append(item);
    };

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

    $("#boxContainer .box").each(function() {
        var that = $(this);
        that.addClass("removed");
        setTimeout(function() {
            that.remove();
        }, 200);
    });
    
    if(step) {
        showBox(step);
    }
    
})

showBox(scheduler.getCurrentStep());