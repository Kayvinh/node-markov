const { MarkovMachine } = require("./markov");

describe("getChains function", function () {
  let markovMachine;
  const data = new Map();
  data.set("the", ["cat", "hat."]);
  data.set("cat", ["in"]);
  data.set("in", ["the"]);
  data.set("hat.", [null]);

  beforeEach(function () {
    const inputText = "the cat in the hat.";
    markovMachine = new MarkovMachine(inputText);
  });

  test("return Map", function () {
    expect(markovMachine.getChains()).toEqual(data);
  });

  test("this.chains on instance", function () {
    expect(markovMachine.chains).toEqual(data);
  });
});

describe("getText function", function () {
  test("return text, no branches", function () {
    const inputText = "the cat is so fluffy.";
    const data = new Map();
    data.set("the", ["cat"]);
    data.set("cat", ["is"]);
    data.set("so", ["fluffy"]);
    data.set("fluffy.", [null]);

    const markovMachine = new MarkovMachine(inputText);

    expect(markovMachine.getText()).toEqual(inputText);
  });

  test("return text, with branches", function () {
    const inputText = "the cat in the hat.";
    const data = new Map();
    data.set("the", ["cat", "hat."]);
    data.set("cat", ["in"]);
    data.set("in", ["the"]);
    data.set("hat.", [null]);

    const markovMachine = new MarkovMachine(inputText);

    expect(markovMachine.getText()).toEqual(expect.any(String));
  });
});
