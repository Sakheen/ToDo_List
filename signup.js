
const signupForm = document.getElementById("signupForm");
// const loginForm = document.getElementById("loginForm");
const signupMessage = document.getElementById("signup-message");

//getItem is to access data from local storage
// getElementById is used to select data in HTML file

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const signupUsername = document.getElementById("signup-username").value;
  const signupEmail = document.getElementById("email").value;
  const signupPassword = document.getElementById("signup-password").value;

  const hashedPassword = hashPassword(signupPassword);

  const myData = {
    name: signupUsername,
    email: signupEmail,
    password: hashedPassword, 
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.some((user) => user.email === signupEmail);

  if (userExists) 
  {
    alert("Username or email already exists. Please choose a different one.");
  } 
  else 
  {
    users.push(myData);
    localStorage.setItem("users", JSON.stringify(users));
    signupForm.submit();
  }
});


function hashPassword(password) 
{
  const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  return hashedPassword;
}
 //CryptoJS.SHA256(password) This will return  HexDec form so then we convert it into string
 // window .crypto (encryption decryption )
