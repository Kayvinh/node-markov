/** Textual markov chain generator. */

class MarkovMachine {
  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  [ 'the', 'cat', 'in', 'the', 'hat' ]
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    // TODO: implement this!
    const markovMap = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const currWord = this.words[i];
      const nextWord = i === (this.words.length - 1) ? null : this.words[i + 1];

      if (markovMap.has(currWord)) {
        markovMap.get(currWord).push(nextWord);
      } else {
        markovMap.set(currWord, [nextWord]);
      }
    }

    return markovMap;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    // Create array with first word in input text
    //TODO: rename, words?
    const text = [this.words[0]];
    //TODO: rename?
    let lastWord = text[text.length - 1];

    const markovMap = this.chains;

    while (lastWord !== null) {
      const randomChainIndex = Math.floor(
        Math.random() * markovMap.get(lastWord).length
      );

      text.push(markovMap.get(lastWord)[randomChainIndex]);
      lastWord = text[text.length - 1];
    }
    let joined = text.join(' ');


    //TODO: look into substring
    return joined.substring(0, joined.length - 1);
    return text.join(" ").slice(0, text.length -1 );
  }
}

// const catInHatMachine = new MarkovMachine("the cat in the hat");
// console.log(catInHatMachine.words);
// console.log(catInHatMachine.getChains());
// console.log(catInHatMachine.getText());

module.exports = {
  MarkovMachine,
};
