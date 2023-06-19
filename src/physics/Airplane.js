import vector from "./Vector";
import * as THREE from "three";
import { Vector3 } from "three";
import World from "./Vectorector";

class Airplane {

    constructor() {
        this.constant = {

        }

        this.varibles = {

        }
    }

    //set

    setMass = (Mass) => {
        this.Mass = Mass;
    }
    setWingSpan = (wingSpan) => {
        this.wingSpan = wingSpan;
    }
    setWingArea = (wingArea) => {
        this.wingArea = wingArea;
    }
    //معامل السحب الطفيلي
    setCdp = (Cdp) => {
        this.Cdp = Cdp;
    }
    setEff = (Eff) => {
        this.Eff = Eff;
    }
    setThrottle = (Throttle) => {
        this.Throttle = Throttle;
    }

    setFlap = (Flap) => {
        this.Flap = Flap;
    }

    setG = (G) => {
        this.G = G;
    }

    //get

    getMass = () => {
        return Mass;
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

    getG = () => {
        return G;
    }



    // forces


    // lift helper function
    calc_CL = (z) => {
        flap=getFlap();
        let cl;
        if (alpha < alphaClMax) {
            cl = clSlope0 * alpha + cl0;
        }
        else {
            cl = clSlope1 * alpha + cl1;
        }

        // Include effects of flaps and ground effects.
        // Ground effects are present if the plane is
        // within 5 meters of the ground.
        if (flap.equals("20")) {
            cl += 0.25;
        }
        if (flap.equals("40")) {
            cl += 0.5;
        }
        if (z < 5.0) {
            cl += 0.25;
        }
    }
    calc_air_density = (z) => {
        // Compute the air density.
        const temperature = 288.15 - 0.0065 * z;
        const grp = (1.0 - 0.0065 * z / 288.15);
        const pressure = 101325.0 * Math.pow(grp, 5.25);
        const density = 0.00348 * pressure / temperature;
        return density;
    }
    // lift
    lift = (z, vtotal) => {
        // Calculates the lift force using the given inputs according to the formula:
        // F_L = 1/2 * C_L * rho * v^2 * A
        destiny = calc_air_density(z);
        wingArea = getwingArea();
        cl = calc_CL(z);
        let lift_force = 0.5 * cl * density * Math.pow(vtotal, 2) * wingArea;
        return lift_force;
    }

    // drag helper function


    // drag 
    drag = (z, vtotal) => {
        // Calculates the drag force using the given inputs according to the formula:
        // F_D = 1/2 * C_D * rho * v^2 * A

        cdp = getCdp();
        cl = calc_CL(z);
        wingSpan = getWingSpan();
        wingArea = getwingArea();
        eff = getEff();
        destiny = calc_air_density(z);
        // Compute drag coefficient.
        let aspectRatio = wingSpan * wingSpan / wingArea;
        let cd = cdp + cl * cl / (Math.PI * aspectRatio * eff);
        // Compute drag force.
        let drag = 0.5 * cd * density * vtotal * vtotal * wingArea;
        return drag_force;
    }

    // thrust helper function

    // trust

    thrust = (vtotal) => {

        // Compute power drop-off factor.
        let omega = density / 1.225;
        let factor = (omega - 0.12) / 0.88;
        // Calculates the thrust 
        destiny = calc_air_density(z);
        throttle = getThrottle();
        let advanceRatio = vtotal / (engineRps * propDiameter);
        let thrust = throttle * factor * enginePower *
            (a + b * advanceRatio * advanceRatio) / (engineRps * propDiameter);
        return thrust;
    }

    // weight hepler function

    // weight
    weight = () => {
        // Calculates the weight force 
        let m = getMass();
        let g = getG();
        let weight = g * m;
        return weight;
    }


    totalForce = () => {

    }

    // Physics 

    acc = () => { //a

    }

    velocity = () => { //v

    }

    position = () => { //x,y,z

    }

    accAng = () => { //alpha

    }

    veloAng = () => { //omega

    }

    posAng = () => { //theta_x,theta_y,theta_z 

    }

}

export default Airplane