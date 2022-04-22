import * as fs from 'fs';
import * as yargs from 'yargs';
import {
  green,
  red,
  blue,
  yellow,
} from 'chalk';
import User from './User.class';
import { Color } from './Note.class';

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
      if (!allFileNames.includes(`${argv.user}.notes.json`)) {
        fs.writeFile(`database/${argv.user}.notes.json`, '{\n\t"notes": []\n}\n', (err) => {
          if (err) {
            console.log(red(`ERROR: ${err?.message}\n`));
          } else {
            console.log(green(`User ${argv.user} succesfully created \n`));
          }
        });
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
        console.log(`${argv.user} notes:\n\n`);
        currentUser.notes.forEach((note) => {
          switch (note.color) {
            case 'blue':
              console.log(blue(`- ${note.title}\n`));
              break;
            case 'yellow':
              console.log(yellow(`- ${note.title}\n`));
              break;
            case 'green':
              console.log(green(`- ${note.title}\n`));
              break;
            case 'red':
              console.log(red(`- ${note.title}\n`));
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
      let notes: { notes: [] };

      if (allFileNames.includes(`${argv.user}.notes.json`)) {
        const content = fs.readFileSync(`./database/${argv.user}.notes.json`);
        notes = JSON.parse(content.toString());
        notes.notes.forEach((note: { title: string, body: string, color: Color }) => {
          currentUser.addNote(note.title, note.body, note.color);
        });
      } else {
        fs.writeFileSync(`database/${argv.user}.notes.json`, '{\n\t"notes": []\n}\n');
        console.log(green(`User ${argv.user} created \n`));
        const content = fs.readFileSync(`./database/${argv.user}.notes.json`);
        notes = JSON.parse(content.toString());
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
      notes.notes.push(currentUser.note(currentUser.notes.length - 1).JSON);
      fs.writeFileSync(`./database/${argv.user}.notes.json`, JSON.stringify(notes));
      console.log(green(`Note for ${argv.user} added successfully \n`));
    }
  },
});

yargs.parse();
