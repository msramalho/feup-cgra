/**
 * MyInterface
 * @constructor
 */


function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a button:
    // the first parameter is the object that is being controlled (in this case the scene)
    // the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
    // e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

    this.gui.add(this.scene, 'doSomething');

    // add a group of controls (and open/expand by defult)
    var groupLights = this.gui.addFolder("Lights");
    groupLights.open();
    groupLights.add(this.scene, 'Lights0');
    groupLights.add(this.scene, 'Lights1');
    groupLights.add(this.scene, 'Lights2');
    groupLights.add(this.scene, 'Lights3');

    /*
    var group = this.gui.addFolder("Options");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    group.add(this.scene, 'option1');
    group.add(this.scene, 'option2');
    */

    // add a slider
    // must be a numeric variable of the scene, initialized in scene.init e.g.
    // this.speed=3;
    // min and max values can be specified as parameters

    this.gui.add(this.scene, 'speed', -5, 5);

    return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
    // call CGFinterface default code (omit if you want to override)
    CGFinterface.prototype.processKeyboard.call(this, event);

    // Check key codes e.g. here: http://www.asciitable.com/
    // or use String.fromCharCode(event.keyCode) to compare chars

    // for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
    switch (event.keyCode) {
        //ROTATE SUBMARINE
        case (97): //a
        case (65): //A
            this.scene.rotateSubmarine(1);
            console.log("Key 'a' pressed");
            break;
        case (100): //d
        case (68): //D
            this.scene.rotateSubmarine(-1);
            console.log("Key 'd' pressed");
            break;

        case (119): //w //MOVE SUBMARINE
        case (87): //W
            this.scene.advanceSubmarine(1);
            console.log("Key 'w' pressed");
            break;
        case (115): //s
        case (83): //S
            this.scene.advanceSubmarine(-1);
            console.log("Key 's' pressed");
            break;
    };
};