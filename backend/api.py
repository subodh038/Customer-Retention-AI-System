from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# request schema
class ChurnInput(BaseModel):
    tenure: float
    MonthlyCharges: float
    TotalCharges: float


# load model and feature columns
feature_columns = pickle.load(open("feature_columns.pkl", "rb"))
model = pickle.load(open("churn_model.pkl", "rb"))


@app.get("/")
def home():
    return {"message": "Churn Prediction API Running"}


@app.post("/predict")
def predict(data: ChurnInput):

    input_dict = {
        "tenure": data.tenure,
        "MonthlyCharges": data.MonthlyCharges,
        "TotalCharges": data.TotalCharges
    }

    # convert to dataframe
    input_df = pd.DataFrame([input_dict])

    # align with training columns
    full_input = pd.DataFrame(columns=feature_columns)
    full_input = pd.concat([full_input, input_df], ignore_index=True)
    full_input = full_input.fillna(0)

    # prediction
    prediction = model.predict(full_input)[0]
    probability = model.predict_proba(full_input)[0][1]

    # feature importance from XGBoost
    importance = model.feature_importances_

    feature_importance = {}

    for i in range(len(importance)):
        feature_importance[feature_columns[i]] = float(importance[i])

    top_features = sorted(
        feature_importance.items(),
        key=lambda x: x[1],
        reverse=True
    )[:3]

    return {
        "prediction": int(prediction),
        "probability": float(probability),
        "top_features": top_features
    }