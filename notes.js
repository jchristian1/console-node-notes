const fs = require('fs');

var fetchNotes = () => {

  try{
    var notesString = fs.readFileSync('notes-data.json');
    return notes = JSON.parse(notesString);
  }catch(e){
    return [];
  }
};
var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title,body) =>{
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }else{
    console.log("Sorry!! title already exists.")
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  console.log('__');
  console.log('Title: ' + note.title);
  console.log('Body: ' +  note.body);
};

module.exports = {
  //addNote: addNote;
  addNote, //ASX
  //getAll : getAll;
  getAll, //ASX
  getNote,
  removeNote,
  logNote
};