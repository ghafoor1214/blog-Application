import {
  getDownloadURL,
  ref,
  storage,
  uploadBytesResumable,
  doc,
  setDoc,
  db,
  addDoc,
  collection,
  getDocs,
  deleteDoc
} from "./javascript/firebase.js";

window.addEventListener("load", async () => {
  const uid = localStorage.getItem("uid");

  try {
    const snapShots = await getDocs(collection(db, "blogs"));
    const tempArr = [];
    snapShots.forEach((doc) => {
      if (!doc.data().isPrivate || doc.data().uid === uid) {
        const obj = {
          ...doc.data(),
          id: doc.id,
        };
        tempArr.push(obj);
      }
    });
    console.log("tempArr", tempArr);

    renderBlogUI(tempArr);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
});

const title = document.getElementById("title");
const content = document.getElementById("content");
const image = document.getElementById("image");
const uid = localStorage.getItem("uid");
const parent = document.getElementById("parent");
const flexSwitchCheckChecked = document.getElementById("flexSwitchCheckChecked");

window.handleSubmit = async () => {
  try {
    console.log("Title ", title.value);
    console.log("Image", image.files[0]);

    if (!image.files[0]) {
      alert("Please select an image.");
      return;
    }

    const imageUrl = await uploadImage(image.files[0]);
    const blogObj = {
      title: title.value,
      content: content.value,
      imageUrl: imageUrl,
      uid: uid,
      isPrivate: flexSwitchCheckChecked.checked,
    };

    await addDoc(collection(db, "blogs"), blogObj);
    const myModalEl = document.getElementById("createBlog");
    const modal = bootstrap.Modal.getInstance(myModalEl);
    if (modal) {
      modal.hide();
    }

    alert("Blog Successfully Created.");
  } catch (error) {
    console.error("Error creating blog:", error);
    alert("An error occurred while creating the blog.");
  }
};

const renderBlogUI = (tempArr) => {
  parent.innerHTML = ''; 
  tempArr.forEach((value) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col-lg-6', 'col-md-12', 'col-sm-12', 'my-2');
    
    cardDiv.innerHTML = `
      <div class="card">
        <h5 class="card-header">
          <img src="${value.imageUrl}" width="100%" height="300px" alt="Blog Image"/>
        </h5>
        <div class="card-body">
          <h5 class="card-title">${value.title}</h5>
          <p class="card-text">${value.content}</p>
            <button class="btn btn-success mt-2" onclick="editBlog('${value.id}')">Edit</button>
          <button class="btn btn-danger mt-2" onclick="deleteBlog('${value.id}')">Delete</button>
        </div>
      </div>
    `;
    
    parent.appendChild(cardDiv);
  });
};

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const metadata = {
      contentType: file.type,
    };

    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};


window.deleteBlog = async (id) => {
  try {
    
    const blogRef = doc(db, "blogs", id);
    
    
    await deleteDoc(blogRef);

   
    alert("Blog Successfully Deleted.");


    const snapShots = await getDocs(collection(db, "blogs"));
    const tempArr = [];
    snapShots.forEach((doc) => {
      if (!doc.data().isPrivate || doc.data().uid === localStorage.getItem("uid")) {
        const obj = {
          ...doc.data(),
          id: doc.id,
        };
        tempArr.push(obj);
      }
    });
    renderBlogUI(tempArr);
  } catch (error) {
    console.error("Error deleting blog:", error);
    alert("An error occurred while deleting the blog.");
  }
};

const logoutBtn = () => {
  localStorage.removeItem("user");
  localStorage.clear();
  window.location.replace("../pages/login.html");
};

window.logoutBtn = logoutBtn


