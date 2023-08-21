import React from "react";
import "./App.css";
import databaseJsonUrl from "/database.json?url";
import { JSONPath } from "jsonpath-plus";

type Entity = {
    name?: string;
    acronym?: string;
    address?: {
        street?: string;
        number?: string;
        complement?: string;
        city?: string;
        state?: string;
        postalCode?: string;
    };
    phone?: string;
    celular?: string;
    email?: string;
    obs?: string;
};
type Syndicate = Entity & {
    partners: Entity[];
    affiliates: Entity[];
};
type SearchResult = Entity & { syndicate: Syndicate };
type SearchResultListProps = { items: SearchResult[] };
type SearchResultItemProps = { item: SearchResult };

function SearchResultList({ items }: SearchResultListProps) {
    if (items.length == 0) return <p>Sem resultados para exibir ...</p>;

    return (
        <div>
            {items.map((item, i) => (
                <SearchResultItem key={i} item={item} />
            ))}
        </div>
    );
}

function SearchResultItem({ item }: SearchResultItemProps) {
    return (
        <>
            <div>{item.name}</div>
            <div>{item.syndicate.name}</div>
        </>
    );
}

function App() {
    const [criteria, setCriteria] = React.useState<string>("");
    const [searchResults, setSearchResults] = React.useState<SearchResult[]>(
        [],
    );

    const submitHandler = () => {
        if (criteria.trim() == "") {
            setSearchResults([]);
            return;
        }

        fetch(databaseJsonUrl)
            .then((result) => result.json())
            .then((databaseJson: { syndicates: Syndicate[] }) => {
                const result = JSONPath({
                    json: databaseJson.syndicates,
                    path: `$.*.affiliates[?( @.name.match(/${criteria}/i) )]`,
                    callback: (payload, _payloadType, fullPayload) => {
                        payload.syndicate = JSONPath({
                            json: databaseJson.syndicates,
                            path: `${fullPayload.path}.^^`,
                            wrap: false,
                        });
                    },
                });
                setSearchResults(result);
            });
    };

    return (
        <>
            <input
                type="text"
                onChange={(ev) => setCriteria(ev.currentTarget.value)}
            ></input>
            <button type="button" onClick={submitHandler}>
                Pesquisar
            </button>
            <SearchResultList items={searchResults} />
        </>
    );
}

export default App;
