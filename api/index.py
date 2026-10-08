from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import os

app = FastAPI()

# Load the model dynamically based on the current execution path
current_dir = os.path.dirname(os.path.realpath(__file__))
model_path = os.path.join(current_dir, 'models', 'cognitive_model.joblib')

try:
    model = joblib.load(model_path)
except Exception as e:
    model = None
    print(f"Model loading failed: {e}")

class StudentProfile(BaseModel):
    study_hours: float
    deep_work_pct: float
    distraction_index: float
    sleep_quality: float
    retention_profile: str

@app.post("/api/predict")
def predict_performance(profile: StudentProfile):
    if not model:
        return {"error": "Machine learning model not found. Train the model first."}
    
    # Convert incoming JSON data to a Pandas DataFrame
    data = pd.DataFrame([profile.model_dump()])
    
    # Convert percentage (e.g., 80) to decimal (0.8) to match training data
    data['deep_work_pct'] = data['deep_work_pct'] / 100.0
    
    prediction = model.predict(data)[0]
    
    return {
        "score": round(float(prediction), 1),
        "status": "success"
    }