# Neuro-Cognitive Performance AI

An end-to-end Machine Learning web application predicting student academic outcomes via cognitive metrics (Deep Work, Distractions, Sleep Restfulness) built on Next.js and Scikit-Learn.

## Tech Stack
* **Frontend:** Next.js, React, Tailwind CSS, Lucide Icons
* **Backend:** Python, FastAPI (Vercel Serverless)
* **ML:** Scikit-Learn (Gradient Boosting Regressor)

## Setup
1. Create Python environment: `python -m venv .venv`
2. Activate and install: `pip install -r requirements.txt`
3. Train model: `cd model_training && python train.py`
4. Run app: `npm run dev`