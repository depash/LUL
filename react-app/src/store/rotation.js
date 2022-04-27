const GET_ROTATION = 'session/GET_ROTATION';

const getRotation = (stats) => ({
    type: SET_STATS,
    payload: stats
});

export const GettingRotation = () => async (dispatch) => {
    const response = await fetch('/api/stats/matches', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getRotation(data));
    }
}

const rotationReducer = function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROTATION:
            return action.payload
        default:
            return state;
    }
}
export default rotationReducer
