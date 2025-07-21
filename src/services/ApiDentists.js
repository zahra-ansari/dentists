export async function getDentistsList(search) {
  try {
    if (search) {
      const response = await fetch(
        `https://reservationdentist.pythonanywhere.com/auth/list_doctor/?search=${search}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) return null;

      const data = await response.json();

      return data;
    } else {
      const response = await fetch(
        "https://reservationdentist.pythonanywhere.com/auth/list_doctor/",
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function setAppointmentsApi({
  miladiDate,
  formattedStartTime,
  formattedEndTime,
}) {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      return null;
    }

    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/app/doctor/available-times/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          date: { day: miladiDate },
          start_time: formattedStartTime,
          end_time: formattedEndTime,
        }),
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getDoctorAppointmentsApi() {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) return null;

    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/app/doctor/available-times/",
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

export async function sendDentistInfoApi(formData) {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) return null;

    const responseDentistRoleAndId = await fetch(
      `https://reservationdentist.pythonanywhere.com/auth/me/role-id/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!responseDentistRoleAndId.ok) return null;

    const dentistRoleAndId = await responseDentistRoleAndId.json(); //34

    const responseDentist = await fetch(
      `https://reservationdentist.pythonanywhere.com/auth/profile_doctor/update/${dentistRoleAndId.related_id}/`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      }
    );

    if (!responseDentist.ok) return null;

    const dataDentist = await responseDentist.json();

    return dataDentist;
  } catch (error) {
    console.log(error);
  }
}

export async function getDentistTimeApi(dentistId) {
  try {
    const response = await fetch(
      `https://reservationdentist.pythonanywhere.com/app/available-times/?doctor=${dentistId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

export async function editDentistAppointmentApi({
  editMiladiDate,
  formattedEditStartTime,
  formattedEditEndTime,
  getId,
}) {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) return null;

    const formData = new FormData();

    formData.append("date", editMiladiDate);
    formData.append("start_time", formattedEditStartTime);
    formData.append("end_time", formattedEditEndTime);

    const response = await fetch(
      `https://reservationdentist.pythonanywhere.com/app/doctor/available-times/update/${getId}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteDentistAppointmentApi(id) {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) return null;

    const response = await fetch(
      `https://reservationdentist.pythonanywhere.com/app/doctor/available-times/update/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) return null;

    return true;
  } catch (error) {
    console.log(error);
  }
}
