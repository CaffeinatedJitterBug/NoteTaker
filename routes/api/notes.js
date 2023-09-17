const db = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const app = require('express').Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../../helpers/fsUtils');

app.get('/', (req, res) => {
  readFromFile(path.join(__dirname, '../../db/db.json')).then((data) => {
    res.json(JSON.parse(data))
  })
})

app.get('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile(path.join(__dirname, '../../db/db.json'))
    .then((data) => JSON.parse(data))
    .then((json) => {
      const foundNote = json.filter((note) => note.id === noteId)
      return foundNote.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    })
}),

app.post('/', (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    // const receivedNotes = db;
    // receivedNotes.push(newNote);
    // console.log(receivedNotes);
    // fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(receivedNotes));
    readAndAppend(newNote, path.join(__dirname, '../../db/db.json'));
    res.json('Note added successfully');
  } else {
    res.error('Error in adding note');
  }
});

app.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile(path.join(__dirname, '../../db/db.json'))
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);
      console.log(result);
      writeToFile(path.join(__dirname, '../../db/db.json'), result);
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

module.exports = app;