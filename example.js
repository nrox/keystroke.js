/**
 * Change a CSS property
 * @param selector
 * @param property
 * @param min
 * @param max
 * @param step
 */
function change(selector, property, min, max, step){
    var pv = $(selector).css(property);
    var value = pv.replace(/[\D\.]/g,'');
    var units = pv.replace(RegExp(value,'g'),'');
    var v = Number(value) + step;
    v = Math.max(min, v);
    v = Math.min(max, v);
    $(selector).css(property, v + units);
}

function changeColor(selector, property, component, step){
    var pv = $(selector).css(property);
    var v = changeComponent(pv, component, step);
    $(selector).css(property, v);
}

function changeComponent(rgb, component, step) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x, index) {
        if (index!=component){
            return ("0" + parseInt(x).toString(16)).slice(-2);
        } else {
            var v = parseInt(x) + step;
            v = Math.max(v, 0);
            v = Math.min(v, 255);
            return ("0" + v.toString(16)).slice(-2);
        }
    }
    return "#" + hex(rgb[1],0) + hex(rgb[2],1) + hex(rgb[3],2);
}

var ks = new KeyStroker();

ks.add("+a !s", function(){
    $("#id1").text("You are holding 'a' and not 's'");
});
ks.add("+a +s", function(){
    $("#id1").text("You are holding 'a' and 's'");
});
ks.add("-a", function(){
    $("#id1").text("");
});
ks.add("-s", function(){
    $("#id1").text("");
});

ks.add("+d +up", function(){
    change("#id1","height",1,1000, 5);
});
ks.add("+d +down", function(){
    change("#id1","height",1,1000, -5);
});

ks.add("+d +right", function(){
    change("#id1","width",1,1000, 5);
});
ks.add("+d +left", function(){
    change("#id1","width",1,1000, -5);
});

ks.add("+f +up", function(){
    change("#id1","border-width",1,100, 1);
});
ks.add("+f +down", function(){
    change("#id1","border-width",1,100, -1);
});

ks.add("+f +right", function(){
    change("#id1","border-radius",1,100, 3);
});
ks.add("+f +left", function(){
    change("#id1","border-radius",1,100, -3);
});

ks.add("+r +up", function(){
    changeColor("#id1","background-color",0,10);
});
ks.add("+r +down", function(){
    changeColor("#id1","background-color",0,-10);
});

ks.add("+g +up", function(){
    changeColor("#id1","background-color",1,10);
});
ks.add("+g +down", function(){
    changeColor("#id1","background-color",1,-10);
});

ks.add("+b +up", function(){
    changeColor("#id1","background-color",2,10);
});
ks.add("+b +down", function(){
    changeColor("#id1","background-color",2,-10);
});

$("#strokes").html("Try these key strokes: <br />" + _.keys(ks.strokes).join("<br />"));

ks.run(50);