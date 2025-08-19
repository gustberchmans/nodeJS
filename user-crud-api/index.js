const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');
const searchRouter = require('./routes/search');
const path = require('path');
const allergenRoutes = require('./routes/allergenRoutes');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api/users/search', searchRouter);
app.use('/api/users', userRoutes);
app.use('/api/allergens', allergenRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// route voor root pagina
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

