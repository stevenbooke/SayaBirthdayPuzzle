import logo from './logo.svg';
import './App.css';
import Vanta from './components/Vanta';
import Grid from './components/Grid';

function App() {
  const images = [
    require('./assets/square_0_0.jpg'),
    require('./assets/square_0_1.jpg'),
    require('./assets/square_0_2.jpg'),
    require('./assets/square_0_3.jpg'),
    require('./assets/square_1_0.jpg'),
    require('./assets/square_1_1.jpg'),
    require('./assets/square_1_2.jpg'),
    require('./assets/square_1_3.jpg'),
    require('./assets/square_2_0.jpg'),
    require('./assets/square_2_1.jpg'),
    require('./assets/square_2_2.jpg'),
    require('./assets/square_2_3.jpg'),
    require('./assets/square_3_0.jpg'),
    require('./assets/square_3_1.jpg'),
    require('./assets/square_3_2.jpg'),
    require('./assets/square_3_3.jpg'),
  ];
  return (
    <div className="app">
      <Vanta />
      <Grid images={images} />
    </div>

    // <div className="app">
    //   <Grid images={images} />
    // </div>

    // <VantaBackground />

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
