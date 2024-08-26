import React from 'react';
import PredictionForm from './PredictionForm.js';

function App() {
    const backgroundImageUrl = 'https://images8.alphacoders.com/707/707743.jpg';

  const style = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover', // Ensure the image covers the entire container
    backgroundPosition: 'center', // Center the image
    height: '135vh', // Adjust height as needed
    width: '100%', // Adjust width as needed
  };
    return (
        <div style={style}>
            <center><h1 style={{color:'white'}}>Heat Alert Predictor</h1></center>
            <PredictionForm />
        </div>
    );
}

export default App;

