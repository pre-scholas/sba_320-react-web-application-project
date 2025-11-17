import { useState } from "react";
import Card from "../components/Card";
import { useApiData } from "../hooks/useApiData";

function People() {
    const [urlPeople, setUrlPeople] = useState(
        `https://swapi.dev/api/people/?page=1`
    );

    const { loading, error, data } = useApiData(urlPeople);

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
                {data && data.results.map((person) => {
                    const personDetails = [
                        { label: 'Height', value: person.height },
                        { label: 'Mass', value: person.mass },
                        { label: 'Gender', value: person.gender },
                        { label: 'Birth Year', value: person.birth_year },
                    ];
                    return (
                        <Card
                            key={person.name}
                            title={person.name}
                            details={personDetails}
                            type="person" />
                    );
                })}
            </main>
        </div>

    )
}

export default People;