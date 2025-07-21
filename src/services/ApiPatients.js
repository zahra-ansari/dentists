export async function getPatientAppointmentsApi() {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) return null;

    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/app/patient/appointments/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function sendPatientInfoApi(formData) {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) return null;

    const responsePatient = await fetch(
      `https://reservationdentist.pythonanywhere.com/auth/profile_patient/update/`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      }
    );

    if (!responsePatient.ok) return null;

    const dataPatient = await responsePatient.json();

    return dataPatient;
  } catch (error) {
    console.log(error);
  }
}

export async function submitPatientAppointmentApi({
  dentistId,
  selectedStartTime,
  selectedDate,
}) {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) throw new Error("لطفا وارد شوید");

    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/app/patient/appointments/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          doctor: dentistId,
          date: { day: selectedDate },
          time: selectedStartTime,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        Array.isArray(data?.non_field_errors) &&
        data.non_field_errors.length > 0
          ? data.non_field_errors.join(" ")
          : data?.detail || "خطایی در ثبت نوبت رخ داد";

      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
