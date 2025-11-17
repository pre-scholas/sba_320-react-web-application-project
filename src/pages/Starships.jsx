import { useEffect, useState } from "react";
import axios from "axios";

function Starships() {
    const [urlStarships, setUrlStarships] = useState(
        `https://swapi.dev/api/starships/?page=1`
    );

    const { loading, error, data } = useApiData(urlStarships);

    if (loading) {
        return (
            <div></div>
        );
    }

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="content--container">
            <h1 className="txt-shadow-gold">Starships</h1>
            <button
                onClick={() => setUrlStarships(data.previous)}
                disabled={!data.previous}
            >
                ⏪ Previous Page
            </button>
            <button onClick={() => setUrlStarships(data.next)} disabled={!data.next}>
                Next Page⏩
            </button>

            <main>
                {data && data.results.map((starship) => {
                    const starshipDetails = [
                        { label: 'Model', value: starship.model },
                        { label: 'Manufacturer', value: starship.manufacturer },
                        { label: 'Cost (credits)', value: starship.cost_in_credits },
                    ];
                    return (
                        <Card key={starship.name} title={starship.name} details={starshipDetails} type="starship" />
                    );
                })}
            </main>
        </div>
    );
}

export default Starships;