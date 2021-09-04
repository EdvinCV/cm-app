import { reducer as reduxFormReducer } from 'redux-form'; 
import productosReducer from './productosReducer';
import categoriasReducer from './categoriasReducer';
import ventasReducer from './ventasReducer';
import cajaReducer from './cajaReducer';
import usersReducer from './usersReducer';
const { combineReducers } = require("redux");
const { default: authenticationReducer } = require("./authenticationReducer");

const reducer = combineReducers({
    authentication: authenticationReducer,
    usuarios: usersReducer,
    productos: productosReducer,
    categorias: categoriasReducer,
    ventas: ventasReducer,
    caja: cajaReducer,
    form: reduxFormReducer
});

export default reducer;