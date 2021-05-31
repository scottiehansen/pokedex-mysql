import React from 'react';
import axios from "axios";
import Pokemon from "./Pokemon.jsx";
import Types from "./Types.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'All Pokemon',
      typeList: [],
      pokemonList: [],
      pokemonByType: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    // axios.get('/route/getPokemon')
    // .then(responseOne => {
    //   axios.get('route/getTypes')
    //   .then(responseTwo => {
    //     var types = [{type: 'All Pokemon'}, ...responseTwo.data];
    //     this.setState({
    //       pokemonList: responseOne.data
    //     })
    //     this.setState({
    //       typeList: types
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }

  fetchData = () => {
    axios.get('/route/getPokemon')
    .then(responseOne => {
      axios.get('route/getTypes')
      .then(responseTwo => {
        var types = [{type: 'All Pokemon'}, ...responseTwo.data];
        this.setState({
          pokemonList: responseOne.data
        })
        this.setState({
          typeList: types
        })
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err)
    })
  };

  handleClick(event) {
    this.setState({
      type: 'All Pokemon'
    })
  }

  handleChange(event) {
    event.preventDefault();
    var typePokemon = [];
    for (var i =0; i < this.state.pokemonList.length; i++) {
      if (this.state.pokemonList[i].type === event.target.value) {
        typePokemon.push(this.state.pokemonList[i])
      }
    }
    this.setState({
      type: event.target.value,
      pokemonByType: typePokemon
    })
  }

  render() {
    if (this.state.type === 'All Pokemon') {
      return (
        <div>
          <h1>Fullstack Pokedex!</h1>
          <button onClick={this.handleClick}>Show All</button>
          <select value={this.state.type} onChange={this.handleChange}>
            {this.state.typeList.map((type, index) => (
              <Types types={type} key={index} />
            ))}
          </select>
          <div>
            {this.state.pokemonList.map((pokemon, index) => (
              <Pokemon props={pokemon} key={index} function={this.fetchData}/>
            ))}
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <h1>Fullstack Pokedex!</h1>
            <button onClick={this.handleClick}>Show All</button>
            <select value={this.state.type} onChange={this.handleChange} id="types">
            {this.state.typeList.map((type, index) => (
              <Types types={type} key={index} />
            ))}
          </select>
            <div>
            {this.state.pokemonByType.map((pokemon, index) => (
              <Pokemon props={pokemon} key={index} function={this.fetchData}/>
            ))}
          </div>
        </div>
      )
    }
  }
}


export default App;