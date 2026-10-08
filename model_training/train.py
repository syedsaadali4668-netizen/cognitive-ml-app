import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
import joblib
import os

print("Generating neuro-cognitive dataset...")
np.random.seed(42)
n_samples = 1000

# Features
study_hours = np.random.uniform(1, 10, n_samples)
deep_work_pct = np.random.uniform(0.2, 1.0, n_samples)
distraction_index = np.random.uniform(0, 15, n_samples)
sleep_quality = np.random.uniform(3, 10, n_samples)
retention_profile = np.random.choice(
    ['High-Speed', 'Standard', 'Requires_Repetition'], 
    n_samples, 
    p=[0.2, 0.6, 0.2]
)

# Base score calculation
base_score = (study_hours * deep_work_pct * 8) - (distraction_index * 1.5) + (sleep_quality * 2)

# Apply multipliers based on learning style
multipliers = {'High-Speed': 1.15, 'Standard': 1.0, 'Requires_Repetition': 0.85}
final_scores = [base_score[i] * multipliers[retention_profile[i]] for i in range(n_samples)]

# Add noise and cap scores between 0 and 100
final_scores = [min(100, max(0, score + np.random.normal(0, 4))) for score in final_scores]

df = pd.DataFrame({
    'study_hours': study_hours,
    'deep_work_pct': deep_work_pct,
    'distraction_index': distraction_index,
    'sleep_quality': sleep_quality,
    'retention_profile': retention_profile,
    'final_score': final_scores
})

print("Training Gradient Boosting Pipeline...")
X = df.drop('final_score', axis=1)
y = df['final_score']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['study_hours', 'deep_work_pct', 'distraction_index', 'sleep_quality']),
        ('cat', OneHotEncoder(handle_unknown='ignore'), ['retention_profile'])
    ])

model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', GradientBoostingRegressor(n_estimators=150, learning_rate=0.1, max_depth=4, random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)

print(f"Model R2 Score: {model.score(X_test, y_test):.3f}")

# Save the trained model directly into the api/models directory
os.makedirs('../api/models', exist_ok=True)
joblib.dump(model, '../api/models/cognitive_model.joblib')
print("Model successfully saved to api/models/cognitive_model.joblib")