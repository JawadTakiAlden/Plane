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

    setAngleXY: function(angle) {
        var length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    },

    setAngle: function(angleXY, angleXZ, angelZY) {
        var length = this.getLength();
        this.x = Math.cos(angleXZ) * length; // alpha
        this.y = Math.cos(angleXY) * length; // Beta
        this.z = Math.cos(angelZY) * length; //gamma
    },

    inits: function(length, angleXY, angleXZ) {
        this.x = Math.cos(angleXY) * Number(Math.cos(angleXZ).toFixed(7)) * length;
        this.y = Math.sin(angleXY) * length;
        this.z = Math.cos(angleXY) * Math.sin(angleXZ) * length;
    },

    getAngleXY: function() {
        return Math.atan(this.y / this.x) || 0;
    },

    getAngleXZ: function() {
        return Math.atan2(this.x, this.z) || 0;
    },

    getAngleZY: function() {
        return Math.atan(this.y / this.z) || 0;
    },

    setLength: function(length) {
        var angleXY = Number(this.getAngleXY().toFixed(1));
        var angleXZ = Number(this.getAngleXZ().toFixed(1));

        let l1 = Number(Math.cos(angleXY).toFixed(1));
        let l2 = Number(Math.cos(angleXZ).toFixed(1));

        this.x = l1 * l2 * length;
        this.y = Number(Math.sin(angleXY).toFixed(2)) * length;
        this.z =
            Number(Math.cos(angleXY).toFixed(2)) *
            Number(Math.sin(angleXZ).toFixed(2)) *
            length;
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

    //I didn't understand this function
    sumToXZ: function(v) {
        this.x -= v;
        this.z -= v;
    },

    // subtract: function(v2) {
    // 	return vector.create(this.x - v2.getX(), this.y - v2.getY());
    // },

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

    addTo: function(v2, time) {
        this.y += v2.getY() * time;
        this.z += v2.getZ() * time;
        this.x += v2.getX() * time;
    },

    // subtractFrom: function(v2) {
    // 	this.x -= v2.getX();
    // 	this.y -= v2.getY();
    // },

    multiplyBy: function(val) {
        this.x *= val;
        this.y *= val;
        this.z *= val;
    },

    divideBy: function(val) {
        this.x /= val;
        this.y /= val;
        this.z /= val;
    },

    squere: function() {
        return this.getLength() * this.getLength();
    },

    normalize: function() {
        return vector.create(
            this.x / this.getLength() || 0,
            this.y / this.getLength() || 0,
            this.z / this.getLength() || 0
        );
    },
    getAxesFrom: function(vec) {
        this.x = (vec.x / vec.x) | 0;
        this.y = (vec.y / vec.y) | 0;
        this.z = (vec.z / vec.z) | 0;
    },

    cross: function(vec) {
        return vector.create(
            this.z * vec.getY() - this.y * vec.getZ(),
            this.z * vec.getX() - this.x * vec.getZ(),
            this.y * vec.getX() - this.x * vec.getY()
        );
    },

    clone: function() {
        return vector.create(this.x, this.y, this.z);
    },
};
export default vector;