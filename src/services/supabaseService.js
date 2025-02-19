import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const fetchDoctorsWithSpecializations = async () => {
  const { data, error } = await supabase
    .from("doctorspecialization")
    .select("doctorid, specialization, doctor(doctorname)");

  if (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
  return data;
};

export const fetchPrescriptionHistory = async (patientID) => {
  const { data, error } = await supabase
    .from("prescription")
    .select(
      `
      prescriptiondate, prescriptionenddate,
      medication(medicationname, dosage),
      diagnosis(patientid, patient(patientname))
    `
    )
    .eq("diagnosis.patientid", patientID);

  if (error) {
    console.error("Error fetching prescriptions:", error);
    return [];
  }
  return data;
};

export default supabase;
