/*const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://<username>:<SoftwareEngineering123>@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the user schema and model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reason: { type: String, required: true },
  referral: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Route: Registration
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, reason, referral } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password || password !== confirmPassword) {
    return res.status(400).json({ message: 'Invalid input or passwords do not match.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, reason, referral });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
*/

// Registrierung
async function register(event) {
  event.preventDefault(); // Verhindert das Standard-Formularverhalten
  console.log("Register-Funktion aufgerufen."); // Debugging

  const data = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('regEmail').value,
      password: document.getElementById('regPassword').value,
      confirmPassword: document.getElementById('confirmPassword').value,
      reason: document.getElementById('reason').value,
      referral: document.getElementById('referral').value
  };
  // Überprüfen, ob das Passwort übereinstimmt
  if (data.password !== data.confirmPassword) {
      alert("Passwörter stimmen nicht überein.");
      return;
  }

  try {
      // POST-Anfrage an das Backend senden
      const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST', // HTTP-Methode für die Anfrage
          headers: {
              'Content-Type': 'application/json' // Datenformat als JSON festlegen
          },
          body: JSON.stringify(data) // Daten in JSON-Format umwandeln und senden
      });

      // Überprüfung der Antwort vom Server
      if (response.ok) {
          alert("Sie haben sich erfolgreich registriert! Sie werden zur Startseite weitergeleitet.");
          window.location.href = "index.html"; // Zur Landing Page weiterleiten
          console.log("Registrierung erfolgreich."); // Debugging
       // Popup bei erfolgreicher Registrierung anzeigen
       showSuccessPopup();
      } else {
          const errorMessage = await response.text();
          console.error("Fehler bei der Registrierung:", errorMessage); // Debugging
          alert('Registrierung fehlgeschlagen: ' + errorMessage);
      }
    }
  }