// utility function to get element by id
function get(element) {
  return document.getElementById(element);
}

// ***** Variables Start *****
var content = get("note-grid");

// Note Temp Data Object Array

var notesArray = [
  {
    noteTitle: "First Note",
    noteContent:
      "This is your first note, create more at the top right of the page",
  },
];

function displayNotes() {
  // loops through array and displays notes
  notesArray.map((note) => {
    // creates the elements
    var container = document.createElement("div");
    var newTitle = document.createElement("h2");
    var newTitleText = document.createTextNode(note.noteTitle);
    var newContent = document.createElement("p");
    var newContentText = document.createTextNode(note.noteContent);
    var deleteButton = document.createElement("div");
    var deleteIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    deleteIcon.setAttribute("class", "w-6 h-6");
    deleteIcon.setAttribute("viewBox", "0 0 24 24");
    deleteIcon.innerHTML = `
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  />`;
    //styles the elements

    // adds content to elements
    deleteButton.className = "deleteLogo";
    newTitle.appendChild(newTitleText);
    newContent.appendChild(newContentText);
    deleteButton.appendChild(deleteIcon);

    // adds elements to container div
    container.appendChild(newTitle);
    container.appendChild(newContent);
    container.appendChild(deleteButton);
    container.className = "note-container";
    content.appendChild(container);

    deleteButton.addEventListener("click", deleteNote);
  });
}

// ***** Application Functions *****

// Creating Note
function openModal() {
  var modal = get("modal-dialog");
  var backdrop = get("modal-backdrop");

  modal.classList.add("visible");
  backdrop.classList.add("visible");
}

function closeModal() {
  var title = get("create-title-text");
  var text = get("create-content-text");
  var modal = get("modal-dialog");
  var backdrop = get("modal-backdrop");

  title.value = "";
  text.value = "";

  modal.classList.remove("visible");
  backdrop.classList.remove("visible");
}

// saves content and displays it using the displayNotes function
function saveContent() {
  var title = get("create-title-text");
  var text = get("create-content-text");

  if (
    title.value == null ||
    title.value == "" ||
    text.value == null ||
    text.value == ""
  ) {
    closeModal();
    return;
  } else {
    content.innerHTML = "";
    notesArray.push({
      noteTitle: title.value,
      noteContent: text.value,
    });

    displayNotes();

    closeModal();
    console.log(notesArray);
  }
}

function deleteNote(event) {
  var container = event.target.closest(".note-container");
  var noteIndex = Array.from(content.children).indexOf(container);
  if (noteIndex === -1) return;
  notesArray.splice(noteIndex, 1);
  container.remove();
}

// ***** Event Handlers *****
window.addEventListener("load", function () {
  var createButton = get("add-note-button");
  var cancelButton = get("cancel-button");
  var saveButton = get("save-button");
  createButton.addEventListener("click", openModal);
  cancelButton.addEventListener("click", closeModal);
  saveButton.addEventListener("click", saveContent);
});

// Always display Notes
displayNotes();
