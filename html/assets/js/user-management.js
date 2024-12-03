async function deleteUser(id) {
  try {
    let res = await fetch(`/users/${id}`, {
      method: "DELETE",
    });

    if (res.status == 200) {
      location.reload();
    } else {
      let resText = await res.text();
      throw new Error(resText);
    }
  } catch (error) {
    let toast = new bootstrap.Toast(document.querySelector(".toast"), {});
    let toastBody = document.querySelector(".toast, .toast-body");
    toastBody.innerText = "Can't delete user!";
    toastBody.style.color = "red";
  }
}

function showEditUserModal(btn) {
  document.querySelector("#idEdit").value = btn.dataset.id;

  document.querySelector("#usernameEdit").value = btn.dataset.username;
  console.log(btn.dataset.username);
  document.querySelector("#firstNameEdit").value = btn.dataset.firstName;
  document.querySelector("#lastNameEdit").value = btn.dataset.lastName;
  document.querySelector("#mobileEdit").value = btn.dataset.mobile;
  document.querySelector("#isAdminEdit").checked = btn.dataset.isAdmin == "true" ? true : false;
}

async function editUser(e) {
  e.preventDefault();
  try {
    const formData = new FormData(document.querySelector("#editUserForm"));
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    }); 
    if (res.status == 200) {
      return location. reload();
    }
    const resText = await res.text();
    throw new Error(resText);
  } catch (error) {
    document.querySelector("#errorMessageEdit"). innerText = error.message;
    console. log(error);
  }
}

document
  .querySelector("#editUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstNameEdit").focus();
  });

document
  .querySelector("#addUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstName").focus();
  });

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  const id = btnConfirm.dataset.id;
  btnConfirm.addEventListener("click", (e) => {
    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        console.log("Confirm");
        deleteUser(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Do you really want to delete this user?", options);
  });
});

async function deleteUser(id) {
  try {
    const res = await fetch(`/users/${id}`, {
      method: "DELETE",
    });
    if (res.status == 200) {
      return location.reload();
    }
    const resText = await res.text();
    throw new Error(resText);
  } catch (error) {
    console.log(error); 
    const toast = new bootstrap.Toast(document.querySelector(".toast"), {});
    document.querySelector(".toast-body").innerText = error.message;
    toast.show();
  }
}