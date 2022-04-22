import * as fs from 'fs';
import * as yargs from 'yargs';
import {
  green,
  red,
  blue,
  yellow,
} from 'chalk';
import User from './User.class';
import { Note, Color } from './Note.class';

const allFileNames: string[] = fs.readdirSync('database');

yargs.command({
  command: 'new-user',
  describe: 'Add a new user to system',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      if (!allFileNames.includes(`${argv.user}`)) {
        fs.mkdirSync(`database/${argv.user}`);
        console.log(green(`User ${argv.user} successfully created \n`));
      } else {
        console.log(red('ERROR: User already exists\n'));
      }
    }
  },
});

yargs.command({
  command: 'list-titles',
  describe: 'Show all notes titles for a user',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      if (allFileNames.includes(`${argv.user}`)) {
        const notes: string[] = fs.readdirSync(`./database/${argv.user}/`);
        if (notes.length === 0) {
          console.log(`No notes found for ${argv.user} ...`);
          return;
        }
        console.log(`${argv.user} notes:\n\n`);
        notes.forEach((note) => {
          const noteColor: string = JSON
            .parse(fs
              .readFileSync(`./database/${argv.user}/${note}.json`)
              .toString())
            .color;
          switch (noteColor) {
            case 'blue':
              console.log(blue(`- ${note}\n`));
              break;
            case 'yellow':
              console.log(yellow(`- ${note}\n`));
              break;
            case 'green':
              console.log(green(`- ${note}\n`));
              break;
            case 'red':
              console.log(red(`- ${note}\n`));
              break;
            default:
              break;
          }
        });
      } else {
        console.log(red('ERROR: User doesn\'t exist\n'));
      }
    } else {
      console.log(red('ERROR: User was not especified\n'));
    }
  },
});

yargs.command({
  command: 'read-note',
  describe: 'Read a single note from a user',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      if (typeof argv.title === 'string') {
        if (allFileNames.includes(`${argv.user}.notes.json`)) {
          const content = fs.readFileSync(`./database/${argv.user}.notes.json`);
          const currentUser: User = new User(argv.user);
          const notes = JSON.parse(content.toString());
          notes.notes.forEach((note: { title: string, body: string, color: Color }) => {
            currentUser.addNote(note.title, note.body, note.color);
          });
          if (notes.notes.length === 0) {
            console.log(`No notes found for ${argv.user} ...`);
            return;
          }
          if (currentUser.noteByTitle(argv.title) instanceof Note) {
            switch (currentUser.noteByTitle(argv.title)?.color) {
              case 'blue':
                console.log(blue(currentUser.noteByTitle(argv.title)?.toString()));
                break;
              case 'yellow':
                console.log(yellow(currentUser.noteByTitle(argv.title)?.toString()));
                break;
              case 'green':
                console.log(green(currentUser.noteByTitle(argv.title)?.toString()));
                break;
              case 'red':
                console.log(red(currentUser.noteByTitle(argv.title)?.toString()));
                break;
              default:
                break;
            }
          } else {
            console.log(red(`ERROR: Note with title ${argv.title} doesn't exist\n`));
          }
        } else {
          console.log(red('ERROR: User doesn\'t exist\n'));
        }
      } else {
        console.log(red('ERROR: Note title was not specified\n'));
      }
    } else {
      console.log(red('ERROR: User was not specified\n'));
    }
  },
});

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: false,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: false,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: false,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      const currentUser: User = new User(argv.user);
      if (allFileNames.includes(`${argv.user}`)) {
        const notes: string[] = fs.readdirSync(`./database/${argv.user}/`);
        notes.forEach((note) => {
          const noteJSON = JSON
            .parse(fs
              .readFileSync(`./database/${argv.user}/${note}`)
              .toString());
          currentUser.addNote(noteJSON.title, noteJSON.body, noteJSON.color);
        });
      } else {
        fs.mkdirSync(`database/${argv.user}`);
        console.log(green(`User ${argv.user} created \n`));
      }
      if (typeof argv.title === 'string') {
        if (!currentUser.addNote(argv.title)) {
          console.log(red(`ERROR: note with title ${argv.title} already exists`));
          return;
        }
      } else {
        currentUser.addNote();
      }
      if (typeof argv.body === 'string') {
        // @ts-ignore
        currentUser.note(currentUser.notes.length - 1).body = argv.body;
      }
      if (typeof argv.color === 'string') {
        switch (argv.color) {
          case 'blue':
            // @ts-ignore
            currentUser.note(currentUser.notes.length - 1).colorIsBlue();
            break;
          case 'yellow':
            // @ts-ignore
            currentUser.note(currentUser.notes.length - 1).colorIsYellow();
            break;
          case 'green':
            // @ts-ignore
            currentUser.note(currentUser.notes.length - 1).colorIsGreen();
            break;
          case 'red':
            // @ts-ignore
            currentUser.note(currentUser.notes.length - 1).colorIsRed();
            break;
          default:
            break;
        }
      }
      // @ts-ignore
      fs.writeFileSync(
        `./database/${argv.user}/${currentUser.note(currentUser.notes.length - 1)?.title}.json`,
        JSON.stringify(currentUser.note(currentUser.notes.length - 1)?.JSON),
      );
      console.log(green(`Note for ${argv.user} added successfully \n`));
    }
  },
});

yargs.parse();
