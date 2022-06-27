const util = require("util");
const fs = require("fs");

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readAsync("data/db.json", "utf-8");
  }

  write(data) {
    return writeAsync("data/db.json", JSON.stringify(data));
  }

  readAllNotes() {
    return this.read().then((notes) => {
      let allNotes;
      try {
        allNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        allNotes = [];
      }

      return allNotes;
    });
  }
  
  writeNotes(note) {
    return this.readAllNotes()
      .then((notes) => [...notes, note])
      .then((updatedNotes) => this.write(updatedNotes));
  }
}

module.exports = new Notes();
