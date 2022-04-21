import Note, { Color } from './Note.class';

export default class User {
  private readonly _notes: Note[];

  private readonly _userName: string;

  constructor(userName: string) {
    this._userName = userName;
    this._notes = [];
  }

  get notes(): Note[] {
    return this._notes;
  }

  public note(inx: number): Note | undefined {
    return this.notes.find((_, i) => i === inx);
  }

  public noteByTitle(title: string): Note | undefined {
    return this.notes.find((note) => note.title === title);
  }

  get userName(): string { return this._userName; }

  public addNote(title?: string, body?: string, color?: Color): boolean {
    if (!this.notes.find((el) => el.title === title)) {
      if (title !== undefined && body !== undefined && color !== undefined) {
        this.notes.push(new Note(title, body, color));
      } else if (this.notes.find((el) => el.title === 'New note')) {
        this.notes.push(new Note(`New note (${this.notes.length})`));
      } else {
        this.notes.push(new Note());
      }
      return true;
    }
    return false;
  }
}
