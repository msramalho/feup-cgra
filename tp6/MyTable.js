/**
 * MyTable
 * @constructor
 */
function MyTable(scene) {
    CGFobject.call(this, scene);

    this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
    this.myUnitCubeQuad.initBuffers();

    this.wood = new CGFappearance(this.scene);
    this.wood.setAmbient(0.4, 0.2, 0, 1);
    this.wood.setDiffuse(0.4, 0.1, 0, 1);
    this.wood.setSpecular(0.2, 0.1, 0, 1);
    this.wood.setShininess(120);


    this.metal = new CGFappearance(this.scene);
    this.metal.setAmbient(0.4, 0.4, 0.4, 1);
    this.metal.setDiffuse(0.8, 0.8, 0.8, 1);
    this.metal.setSpecular(0.8, 0.8, 0.8, 1);
    this.metal.setShininess(120);

    //table apearence
    this.tableAppearance = new CGFappearance(this.scene);
    this.tableAppearance.setAmbient(0, 0, 0.5, 1);
    this.tableAppearance.setSpecular(0.1, 0.1, 0.1, 1);
    this.tableAppearance.setShininess(120);
    this.tableAppearance.setDiffuse(.9, 0.9, 0.9, 1);
    //this.tableAppearance.loadTexture("table.png");
    this.tableAppearance.loadTexture("../resources/images/table.png");
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() {

    // legs
    this.metal.apply();

    this.scene.pushMatrix(); {
        this.scene.translate(2, 3.5 / 2, 1);
        this.scene.scale(0.3, 3.5, 0.3);
        this.myUnitCubeQuad.display();
    }
    this.scene.popMatrix();

    this.scene.pushMatrix(); {
        this.scene.translate(2, 3.5 / 2, -1);
        this.scene.scale(0.3, 3.5, 0.3);
        this.myUnitCubeQuad.display();
    }
    this.scene.popMatrix();

    this.scene.pushMatrix(); {
        this.scene.translate(-2, 3.5 / 2, 1);
        this.scene.scale(0.3, 3.5, 0.3);
        this.myUnitCubeQuad.display();
    }
    this.scene.popMatrix();

    this.scene.pushMatrix(); {
        this.scene.translate(-2, 3.5 / 2, -1);
        this.scene.scale(0.3, 3.5, 0.3);
        this.myUnitCubeQuad.display();
    }
    this.scene.popMatrix();

    // table top
    this.wood.apply();
    this.tableAppearance.apply();
    this.scene.pushMatrix(); {
        this.scene.translate(0, 3.5, 0);
        this.scene.scale(5, 0.3, 3);
        this.myUnitCubeQuad.display();
    }
    this.scene.popMatrix();
}