import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { RestaurantsContextProvider } from './context/RestaurantsContext.js';
import Home from './routes/Home.js';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import UpdatePage from './routes/UpdatePage';

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className = '' style = {{height: '100%'}}>
      <div className = 'container ' style = {{height: '100vh'}}>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/restaurants/:id/update" component={UpdatePage} />
            <Route exact path="/restaurants/:id" component={RestaurantdetailPage} />
          </Switch>
        </Router>
      </div>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
