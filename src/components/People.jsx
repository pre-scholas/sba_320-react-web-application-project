import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import Card from "../components/Card";

const initialState = {
    loading: true,
    error: null,
    data: null,
};
console.log(initialState)

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

    useEffect(() => {
        const fetchPeople = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const response = await axios.get(urlPeople);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            } catch (err) {
                dispatch({ type: 'FETCH_ERROR', payload: err });
            }
        };

        fetchPeople();
    }, [urlPeople]);

    const { loading, error, data } = state;

    if (loading) {
        return (
            <div>
                <div>
                    <h1 className="txt-shadow-gold">People</h1>
                    <button disabled={true}>
                        ⏪ Previous Page
                    </button>
                    <button disabled={true}>
                        Next Page ⏩
                    </button>
                </div>
                <div className="overlay">Loading...</div>
            </div>
            
        );
    }

    if (error) return <div>Error: {error.message}</div>;


    return (
        <div className="content--container">
            <h1 className="txt-shadow-gold">People</h1>
            <button onClick={() => setUrlPeople(data.previous)} disabled={!data.previous}>
                ⏪ Previous Page
            </button>
            <button onClick={() => setUrlPeople(data.next)} disabled={!data.next}>
                Next Page⏩
            </button>

            <main>
                {data && data.results.map((person) => (
                    <div key={person.name} className="card card-person">
                        <h2>{person.name}</h2>
                        <p>Height: {person.height}</p>
                        <p>Mass: {person.mass}</p>
                        <p>Hair Color: {person.hair_color}</p>
                        <p>Skin Color: {person.skin_color}</p>
                        <p>Eye Color: {person.eye_color}</p>
                        <p>Birth Year: {person.birth_year}</p>
                        <p>Gender: {person.gender}</p>
                        <br />
                        <button>Explore</button>
                    </div>
                ))}
            </main>
        </div>

    )
}

export default People;