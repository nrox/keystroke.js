var selected = "#id0";
var styles = {};
var copy = {};

function showStyles(){
    var st = _.map(styles, function(style, key){
        return key + " {<br />" + _.map(style, function(value, property){
             return "&nbsp;&nbsp;" + property + ": " + value + ";";
        }).join("<br />") + "<br />}";
    }).join("<br /><br />");
    $("#styles").html(st);
}
function change(selector, property, min, max, step){
    var pv = $(selector).css(property);
    var value = pv.replace(/[\D\.]/g,'');
    var units = pv.replace(RegExp(value,'g'),'');
    var v = Number(value) + step;
    v = Math.max(min, v);
    v = Math.min(max, v);
    styles[selector] || (styles[selector]={});
    styles[selector][property] = v + units;
    showStyles();
    $(selector).css(property, v + units);
}

function changeColor(selector, property, component, step){
    var pv = $(selector).css(property);
    var v = changeComponent(pv, component, step);
    styles[selector] || (styles[selector]={});
    styles[selector][property] = v;
    showStyles();
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

ks.add("+x +c", function(){
    copy = _.clone(styles[selected]);
});

ks.add("+x +v", function(){
    $(selected).css(copy || {});
});

ks.add("-space", function(){
    $(".class1").removeClass("selected");
    selected = "#id" + ((Number(selected.replace(/\D/g,''))+1)%3);
    $(selected).addClass("selected");
});

ks.add("-shift", function(){
    selected = ".class1";
    $(selected).addClass("selected");
});

ks.add("+a", function(){
    $(selected).text("SELECTED");
});

ks.add("-a", function(){
    $(selected).text("");
});

ks.add("+d +up", function(){
    change(selected,"height",1,1000, 5);
});
ks.add("+d +down", function(){
    change(selected,"height",1,1000, -5);
});

ks.add("+d +right", function(){
    change(selected,"width",1,1000, 5);
});
ks.add("+d +left", function(){
    change(selected,"width",1,1000, -5);
});

ks.add("+f +up", function(){
    change(selected,"border-width",1,100, 1);
});
ks.add("+f +down", function(){
    change(selected,"border-width",1,100, -1);
});

ks.add("+f +right", function(){
    change(selected,"border-radius",1,100, 3);
});
ks.add("+f +left", function(){
    change(selected,"border-radius",1,100, -3);
});

ks.add("+r +up", function(){
    changeColor(selected,"background-color",0,10);
});
ks.add("+r +down", function(){
    changeColor(selected,"background-color",0,-10);
});

ks.add("+g +up", function(){
    changeColor(selected,"background-color",1,10);
});
ks.add("+g +down", function(){
    changeColor(selected,"background-color",1,-10);
});

ks.add("+b +up", function(){
    changeColor(selected,"background-color",2,10);
});
ks.add("+b +down", function(){
    changeColor(selected,"background-color",2,-10);
});

$("#strokes").html("keystrokes: <br />" + _.keys(ks.strokes).join("<br />"));

ks.run(50);