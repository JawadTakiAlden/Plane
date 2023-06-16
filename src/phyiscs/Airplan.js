class Airplan {

    constructor() {
        this.constant = {

        }

        this.varibles = {

        }
    }


    // forces

    // lift helper function

    // lift
    lift = (cl, rho, v, a) => {
        // Calculates the lift force using the given inputs according to the formula:
        // F_L = 1/2 * C_L * rho * v^2 * A

        let lift_force = 0.5 * cl * rho * Math.pow(v, 2) * a;
        return lift_force;
    }

    // drag helper function


    // drag 
    drag = (cd, rho, v, a) => {
        // Calculates the drag force using the given inputs according to the formula:
        // F_D = 1/2 * C_D * rho * v^2 * A

        let drag_force = 0.5 * cd * rho * Math.pow(v, 2) * a;
        return drag_force;
    }

    // thrust helper function

    // trust

    thrust = (m_dot_e, v_e, m_dot_0, v_0, P_e, P_0, A_e) => {
        // Calculates the thrust using the given inputs according to the formula:
        // F_T = m_dot_e * v_e - m_dot_0 * v_0 + (P_e - P_0) * A_e

        let thrust = m_dot_e * v_e - m_dot_0 * v_0 + (P_e - P_0) * A_e;
        return thrust;
    }

    // weight hepler function

    // weight
    weight = (G, M, m, d) => {
        // Calculates the weight force using the given inputs according to the formula:
        // F_gravity = G * (M * m) / d^2

        let weight = G * (M * m) / Math.pow(d, 2);
        return weight;
    }


    totalForce = () => {

    }

}

export default Airplan