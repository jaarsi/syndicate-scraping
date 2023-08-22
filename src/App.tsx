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
type SearchResultItemProps = { key: number, item: SearchResult };

function SearchResultList({ items }: SearchResultListProps) {
    if (items.length == 0) return <p>Sem resultados para exibir ...</p>;

    return (
        <div 
            className="mx-6 p-2">
            <dl className="text-gray-900 dark:text-white">
            {items.map((item, i) => (
                <SearchResultItem key={i} item={item} />
            ))}
            </dl>            
        </div>
    );
}

function SearchResultItem({ item, key }: SearchResultItemProps) {
    return (
        <div key={key}
            className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Nome</dt>
            <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">{item.name}</dd>
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Sigla</dt>
            <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">{item.acronym|| '--'}</dd>
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Endereço</dt>
            <div className="flex flex-wrap -mx-3 m-1">
                <div className="w-full md:w-2/4 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Rua
                    </label>
                    <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {item.address?.street|| '--'}
                    </dd>                    
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Número
                    </label>
                    <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {item.address?.number|| '--'}
                    </dd> 
                </div>
                <div className="w-full md:w-1/4 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Complemento
                    </label>
                    <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {item.address?.complement|| '--'}
                    </dd> 
                </div>                
            </div>
            <div className="flex flex-wrap -mx-3 m-1">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Cidade
                    </label>
                    <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {item.address?.city|| '--'}
                    </dd>                    
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Estado
                    </label>
                    <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {item.address?.state|| '--'}
                    </dd> 
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Cep
                    </label>
                    <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {item.address?.postalCode|| '--'}
                    </dd>
                </div>
            </div>
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Contatos</dt>
            <div className="flex flex-wrap -mx-3 m-1">
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Telefone
                    </label>
                    <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {item.phone|| '--'}
                    </dd>                    
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Celular
                    </label>
                    <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {item.celular|| '--'}
                    </dd> 
                </div>
                <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Email
                    </label>
                    <dd className="appearance-none text-md font-semibold py-1 px-2 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {item.email|| '--'}
                    </dd>
                </div>
            </div>            
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Sindicato</dt>
            <dd className="text-md font-semibold py-1 px-2 text-blue-700 hover:text-blue-500"><a href="#">{item.syndicate.name}</a></dd>
            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Parceiro(s)</dt>
            {item.syndicate.partners.map((p) => (
            <>
                <li className="text-blue-600">
                    {p.name} | {p.acronym} | {p.obs}
                </li>
            </>
        ))}
        </div>
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
                console.log(result);
                setSearchResults(result);
            });
    };
    return (
        <>
            <header className="flex justify-center  px-0 py-5 bg-gray-300">
                <div className="tracking-wider text-gray-500 md:text-[2rem] dark:text-gray-500">
                    Pesquisa de afiliados
                </div>
            </header>
            <div className="flex flex-column h-100vh my-10">
                <div className="sticky top-0 z-10 w-full lg:col-span-4 col-span-2 flex flex-col 
                lg:mx-32 md:mx-16">
                    <label className="mb-2 text-sm font-medium text-gray-900 
                    sr-only dark:text-white">Pesquisar</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex 
                        items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" 
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                            fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" 
                                strokeLinejoin="round" strokeWidth="2" 
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" 
                            onChange={(ev) => setCriteria(ev.currentTarget.value)} 
                            className="block w-full p-4 pl-10 tracking-wider 
                                border-2 border-gray-300 rounded-lg bg-gray-50 
                                focus:ring-blue-500 focus:border-blue-500 
                                dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white text-lg 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Buscar..." 
                            required />
                        <button type="button" onClick={submitHandler} 
                            className="text-white absolute right-2.5 bottom-2.5 
                                bg-blue-700 hover:bg-blue-800 focus:ring-4 
                                focus:outline-none focus:ring-blue-300 
                                font-medium rounded-lg text-lg px-4 py-2 
                                dark:bg-blue-600 dark:hover:bg-blue-700 
                                dark:focus:ring-blue-800">
                            Pesquisar
                        </button>
                    </div>
                </div>

            </div>
            
            <div className="relative m-6 bg-gray-200 rounded-lg">
                <p>
                    Encontrado {searchResults.length} ocorrencias
                </p>
                <SearchResultList items={searchResults} />
            </div>
        </>

    );
}

export default App;
