// public/js/auth.js - VERSION SIMPLIFIÉE POUR DÉPANNAGE

// --- INSCRIPTION ---
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const messageBox = document.getElementById("messageBox");

    messageBox.textContent = "";
    messageBox.className = "message-box";

    // Validation basique
    if (!username || !password || !role) {
      messageBox.textContent = "⚠️ Tous les champs sont requis";
      messageBox.classList.add("error");
      return;
    }

    try {
      // Essayer l'API
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        // Succès
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        messageBox.textContent = "✅ Compte créé avec succès ! Redirection...";
        messageBox.classList.add("success");
        
        setTimeout(() => {
          window.location.href = data.user.role === "medecin"
            ? "medecin_dashboard.html"
            : "pharmacien_dashboard.html";
        }, 1000);
      } else {
        messageBox.textContent = "❌ " + (data.error || "Erreur lors de la création");
        messageBox.classList.add("error");
      }

    } catch (err) {
      console.error("Erreur:", err);
      messageBox.textContent = "❌ Erreur de connexion au serveur";
      messageBox.classList.add("error");
    }
  });
}

// --- CONNEXION ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const messageBox = document.getElementById("messageBox");

    messageBox.textContent = "";
    messageBox.className = "message-box";

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        messageBox.textContent = "✅ Connexion réussie — redirection...";
        messageBox.classList.add("success");

        setTimeout(() => {
          window.location.href = data.user.role === "medecin"
            ? "medecin_dashboard.html"
            : "pharmacien_dashboard.html";
        }, 700);
      } else {
        messageBox.textContent = "❌ " + (data.error || "Erreur de connexion");
        messageBox.classList.add("error");
      }

    } catch (err) {
      console.error("Erreur:", err);
      messageBox.textContent = "❌ Erreur de connexion au serveur";
      messageBox.classList.add("error");
    }
  });
}