// import Sinon from 'sinon';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import User from '../src/User.class';

// Sinon.stub(console, 'log');

describe('User object tests', () => {
  const myUser = new User('Eric');
  it('User start properties works as expected', () => {
    expect(myUser.userName).to.be.eq('Eric');
    expect(myUser.notes).to.be.eql([]);
  });
  it('User is able to create a note by default', () => {
    expect(myUser.addNote()).to.be.eq(true);
  });
  it('User default note is created as expected', () => {
    // @ts-ignore
    expect(myUser.note(0).title).to.be.eq('New note');
    // @ts-ignore
    expect(myUser.note(0).body).to.be.eq('');
    // @ts-ignore
    expect(myUser.note(0).color).to.be.eq('yellow');
  });
  it('User is able to create two notes by default', () => {
    expect(myUser.addNote()).to.be.eq(true);
  });
  it('User second default note is created as expected', () => {
    // @ts-ignore
    expect(myUser.note(1).title).to.be.eq('New note (1)');
    // @ts-ignore
    expect(myUser.note(1).body).to.be.eq('');
    // @ts-ignore
    expect(myUser.note(1).color).to.be.eq('yellow');
  });
  it('User is able to create defined note', () => {
    expect(myUser.addNote('Shop list', '-water\n-flour', 'red')).to.be.eq(true);
  });
  it('User isn\'t able to create defined note', () => {
    expect(myUser.addNote('Shop list', '-water\n-flour', 'red')).to.be.eq(false);
  });
  it('User second default note is created as expected', () => {
    // @ts-ignore
    expect(myUser.note(2).title).to.be.eq('Shop list');
    // @ts-ignore
    expect(myUser.note(2).body).to.be.eq('-water\n-flour');
    // @ts-ignore
    expect(myUser.note(2).color).to.be.eq('red');
  });
  it('Note can be searched by name', () => {
    expect(myUser.noteByTitle('Shop list')).to.be.eql(myUser.note(2));
  });
});
