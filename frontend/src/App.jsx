import PredictionForm from "./components/PredictionForm"

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Navbar */}
      <nav className="bg-slate-800 py-4 shadow-lg border-b border-slate-700">
        <h1 className="text-center text-2xl font-semibold">
          Customer Churn Prediction Dashboard
        </h1>
      </nav>

      {/* Page container */}
      <div className="w-full px-10 py-10">
        <PredictionForm />
      </div>

    </div>
  )
}

export default App