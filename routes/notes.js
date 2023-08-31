const notes = require('express').Router();


app.get('/api/notes', (req, res) =>
  res.json(storedNotes)
);

app.post('/api/notes', (req, res) => {
  if (req.noteTitle && req.noteBody) {
    res.status(200).json(storedNotes)
  } else {
    res.status(400).json('Missing note title and/or note body')
  }
});