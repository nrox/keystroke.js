keystroke.js
============

Assigning callbacks to key strokes

This library uses expressions to represent combinations of key presses and releases.

Demo
-----

[keystroke.js demo](http://nrox.github.io/keystroke.js/index.html)


Defining keystrokes
-----

Keystrokes are represented in this form:

    "<prefix><key>(<space><prefix><key>)*"

Prefix is a single character:

    +: key is being pressed
    -: key goes up
    !: key is not being pressed

Key is the name of the key:

    {a, b, c, d, ..., X, Z, backspace, tab, enter, shift, ctrl, alt, caps, esc, space, left, up, right, down, del}

Keystrokes Examples:

    "+a": trigger when a is being pressed
    "+a -b": trigger when a is being pressed and b is released
    "+a +s -space": trigger when both a and s are being pressed and space is released
    "+a !a": is never triggered
    "+f !a": trigger when f is pressed, except if a is also being pressed
    "-up +down": trigger when the up arrow key is released and the arrow down key is being pressed

The callbacks are called at fixed intervals, if the condition is met.

Requirements
-----

Add underscore.js, jquery.js and keystroke.js to your html header.

Usage
-----

    var ks = new KeyStroker();

    //add strokes
    ks.add("+a +s", function(){
        console.log("You are pressing a and s.");
    });

    ks.add("+a -s", function(){
        console.log("You are pressing a and just released s.");
    });

    //run, checking for keystrokes at each 50ms
    ks.run(50);
