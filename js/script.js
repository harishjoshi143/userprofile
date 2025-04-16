document.addEventListener("DOMContentLoaded", () => {
  const prompt = document.getElementById("prompt");

  if (!prompt) {
    console.error(
      'Prompt element not found. Check index.html for <div id="prompt">'
    );
    return;
  }

  // Password Update
  const passwordForm = document.querySelector(".password-form");
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

  passwordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (newPassword.value.length < 6) {
      matchError.textContent = "Password must be at least 6 characters";
      return;
    }
    if (newPassword.value !== confirmPassword.value) {
      matchError.textContent = "Passwords do not match";
      return;
    }
    alert("Password updated successfully!"); // Replaced showPrompt with alert
    passwordForm.reset();
  });

  // Basic Details Update
  const detailsForm = document.querySelector(".details-form");
  const profileImage = document.getElementById("profile-image");
  const imagePreview = document.getElementById("image-preview");

  profileImage.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader,"reader")
      reader.onload = (event) => {
        imagePreview.src = event.target.result;
        imagePreview.style.height = "300px";
        imagePreview.style.width = "300px";
        imagePreview.style.objectFit = "cover";
        imagePreview.style.objectPosition = "top";
      };
      reader.readAsDataURL(file);
    }
  });

  detailsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!name || !email || !phone || !address) {
      showPrompt("Please fill all fields", "red");
      return;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
      showPrompt("Phone must be 10 digits", "red");
      return;
    }
    alert("Details updated successfully!");
    detailsForm.reset();
    imagePreview.style.display = "none";
  });

  // Deactivate Account
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
    deactivateMessage.style.color = "red";
    deactivateMessage.textContent =
      "Account deactivation updated";
    setTimeout(() => {
      modal.close();
      deactivateMessage.textContent = "";
    }, 3000);
  });
  document
    .querySelector(".cancel-btn")
    .addEventListener("click", () => modal.close());

  // Prompt Function
  function showPrompt(message, color = "#4CAF50") {
    prompt.textContent = message;
    prompt.style.backgroundColor = color;
    prompt.style.display = "block";
    setTimeout(() => {
      prompt.style.opacity = "0";
      setTimeout(() => {
        prompt.style.display = "none";
        prompt.style.opacity = "1"; // Reset for next use
      }, 500);
    }, 3000);
  }
});
