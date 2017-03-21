step 1:

- APP global class & reactDOM.render to root, look at html, ...
- explain the different react components you will encounter
- render
  - container div, h1,
  - musicSummaryItem x1
    - title
    - imageUrL
    - artist
  - add prop types to music summary item

- react concepts to explain:
  - different react class invocation
  - render() lifecycle
  - jsx: html elements & instances of react classes
  - javascript in jsx --> {}
  - passing props to stateless functional component
  - inline style
  - ReactDOM.render()
  - propType validation
  - className ipv class


step 2:

- initial state, populate with music array
- music summary items to MusicSummaryList from state
  - explain map


- react concepts to explain:
  - explain PROPS vs STATE
    - sidetrack with clear example of a stepper button.
    - too much state !== good.
      - ok for things only that component needs to know about.
  - keys
    - in a map vs sometimes trick to always rerender
  - executing functions in render
    - can also be inline
    - but preferred to move it out of render function, to keep things organised
    - could also be moved to a functional component -- same principle.
    - I like to keep these maps etc inside the class
  - getInitialState() lifecycle (briefly mention constructor)
  - other react lifecycles -- sidetrack, niet te lang op ingaan.
    - Mounting
      - These methods are called when an instance of a component is being created and inserted into the DOM:
        - constructor()
        - componentWillMount()
          -->
        - render()
        - componentDidMount()
          --> event handlers!


    - Updating
      - An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
        - componentWillReceiveProps()
        - shouldComponentUpdate()
        - componentWillUpdate()
        - render()
        - componentDidUpdate()


    - Unmounting
      - This method is called when a component is being removed from the DOM:
        - componentWillUnmount()


  - react component methods
    - setState()
    - forceUpdate()


  - class properties
    - defaultProps
    - propTypes
    - displayName

  - everything is a function --> we're just calling a map function
    - (al gezien? anders kort uitleggen wat het doet (functie op elk element in array))





step 3:

- setup form:
  - entire html outline -> without changehandlers & value

- add defaultState (emptystate) + explain what it will do later

- add value to inputs -> default value demonstrate

- add changehandler
  - first once
  - extend function for all types with switch statement
  - demonstrate change handling with log of state


- react concepts to explain:
  - controlled vs uncontrolled inputs
  - defaultValues === initial state
  - synthetic events


step 4:

- add submit button with pristine class & disabled attribute

- add _validateForm to actually set pristine state

- catch submit handler on form _handleSubmit as well

- add onClick callback to button --> move back to top component

- add _handleAddMusic to App (and add prop onAddMusic to MusicForm )

- demo it all works

- react concepts to explain:
  - form validation on change
  - setState -> new render -> disable/enable button based on state
  - setState callback for form validation vs setTimeout
  - callback props
  - submit handler
  - classnames utility (?)
  - name -> value (ES6 computed property name syntax eq to property[key] = value en dan setState)


step 5:

- (if time)
- add filter:
  - add input with inline onChange to set state
  - add default searchQuery to state
  - add _getFilteredMusic instead of inline musicList={this.state.music},
  - add lodash filter with regex to filter on title or artist

  - react concepts to explain:
    - again state manipulation
    - basic lodash filter





advanced topics we did not cover that would usually be used in a production application (add links and short explanation in course itself)


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

