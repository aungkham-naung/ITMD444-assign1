import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const fetchDoctorsWithSpecializations = async () => {
  const { data, error } = await supabase
    .from("DoctorSpecialization")
    .select("DoctorID, Specialization, Doctor(DoctorName)");

  if (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
  return data;
};

export const fetchPrescriptionHistory = async (patientID) => {
  const { data, error } = await supabase
    .from("Prescription")
    .select(
      `
      PrescriptionDate, PrescriptionEndDate,
      Medication(MedicationName, Dosage),
      Diagnosis(Patient(PatientName))
    `
    )
    .match("Diagnosis.PatientID", patientID);

  if (error) {
    console.error("Error fetching prescriptions:", error);
    return [];
  }
  return data;
};

export default supabase;
