import { useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
    loading: true,
    error: null,
    data: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, data: action.payload };
        case 'FETCH_ERROR':
            return { ...state, loading: false, error: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

/**
 * Custom hook to fetch data from the SWAPI.
 * @param {string} url - The API endpoint to fetch data from.
 * @returns The state object with loading, error, and data properties.
 */
export function useApiData(url) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const response = await axios.get(url);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            } catch (err) {
                dispatch({ type: 'FETCH_ERROR', payload: err });
            }
        };

        fetchData();
    }, [url]);

    return state;
}