import { Route, Switch } from "react-router-dom";
import Cart from "./routes/cart/cart.component";
import Home from "./routes/home/home.component";
import PhotoDetails from "./routes/photo-details/photo-details.component";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/cart" exact>
        <Cart />
      </Route>
      <Route path="/photo/:id">
        <PhotoDetails />
      </Route>
    </Switch>
  );
}

export default App;
