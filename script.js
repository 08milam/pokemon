// This component represents a single Pokemon card.
function Pokecard({ name, image, type }) {
  return (
    <div className="pokecard">
      <h2>{name}</h2> {/* Display Pokemon's name */}
      <img src={image} alt={name} /> {/* Display Pokemon's image */}
      <p>Type: {type}</p> {/* Display Pokemon's type */}
    </div>
  );
}

// This component represents a Pokedex, which fetches and displays a set of random Pokemon cards.
class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [], // Initialize state to hold an empty array of Pokemon
    };
  }

  componentDidMount() {
    this.fetchRandomPokemon(); // Call fetchRandomPokemon method when the component mounts
  }

  // Method to fetch random Pokemon data from the PokeAPI
  fetchRandomPokemon = async () => {
    try {
      // Generate 10 random Pokemon IDs between 1 and 898
      const randomIds = Array.from(
        { length: 10 },
        () => Math.floor(Math.random() * 898) + 1
      );
      // Fetch data for each random Pokemon ID and convert the response to JSON
      const promises = randomIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      );
      // Wait for all promises to resolve and store the data
      const pokemonData = await Promise.all(promises);
      // Format the fetched Pokemon data into a more usable format
      const formattedPokemon = pokemonData.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.types[0].type.name, // Extract the primary type of the Pokemon
        image: pokemon.sprites.front_default, // Extract the default front image of the Pokemon
      }));
      // Update the component state with the formatted Pokemon data
      this.setState({ pokemon: formattedPokemon });
    } catch (error) {
      console.error("Error fetching random Pokémon:", error); // Log any errors that occur during the fetch operation
    }
  };

  render() {
    return (
      <div className="pokedex">
        {/* Render Pokecard component for each Pokemon in the state */}
        {this.state.pokemon.map((p) => (
          <Pokecard key={p.id} name={p.name} image={p.image} type={p.type} />
        ))}
      </div>
    );
  }
}

// Render the Pokedex component and mount it to the root element in the HTML document
ReactDOM.render(<Pokedex />, document.getElementById("root"));
