const express = require('express');
const path = require('path');
const db = require('./data')
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res)=>{
    db.readAllNotes().then((data)=>{
        res.json(data)
    })
})

app.post('/api/notes', (req, res)=>{
    db.writeNotes(req.body).then(note=> res.json(note))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
