import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from "recharts";

export default function RiskGauge({ probability }) {

  const value = probability * 100;

  const data = [
    {
      name: "Risk",
      value: value,
      fill:
        value > 70 ? "#ef4444" :
        value > 40 ? "#facc15" :
        "#22c55e"
    }
  ];

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col items-center">

      <h2 className="text-lg font-semibold mb-4 text-blue-400">
        Churn Risk Meter
      </h2>

      <div className="relative">

        <RadialBarChart
          width={250}
          height={150}
          cx="50%"
          cy="100%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={18}
          data={data}
          startAngle={180}
          endAngle={0}
        >

          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={false}
          />

          <RadialBar
            dataKey="value"
            cornerRadius={10}
            background={{ fill: "#374151" }}
          />

        </RadialBarChart>

        {/* percentage in center */}
        <div className="absolute inset-0 flex items-center justify-center mt-6">
          <span className="text-2xl font-bold text-white">
            {value.toFixed(1)}%
          </span>
        </div>

      </div>

    </div>
  );
}