from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import joblib
import json
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model  # Use load_model for TensorFlow models

# Load the saved model and scaler from disk
model = joblib.load("C:/Users/pavit/Documents/ML/HeatAlertSystem/Heatalertproject/myapp/new1model.pkl")
scaler = joblib.load("C:/Users/pavit/Documents/ML/HeatAlertSystem/Heatalertproject/myapp/scaler.pkl")  # Adjust the path as needed

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        try:
            # Get the input data from the request body
            data = json.loads(request.body)
            print(data)
            
            # Check for missing keys and handle errors
            required_keys = ['temperature_celsius', 'day_of_year', 'hour', 'wind_kph', 'pressure_in', 'humidity', 'feels_like_celsius', 'uv_index']
            for key in required_keys:
                if key not in data:
                    return JsonResponse({'error': f'Missing key: {key}'}, status=400)

            # Convert the input data to a numpy array
            X = np.array([[float(data['temperature_celsius']), float(data['day_of_year']),
                           float(data['hour']), float(data['wind_kph']), float(data['pressure_in']),
                           float(data['humidity']), float(data['feels_like_celsius']), float(data['uv_index'])]])
            
            # Scale the input data
            input_data_scaled = scaler.transform(X)  # Shape: (1, 8)
            input_data_reshaped = input_data_scaled.reshape((1, 1, 8))  # Shape: (1, 1, 8)
            print("Input data as numpy array:", input_data_reshaped)

            # Use the model to make predictions
            predictions = model.predict(input_data_reshaped)
            predictions_reshaped = predictions.reshape(-1, 5)  # Assuming output is 5 days
            
            # Inverse transform the predictions to original scale
            temperature_scaler = MinMaxScaler(feature_range=(0, 1))
            temperature_scaler.fit(X[:, [0]])  # Fit scaler on temperature column
            
            original_scale_predictions = temperature_scaler.inverse_transform(predictions_reshaped)

            # Convert predictions to list
            predictions_list = original_scale_predictions.flatten().tolist()
            print("Predicted Temperatures (Original Scale):", predictions_list)

            # Return the predictions as a JSON response
            return JsonResponse({'predictions': predictions_list})
        except Exception as e:
            # Return an error response if something goes wrong
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


