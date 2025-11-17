import { useState } from "react";
import { createContext } from "react";
import Card from "../components/Card";
import { useApiData } from "../hooks/useApiData";

function Planets() {
    const [urlPlanets, setUrlPlanets] = useState(
        `https://swapi.dev/api/planets/?page=1`
    );

    const { loading, error, data } = useApiData(urlPlanets);

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