// ACTION TYPES

import {ABRIR_CAJA, OBTENER_CAJA, OBTENER_CAJAS_GENERAL} from "../actionTypes";


// INITIAL STATE
const initialState = {
    cajaActual: null,
    cajasGeneral: null,
    cajaAbierta: null,
    loading: false,
    errorResponse: false
};

// REDUCER FUNCTION
const cajaReducer = (state = initialState, action) => {
    switch(action.type){
        case OBTENER_CAJA:
            return {
                ...state,
                cajaActual: action.cajaActual,
                cajaAbierta: action.cajaAbierta
            }
        case OBTENER_CAJAS_GENERAL:
            return {
                ...state,
                cajasGeneral: action.cajas
            }
        case ABRIR_CAJA:
            return {
                ...state,
                cajaActual: action.cajaActual,
                cajaAbierta: action.cajaAbierta
            }
        default:
            return state;
    }
}

export default cajaReducer;