import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ChurnChart({ probability }) {

  const data = [
    {
      name: "Churn Risk",
      value: probability * 100
    },
    {
      name: "Retention",
      value: 100 - probability * 100
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">

      <h2 className="text-lg font-semibold mb-4">
        Risk Analysis
      </h2>

      <div className="w-full h-[250px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data} barCategoryGap="40%">

            <XAxis dataKey="name" />

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