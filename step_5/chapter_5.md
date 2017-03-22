# Chapter 5 - filtering values

In chapter 4 we finished up our form, and we're now able to add music albums to our app.

In this chapter, we'll be adding a basic filtering functionality, so we can search for any album.


## adding a filter

If we want to search for an album... we'll need a search field! So let's start by adding that.
Since this is the only input in our `App` component, we can get away with just an inline onChange handler. This uses an ES2015 arrow function - but you could write it just the same way with traditional `function` notation.

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

In this onChange, we're actually setting a `searchQuery` on the state. So let's initialize it as well, as an empty string:

```
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
```

Now let's write the fun part. React doesn't come with a standard filter functionality - so we'll have to write our own filter implementation. While this sounds annoying, it actually allows us to write custom filters in a very explicit and clear way. We'll keep to a simple filter for this example though.

Let's first look at the code, and disect it afterwards:

```
...
  _getFilteredMusic() {
    // A standard lodash filter to search and filter in our music array
    if (this.state.searchQuery) {
      // build a case insensitive regex out of the searchQuery
      var regex = new RegExp(this.state.searchQuery, 'gi');
      return _.filter(this.state.music, (item) => {
        // .. which we use to search on artist and title, and return true when we find a match. Lodash will then add this item to the returned array from _.filter.
        return item.title.search(regex) > -1 || item.artist.search(regex) > -1;
      })
    }
    return this.state.music
  },
...
```

The code is commented to explain the different steps, but let's step through it together as well.

First off, we only need to return a filtered state, if there's actually a searchQuery. Otherwise, return `this.state.music`.

But if there is a query, we'll need to do something with it. Here we're using lodash's `filter` function -- but you could just as well write your own.

`_.filter` takes the array to filter as first argument, and then a filter function as the second argument. In this case, if the function applied to an item evaluates to `false`, the item is filtered out of the returned array. If it's `true`, we keep it.

With the `regex` we've created (so we can do case insensitive search), we look in either the title or the artist field of every album, and return true if our `searchQuery` was found in either one.

The only thing left to do is actually calling `this._getFilteredMusic` in our render function, so we can pass this array to our `MusicSummary`  component:

```
...
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
...
```

If you restart your app right now, you'll see that you're able to search through all of your music albums.
