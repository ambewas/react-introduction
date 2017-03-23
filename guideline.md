# chapter 1
## setup (laatste intro slide )

- nieuwe folder aanmaken voor project
- copy index.html & style.css van course_assets in folder
- maak index.js -- hiervan verder werken
- npm i -g http-server & in app runnen
- localhost:8080



## first react component

- remember drie soorten eerder gezien
- root component aanmaken: App

```
var App = React.createClass({
  render() {
    return (
      <div className="app-container">
        <h1>The music app</h1>
      </div>
    )
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

- createClass met object in -> onze component
- render method -- wat moet er getoond worden
  -> JSX hier

## jsx

- html achtige syntax
- quasi === -- enkel className
- html & react elementen
- syntax over functies.

This:
```
<div className="app-container">
  <h1>The music app</h1>
</div>
```

is equivalent (and gets transpiled) to this:

```
React.createElement("div",{ className: "app-container" },
  React.createElement("h1", null, "The music app"
  )
);
```

- render naar DOM met ReactDOM.render

## tweede react component: muziek item

- nesten html in jsx = fine -- maar willen react componenten nesten
- nieuwe:

```
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
```

- es2015 destructuring
- html
- style tag met logica voor achtergrond -- later in form toe te voegen. Fallback
- ternary operator: `condition ? this_if_true : this_if_false`
- alle JS is toegelaten, binnen {}.
- kracht van react >>> dom manipulatie bvb jquery

- MusicSummaryItem toevoegen in App & enkele props meegeven.

```
  <MusicSummaryItem
    imageUrl={'http://static.djbooth.net/pics-features/tlop-worst-album-release.jpg'}
    title={'The Life Of Pablo'}
    artist={'Kanye West'}
  />
