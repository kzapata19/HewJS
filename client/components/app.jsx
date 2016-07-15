class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'HewJS in React'
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

window.App = App;

ReactDOM.render(<App />, document.getElementsByClassName('app')[0]);