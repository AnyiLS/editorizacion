const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let formControlRegister = {};

document.getElementById("user").addEventListener("change", (e) => {
  formControlRegister.name = e.target.value;
});

document.getElementById("mail").addEventListener("change", (e) => {
  formControlRegister.mail = e.target.value;
});

document.getElementById("document").addEventListener("change", (e) => {
  formControlRegister.document = e.target.value;
});

document.getElementById("success").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("data", formControlRegister);
  if (
    formControlRegister.name &&
    formControlRegister.mail &&
    formControlRegister.document
  ) {
    if (
      formControlRegister.name !== "" &&
      formControlRegister.mail !== "" &&
      formControlRegister.document !== ""
    ) {
      if (emailRegex.test(formControlRegister.mail)) {
        let formData = new FormData();
        formData.append("name", formControlRegister.name);
        formData.append("email", formControlRegister.mail);
        formData.append("document", formControlRegister.document);

        // Realizar una solicitud GET a la API
        fetch("http://127.0.0.1:8000/api/auth/register", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            formControlRegister = {};
            document.getElementById("user").value = "";
            document.getElementById("mail").value = "";
            document.getElementById("document").value = "";
            alert("Su registro fue exitoso.");
          })
          .catch((error) => {
            console.error("Error al conectar con la API:", error);
          });
      }
    }
  }
});

//login
let formControlLogin = {};

document.getElementById("documentLogin").addEventListener("change", (e) => {
  formControlLogin.document = e.target.value;
});

document.getElementById("successLogin").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("data", formControlLogin);
  if (formControlLogin.document) {
    if (formControlLogin.document !== "") {
      let formData = new FormData();
      formData.append("document", formControlLogin.document);

      // Realizar una solicitud GET a la API
      fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          formControlLogin = {};
          document.getElementById("documentLogin").value = "";
          alert("Bienvenido.");
          localStorage.setItem("token", JSON.stringify(data));
          window.location.href = "./index.html";
        })
        .catch((error) => {
          console.error("Error al conectar con la API:", error);
        });
    }
  }
});
