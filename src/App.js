import Login from './components/Authentication/Login';
import { Provider } from 'react-redux';
import store from './components/Redux/store';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import VerificationAuth from './components/Authentication/VerificationAuth';
import ListadoProductos from './components/Ventas/ListadoProductos';
import Productos from './components/ControlProductos/Productos';
import ControlVentas from './components/Ventas/ListadoVentas';
import ControlCaja from './components/Caja/ControlCaja';
import ListadoCajas from './components/Caja/ListadoCajas';
import ListUsers from './components/Users/ListUsers';
import './index.css';
import ListadoVentasCanceladas from './components/Ventas/ListadoVentasCanceladas';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
          <VerificationAuth>
              <Navbar />
              <br/>
              <br/>
              <br/>
              <Route exact path="/home" component={Home} />
              <Route exact path="/usuarios" component={ListUsers} />
              <Route exact path="/venta" component={ListadoProductos} />
              <Route exact path="/ventas" component={ControlVentas} />
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/caja" component={ControlCaja} />
              <Route exact path="/cajas" component={ListadoCajas} />
              <Route exact path="/canceladas" component={ListadoVentasCanceladas} />
          </VerificationAuth>
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
