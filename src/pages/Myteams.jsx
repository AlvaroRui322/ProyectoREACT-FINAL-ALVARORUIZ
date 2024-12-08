import { useState } from "react";
import Swal from "sweetalert2";
import "../styles/MyTeams.css";

const MyTeams = () => {
    const [teams, setTeams] = useState(() => {
        const storedTeams = localStorage.getItem("teams");
        return storedTeams ? JSON.parse(storedTeams) : [];
    });

    const [selectedTeam, setSelectedTeam] = useState(null);

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

    const deleteTeam = (teamToDelete) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: `Se eliminará el equipo "${teamToDelete.name}". Esta acción no se puede deshacer.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTeams = teams.filter((team) => team.name !== teamToDelete.name);
                setTeams(updatedTeams);
                localStorage.setItem("teams", JSON.stringify(updatedTeams));
                if (selectedTeam?.name === teamToDelete.name) {
                    setSelectedTeam(null); // Volver a la vista general si el equipo eliminado estaba seleccionado
                }
                Swal.fire("Eliminado", `El equipo "${teamToDelete.name}" ha sido eliminado.`, "success");
            }
        });
    };

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
    };

    const handleBack = () => {
        setSelectedTeam(null);
    };

    const addPokemonToTeam = (team) => {
        if (team.pokemons.length >= 6) {
            Swal.fire("Límite alcanzado", "No puedes añadir más de 6 Pokémon a un equipo.", "error");
            return;
        }

        const newPokemon = {
            id: Math.random().toString(36).substring(2, 9),
            name: `Pokémon ${team.pokemons.length + 1}`,
            sprites: { front_default: "https://via.placeholder.com/150" },
        };

        const updatedTeams = teams.map((t) =>
            t.name === team.name ? { ...t, pokemons: [...t.pokemons, newPokemon] } : t
        );

        setTeams(updatedTeams);
        localStorage.setItem("teams", JSON.stringify(updatedTeams));
        setSelectedTeam(updatedTeams.find((t) => t.name === team.name));
    };

    return (
        <div className="teams-container">
            <h1>Mis Equipos</h1>

            {selectedTeam ? (
                <div className="team-detail">
                    <button className="back-button" onClick={handleBack}>
                        ← Volver
                    </button>
                    <h2>{selectedTeam.name}</h2>
                    <p>Slots disponibles: {6 - selectedTeam.pokemons.length}/6</p>
                    <button
                        className="add-pokemon-button"
                        onClick={() => addPokemonToTeam(selectedTeam)}
                    >
                        Añadir Pokémon
                    </button>
                    <button
                        className="delete-team-button"
                        onClick={() => deleteTeam(selectedTeam)}
                    >
                        Eliminar equipo
                    </button>
                    <div className="team-pokemons-grid">
                        {selectedTeam.pokemons.length > 0 ? (
                            selectedTeam.pokemons.map((pokemon) => (
                                <div key={pokemon.id} className="pokemon-card">
                                    <h3>{pokemon.name}</h3>
                                    <img
                                        src={pokemon.sprites.front_default}
                                        alt={pokemon.name}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>Este equipo no tiene Pokémon aún.</p>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {teams.length === 0 ? (
                        <div className="no-teams">
                            <p>No tienes equipos creados.</p>
                            <button className="create-team-button" onClick={createTeam}>
                                Crear un equipo
                            </button>
                        </div>
                    ) : (
                        <div className="teams-grid">
                            {teams.map((team, index) => (
                                <div key={index} className="team-card">
                                    <h2>{team.name}</h2>
                                    <p>Slots disponibles: {6 - team.pokemons.length}/6</p>
                                    <button
                                        className="delete-team-button"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evitar que se abra la vista detallada
                                            deleteTeam(team);
                                        }}
                                    >
                                        Eliminar equipo
                                    </button>
                                    <div
                                        className="team-card-overlay"
                                        onClick={() => handleTeamClick(team)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyTeams;




