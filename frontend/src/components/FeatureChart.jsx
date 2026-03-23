import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function FeatureChart() {

  const data = [
    { feature: "Tenure", value: 35 },
    { feature: "MonthlyCharges", value: 55 },
    { feature: "TotalCharges", value: 40 }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">

      <h2 className="text-lg font-semibold mb-4">
        Feature Importance
      </h2>

      <div className="w-full h-[250px]">

        <ResponsiveContainer width="100%" height="100%">
  <BarChart data={data} barCategoryGap="40%">

    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

    <XAxis dataKey="feature" />

    <YAxis />

    <Tooltip />

    <Bar
      dataKey="value"
      fill="#0f172a"
      radius={[6,6,0,0]}
    />

  </BarChart>
</ResponsiveContainer>

      </div>

    </div>
  );
}