```

- props ~  html properties.
- refresh browser en ne keer zien
- prop verandert -> component rerenderd. Demo met react tools

## prop types

- validatie (want geen type system in JS)
- paar toevoegen:

```
MusicSummaryItem.propTypes = {
  imageUrl: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  artist: React.PropTypes.string.isRequired,
}
```



------- NEXT CHAPTER

# chapter 2

## arrays
- tot nu toe statisch 1 album toegevoegd in een lijst.
- willen arrays!
- nieuwe component die lijst binnenkrijgt, daarover loopt & dan nieuw item maakt

```
var MusicSummary = React.createClass({
  propTypes: {
    musicList: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        imageUrl: React.PropTypes.string,
        title: React.PropTypes.string,
        artist: React.PropTypes.string,
      })
    )
  },
  _getMusicSummary() {
    return this.props.musicList.map(function(item, i) {
        <MusicSummaryItem key={i} imageUrl={item.imageUrl} title={item.title} artist={item.artist} />
      )
    })
  },
  render() {
    return <div>{this._getMusicSummary()}</div>
  }
})
```

- this.props.musicList is een array van objecten, allemaal albums
- props daarnet een property op een functionele component -- kan ook in de class

## map
- this._getMusicSummary() in de render
  - roept `map` aan op this.props.musicList.

  - map uitleggen

    - map maakt nieuwe array obv een bestaande array & een functie die we meegeven. We zeggen "wat willen we in nieuwe array"
    - hier zeggen we: steek musicsummaryitem in deze array, met deze props -- en doe dit voor elk item in musicList

## keys
- nieuwe prop key -- op elke component mogelijk
- react keep track of dom diff
- als in loop -> altijd key nodig -- hier index, maar idealiter een ID.

## initial state

- hoe krijgen we array data nu in app? -> state.

```
var App = React.createClass({
  getInitialState() {
    return {
      music: [
        {imageUrl: 'http://static.djbooth.net/pics-features/tlop-worst-album-release.jpg', title: 'The Life Of Pablo', artist: 'Kanye West'},
        {imageUrl: 'https://heathenharvest.files.wordpress.com/2016/02/david-bowie-blackstar.jpg', title: 'Blackstar', artist: 'David Bowie'},
        {imageUrl: 'http://images.rapgenius.com/beb23feb3d0be493ef446e5a7abf61a2.600x600x1.jpg', title: 'Manon', artist: 'De Jeugd Van Tegenwoordig'},
        {imageUrl: 'http://cdn3.pitchfork.com/albums/22814/homepage_large.4984cf76.jpg', title: 'This Unruly Mess I\'ve made', artist: 'Macklemore & Ryan Lewis'},
      ],
    }
  },

  render() {
    return (
      <div className="app-container">
        <h1>The music app</h1>
        <MusicSummary musicList={this.state.music} />
      </div>
    )
  }
});
```

- dus: musicsummary toegeveogd met prop
- state toegevoegd in initialstate.

- verschil state & props:
  - state leeft in component
  - props parent > child communicatie
  - state? --> moét een class zijn

- this.state in alle methods aanwezig

## React lifecycle methods

- drie stadia:

  - Mounting
    - wanneer instantie is gemaakt & in DOM
      - getInitialState() (or constructor() when extending Component)
      - componentWillMount()
      - render()
      - componentDidMount()


  - Updating
    - na updates op prop & state -- als component re-rendered
      - componentWillReceiveProps()
      - shouldComponentUpdate()
      - componentWillUpdate()
      - render()
      - componentDidUpdate()


  - Unmounting
    - als zal worden verwijderd uit de DOM:
      - componentWillUnmount()



## state updaten

- niet direct modifyen
- this.setState(newState).
- straks meer

--------- NEXT CHAPTER

# chapter 3 - FORM

- muziek toevoegen

```
var MusicForm = React.createClass({
  render() {
    return (
      <div className="music-form">
        <h1>Add your own music</h1>
        <form >
          <div className="flex">
            <input name={'title'} className="margin-small-right" type="text" placeholder="title" />
            <input name={'artist'} className="margin-small-left" type="text" placeholder="artist" />
          </div>
          <input name={'imageUrl'} type="text" placeholder="album cover url" />
        </form >
      </div>
    )
  }
})
```

- runnen --> werkt.
- want: controlled vs uncontrolled
- value & onchange handler toevoegen



```
var MusicForm = React.createClass({
  render() {
    return (
      <div className="music-form">
        <h1>Add your own music</h1>
        <form >
          <div className="flex">
            <input name={'title'} className="margin-small-right" type="text" placeholder="title" onChange={this._handleChange} value={this.state.title}/>
            <input name={'artist'} className="margin-small-left" type="text" placeholder="artist" onChange={this._handleChange} value={this.state.artist}/>
          </div>
          <input name={'imageUrl'} type="text" placeholder="album cover url" onChange={this._handleChange} value={this.state.imageUrl}/>
        </form >
      </div>
    )
  }
})
```


## form renderen

- MusicForm component in onze App steken.
- run code -> broken.
- wat ontbreekt?
  - geen state
  - geen _handleChange


```
var emptyState = {
    imageUrl: '',
    title: '',
    artist: '',
    pristine: false,
}
```

DAN..


```
var MusicForm = React.createClass({
  getInitialState() {
    return emptyState;
  },
```

- refreshen -> werkt weer
- emptyState eens title veranderen --> ingevuld in input.

- typen -> niks werkt
- onChange adden:


```
  _handleChange(e) {
    var value = e.target.value;
    var name = e.target.name;

    this.setState({
      [name]: value
    });
  },
```


- event `e`
- waarde zit op e.target.value
- name hebben we ook gezet, gelijk aan de key in emptyState
- wordt zo opgeslaan

-- all works.


---------------- next chapter

# chapter 4 - form validation


## submit knop

- knop toevoegen:

`<button onClick={this._handleSubmit}>add to music</button>`

- _handleSubmit toevoegen:


```
...
  _handleSubmit() {
    this.props.onAddMusic(this.state);
    this.setState(emptyState);
  },
...
```

## callback prop

in App:
`<MusicForm onAddMusic={this._handleAddMusic}/>`

en dan ook

```

  _handleAddMusic(item) {
    var music = this.state.music;
    music.push(item);
    this.setState({
      music: music
    })
  },

```

- uitproberen!


## form validatie

- nu alle data opgeslaan --> troubles.

- nieuwe key "pristine" op emptyState -> false.

- conditional className & disabled prop op button


```
...
    <button className={!this.state.pristine ? 'disabled' : null} onClick={this._handleSubmit} disabled={!this.state.pristine}>add to music</button>
...
```

- validateForm method & toevoegen in handleChange


```
  _validateForm() {
    var { title, artist } = this.state;
    this.setState({
      pristine: title && artist
    })
  },

  _handleChange(e) {
    var value = e.target.value;
    var name = e.target.name;

    this.setState({
      [name]: value
    }, this._validateForm);
  },
```

- this._validateForm tweede param in setState
- want async

- onsubmit ook op form -> enteren.


```
<form onSubmit={this._handleSubmit}>
```

nu nog handleSubmit aanpassen om enkel te wrken als pristine


```
...
  _handleSubmit() {
    if (this.state.pristine) {
      this.props.onAddMusic(this.state);
      this.setState(emptyState);
    }
  },
...
```


------------ NEXT CHAPTER

# chapter 5: filteren

## filter toevoegen

- zoekveld nodig


```
*in `App`*
  render() {
    return (
      <div className="app-container">
        <h1>The music app</h1>
        <input className="margin-large-bottom" type="text" placeholder="search" onChange={(e) => this.setState({searchQuery: e.target.value})} />
        <MusicSummary musicList={this.state.music} />
        <MusicForm onAddMusic={this._handleAddMusic}/>
      </div>
    )
  }
```

- searchQuery: '', toevoegen in initialstate

- filter schrijven

```
...

  _getFilteredMusic() {
    if (this.state.searchQuery) {
      var query = this.state.searchQuery.toLowerCase();
      return this.state.music.filter((item) => {
        return item.title.toLowerCase().indexOf(query) > -1 || item.artist.toLowerCase().indexOf(query) > -1;
      })
    }
    return this.state.music;
  },
...
```


- toevoegen ipv this.State.music

`<MusicSummary musicList={this._getFilteredMusic()} />`


- nu kunnen we zoeken


- topics niet besproken:


  - refs & DOM manipulation (if it's unavoidable!)
  - event handlers
  - component lifecycles in detail
  - stores, flux pattern / redux
    - getting / setting data server
    - communication between siblings
  - react project setup (webpack, browserify, create-react-app)
  - testing
  - HOCs & React.Children.Map etc
  - inline style & theming systems
  - class extension & other ES6 code
  - advanced propTypes (oneOf, oneOfType, arrayOf,...)
  - defaultProps
  - React Native
  - inline conditional rendering (if && ...)
  - React Tools chrome plugin
  - props.children & component nesting (composition >> inheritance)
  - jsx in depth
  - performance optimization & production builds
  - SSR
  -

