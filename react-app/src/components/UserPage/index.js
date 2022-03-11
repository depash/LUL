import React from 'react';
import { useDispatch } from 'react-redux';

const UserPage = () => {
    const dispatch = useDispatch()

    return (
        <div id='userPageContainer'>
            <h1>UserPage</h1>
        </div>
    );
};

export default UserPage;
