import { useContext } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import UserContext from '../context/UserContext';

const PrivateRoute = () => {

    const {authUser} = useContext(UserContext);
    const location = useLocation();

    if (authUser) {
        return <Outlet></Outlet>
    } else {
        return <Navigate to="/signin" state={ { from: location.pathname } } />
    }

};

export default PrivateRoute;