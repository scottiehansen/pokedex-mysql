import React from "react";
import axios from "axios";

// var pokemonList = (props) => {
//   return (
//     <div>
//       <h3>{props.props.name}</h3>
//       <img src={props.props.img} />
//     </div>
//   )
// }

class pokemonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      clickedPokemon: '',
      value: '',
      id: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(event) {
    this.setState({
      clicked: !this.state.clicked,
      clickedPokemon: event.target.getAttribute('name'),
      id: event.target.id
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.put(`/route/changePokemon/${this.state.id}`, {
      name: this.state.value
    })
      .then(response => {
        this.setState({
          clicked: !this.state.clicked
        })
        this.props.function();
      })
      .catch(error => {
        console.log('error')
      })
    // Change props back to null?
  }

  render() {
    if (this.state.clicked === false) {
      return (
        <div>
          <h3 name={this.props.props.name} onClick={this.handleClick} id={this.props.props.id}>{this.props.props.name}</h3>
          <img src={this.props.props.img} />
        </div>
      )
    } else {
      return (
        <div>
          {this.props.props.name === this.state.clickedPokemon ?
          <span>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <img src={this.props.props.img} />
          </span> :
          <span>
            <h3 onClick={this.handleClick}>{this.props.props.name}</h3> <img src={this.props.props.img} />
          </span>
          }
        </div>
      )
    }
  }
}

export default pokemonList;