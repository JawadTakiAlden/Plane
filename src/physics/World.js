import vector from "./Vectorector";
import Airplane from "./Vectorector";

class World {
    constructor(gravity, height, tempereture, wind_speed, wind_angle) {
        this.gravity = gravity;
        this.height = height;
        this.tempereture = tempereture;
        this.wind_speed = wind_speed;
        this.wind_angle = wind_angle;
        this.objects = [];
    }

    calc_wind_velo(wind_speed, wind_angle) {
        return vector.create(
            Number(Math.cos(wind_angle).toFixed(2)) * wind_speed, //x
            0, //y
            Math.sin(wind_angle) * wind_speed //z
        );
    }
    add(object) {
        this.objects.push(object);
    }
    remove(object) {
        this.objects = this.objects.filter((item) => item !== object);
    }
    update(deltaTime) {
        for (const object of this.objects) {
            //Constants Variables
            let air_rho = this.calc_air_rho(
                this.gravity,
                this.height,
                this.tempereture
            );
            let wind_velo = this.calc_wind_velo(this.wind_speed, this.wind_angle);
            object.update(deltaTime, this.gravity, air_rho, wind_velo);
        }
    }
}
export default World;