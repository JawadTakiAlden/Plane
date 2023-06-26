import vector from "./Vector";
import * as THREE from "three";
import { Vector3 } from "three";
import World from "./Vectorector";

class Airplane {

    constructor(
        PlaneMass, wingSpan, wingArea, Throttle, Flap, g, EnginesNum, AngleOfAttack, BankAngleIn, Eff,
        Cdp, alphaClMax, cl, clSlope0, cl0, clSlope1, cl1, density, engineRps, propDiameter,
        enginePower, a, b, fuelMass, engineUsage, climb, bank, heading, r, angular_acc, angular_velocity,
        totalForce, linear_acc, linear_velocity, linear_location

    ) {
        this.angular_acc = vector.create(0, 0, 0);
        this.angular_velocity = vector.create(0, 0, 0);
        this.totalForce = vector.create(0, 0, 0);
        this.linear_acc = vector.create(0, 0, 0);
        this.linear_velocity = vector.create(0, 0, 0);
        this.linear_location = vector.create(0, 0, 0);
        this.PlaneMass = 0;
        this.wingSpan = 0;
        this.wingArea = 0;
        this.Throttle = 0;
        this.Flap = 0;
        this.EnginesNum = 0;
        this.g = 0;
        this.AngleOfAttack = 0;
        this.BankAngleIn = 0;
        this.Eff = Eff;
        this.Cdp = Cdp;
        this.alphaClMax = alphaClMax;
        this.cl = cl;
        this.clSlope0 = clSlope0;
        this.cl0 = cl0;
        this.clSlope1 = clSlope1;
        this.cl1 = cl1;
        this.engineRps = engineRps;
        this.propDiameter = propDiameter;
        this.enginePower = enginePower;
        this.a = a;
        this.b = b;
        this.fuelMass = fuelMass;
        this.engineUsage = engineUsage;
        this.r = r;
    }

    //set

    setPlaneMass = (PlaneMass) => {
        this.PlaneMass = PlaneMass;
    }
    setWingSpan = (wingSpan) => {
        this.wingSpan = wingSpan;
    }
    setWingArea = (wingArea) => {
        this.wingArea = wingArea;
    }

    setThrottle = (Throttle) => {
        this.Throttle = Throttle / 100;
    }

    setFlap = (Flap) => {
        this.Flap = Flap;
    }

    setg = (g) => {
        this.g = g;
    }

    setEnginesNum = (EnginesNum) => {
        this.EnginesNum = EnginesNum;
    }

    setAngleOfAttack = (AngleOfAttack) => {
        this.AngleOfAttack = AngleOfAttack;
    }

    setBankAngleIn = (BankAngleIn) => {
        if (climb != 0) {
            this.BankAngleIn = BankAngleIn;
        }
    }

    //get

    getPlaneMass = () => {
        return PlaneMass;
    }
    getWingSpan = () => {
        return wingSpan;
    }
    getWingArea = () => {
        return wingArea;
    }
    //معامل السحب الطفيلي
    getCdp = () => {
        return Cdp;
    }
    getEff = () => {
        return Eff;
    }
    getThrottle = () => {
        return Throttle;
    }

    getFlap = () => {
        return Flap;
    }

    getg = () => {
        return g;
    }

    getEnginesNum = () => {
        return EnginesNum;
    }

    getAngleOfAttack = () => {
        return AngleOfAttack;
    }

    getBankAngleIn = () => {
        return BankAngleIn;
    }

    // forces


    // lift helper function
    calc_CL = () => {
        let y = this.linear_location.getY();
        flap = this.getFlap();

        if (climb < alphaClMax) {
            cl = clSlope0 * climb + cl0;
        }
        else {
            cl = clSlope1 * climb + cl1;
        }

        // Include effects of flaps and ground effects.
        // ground effects are present if the plane is
        // within 5 meters of the ground.
        if (flap == 20) {
            cl += 0.25;
        }
        if (flap == 40) {
            cl += 0.5;
        }
        if (y < 5.0) {
            cl += 0.25;
        }
    }
    calc_air_density = () => {
        // Compute the air density.
        let y = this.linear_location.getY();
        const temperature = 288.15 - 0.0065 * y;
        const grp = (1.0 - 0.0065 * y / 288.15);
        const pressure = 101325.0 * Math.pow(grp, 5.25);
        this.density = 0.00348 * pressure / temperature;
        return this.density;
    }
    // lift
    lift = () => {
        // Calculates the lift force using the given inputs according to the formula:
        // F_L = 1/2 * C_L * rho * v^2 * A
        let vtotal = this.linear_velocity.getLength();
        let y = this.linear_location.getY();
        let density = this.calc_air_density();
        let wingArea = this.getwingArea();
        let cl = this.calc_CL();
        let lift_force = 0.5 * cl * density * Math.pow(vtotal, 2) * wingArea;
        return lift_force;
    }

    // drag helper function


