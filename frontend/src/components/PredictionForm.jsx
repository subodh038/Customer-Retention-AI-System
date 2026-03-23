import { useState } from "react"
import axios from "axios"
import ChurnChart from "./ChurnChart"
import RiskGauge from "./RiskGauge";
import FeatureChart from "./FeatureChart";

const featureNameMap = {
  Contract_Two_year: "2 Year Contract",
  Contract_One_year: "1 Year Contract",
  TechSupport_Yes: "Tech Support Enabled",
  TechSupport_No: "No Tech Support",
  MonthlyCharges: "Monthly Charges",
  tenure: "Customer Tenure",
  TotalCharges: "Total Charges"
};

export default function PredictionForm() {

  const [tenure, setTenure] = useState("")
  const [monthlyCharges, setMonthlyCharges] = useState("")
  const [totalCharges, setTotalCharges] = useState("")
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      tenure: Number(tenure),
      MonthlyCharges: Number(monthlyCharges),
      TotalCharges: Number(totalCharges)
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        data
      )

      setResult(response.data)

    } catch (error) {
      console.error(error)
    }
  }

 return (
  <div className="w-full">

    {/* TOP ROW */}
    <div className="grid md:grid-cols-2 gap-10">

      {/* Customer Information */}
      <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md">

        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          Customer Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="number"
            placeholder="Tenure"
            className="w-full p-2 border rounded-lg"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />

          <input
            type="number"
            placeholder="Monthly Charges"
            className="w-full p-2 border rounded-lg"
            value={monthlyCharges}
            onChange={(e) => setMonthlyCharges(e.target.value)}
          />

          <input
            type="number"
            placeholder="Total Charges"
            className="w-full p-2 border rounded-lg"
            value={totalCharges}
            onChange={(e) => setTotalCharges(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Predict
          </button>

        </form>

      </div>

      {/* Prediction Result */}
      {result && (
        <div className="bg-slate-800 text-white p-6 rounded-xl shadow-md">
          

          <h2 className="text-xl font-semibold mb-4">
            Prediction Result
          </h2>

          <p className={`font-semibold ${
  result.probability > 0.7
    ? "text-red-400"
    : result.probability > 0.4
    ? "text-yellow-400"
    : "text-green-400"
}`}>
            {result.prediction === 1
              ? "High Churn Risk"
              : "Low Churn Risk"}
          </p>

          <p className="mt-2">
            Probability: {(result.probability * 100).toFixed(2)}%
          </p>
          {result.top_features && (
  <div className="mt-4">
    <h3 className="font-semibold text-gray-300">
      Top Factors Influencing Prediction
    </h3>

    <ul className="mt-2 text-sm text-gray-400">
      {result.top_features.map((feature, index) => {
  const readableName = featureNameMap[feature[0]] || feature[0];

  return (
    <li key={index}>
      {readableName} ({feature[1] > 0 ? "Positive impact on churn" : "Negative impact on churn"})
    </li>
  );
})}
    </ul>
  </div>
)}
          <div className="w-full bg-slate-700 rounded-full h-3 mt-3">
  <div
    className="h-3 rounded-full bg-blue-500"
    style={{ width: `${result.probability * 100}%` }}
  ></div>
</div>
{/* Recommendation Box */}
<div className="mt-5 p-4 bg-slate-700 rounded-lg">
  <h3 className="font-semibold mb-2 text-blue-300">
    Recommended Action
  </h3>

  {result.probability > 0.7 && (
    <ul className="text-sm text-gray-300">
      <li>• Offer discount to customer</li>
      <li>• Suggest yearly contract plan</li>
      <li>• Customer support follow-up</li>
    </ul>
  )}

  {result.probability <= 0.7 && result.probability > 0.4 && (
    <ul className="text-sm text-gray-300">
      <li>• Offer loyalty rewards</li>
      <li>• Send promotional email</li>
      <li>• Provide special offers</li>
    </ul>
  )}

  {result.probability <= 0.4 && (
    <ul className="text-sm text-gray-300">
      <li>• Customer is stable</li>
      <li>• Maintain engagement</li>
      <li>• Upsell premium services</li>
    </ul>
  )}
</div>

        </div>
      )}

    </div>

    {/* BOTTOM ROW */}
    {result && (
      <div className="grid md:grid-cols-3 gap-10 mt-12">

        <RiskGauge probability={result.probability} />

        <FeatureChart />

        <ChurnChart probability={result.probability} />

      </div>
    )}

  </div>
)
}