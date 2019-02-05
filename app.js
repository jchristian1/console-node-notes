
//USAGE FROM CONSOLE: node app.js (read or lis or add) --parameter1="string" --parameter2="string"
//USAGE FROM CONSOLE: node app.js add --title="string" --body="string"
//USAGE FROM CONSOLE: node app.js read --title="string"
//USAGE FROM CONSOLE: node app.js list --title="string"
//DEBUGGING FROM CONSOLE: node inspect app.js read --title="string"
//DEBUGGING FROM CONSOLE: nodemon inspect app.js read --title="string"
//DEBUGGING FROM CHROME: node --inspect-brk app.js read --title="string"
const fs = require('fs');//file system read

const notes = require('./notes');
const _ = require('lodash');// util library
const yargs = require('yargs');
const titleOptions = {
  describe: 'Title of note',
  demand:true,
  alias:'t',
};
const bodyOptions = {
  describe:'Body of note',
  demand:true,
  alias:'b'
};
const argv = yargs
  .command('add','Add a new note',{
    title:titleOptions,
    body: bodyOptions
  })
  .command('list','List all notes')
  .command('read','Read a note',{
    title:titleOptions
    })
  .command('remove','Remove a note',{
    title:titleOptions
    })
  .help()
  .argv;
var command = argv._[0];// take the Command using the yargs parsed chain

if(command=='add'){

  var note = notes.addNote(argv.title, argv.body);
  if(note){
    console.log('note created');
    notes.logNote(note);
  }else{
    console.log('Title already in use.');
  }
}else if (command == 'list'){
  var allNotes = notes.getAll();
  console.log(`printing ${allNotes.length} notes`);
  allNotes.forEach((note)=> notes.logNote(note));
}else if (command == 'read'){
  var note = notes.getNote(argv.title);
  if(note){
    console.log('Note found');
    notes.logNote(note);
  }else{
    console.log('Note not found');
  }
}else if (command == 'remove'){
  var notesRemoved = notes.removeNote(argv.title);
  var message = notesRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
}else{
  console.log('Command not recognized');
}
