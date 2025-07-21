export async function patientRegisterApi({
  full_name,
  email,
  phone_number,
  password,
}) {
  try {
    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/auth/register_patient/", // /auth/register_patient/ is an endpoint
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name, email, phone_number, password }),
      }
    );

    if (!response.ok) {
      console.log("مشکلی در ثبت نام وجود دارد");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function dentistRegisterApi({
  full_name,
  email,
  phone_number,
  password,
  Medical_system_code,
  specialty,
  captcha_response,
  experience_years,
}) {
  try {
    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/auth/register_doctor/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name,
          email,
          phone_number,
          password,
          Medical_system_code,
          specialty,
          captcha_response,
          experience_years,
        }),
      }
    );

    if (!response.ok) {
      console.log("مشکلی در ثبت نام وجود دارد");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function userLogin({ phone_number, password }) {
  try {
    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/api/token/", // /api/token/ is an endpoint
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number, password }),
      }
    );
    if (!response.ok) {
      console.log("مشکلی در وارد شدن وجود دارد");
    }
    const data = await response.json();
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function verifyCodeApi({
  otpCode: code,
  phoneNumber: phone_number,
}) {
  try {
    const response = await fetch(
      "https://reservationdentist.pythonanywhere.com/auth/verify_patient/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, phone_number }),
      }
    );

    if (!response.ok) {
      console.log("مشکلی در ارسال کد وجود دارد");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function userLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export async function getPatientInfo() {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      return null;
    }

    const responsePatient = await fetch(
      "https://reservationdentist.pythonanywhere.com/auth/profile_patient/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!responsePatient.ok) {
      return null;
    }

    const dataPatient = await responsePatient.json();

    return dataPatient;
  } catch (error) {
    console.log(error);
  }
}

export async function getDentistInfo() {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      return null;
    }

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

    if (!responseDentistRoleAndId.ok) {
      return null;
    }

    const dentistRoleAndId = await responseDentistRoleAndId.json();

    const responseDentist = await fetch(
      `https://reservationdentist.pythonanywhere.com/auth/profile_doctor/${dentistRoleAndId.related_id}/`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );

    if (!responseDentist.ok) {
      return null;
    }

    const dataDentist = await responseDentist.json();

    return dataDentist;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserRole() {
  try {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
      return null;
    }

    const responseRoleAndId = await fetch(
      "https://reservationdentist.pythonanywhere.com/auth/me/role-id/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const roleAndId = await responseRoleAndId.json();
    return roleAndId.role;
  } catch (error) {
    console.log(error);
  }
}
