window.addEventListener("load", () => {
    if (localStorage.getItem("user")) {
      window.location.replace("../index.html");
    }
  });

  import { 
    auth,
    signInWithEmailAndPassword 
} from "./firebase.js";

const loginHandler = async () => {
    try {
      const userEmail = document.querySelector("#email").value;
      const userPassword = document.querySelector("#password").value;
      const response = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      console.log("respoonse", response.user.uid);
      localStorage.setItem("user", response.user.uid);
      window.location.replace("../index.html");
    } catch (error) {
      console.log("error", error.message);
    }
  };
  
  window.loginHandler = loginHandler;