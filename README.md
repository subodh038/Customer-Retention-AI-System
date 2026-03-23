This project is an end-to-end Customer Churn Prediction and Retention Recommendation System built using Machine Learning, FastAPI, and React.
The system predicts whether a customer is likely to churn and provides risk analysis, feature importance, and business recommendations to help companies retain customers.

🚀 Features
Customer churn prediction using Machine Learning
Model comparison (Logistic Regression, Random Forest, XGBoost)
Evaluation using Precision, Recall, and F1 Score
Feature importance analysis
Churn risk visualization (Risk Meter)
Interactive React dashboard
FastAPI backend for model deployment
Retention recommendation system based on churn risk
🧠 Machine Learning Models Used
Model	Purpose
Logistic Regression	Baseline model
Random Forest	Ensemble model
XGBoost	Final selected model

Evaluation Metrics Used:

Precision
Recall
F1 Score
Cross Validation


🏗️ Project Architecture

React Dashboard (Frontend)
        ↓
FastAPI Backend (API)
        ↓
Machine Learning Model (XGBoost)
        ↓
Prediction + Probability + Feature Importance
        ↓
Risk Analysis + Retention Recommendation

| Technology    | Use              |
| ------------- | ---------------- |
| Python        | Machine Learning |
| Scikit-learn  | ML models        |
| XGBoost       | Final model      |
| FastAPI       | Backend API      |
| React         | Frontend         |
| Tailwind CSS  | UI Design        |
| Recharts      | Charts           |
| Joblib/Pickle | Model saving     |
