const { JSDOM } = require('jsdom');

describe('Formulaire d\'inscription', () => {
  let document;
  let window;

  beforeEach(() => {
    // 1. Création d'un faux DOM avec jsdom
    const dom = new JSDOM(`
      <form id="signupForm">
        <input type="text" name="nom" />
        <input type="text" name="prenom" />
        <input type="email" name="email" />
        <button type="submit">S'inscrire</button>
      </form>
    `, { runScripts: "dangerously" });

    window = dom.window;
    document = window.document;

    // 2. Simuler fetch et alert
    global.fetch = jest.fn();
    global.alert = jest.fn();

    // 3. Ajouter le gestionnaire de soumission (ce que ferait normalement ton JS)
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
      e.preventDefault(); // Empêche le rechargement

      const nom = document.querySelector('input[name="nom"]').value;
      const prenom = document.querySelector('input[name="prenom"]').value;
      const email = document.querySelector('input[name="email"]').value;

      try {
        const res = await fetch('http://localhost:5000/api/utilisateurs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nom, prenom, email })
        });

        const data = await res.json();
        alert(data.message);
      } catch (error) {
        alert('Erreur lors de l\'inscription');
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Réinitialise fetch et alert
  });

  test('doit appeler fetch avec les bonnes données', async () => {
    // 4. Préparer fetch à répondre avec succès
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Inscription réussie' })
    });

    // 5. Remplir les champs
    document.querySelector('input[name="nom"]').value = 'Doe';
    document.querySelector('input[name="prenom"]').value = 'John';
    document.querySelector('input[name="email"]').value = 'john@example.com';

    // 6. Soumettre le formulaire
    const form = document.getElementById('signupForm');
    const event = new window.Event('submit');
    await form.dispatchEvent(event);

    // 7. Vérifications
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:5000/api/utilisateurs',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: 'Doe',
          prenom: 'John',
          email: 'john@example.com'
        })
      })
    );

    expect(global.alert).toHaveBeenCalledWith('Inscription réussie');
  });
});
