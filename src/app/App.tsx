import React, {useEffect} from 'react';
import '../App.css';
import {authMeTC} from '../features/auth/authReducer';
import {Header, RoutesComponent} from '../common/components';
import {useAppDispatch} from '../common/utils';


function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authMeTC());
    }, []);

    return (
        <div className="App">
            <Header/>
            <RoutesComponent/>
        </div>
    );
}

export default App;
