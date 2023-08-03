const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser'); // Importez body-parser
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const db = mongoose.connection;
const Schema = mongoose.Schema;

require('dotenv').config();

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db.on('error', (error) => {
    console.error('Erreur de connexion à MongoDB:', error);
});
db.once('open', () => {
    console.log('Connecté à MongoDB avec succès !');
});

app.use(bodyParser.json()); // Utilisez body-parser pour parser les données JSON dans les requêtes POST

// Définition du schéma et du modèle Mongoose
const mySchema = new Schema({
    title: String,
    resume: String,
    createdAt: Date,
    updatedAt: Date,
});

const Todolist = mongoose.model('MyModel', mySchema, 'todolists');

app.get("/api", (req, res) => {
    res.json({ message: "Hello TodoList!" });
});

// Route pour insérer des données
app.post('/insert', async (req, res) => {
    try {
        // Récupérez les données envoyées par le formulaire
        const { title, resume } = req.body;

        // Créez une nouvelle instance du modèle avec les données à insérer
        const newData = new Todolist({
            title: title,
            resume: resume,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Sauvegardez la nouvelle entité dans la base de données
        const savedData = await newData.save();

        res.json(savedData); // Vous pouvez renvoyer la nouvelle entité insérée en réponse si vous le souhaitez.
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'insertion des données dans la base de données' });
    }
});

app.get('/list', async (req, res) => {
    try {
        // Récupérer la liste des tâches depuis la base de données
        const todolists = await Todolist.find({});

        res.json(todolists); // Renvoyer la liste des tâches en réponse
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la liste de tâches' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});





