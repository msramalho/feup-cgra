/**
 * MyClock
 * @param h hours, m minutes, s seconds
 * @constructor
 */
var degToRad = Math.PI / 180.0;

function MyClock(scene, h, m, s) {
    CGFobject.call(this, scene);

    this.hours = h;
    this.minutes = m;
    this.seconds = s;

    this.hAngle = 270;
    this.mAngle = 0;
    this.sAngle = 90;


    this.sides = new MyPrism(this.scene, 12, 1);
    this.top = new MyCircle(scene, 12);
    this.hours = new MyClockHand(this.scene, 0.6, 1);
    this.minutes = new MyClockHand(this.scene, 0.8, 1);
    this.seconds = new MyClockHand(this.scene, 0.8, 0.5);
    this.time = -1;

    this.hours.setAngle(this.hAngle);
    this.minutes.setAngle(this.mAngle);
    this.seconds.setAngle(this.sAngle);


    this.sides.initBuffers();

    //this.initBuffers();
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;


MyClock.prototype.update = function() {
    this.hAngle += 360 / (60 * 60 * 60);
    this.mAngle += 360 / (60 * 60);
    this.sAngle += 360 / 60;
}

/*MyClock.prototype.initBuffers = function() {
    this.primitiveType = this.scene.gl.TRIANGLES;
    this.texCoords = [
        0, 1,
        1, 1,
        1, -1, -1, 1
    ];
    //this.initGLBuffers();
};*/

MyClock.prototype.display = function() {

    this.scene.pushMatrix(); {
        this.scene.scale(1, 1, 0.1);
        this.sides.display();
    }
    this.scene.popMatrix();


    this.scene.pushMatrix(); {
        this.scene.translate(0, 0, 1);
        this.top.display();
    }
    this.scene.popMatrix();

    this.scene.pushMatrix(); {
        this.scene.translate(0, 0, 1.1);
        this.scene.rotate(-this.hAngle * degToRad + 180 * degToRad, 0, 0, 1);
        this.hours.display();
    }
    this.scene.popMatrix();

    this.scene.pushMatrix(); {
        this.scene.translate(0, 0, 1.1);
        this.scene.rotate(-this.mAngle * degToRad + 180 * degToRad, 0, 0, 1);
        this.minutes.display();
    }
    this.scene.popMatrix();

    this.scene.pushMatrix(); {
        this.scene.translate(0, 0, 1.1);
        this.scene.rotate(-this.sAngle * degToRad + 180 * degToRad, 0, 0, 1);
        this.seconds.display();
    }
    this.scene.popMatrix();



    this.primitiveType = this.scene.gl.TRIANGLES;
};