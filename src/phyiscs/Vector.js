class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    cross(vector) {
        const x = this.y * vector.z - this.z * vector.y;
        const y = this.z * vector.x - this.x * vector.z;
        const z = this.x * vector.y - this.y * vector.x;
        return new Vector(x, y, z);
    }

    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    normalize() {
        const magnitude = this.magnitude();
        return new Vector(this.x / magnitude, this.y / magnitude, this.z / magnitude);
    }
}
export default Vector