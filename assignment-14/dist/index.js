class User {
    id;
    name;
    email;
    password;
    phone;
    age;
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        this.validateAge(age);
    }
    validateAge(age) {
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getPhone() {
        return this.phone;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    getAge() {
        return this.age;
    }
    setAge(age) {
        this.validateAge(age);
        this.age = age;
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    removeNotebook(notebookId) {
        this.notebooks = this.notebooks.filter((nb) => nb.getId() !== notebookId);
    }
    getNotebooks() {
        return this.notebooks;
    }
    displayInfo() {
        console.log(`user [${this.id}]: ${this.name}, with email:[${this.email}], his age=[${this.age}], his phone number=[${this.phone}]`);
    }
}
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes(notebook, action, titleOrId, content) {
        switch (action) {
            case "add":
                if (typeof titleOrId === "string" && content) {
                    notebook.addNote(titleOrId, content, this);
                    console.log(`Admin ${this.getName()} added note "${titleOrId}"`);
                }
                else {
                    console.log("Provide a title and content to add a note.");
                }
                break;
            case "remove":
                if (typeof titleOrId === "number" && notebook.removeNote(titleOrId)) {
                    console.log(`Admin ${this.getName()} removed note #${titleOrId}`);
                }
                else {
                    console.log("Note not found.");
                }
                break;
            case "view":
                notebook.displayNotes();
                break;
        }
    }
    displayInfo() {
        super.displayInfo();
        console.log("Role: Admin");
    }
}
class Note {
    id;
    title;
    content;
    author;
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getContent() {
        return this.content;
    }
    getAuthor() {
        return this.author;
    }
    getUserId() {
        return this.author.getId();
    }
    preview(length = 20) {
        return this.content.length > length
            ? this.content.substring(0, length) + "..."
            : this.content;
    }
}
class NoteBook {
    id;
    name;
    notes = [];
    nextNoteId = 1;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    addNote(title, content, author) {
        const note = new Note(this.nextNoteId++, title, content, author);
        this.notes.push(note);
        return note;
    }
    removeNote(noteId) {
        const before = this.notes.length;
        this.notes = this.notes.filter((n) => n.getId() !== noteId);
        return this.notes.length < before;
    }
    getNotes() {
        return [...this.notes];
    }
    displayNotes() {
        console.log(`NoteBook "${this.name}" (${this.notes.length} notes):`);
        this.notes.forEach((n) => console.log(`  #${n.getId()} ${n.getTitle()} - ${n.preview()} (by ${n.getAuthor().getName()})`));
    }
}
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index === -1)
            return false;
        this.items.splice(index, 1);
        return true;
    }
    getAllItems() {
        return [...this.items];
    }
}
export {};
// const user = new User(2, "ahmed", "a@g.com", "123456789", "0102122", 50);
// user.displayInfo();
// const note = new Note(
//   2,
//   "lll",
//   "kojkjjhlllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllj",
//   user,
// );
// console.log(note.getAuthor());
