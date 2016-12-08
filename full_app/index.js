// start a http-server to be able to serve static content over localhost
// npm install http-server -g
// http-server *folder*

var App = React.createClass({
  getInitialState() {
    return {
      music: [
        {imageUrl: 'http://static.djbooth.net/pics-features/tlop-worst-album-release.jpg', title: 'The Life Of Pablo', artist: 'Kanye West'},
        {imageUrl: 'https://heathenharvest.files.wordpress.com/2016/02/david-bowie-blackstar.jpg', title: 'Blackstar', artist: 'David Bowie'},
        {imageUrl: 'http://images.rapgenius.com/beb23feb3d0be493ef446e5a7abf61a2.600x600x1.jpg', title: 'Manon', artist: 'De Jeugd Van Tegenwoordig'},
        {imageUrl: 'http://cdn3.pitchfork.com/albums/22814/homepage_large.4984cf76.jpg', title: 'This Unruly Mess I\'ve made', artist: 'Macklemore & Ryan Lewis'},
      ],
      searchQuery: '',
    }
  },

  _getFilteredMusic() {
    // A standard lodash filter to search and filter in our music array
    if (this.state.searchQuery) {
      return _.filter(this.state.music, (item) => {
        // build a case insensitive regex out of the searchQuery
        var regex = new RegExp(this.state.searchQuery, 'gi');
        // .. which we use to search on artist and title, and return true when we find a match. Lodash will then add this item to the returned array from _.filter.
        return item.title.search(regex) > -1 || item.artist.search(regex) > -1;
      })
    }
    return this.state.music
  },

  _handleAddMusic(item) {
    // this function will be called when clicking on the add button in the form (see below)
    // Simply add the incoming item to the music array on our App state.
    var music = this.state.music;
    music.push(item);
    this.setState({
      music: music
    })
  },

  render() {
    return (
      <div className="app-container">
        <h1>The music app</h1>
        <input className="margin-large-bottom" type="text" placeholder="search" onChange={(e) => this.setState({searchQuery: e.target.value})} />
        <MusicSummary musicList={this._getFilteredMusic()} />
        <MusicForm onAddMusic={this._handleAddMusic}/>
      </div>
    )
  }
});


var MusicSummary = React.createClass({
  _getMusicSummary() {
    // loop over every music list item & map all information to a MusicSummaryItem component
    return this.props.musicList.map(function(item, i) {
      return (
        <MusicSummaryItem key={i} imageUrl={item.imageUrl} title={item.title} artist={item.artist} />
      )
    })
  },
  render() {
    return <div>{this._getMusicSummary()}</div>
  }
})


// the music summary item
// a stateless, purely representational component
// it uses passed props to display image, title, artist.
var MusicSummaryItem = function(props) {
  var { imageUrl, title, artist } = props;
  return (
    <div  className="music-item">
      <div className="cover" style={imageUrl ? {backgroundImage: 'url("' + imageUrl + '")'} : null}/>
      <div className="info">
        <h2 className="title">{title}</h2>
        <div className="artist">{artist}</div>
      </div>
    </div>
  )
}


// the form to add more music
// will save data on it's own state first
// submitting the form (either onClick button or onSubmit form), will call callback function and pass a new music item object
// callback is handled in the parent App component (onAddMusic={_handleAddMusic}) to add item to the global state.

// because we need to reset state, assign default state to a variable
var emptyState = {
    imageUrl: '',
    title: '',
    artist: '',
    pristine: false,
}

var MusicForm = React.createClass({
  getInitialState() {
    // initialize the item form with an empty music item
    return emptyState;
  },

  _validateForm() {
    // if we have filled out each value, it's valid.
    // imageurl is not required, and will fall back to a default
    var { title, artist } = this.state;
    if (title && artist) {
      this.setState({
        pristine: true,
      })
    }
  },

  _handleChange(type, e) {
    // set the appropriate values to the appropriate keys
    // on our music object which resides in local state.
    var value = e.target.value;
    switch(type) {
      case 'imageUrl':
        this.setState({
          imageUrl: value
        });
        break;
      case 'title':
        this.setState({
          title: value
        });
        break;
      case 'artist':
        this.setState({
          artist: value
        });
        break;
      default:
        break;
    }

    // Because we are validating the form (and setting prisine state) based on state values,
    // we cannot ensure the order in which this will all be executed.
    // by setting a timeout, we can pull the form validation out of the event loop and ensure it's being called after all
    // previous setState functions have been executed.
    window.setTimeout(this._validateForm, 1);
  },

  _handleSubmit() {
    // check if the form is valid (i.e. all necessary fields are completed)
    if (this.state.pristine) {
      // call our callback function on the parent, with a new music item
      this.props.onAddMusic(this.state);
      // then clear state again so the form is cleared
      this.setState(emptyState);
    }
  },

  render() {
    return (
      <div className="music-form">
        <h1>Add your own music</h1>
        <form onSubmit={this._handleSubmit}>
          <div className="flex">
            <input className="margin-small-right" type="text" placeholder="title" onChange={(e) => this._handleChange('title', e)}value={this.state.title}/>
            <input className="margin-small-left" type="text" placeholder="artist" onChange={(e) => this._handleChange('artist', e)} value={this.state.artist}/>
          </div>
          <input type="text" placeholder="album cover url" onChange={(e) => this._handleChange('imageUrl', e)} value={this.state.imageUrl}/>
          <button className={!this.state.pristine ? 'disabled' : null} onClick={this._handleSubmit} disabled={!this.state.pristine}>add to music</button>
        </form >
      </div>
    )
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
);