const GET_ROTATION = 'session/GET_ROTATION';

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
