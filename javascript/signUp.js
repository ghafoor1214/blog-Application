window.addEventListener("load", () => {
    if (localStorage.getItem("user")) {
      window.location.replace("../index.html");
    }
  });

  import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
  } from "./firebase.js";

  const signUpHandler = async () => {
    try {
      const userEmailInput = document.querySelector("#email");
      const userPasswordInput = document.querySelector("#password");
      const fullNameInput = document.querySelector("#fullName");
      const genderInput = document.querySelector("#gender");

      const email = userEmailInput.value.trim();
      const password = userPasswordInput.value.trim();
      const fullName = fullNameInput.value.trim();
      const gender = genderInput.value.trim();

      if (!email || !password || !fullName || !gender){
        alert("Please Fill in All Fields")
        return;
      }

      
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const uid = response.user.uid;

      const userObj = {
        fullName,
        gender,
        email,
      };
  
      await setDoc(doc(db, "users", uid), userObj);
      alert("Signup Successfully");
      window.location.href = "../pages/login.html";
      // console.log("userResponse", userResponse);
    } catch (error) {
      console.log("error", error.message);
      alert(error.message);
    }
  };
  
  window.signUpHandler = signUpHandler;
  