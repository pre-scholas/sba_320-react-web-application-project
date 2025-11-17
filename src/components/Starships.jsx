import { useEffect, useState } from "react";
import axios from "axios";

function Starships() {
    const [isLoading, setLoading] = useState(true);
    const [starWarsDataStarships, setStarWarsDataStarships] = useState();
    const [urlStarships, setUrlStarships] = useState(
        `https://swapi.dev/api/starships/?page=1`
    );
    useEffect(() => {
        axios.get(urlStarships).then((response) => {
            setStarWarsDataStarships(response.data);
            setLoading(false);
        });
    }, [urlStarships]);
    if (isLoading) {
        return (
            <div></div>
        );
    }
}

export default Starships;