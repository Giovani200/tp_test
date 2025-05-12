document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = {
    prenom: form.prenom.value,
    nom: form.nom.value,
    email: form.email.value,
  };

  try {
    const res = await fetch("http://localhost:5000/api/utilisateurs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);
  } catch (error) {
    console.error("Error:", error);
    alert("Une erreur est survenue lors de l'envoi des données");
  }
});
