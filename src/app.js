

// Créer un utilisateur (POST /users)
export const POST = async (req, res) => { 
    const { name, email } = await req.json();
    const user = { id: 1, name, email };
    return res.status(201).json(user);

}