    // drag 
    drag = () => {
        // Calculates the drag force using the given inputs according to the formula:
        // F_D = 1/2 * C_D * rho * v^2 * A
        let vtotal = this.linear_velocity.getLength();
        let cdp = this.getCdp();
        let cl = this.calc_CL();
        let wingSpan = this.getWingSpan();
        let wingArea = this.getwingArea();
        let eff = this.getEff();
        let density = this.calc_air_density();
        // Compute drag coefficient.
        let aspectRatio = wingSpan * wingSpan / wingArea;
        let cd = cdp + cl * cl / (Math.PI * aspectRatio * eff);
        // Compute drag force.
        let drag = 0.5 * cd * density * vtotal * vtotal * wingArea;
        return drag_force;
    }

    // thrust helper function

    // trust

    thrust = () => {
        let vtotal = this.linear_velocity.getLength();
        if (calc_fuel_mass() > 0) {
            // Compute power drop-off factor to add altitude effect.
            density = this.calc_air_density();
            let omega = density / 1.225;
            let factor = (omega - 0.12) / 0.88;
            // Calculates the thrustPerEngine 
            let throttle = this.getThrottle();
            //قيمة الحمل الحركي يعبر عن نسبة سرعة الطائرة إلى سرعة الهواء المدخل إلى المحرك
            let advanceRatio = vtotal / (engineRps * propDiameter);
            let thrustPerEngine = throttle * factor * enginePower *
                (a + b * advanceRatio * advanceRatio) / (engineRps * propDiameter);
            // calculate total thrust
            let enginesNum = this.getEnginesNum();
            let totalThrust = enginesNum * thrustPerEngine;
            return totalThrust;
        }
        else
            return 0;


    }

    // weight hepler function
    calc_fuel_mass = () => {
        throttle = getThrottle();
        this.fuelMass = this.fuelMass - (throttle * engineUsage);
        return this.fuelMass;
    }

    calc_plan_total_mass = () => {
        this.fuelMass = this.calc_fuel_mass();
        this.PlaneMass = this.getPlaneMass();
        return this.fuelMass + this.PlaneMass;
    }

    // weight
    weight = () => {
        // Calculates the weight force 
        let Mtotal = this.calc_plan_total_mass();
        let g = this.getg();
        let weight = g * Mtotal;
        return weight;
    }



    //calc angles

    //climb
    calc_climb = () => {

        if (this.getAngleOfAttack() != 0) {
            this.climb = Math.atan(this.linear_velocity.getY() / this.linear_velocity.getZ());
            return this.climb;
        }
        else
            return 0;
    }


    //bank
    //r هو نصف مسافة امتداد الجناحين
    calc_bank = () => {
        if (this.getBankAngleIn() > this.bank) {
            this.angular_acc.getZ() = this.linear_acc.getZ() / this.r;
            this.angular_velocity.getZ() = this.angular_velocity.getZ() + this.angular_acc.getZ() * dt;
            this.bank = this.bank + this.angular_velocity.getZ() * dt;
            return this.bank;

        }

        else if (this.getBankAngleIn() < this.banwk) {
            this.angular_acc_z = this.linear_acc.getZ() / r;
            this.angular_velocity_z = this.angular_velocity_z + this.angular_acc_z * dt;
            this.bank = this.bank - this.angular_velocity_z * dt;
            return this.bank;
        }
        else
            return 0;
    }

    //heading
    calc_heading = () => {
        if (this.bank != 0) {
            this.heading = Math.atan(this.linear_velocity.getX() / this.linear_velocity.getZ());
            return this.heading;
        }
        else
            return 0;
    }





    //total force

    execute = () => {
        /*rotation around x*/this.climb = this.calc_climb();
        /*rotation around y*/this.heading = this.calc_heading();
        /*rotation around z*/this.bank = this.calc_bank();
        let weight = this.weight();
        let thrust = this.thrust();
        let lift = this.lift();
        let drag = this.drag();
        let mass = this.calc_plan_total_mass();

        //fx 
        this.totalForce.x = Math.sin(this.heading) * Math.cos(climb) * (thrust - drag) + (-Math.cos(this.heading) * Math.sin(this.bank) - Math.sin(this.heading) * Math.sin(climb) * Math.cos(this.bank)) * lift;
        //fy
        this.totalForce.y = (Math.sin(climb) * (thrust - drag) + Math.cos(climb) * Math.cos(this.bank) * lift) + weight;
        //fz
        this.totalForce.z = Math.cos(this.heading) * Math.cos(climb) * (thrust - drag) + (Math.sin(this.heading) * Math.sin(this.bank) - Math.cos(this.heading) * Math.sin(climb) * Math.cos(this.bank)) * lift;
        //acc
        this.linear_acc = this.totalForce.multiply(1 / mass);
        //v
        this.linear_velocity = this.linear_velocity.add(this.linear_acc.multiply(dt));
        //location x,y,z
        this.linear_location = this.linear_location.add(this.linear_velocity.multiply(dt));
    }




}
export default Airplane;
