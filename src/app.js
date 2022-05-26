const express = require("express");
const app = express();
app.use(express.json())

// TODO: Follow instructions in the checkpoint to implement ths API.

const pastes = require("./data/pastes-data")

// .use does not care about the verb, will take in any request at that route (post, delete, get, etc.)
// express will make a new key:value pair with the key being whatever's after the colon, and the
// value of whatever is in req.params.
//
app.get("/pastes/:pasteId", (req, res, next)=>{
  const { pasteId } = req.params
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId))

  if (foundPaste){
    res.json({ data: foundPaste})
  }else{
    next(`Paste id not found: ${pasteId}`)
  }
})

//if somebody makes a get request to / pastes, send them a response as a json using res.json(whatever)
// sometimes you can use res.send to send strings.
// .get specifies the verb. 
app.get("/pastes", (req, res)=>{
  res.json({data: pastes})
})

let lastPasteId = pastes.reduce((maxId, paste)=> Math.max(maxId, paste.id), 0)
app.post("/pastes", (req, res, next) => {
  const { data: { name, syntax, exposure, expiration, text } = {} } = req.body;
 if (text) {
    const newPaste = {
      id: ++lastPasteId, // Increment last ID, then assign as the current ID
      name,
      syntax,
      exposure,
      expiration,
      text,
    };
    pastes.push(newPaste);
    res.status(201).json({ data: newPaste });
  } else {
    res.sendStatus(400);
  }
});

// if we call next with a string, we skip all other middleware and go to the error handler
// error parameter is the string of the error message


// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;



//////////////////////////////////////////////////////////////// Qualified assessment RESTful APIs 31.4
// const express = require("express");
// const app = express();
// app.use(express.json())


// const notes = require("./data/notes-data");

// app.get("/notes/:noteId", (req, res, next) => {
//   const noteId = Number(req.params.noteId);
//   const foundNote = notes.find((note) => note.id === noteId);
//   if (foundNote){
//       res.json({ data: foundNote });
//   }else{
//     res.status(404)
//     next(`Note id not found: ${noteId}`)
//   }

// });

// app.get("/notes", (req, res) => {
//   res.json({ data: notes });
// });

// // TODO: Add ability to create a new note
// let lastNotesId = notes.reduce((maxId, note)=> Math.max(maxId, note.id), 0)
// console.log(lastNotesId)
// app.post("/notes", (req, res, next)=>{
//   console.log("body", req.body)
//   const {data : {text} = {} } = req.body
//     const newNote = {
//       id: ++lastNotesId,
//       text
//   }
//   notes.push(newNote)
//   res.status(201).json({data: newNote})

// })

// // TODO: Add not-found handler
// app.use((req, res, next)=>{
//   res.status(404)
//   next(`Not found: ${req.originalUrl}`)
// })

// // TODO: Add error handler
// app.use((err, req, res, next)=>{
//   console.error(err)
//   res.send(err)
// })

// module.exports = app;
