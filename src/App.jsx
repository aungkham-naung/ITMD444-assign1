import { useState } from "react";
import {
  fetchDoctorsWithSpecializations,
  fetchPrescriptionHistory
} from "./services/supabaseService";

function App() {
  const [query, setQuery] = useState(null);

  const handleFetchDoctors = async () => {
    const data = await fetchDoctorsWithSpecializations();
    setQuery(data);
  };

  const handleFetchPrescriptions = async () => {
    const patientID = 1;
    const data = await fetchPrescriptionHistory(patientID);
    setQuery(data);
  };

  return (
    <div className="container">
      <h1>Hospital Database Queries</h1>

      <button onClick={handleFetchDoctors}>Doctors & Specializations</button>
      <button onClick={handleFetchPrescriptions}>Prescription History</button>

      {query && <pre>{JSON.stringify(query, null, 2)}</pre>}
    </div>
  );
}

export default App;
