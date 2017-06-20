/**
 * MyPrism
 * @constructor
 */
function MyPrism(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
};

MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function() {
    /*
     * TODO:
     * Replace the following lines in order to build a prism with a **single mesh**.
     *
     * How can the vertices, indices and normals arrays be defined to
     * build a prism with varying number of slices and stacks?
     */

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];
    var stack = 0.5;
    for (var counter = 0; counter < this.stacks; counter++) {
        //face frontal
        this.vertices.push(0, 0, stack);
        this.normals.push(0, 0, 0);
        var vXOld = 0,
            vYOld = 0;
        for (var i = 0; i < this.slices; i++) {
            var vX = 0.5 * Math.cos(degToRad * (360 / this.slices) * i);
            var vY = 0.5 * Math.sin(degToRad * (360 / this.slices) * i);
            this.vertices.push(vX, vY, stack);
            this.normals.push(vYOld - vY, vXOld - vX, 0);
            vXOld = vX;
            vYOld = vY;
            this.texCoords.push(0.5, 0.5);
        }
        for (var i = 0; i < this.slices; i++) {
            this.indices.push((counter * (this.slices * 2 + 2)) + i, (counter * (this.slices * 2 + 2)) + i + 1, (counter * (this.slices * 2 + 2)) + 0);
        }
        this.indices.push((counter * (this.slices * 2 + 2)) + this.slices, (counter * (this.slices * 2 + 2)) + 1, (counter * (this.slices * 2 + 2)) + 0);

        //face de trás
        var vXOld = 0,
            vYOld = 0;
        this.vertices.push(0, 0, stack - (1 / this.stacks));
        this.normals.push(0, 0, 0);
        for (var i = 0; i < this.slices; i++) {
            var vX = 0.5 * Math.cos(degToRad * (360 / this.slices) * i);
            var vY = 0.5 * Math.sin(degToRad * (360 / this.slices) * i);
            this.vertices.push(vX, vY, stack - (1 / this.stacks));
            this.normals.push(vYOld - vY, vXOld - vX, 0);
            vXOld = vX;
            vYOld = vY;
        }
        for (var i = this.slices; i < 2 * this.slices + 1; i++) {
            this.indices.push((counter * (this.slices * 2 + 2)) + this.slices + 1, (counter * (this.slices * 2 + 2)) + i + 1, (counter * (this.slices * 2 + 2)) + i); //ordem inversa
        }
        this.indices.push((counter * (this.slices * 2 + 2)) + this.slices + 1, (counter * (this.slices * 2 + 2)) + this.slices + 2, (counter * (this.slices * 2 + 2)) + 2 * this.slices + 1);

        //ligar as faces
        for (var i = 1; i < this.slices; i++) { //fica com um a mais lá no meio
            this.indices.push((counter * (this.slices * 2 + 2)) + i, (counter * (this.slices * 2 + 2)) + this.slices + i, (counter * (this.slices * 2 + 2)) + this.slices + i + 1);
            this.indices.push((counter * (this.slices * 2 + 2)) + i, (counter * (this.slices * 2 + 2)) + this.slices + i + 1, (counter * (this.slices * 2 + 2)) + i + 1);
        }
        this.indices.push((counter * (this.slices * 2 + 2)) + this.slices, (counter * (this.slices * 2 + 2)) + 2 * this.slices, (counter * (this.slices * 2 + 2)) + 2 * this.slices + 1);
        this.indices.push((counter * (this.slices * 2 + 2)) + 1, (counter * (this.slices * 2 + 2)) + this.slices, (counter * (this.slices * 2 + 2)) + this.slices + 2);
        this.indices.push((counter * (this.slices * 2 + 2)) + this.slices, (counter * (this.slices * 2 + 2)) + 2 * this.slices + 1, (counter * (this.slices * 2 + 2)) + this.slices + 2);
        stack -= (1 / this.stacks);
    }





    /*this.vertices = [-0.5, -0.5, 0,
        0.5, -0.5, 0, -0.5, 0.5, 0,
        0.5, 0.5, 0
    ];*/

    /*this.indices = [
        0, 1, 2,
        3, 2, 1
	];*/

    /*this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];*/

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};