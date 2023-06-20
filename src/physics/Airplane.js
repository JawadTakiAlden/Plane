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
        this.Throttle = Throttle;
    }

    setFlap = (Flap) => {
        this.Flap = Flap;
    }

    setG = (G) => {
        this.G = G;
    }

    setEnginesNum = (EnginesNum) => {
        this.EnginesNum = EnginesNum;
    }

    setAngleOfAttack = (AngleOfAttack) => {
        this.AngleOfAttack = AngleOfAttack;
    }

    setBankAngle = (BankAngle) => {
        this.BankAngle = BankAngle;
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

    getG = () => {
        return G;
    }

    getEnginesNum = () => {
        return EnginesNum;
    }

    getAngleOfAttack=()=>{
        return AngleOfAttack;
    }

    getBankAngle=()=>{
        return BankAngle;
    }

    // forces


    // lift helper function
    calc_CL = (y) => {
        flap = getFlap();
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
        if (y < 5.0) {
            cl += 0.25;
        }
    }
    calc_air_density = (y) => {
        // Compute the air density.
        const temperature = 288.15 - 0.0065 * y;
        const grp = (1.0 - 0.0065 * y / 288.15);
        const pressure = 101325.0 * Math.pow(grp, 5.25);
        const density = 0.00348 * pressure / temperature;
        return density;
    }
    // lift
    lift = (y, vtotal) => {
        // Calculates the lift force using the given inputs according to the formula:
        // F_L = 1/2 * C_L * rho * v^2 * A
        density = calc_air_density(y);
        wingArea = getwingArea();
        cl = calc_CL(y);
        let lift_force = 0.5 * cl * density * Math.pow(vtotal, 2) * wingArea;
        return lift_force;
    }

    // drag helper function


    // drag 
    drag = (y, vtotal) => {
        // Calculates the drag force using the given inputs according to the formula:
        // F_D = 1/2 * C_D * rho * v^2 * A

        cdp = getCdp();
        cl = calc_CL(y);
        wingSpan = getWingSpan();
        wingArea = getwingArea();
        eff = getEff();
        density = calc_air_density(y);
        // Compute drag coefficient.
        let aspectRatio = wingSpan * wingSpan / wingArea;
        let cd = cdp + cl * cl / (Math.PI * aspectRatio * eff);
        // Compute drag force.
        let drag = 0.5 * cd * density * vtotal * vtotal * wingArea;
        return drag_force;
    }

    // thrust helper function

    // trust

    thrust = (vtotal, y) => {

        if (calc_fuel_mass() > 0) {
            // Compute power drop-off factor to add altitude effect.
            density = this.calc_air_density(y);
            let omega = density / 1.225;
            let factor = (omega - 0.12) / 0.88;
            // Calculates the thrustPerEngine 
            throttle = getThrottle();
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
        fuelMass=fuelMass-(throttle*engineUsage);
        return fuelMass;
    }

    // weight
    weight = () => {
        // Calculates the weight force 
        let m = this.getPlaneMass();
        let g = getG();
        let Mtotal = m + calc_fuel_mass();
        let weight = g * Mtotal;
        return weight;
    }


    totalForce = () => {

    }

    // Physics 

    acc = () => { //a

    }

    velocity = () => { //v

    }

    position = () => { //x,y,y

    }

    accAng = () => { //alpha

    }

    veloAng = () => { //omega

    }

    posAng = () => { //theta_x,theta_y,theta_y 

    }

}

export default Airplane