import React, { useState } from 'react';
import axios from 'axios';

function PredictionForm() {
    const [temperature_celsius, setTemperature_celsius] = useState('');
    const [day_of_year, setDayofyear] = useState('');
    const [hour, setHour] = useState('');
    const [wind_kph, setWind_kph] = useState('');
    const [pressure_in, setPressure_in] = useState('');
    const [humidity, setHumidity] = useState('');
    const [feels_like_celsius, setFeels_like_celsius] = useState('');
    const [uv_index, setUv_index] = useState('');
    const [predictions, setPredictions] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/predict/', {
                temperature_celsius,
                day_of_year,
                hour,
                wind_kph,
                pressure_in,
                humidity,
                feels_like_celsius,
                uv_index
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Set predictions based on response
            setPredictions(response.data.predictions); // Assuming predictions is an array
        } catch (error) {
            console.error('Error making prediction:', error);
        }
    };

    // Define inline styles for alert boxes
    const boxStyle = (temp) => ({
        padding: '10px',
        borderRadius: '5px',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '16px',
        margin: '5px',
        width: '80px',
        height: '60px',
        backgroundColor: temp >= 35 ? '#f44336' : '#4caf50', // Red if temp >= 35, else Green
    });

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ backgroundColor: '#d3d3d3', border: '1px solid #ccc', borderRadius: '8px', padding: '30px', maxWidth: '400px', margin: '0 auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <label>
                    temperature_celsius:
                    <input
                        type="number"
                        value={temperature_celsius}
                        onChange={(event) => setTemperature_celsius(event.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                    />
                </label>
                <br />
                <label>
                    day_of_year:
                    <input
                        type="number"
                        value={day_of_year}
                        onChange={(event) => setDayofyear(event.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                    />
                </label>
                <br />
                <label>
                    Hour:
                    <input
                        type="number"
                        value={hour}
                        onChange={(event) => setHour(event.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                    />
                </label>
                <br />
                <label>
                    wind_kph:
                    <input
                        type="number"
                        value={wind_kph}
                        onChange={(event) => setWind_kph(event.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                    />
                </label>
                <br />
                <label>
                    pressure_in:
                    <input
                        type="number"
                        value={pressure_in}
                        onChange={(event) => setPressure_in(event.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                    />
                </label>
                <br />
                <label>
                    humidity:
                    <input
                        type="number"
                        value={humidity}
                        onChange={(event) => setHumidity(event.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                    />
                </label>
                <br />
                <label>
                    feels_like_celsius:
                    <input
                        type="number"
                        value={feels_like_celsius}
                        onChange={(event) => setFeels_like_celsius(event.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                    />
                </label>
                <br />
                <label>
                    uv_index:
                    <input
                        type="number"
                        value={uv_index}
                        onChange={(event) => setUv_index(event.target.value)}
                        style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                    />
                </label>
                <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Predict</button>
            </form>
            <h3>Temperature Predictions for the Next 5 Days:</h3>
            {predictions && (
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    
                    {predictions.map((temp, index) => (
                        <div key={index} style={boxStyle(temp)}>
                            Day {index + 1}: {temp.toFixed(2)} C
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PredictionForm;




