const SET_STATS = 'session/SET_STATS';

const setStats = (stats) => ({
    type: SET_STATS,
    payload: stats
});

const initialState = { stats: null };

export const GetStats = (name, region) => async (dispatch) => {
    const response = await fetch('/api/stats/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            region
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setStats(data));
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

const statsReducer = function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_STATS:
            return action.payload
        default:
            return state;
    }
}
export default statsReducer
