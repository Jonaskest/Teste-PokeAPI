document.addEventListener("DOMContentLoaded", function () {
    const pesquisarBtn = document.getElementById("pesquisarBtn");

    pesquisarBtn.addEventListener("click", function () {
        buscarPokemon();
    });

    function buscarPokemon() {
        const elemento = document.getElementById("poke_text");
        const nomedoPokemon = elemento.value.toLowerCase();

        if (nomedoPokemon.trim() === "") {
            alert("HEY! Falta digitar o nome do seu Pokemon.");
            return;
        }

        const urlDoApi = `https://pokeapi.co/api/v2/pokemon/${nomedoPokemon}/`;

        const loadingIndicator = document.createElement("p");
        loadingIndicator.textContent = "Carregando...";
        const elementoPokemon = document.getElementById("pokemonInfo");
        elementoPokemon.innerHTML = "";
        elementoPokemon.appendChild(loadingIndicator);

        fetch(urlDoApi)
            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error("Não foi possível encontrar informações para o Pokémon informado.");
                }
                return resposta.json();
            })
            .then(data => {
                elementoPokemon.innerHTML = "";
                mostrarInfoDoPokemon(data);
            })
            .catch(error => {
                console.error("Erro ao buscar as informações dos Pokémon", error);
                elementoPokemon.innerHTML = "Não encontramos informações do seu Pokémon informado.";
            });
    }

    function mostrarInfoDoPokemon(pokemonData) {
        const elementoPokemon = document.getElementById("pokemonInfo");
        elementoPokemon.innerHTML = "";

        const nomeDoElemento = document.createElement("h2");
        nomeDoElemento.textContent = `Nome: ${pokemonData.name}`;

        const imagemDoElemento = document.createElement("img");
        imagemDoElemento.src = pokemonData.sprites.front_default;
        imagemDoElemento.alt = pokemonData.name;

        const XPDoElemento = document.createElement("p");
        XPDoElemento.textContent = `Experiência Base: ${pokemonData.base_experience}`;

        const movimentoDoElemento = document.createElement("p");
        movimentoDoElemento.textContent = `Habilidades: ${pokemonData.moves.map(move => move.move.name).join(", ")}`;

        const pesoDoElemento = document.createElement("p");
        pesoDoElemento.textContent = `Peso: ${pokemonData.weight / 10} kg`;

        const alturaDoElemento = document.createElement("p");
        alturaDoElemento.textContent = `Altura: ${pokemonData.height / 10} m`;

        elementoPokemon.appendChild(nomeDoElemento);
        elementoPokemon.appendChild(imagemDoElemento);
        elementoPokemon.appendChild(XPDoElemento);
        elementoPokemon.appendChild(movimentoDoElemento);
        elementoPokemon.appendChild(pesoDoElemento);
        elementoPokemon.appendChild(alturaDoElemento);
    }
});
