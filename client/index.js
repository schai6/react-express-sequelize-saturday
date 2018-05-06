import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const PuppyPicture = (props) => {
  return (
    <img src={props.puppyPicture} />
  );
};

const PuppyLikes = (props) => {
  return (
    <div className="puppy-likes">
      <p>Number of Likes: {props.likes}</p>
      <div>
        <button className="like btn" onClick={() => props.updatePuppy(props.likes + 1)}>Like</button>
        <button className="dislike btn" onClick={() => props.updatePuppy(props.likes - 1)}>Dislike</button>
      </div>
    </div>
  );
};

const PuppyProfile = (props) => {
  return (
    <li className="puppy-profile">
      <div>
        <div>
          <p>Name: {props.puppy.name}</p>
          <p>Owner: {props.puppy.owner.name}</p>
        </div>
        <PuppyPicture puppyPicture={props.puppy.imageUrl} />
      </div>
      <PuppyLikes likes={props.puppy.likes} updatePuppy={props.updatePuppy(props.puppy.id)} />
    </li>
  );
};

const PuppyList = (props) => {
  return (
    <ul id="puppy-list">
      {
        props.puppies.map(puppy => <PuppyProfile puppy={puppy} updatePuppy={props.updatePuppy} key={puppy.id} />)
      }
    </ul>
  );
};

class Main extends React.Component {
  constructor () {
    super();
    this.state = {
      puppies: [],
      owners: []
    };
  }

  componentDidMount () {
    Promise.all([
      axios.get('/api/puppies'),
      axios.get('/api/owners')
    ])
      .then(([res, rez]) => [res.data, rez.data])
      .then(([puppies, owners]) => this.setState({puppies, owners}));
  }

  addNewPuppy = puppyData => {
    axios.post('/api/puppies', puppyData)
      .then(res => res.data)
      .then(puppy => {
        this.setState({puppies: [...this.state.puppies, puppy]});
      });
  }

  updatePuppy = puppyId => likes => {
    axios.put(`/api/puppies/${puppyId}`, {likes})
      .then(res => res.data)
      .then(pupdated => {
        this.setState({
          puppies: this.state.puppies.map(pup => pup.id === pupdated.id ? pupdated : pup)
        });
      });
  }

  render () {
    return (
      <div id="main">
        <PuppyList puppies={this.state.puppies} updatePuppy={this.updatePuppy} />
      </div>
    );
  }
}

// Uncomment the ReactDOM.render below to start using React!

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
