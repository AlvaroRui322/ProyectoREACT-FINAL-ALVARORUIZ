import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/UserContext";
import "../styles/Pokemon.css";
import Swal from "sweetalert2";

const Home = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [filters, setFilters] = useState({ name: "", type: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;
    const [types, setTypes] = useState([]);
    const [teams, setTeams] = useState(() => {
        const storedTeams = localStorage.getItem("teams");
        return storedTeams ? JSON.parse(storedTeams) : [];
    });

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        fetchPokemons();
        fetchTypes();
    }, []);

    const fetchPokemons = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
            const data = await response.json();
            const detailedPokemons = await Promise.all(
                data.results.map(async (pokemon) => {
                    const detailResponse = await fetch(pokemon.url);
                    return await detailResponse.json();
                })
            );
            setPokemonList(detailedPokemons);
            setFilteredPokemons(detailedPokemons);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        }
    };

    const fetchTypes = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/type");
            const data = await response.json();
            setTypes(data.results.map((type) => type.name));
        } catch (error) {
            console.error("Error fetching Pokémon types:", error);
        }
    };

    const applyFilters = () => {
        const filtered = pokemonList.filter((pokemon) => {
            const matchesName = filters.name === "" || pokemon.name.includes(filters.name.toLowerCase());
            const matchesType = filters.type === "" || pokemon.types.some((t) => t.type.name === filters.type);
            return matchesName && matchesType;
        });
        setFilteredPokemons(filtered);
        setCurrentPage(1);
    };

    const createTeam = () => {
        Swal.fire({
            title: "Crear nuevo equipo",
            input: "text",
            inputLabel: "Nombre del equipo",
            inputPlaceholder: "Escribe el nombre del equipo",
            showCancelButton: true,
            confirmButtonText: "Crear",
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const newTeam = { name: result.value, pokemons: [] };
                const updatedTeams = [...teams, newTeam];
                setTeams(updatedTeams);
                localStorage.setItem("teams", JSON.stringify(updatedTeams));
                Swal.fire("Equipo creado", `El equipo "${result.value}" ha sido creado.`, "success");
            }
        });
    };

    const handleAddToTeam = (pokemon) => {
        if (!currentUser) {
            Swal.fire("Inicia sesión", "Debes estar registrado para añadir Pokémon a un equipo.", "warning");
            return;
        }

        if (teams.length === 0) {
            Swal.fire({
                title: "No tienes equipos",
                text: "Primero crea un equipo para añadir Pokémon.",
                icon: "info",
                confirmButtonText: "Crear equipo",
            }).then(() => createTeam());
            return;
        }

        Swal.fire({
            title: "Selecciona un equipo",
            input: "select",
            inputOptions: teams.reduce((acc, team, index) => {
                acc[index] = team.name;
                return acc;
            }, {}),
            inputPlaceholder: "Selecciona un equipo",
            showCancelButton: true,
            confirmButtonText: "Añadir",
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedIndex = parseInt(result.value);
                if (!isNaN(selectedIndex)) {
                    const updatedTeams = [...teams];
                    updatedTeams[selectedIndex].pokemons.push(pokemon);
                    setTeams(updatedTeams);
                    localStorage.setItem("teams", JSON.stringify(updatedTeams));
                    Swal.fire("Pokémon añadido", `${pokemon.name} añadido al equipo "${updatedTeams[selectedIndex].name}".`, "success");
                }
            }
        });
    };

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    return (
        <div className="pokemon-container">
            <h1>Pokémon Team Builder</h1>

            {/* Filtros */}
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={filters.name}
                    onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
                <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                >
                    <option value="">Todos los tipos</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
                <button onClick={applyFilters}>Aplicar filtros</button>
            </div>
            {/* Lista de Pokémon */}
            <div className="pokemon-list">
                {currentPokemons.map((pokemon) => (
                    <div key={pokemon.id} className="pokemon-card">
                        <h3>{pokemon.name}</h3>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <button onClick={() => handleAddToTeam(pokemon)}>Añadir al equipo</button>
                    </div>
                ))}
            </div>
            {/* Paginación */}
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredPokemons.length / pokemonsPerPage) }, (_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;





