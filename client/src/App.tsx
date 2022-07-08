import { FC } from "react";
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';

import Navbar from './Components/Navbar'
import RoadMeasurements from "./pages/RoadMeasurements";
import CarData from "./pages/CarData";
import RoadConditions from "./pages/RoadConditions";
import Altitude from "./pages/Altitude";
import Login from "./pages/Login";

import { ZoomProvider } from "./context/ZoomContext";

import "./App.css";

const App: FC = () => {

    // TODO: Move ZoomProvider => to ML ?

    return (
        <div className="App">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/cardata" component={() => <ZoomProvider><CarData/></ZoomProvider>} />
                    <Route exact path="/rides" component={() => <RoadMeasurements />} />
                    <Route 
                        exact path="/road_conditions"    
                        component={() => <ZoomProvider><RoadConditions/></ZoomProvider>} 
                    />
                    <Route 
                        exact path="/altitude"    
                        component={() => <ZoomProvider><Altitude/></ZoomProvider>} 
                    />
                    <Route exact path="/login" component={() => <Login />} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;