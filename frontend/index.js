
document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const formData = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };
  
    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    const data = await res.json();
    alert(data.message);
  });
  