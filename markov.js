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
   *   "The": ["cat"],    ["cat","hat"]
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   * 
   * */

  getChains() {
    // TODO: implement this!
    const markovMap = {}


    //TODO: store this.words[i] in variable
    //TODO: refactor and use Map
    for (let i = 0; i < this.words.length; i++) {
      const nextWord = (i === this.words.length - 1) ? null : this.words[i + 1]

      if (this.words[i] in markovMap) {
        markovMap[this.words[i]].push(nextWord);
      } else {
        markovMap[this.words[i]] = [nextWord];
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
    const text = [this.words[0]];

    let lastWord = text[text.length - 1];

    const markovMap = this.getChains();

    while (lastWord !== null) {
      const randomChainIndex = Math.floor(Math.random() * markovMap[lastWord].length)
      text.push(markovMap[lastWord][randomChainIndex]);
      lastWord = text[text.length - 1];
    }

    return text.join(" ");

  }
}

// const catInHatMachine = new MarkovMachine("the cat in the hat");
// console.log(catInHatMachine.words);
// console.log(catInHatMachine.getChains());
// console.log(catInHatMachine.getText());

module.exports = {
  MarkovMachine,
};
