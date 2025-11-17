import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import Card from "../components/Card";

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

function People() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [urlPeople, setUrlPeople] = useState(
        `https://swapi.dev/api/people/?page=1`
    );
}