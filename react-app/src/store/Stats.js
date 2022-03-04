const SET_STATS = 'session/SET_STATS';

const setStats = (stats) => ({
    type: SET_STATS,
    payload: stats
});

const initialState = { stats: null };

export const GetStats = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setStats(data));
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_STATS:
            return { stats: action.payload }
        default:
            return state;
    }
}
