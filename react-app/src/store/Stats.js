const SET_STATS = 'session/SET_STATS';
const SET_MATCHES = 'session/SET_MATCHES'

const setStats = (stats) => ({
    type: SET_STATS,
    payload: stats
});

const setMatches = (data) => ({
    type: SET_MATCHES,
    payload: data
})

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

export const GetMatches = (name, region) => async (dispatch) => {
    const response = await fetch('/api/stats/matches', {
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
        dispatch(setMatches(data));
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
        case SET_MATCHES:
            return {
                user: action.payload.user,
                matches: action.payload.matches,
                ranked_stats: action.payload.ranked_stats,
                ranked_stats_flex: action.payload.ranked_stats_flex
            }
        default:
            return state;
    }
}
export default statsReducer
