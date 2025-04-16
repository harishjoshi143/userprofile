document.addEventListener("DOMContentLoaded", () => {
  const newPassword = document.getElementById("new-password");
  const confirmPassword = document.getElementById("confirm-password");
  const strengthIndicator = document.getElementById("password-strength");
  const matchError = document.getElementById("match-error");
  newPassword.addEventListener("input", () => {
    const value = newPassword.value;
    if (value.length < 6) strengthIndicator.textContent = "Weak";
    else if (value.length < 10) strengthIndicator.textContent = "Medium";
    else strengthIndicator.textContent = "Strong";
    checkMatch();
  });
  confirmPassword.addEventListener("input", checkMatch);
  function checkMatch() {
    if (newPassword.value !== confirmPassword.value) {
      matchError.textContent = "Passwords do not match";
    } else {
      matchError.textContent = "";
    }
  }

  const profileImage = document.getElementById("profile-image");
  const imagePreview = document.getElementById("image-preview");
  profileImage.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imagePreview.src = event.target.result;
        imagePreview.style.height = "300px";
        imagePreview.style.width = "300px";
        imagePreview.style.width = "300px";
        imagePreview.style.objectFit = "cover";
        imagePreview.style.objectPosition = "top";
      };
      reader.readAsDataURL(file);
    }
  });

  const deactivateBtn = document.querySelector(".deactivate-btn");
  const modal = document.getElementById("deactivate-modal");
  const confirmBtn = document.querySelector(".confirm-btn");
  const deactivateInput = document.getElementById("deactivate-input");
  const deactivateMessage = document.getElementById("deactivate-message");
  deactivateBtn.addEventListener("click", () => modal.showModal());
  deactivateInput.addEventListener("input", () => {
    confirmBtn.disabled = deactivateInput.value !== "deactivate";
  });
  confirmBtn.addEventListener("click", () => {
    deactivateMessage.textContent =
      "Account deactivation requested. Please contact support.";
    modal.close();
  });
  document
    .querySelector(".cancel-btn")
    .addEventListener("click", () => modal.close());
});
