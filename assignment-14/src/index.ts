class User {
  private notebooks: NoteBook[] = [];
  constructor(
    private id: number,
    private name: string,
    private email: string,
    private password: string,
    private phone: string,
    private age: number,
  ) {
    this.validateAge(age);
  }
  private validateAge(age: number) {
    if (age < 18 || age > 60) {
      throw new Error("Age must be between 18 and 60");
    }
  }
  public getId(): number {
    return this.id;
  }
  public getName(): string {
    return this.name;
  }
  public setName(name: string): void {
    this.name = name;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public getPhone(): string {
    return this.phone;
  }
  public setPhone(phone: string): void {
    this.phone = phone;
  }
  public getAge(): number {
    return this.age;
  }
  public setAge(age: number): void {
    this.validateAge(age);
    this.age = age;
  }
  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  removeNotebook(notebookId: number): void {
    this.notebooks = this.notebooks.filter((nb) => nb.getId() !== notebookId);
  }

  getNotebooks(): NoteBook[] {
    return this.notebooks;
  }

  public displayInfo(): void {
    console.log(
      `user [${this.id}]: ${this.name}, with email:[${this.email}], his age=[${this.age}], his phone number=[${this.phone}]`,
    );
  }
}

class Admin extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    super(id, name, email, password, phone, age);
  }
  manageNotes(
    notebook: NoteBook,
    action: "add" | "remove" | "view",
    titleOrId?: string | number,
    content?: string,
  ): void {
    switch (action) {
      case "add":
        if (typeof titleOrId === "string" && content) {
          notebook.addNote(titleOrId, content, this);
          console.log(`Admin ${this.getName()} added note "${titleOrId}"`);
        } else {
          console.log("Provide a title and content to add a note.");
        }
        break;
      case "remove":
        if (typeof titleOrId === "number" && notebook.removeNote(titleOrId)) {
          console.log(`Admin ${this.getName()} removed note #${titleOrId}`);
        } else {
          console.log("Note not found.");
        }
        break;
      case "view":
        notebook.displayNotes();
        break;
    }
  }

  displayInfo(): void {
    super.displayInfo();
    console.log("Role: Admin");
  }
}

class Note {
  constructor(
    private id: number,
    private title: string,
    private content: string,
    private author: User,
  ) {}

  getId(): number {
    return this.id;
  }
  getTitle(): string {
    return this.title;
  }
  getContent(): string {
    return this.content;
  }
  getAuthor(): User {
    return this.author;
  }
  getUserId(): number {
    return this.author.getId();
  }

  preview(length: number = 20): string {
    return this.content.length > length
      ? this.content.substring(0, length) + "..."
      : this.content;
  }
}
class NoteBook {
  private notes: Note[] = [];
  private nextNoteId: number = 1;

  constructor(
    private id: number,
    private name: string,
  ) {}

  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }

  addNote(title: string, content: string, author: User): Note {
    const note = new Note(this.nextNoteId++, title, content, author);
    this.notes.push(note);
    return note;
  }

  removeNote(noteId: number): boolean {
    const before = this.notes.length;
    this.notes = this.notes.filter((n) => n.getId() !== noteId);
    return this.notes.length < before;
  }

  getNotes(): Note[] {
    return [...this.notes];
  }

  displayNotes(): void {
    console.log(`NoteBook "${this.name}" (${this.notes.length} notes):`);
    this.notes.forEach((n) =>
      console.log(
        `  #${n.getId()} ${n.getTitle()} - ${n.preview()} (by ${n.getAuthor().getName()})`,
      ),
    );
  }
}

class Storage<T> {
  items: T[] = [];

  public addItem(item: T): void {
    this.items.push(item);
  }
  public removeItem(item: T): boolean {
    const index = this.items.indexOf(item);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
  public getAllItems(): T[] {
    return [...this.items];
  }
}

// const user = new User(2, "ahmed", "a@g.com", "123456789", "0102122", 50);
// user.displayInfo();
// const note = new Note(
//   2,
//   "lll",
//   "kojkjjhllllllllllllllllllllllllllkjhgkjhgkjllllllllllllllllllj",
//   user,
// );
// console.log(note.getAuthor());
