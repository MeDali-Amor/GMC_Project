import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Errors from "./Pages/Errors/Errors";
import Navbar from "./Components/Navbar/Navbar";
import PrivateRoute from "./router/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { current } from "./Redux/actions/user";
// import Dashboard from "./Pages/Dashboard/Dashboard";
import SearchPage from "./Pages/SearchPage/SearchPage";
import Publications from "./Pages/Publications/Publications";

function App() {
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(current());
    }, []);
    return (
        <div className="App">
            <Navbar />
            <Switch>
                <Route exact path="/" component={LandingPage} />
                {/* <Route exact path="/home" component={Home} /> */}
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/publications" component={Publications} />
                <PrivateRoute path="/profile/:id" component={Profile} />
                {/* <Profile />
                </PrivateRoute> */}
                <PrivateRoute path="/home" component={Home} />
                {/* <Route path="/admin_dashboard" component={Dashboard} /> */}
                <Route path="/search_result" component={SearchPage} />
                <Route path="/*" component={Errors} />
            </Switch>
        </div>
    );
}

export default App;
