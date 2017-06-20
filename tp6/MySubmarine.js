/**
 * MySubmarine
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var degToRad = Math.PI / 180.0;

function MySubmarine(scene, baseAngle) {
    CGFobject.call(this, scene);
    this.baseAngle = baseAngle;
    this.angle = 0;
    this.angleStep = 10; //speed of rotation, TODO: update graphically
    this.advanceStep = 0.5; //speed of advance, TODO: update graphically
    this.x = 0;
    this.z = 0;
    this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.initBuffers = function() {

    //só o triângulo
    this.vertices = [
        0.5, 0.3, 0, -0.5, 0.3, 0,
        0, 0.3, 2
    ];

    this.indices = [
        0, 1, 2
    ];


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MySubmarine.prototype.rotateSub = function(angle) {
    this.angle += angle * this.angleStep;
    this.angle = this.angle % 360;
}
MySubmarine.prototype.advanceSub = function(advance) {
    this.x += Math.sin((this.baseAngle + this.angle) * degToRad) * this.advanceStep * advance;
    this.z += Math.cos((this.baseAngle + this.angle) * degToRad) * this.advanceStep * advance;
}