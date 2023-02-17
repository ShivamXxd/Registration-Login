const regBtn = document.querySelector(".registration-btn");
const loginBtn = document.querySelector(".login-btn");
const regForm = document.querySelector(".reg-form");

function setError(value) {
  alert(value);
}

function validateEmail(email) {
  if (email.trim() === "") {
    setError("Please fill the email input.");
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function validatePassword(pass) {
  if (pass.length < 8) {
    setError("Password is too short, min 8 characters is required!");
  } else if (pass.search(/[a-z]/) < 0) {
    setError("Password must contain at least one lowercase letter!");
  } else if (pass.search(/[A-Z]/) < 0) {
    setError("Error: Password must contain at least one uppercase letter!");
  } else if (pass.search(/[0-9]/) < 0) {
    setError("Error: Password must contain at least one number!");
  } else {
    if (
      confirmPasswordMatches(
        pass,
        document.querySelector(".confirmPasswordInput").value
      )
    ) {
      return true;
    }
  }
  return false;
}

function confirmPasswordMatches(pass1, pass2) {
  if (pass1 !== pass2) {
    setError("Passwords do not match!");
    return false;
  }
  return true;
}

let userData = JSON.parse(localStorage.getItem("userData")) || [];

if (regForm) {
  regForm.addEventListener("submit", (event) => {
    if (
      !(
        validateEmail(document.querySelector(".emailInput1").value) &&
        validatePassword(document.querySelector(".passwordInput").value)
      )
    ) {
      event.preventDefault();
      return;
    }

    userData.push({
      firstName: document.querySelector(".fname").value,
      lastName: document.querySelector(".lname").value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      email: document.querySelector(".emailInput1").value,
      password: document.querySelector(".passwordInput").value,
    });
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Successful Account Creation!");
  });
}

function validateLogin(email, pass) {
  for (let i = 0; i < userData.length; i++) {
    if (email === userData[i].email) {
      if (pass === userData[i].password) {
        return true;
      } else {
        setError("Incorrect Password!");
      }
    } else {
      setError("Email not found, Please register first!");
    }
  }
}

if (loginBtn) {
  loginBtn.addEventListener("click", (event) => {
    if (
      validateLogin(
        document.querySelector(".emailInput2").value,
        document.querySelector(".passwordInput2").value
      )
    ) {
      window.location.href = "./home.html";
    } else {
      event.preventDefault();
    }
  });
}
