document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const messageBox = document.getElementById("messageBox");

  messageBox.textContent = "";
  messageBox.className = "message-box";

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      messageBox.textContent = data.error || "Erreur lors de la création du compte.";
      messageBox.classList.add("error");
      return;
    }

    messageBox.textContent = "Compte créé avec succès ! Redirection...";
    messageBox.classList.add("success");

    localStorage.setItem("currentUser", JSON.stringify(data.user));

    setTimeout(() => {
      if (data.user.role === "medecin") {
        window.location.href = "medecin_dashboard.html";
      } else {
        window.location.href = "pharmacien_dashboard.html";
      }
    }, 1000);

  } catch (err) {
    console.error(err);
    messageBox.textContent = "Erreur de connexion au serveur.";
    messageBox.classList.add("error");
  }
});
