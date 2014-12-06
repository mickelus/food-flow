function addBox() {
    var box = $($("#boxTemplate").html());
   console.log($("#boxTemplate").html())
    $("#boxContainer").append(box);
}

addBox();