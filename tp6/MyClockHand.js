/**
 * MyClockHand
 * @constructor
 */
function MyClockHand(scene, size, width, minS, maxS, minT, maxT) {
    CGFobject.call(this, scene);

    this.width = typeof width != 'undefined' ? width : 1;
    this.size = typeof size != 'undefined' ? size : 1;
    this.minS = typeof minS != 'undefined' ? minS : 0.0;
    this.maxS = typeof maxS != 'undefined' ? maxS : 1.0;
    this.minT = typeof minT != 'undefined' ? minT : 0.0;
    this.maxT = typeof maxT != 'undefined' ? maxT : 1.0;
    this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;

MyClockHand.prototype.setAngle = function(angle) {
    this.scene.pushMatrix(); {
        this.scene.translate(0, 0, 1.1);
        this.scene.rotate(-angle * degToRad + 180 * degToRad, 0, 0, 1);
        this.display();
    }
    this.scene.popMatrix();

}
MyClockHand.prototype.initBuffers = function() {

    this.vertices = [
        this.width * -0.02, this.size * 1, 0,
        this.width * 0.02, this.size * 1, 0,
        this.width * -0.02, 0, 0,
        this.width * 0.02, 0, 0
    ];

    this.indices = [
        2, 1, 0,
        1, 2, 3
    ];

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.normals = [
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1
    ];

    this.texCoords = [
        this.maxS, this.minT,
        this.maxS, this.maxT,
        this.minS, this.minT,
        this.minS, this.maxT

    ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};