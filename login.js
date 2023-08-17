const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("login-message");

const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};

//getItem is to access data from local storage
// getElementById is used to select data in HTML file

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const loginEmail = document.getElementById("email").value;
  const loginPassword = document.getElementById("password").value;
  const userPresentEmail = { email: loginEmail };
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(
    (user) =>
      user.email === loginEmail && user.password === hashPassword(loginPassword)
  );

  if (matchedUser) {
    localStorage.setItem("UserPresent", JSON.stringify(userPresentEmail));
    console.log("REACHED HERE");
    window.location.href = "home.html";
  } else {
    alert("Invalid username or password. Please try again.");
  }
});

const signupbutton = document.getElementById("SignUp");
signupbutton.addEventListener("click", () => {
window.location.href = "index.html";
});

function hashPassword(password) 
{
  const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  return hashedPassword;
} //CryptoJS.SHA256(password) This will return  HexDec form so then we convert it into string
