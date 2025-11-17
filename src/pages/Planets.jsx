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

function Planets() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [urlPlanets, setUrlPlanets] = useState(
        `https://swapi.dev/api/planets/?page=1`
    );

    useEffect(() => {
        const fetchPlanets = async () => {
            dispatch({ type: 'FETCH_START' });
            try {
                const response = await axios.get(urlPlanets);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            } catch (err) {
                dispatch({ type: 'FETCH_ERROR', payload: err });
            }
        };

        fetchPlanets();
    }, [urlPlanets]);

    const { loading, error, data } = state;

    if (loading) {
        return (
            <div>
                <div>
                    <h1 className="txt-shadow-gold">Planets</h1>
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
            <h1 className="txt-shadow-gold">Planets</h1>
            <button
                onClick={() => setUrlPlanets(data.previous)}
                disabled={!data.previous}
            >
                ⏪ Previous Page
            </button>
            <button onClick={() => setUrlPlanets(data.next)} disabled={!data.next}>
                Next Page⏩
            </button>

            <main>
                {data && data.results.map((planet) => {
                    const planetDetails = [
                        { label: 'Population', value: planet.population },
                        { label: 'Climate', value: planet.climate },
                        { label: 'Terrain', value: planet.terrain },
                    ];
                    return (
                        <Card
                            key={planet.name}
                            title={planet.name}
                            details={planetDetails}
                            type="planet" />
                    );
                })}
            </main>
        </div>
    );
}
export default Planets;