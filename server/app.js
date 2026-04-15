const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running");
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on address http://localhost:${PORT}`);
});