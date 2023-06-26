import { normalize } from "gsap/gsap-core";

var vector = {
    x: 0,
    y: 0,
    z: 0,

    create: function(x, y, z) {
        var obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        obj.setZ(z);
        return obj;
    },

    setX: function(value) {
        this.x = value;
    },

    getX: function() {
        return this.x;
    },

    setY: function(value) {
        this.y = value;
    },

    getY: function() {
        return this.y;
    },

    setZ: function(value) {
        this.z = value;
    },

    getZ: function() {
        return this.z;
    },


    getLength: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },

    add: function(v2) {
        return vector.create(
            this.x + v2.getX(),
            this.y + v2.getY(),
            this.z + v2.getZ()
        );
    },


    multiply: function(val) {
        return vector.create(this.x * val, this.y * val, this.z * val);
    },

    divide: function(vec) {
        return vector.create(
            this.x / vec.getX(),
            this.y / vec.getY(),
            this.z / vec.getZ()
        );
    },

   /* addTo: function(v2, time) {
        this.y += v2.getY() * time;
        this.z += v2.getZ() * time;
        this.x += v2.getX() * time;
    },*/

};
export default vector;