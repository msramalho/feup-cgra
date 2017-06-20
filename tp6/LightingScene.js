var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
    this.Lights0 = true;
    this.Lights1 = true;
    this.Lights2 = true;
    this.Lights3 = true;
    //this.option1 = true;
    //this.option2 = false;
    this.speed = 3;

    this.initCameras();

    this.initLights();

    //enable textures
    this.enableTextures(true);

    this.gl.clearColor(0.0, 0.0, 0.3, 1.0); //fundo do plano
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.axis = new CGFaxis(this);

    // Scene elements
    //this.table = new MyTable(this);
    //this.wall = new MyQuad(this);
    this.floor = new MyQuad(this, 0, 10, 0, 12);
    this.clockPole = new MyUnitCubeQuad(this);
    //this.wall = new MyQuad(this, -1.0, 2.0, -0.5, 1.5); //centraliza a janela
    //this.boardA = new Plane(this, BOARD_A_DIVISIONS);
    //this.boardB = new Plane(this, BOARD_B_DIVISIONS);

    this.submarine = new MySubmarine(this, 90);

    //this.prism = new MyPrism(this, 8, 20);
    //this.cylinder = new MyCylinder(this, 80, 20);

    this.myClock = new MyClock(this, 0, 0, 0);

    // Materials
    this.materialDefault = new CGFappearance(this);

    this.materialA = new CGFappearance(this);
    //this.materialA.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialA.setAmbient(0, 0, 0.3, 1);
    this.materialA.setDiffuse(0.6, 0.6, 0.6, 1);
    //this.materialA.setSpecular(0.2, 0.2, 0.2, 1);
    this.materialA.setSpecular(0.8, 0.8, 0.8, 1);
    this.materialA.setShininess(120);

    this.materialB = new CGFappearance(this);
    this.materialB.setAmbient(0.3, 0.3, 0.3, 1);
    this.materialB.setDiffuse(0.6, 0.6, 0.6, 1);
    this.materialB.setSpecular(0.8, 0.8, 0.8, 1);
    this.materialB.setShininess(120);

    //CGFappearances:

    //submarine
    this.submarineAppearance = new CGFappearance(this);
    this.submarineAppearance.setAmbient(0.8, 0, 0.8, 1);
    this.submarineAppearance.setDiffuse(0.8, 0, 0.8, 1);
    this.submarineAppearance.setSpecular(0.4, 0, 0.4, 1);
    this.submarineAppearance.setShininess(60);
    //this.submarineAppearance.loadTexture("../resources/images/oceano.png");

    this.floorAppearance = new CGFappearance(this);
    this.floorAppearance.setAmbient(0.8, 0, 0.8, 1);
    this.floorAppearance.setDiffuse(0.8, 0, 0.8, 1);
    this.floorAppearance.setSpecular(0.4, 0, 0.4, 1);
    this.floorAppearance.setShininess(60);
    this.floorAppearance.loadTexture("../resources/images/oceano.png");
    this.floorAppearance.setTextureWrap("REPEAT", "REPEAT");

    /*
        this.leftAppearance = new CGFappearance(this);
        this.leftAppearance.setAmbient(0.8, 0.2, 0, 1);
        this.leftAppearance.setDiffuse(0.8, 0.2, 0, 1);
        this.leftAppearance.setSpecular(0.4, 0.1, 0, 1);
        this.leftAppearance.setShininess(100);

        this.rightAppearance = new CGFappearance(this);
        this.rightAppearance.setAmbient(0, 0, 0.5, 1);
        this.rightAppearance.setDiffuse(0, 0, 0.5, 1);
        this.rightAppearance.setSpecular(0, 0, 0.25, 1);
        this.rightAppearance.setShininess(1200);

        this.windowAppearance = new CGFappearance(this);
        this.windowAppearance.setAmbient(0.5, 0.5, 0.5, 1.0);
        this.windowAppearance.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.windowAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.windowAppearance.setShininess(60);
        this.windowAppearance.loadTexture("../resources/images/window.png");
        this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE"); //deixa a janela menor

    	
        this.slidesAppearance = new CGFappearance(this);
        this.slidesAppearance.setAmbient(0.8, 0, 0.8, 1);
        this.slidesAppearance.setDiffuse(0.8, 0.9, 0.8, 1);
        this.slidesAppearance.setSpecular(0.1, 0.1, 0.1, 1);
        this.slidesAppearance.setShininess(20);
        this.slidesAppearance.loadTexture("../resources/images/slides.png");

        this.boardAppearance = new CGFappearance(this);
        this.boardAppearance.setAmbient(0.8, 0, 0.8, 1);
        this.boardAppearance.setDiffuse(0.2, 0.1, 0.3, 1);
        this.boardAppearance.setSpecular(0.4, 0.4, 0.4, 1);
        this.boardAppearance.setShininess(1600);
        this.boardAppearance.loadTexture("../resources/images/board.png");
*/
    this.clockAppearance = new CGFappearance(this);
    this.clockAppearance.setAmbient(0.8, 0, 0.8, 1);
    this.clockAppearance.setDiffuse(0.8, 0.9, 0.8, 1);
    this.clockAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.clockAppearance.setShininess(1600);
    this.clockAppearance.loadTexture("../resources/images/clock.png");

    this.setUpdatePeriod(100);
};

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
    //this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
    this.setGlobalAmbientLight(0, 0, 0, 1.0);

    // Positions for four lights
    this.lights[0].setPosition(4, 6, 1, 1);
    this.lights[0].setVisible(true); // show marker on light position (different from enabled)

    this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
    this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
    this.lights[2].setVisible(true); // show marker on light position (different from enabled)

    this.lights[3].setPosition(4, 6, 5, 1);
    this.lights[3].setVisible(true); // show marker on light position (different from enabled)
    //this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
    //this.lights[1].setVisible(true); // show marker on light position (different from enabled)
    //this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
    //this.lights[1].setVisible(true); // show marker on light position (different from enabled)

    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setSpecular(1, 0.2, 0, 1);
    this.lights[0].enable();

    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();

    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setSpecular(1., 1., 1., 1.)
        // (por omissão, Kc=1, Kl=0, Kq=0)​
    this.lights[2].setConstantAttenuation(0); //Kc
    this.lights[2].setLinearAttenuation(0.2); //Kl
    this.lights[2].setQuadraticAttenuation(0); //Kq
    this.lights[2].enable();


    this.lights[3].setConstantAttenuation(0); //Kc
    this.lights[3].setLinearAttenuation(0.2); //Kl
    this.lights[3].setQuadraticAttenuation(0); //Kq
    this.lights[3].enable();
};

LightingScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
}

/*
LightingScene.prototype.update = function(currTime) {
    var time = Math.floor(currTime / 1000);
    if (this.time == -1) {
        this.time = time;
    } else {
        if (this.time != time) {
            this.time = time;
            this.myClock.update();
        }
    }

}
*/

LightingScene.prototype.display = function() {
    // ---- BEGIN Background, camera and axis setup

    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Update all lights used
    this.updateLights();

    // Draw axis
    this.axis.display();

    this.materialDefault.apply();

    // ---- END Background, camera and axis setup


    // ---- BEGIN Geometric transformation section

    // ---- END Geometric transformation section


    // ---- BEGIN Primitive drawing section


    //ClockPole
    this.pushMatrix(); {
        //this.translate(0, 0.5, 0);
        this.scale(0.5, 5, 0.5);
        this.translate(0.5, 0.5, 0);
        this.translate(15, 0, 0); //PERGUNTAR AO PROF
        this.clockPole.display();
    }
    this.popMatrix();


    // Submarine
    this.submarineAppearance.apply();
    this.pushMatrix(); {
        this.translate(this.submarine.x, 0, this.submarine.z);
        this.rotate((this.submarine.baseAngle + this.submarine.angle) * degToRad, 0, 1, 0);
        this.translate(0, 0, -1); //baricentro
        this.submarine.display();
    }
    this.popMatrix();


    // Floor
    this.floorAppearance.apply();
    this.pushMatrix(); {
        this.translate(0, 0, 0);
        this.rotate(-90 * degToRad, 1, 0, 0);
        this.scale(20, 20, 0.3);
        this.floor.display();
    }
    this.popMatrix();
    /*
        // Left Wall -- Janela
        //this.leftAppearance.apply();
       this.windowAppearance.apply();
        this.pushMatrix();
        this.translate(0, 4, 7.5);
        this.rotate(90 * degToRad, 0, 1, 0);
        this.scale(15, 8, 0.2);
        this.wall.display();
        this.popMatrix();   
        
        // Plane Wall
        this.rightAppearance.apply();
        this.pushMatrix();
        this.translate(7.5, 4, 0);
        this.scale(15, 8, 0.2);
        this.wall.display();
        this.popMatrix();

        // First Table
        this.pushMatrix();
        this.translate(5, 0, 8);
        this.table.display();
        this.popMatrix();

        // Second Table
        this.pushMatrix();
        this.translate(12, 0, 8);
        this.table.display();
        this.popMatrix();

        // Board A
        this.pushMatrix();
        this.translate(4, 4.5, 0.2);
        this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

        //this.materialA.apply();
        this.slidesAppearance.apply();
        this.boardA.display();
        this.popMatrix();

        // Board B
        this.pushMatrix();
        this.translate(10.5, 4.5, 0.2);
        this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

        //this.materialB.apply();
        this.boardAppearance.apply();
        this.boardB.display();
        this.popMatrix();


        //MyPrism
        this.pushMatrix(); {
            this.translate(4, 4, 4);
            this.prism.display();
        }
        this.popMatrix();

        //MyCylinder
        this.pushMatrix(); {
            this.translate(2, 5, 6);
            this.cylinder.display();
        }
        this.popMatrix();
*/
    //MyClock
    this.clockAppearance.apply();
    this.pushMatrix(); {
        this.scale(0.5, 0.5, 0.5);
        this.translate(0.5, 0.5, 0);
        this.translate(15, 8, -0.4); //PERGUNTAR AO PROF

        this.translate(0, 0, -1);
        this.rotate(180 * degToRad, 0, 0, 1); //alteração dos eixos
        this.translate(0, 0, 1);
        this.myClock.display();
    }
    this.popMatrix();

    // ---- END Primitive drawing section
};


LightingScene.prototype.doSomething = function() {
    alert("Doing something...");
};

LightingScene.prototype.rotateSubmarine = function(angle) {
    this.submarine.rotateSub(angle);
};

LightingScene.prototype.advanceSubmarine = function(advance) {
    this.submarine.advanceSub(advance);
};