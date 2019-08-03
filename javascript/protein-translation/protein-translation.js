const proteinMap = {
  Methionine: ["AUG"],
  Phenylalanine: ["UUU", "UUC"],
  Leucine: ["UUA", "UUG"],
  Serine: ["UCU", "UCC", "UCA", "UCG"],
  Tyrosine: ["UAU", "UAC"],
  Cysteine: ["UGU", "UGC"],
  Tryptophan: ["UGG"],
  STOP: ["UAA", "UAG", "UGA"]
};

const codonsMap = Object.keys(proteinMap).reduce(
  (acc, name) => ({
    ...acc,
    ...proteinMap[name].reduce((list, seq) => ({ ...list, [seq]: name }), {})
  }),
  {}
);

export const translate = (rnaSequence = "") => {
  const stopRegex = new RegExp(proteinMap.STOP.join("|"));
  const [seq] = rnaSequence.split(stopRegex);

  if (seq.length === 0) {
    return [];
  }

  const proteins = seq.match(/\w{3}/g).map(seq => codonsMap[seq]);

  if (proteins.some(name => !name)) {
    throw new Error("Invalid codon");
  }

  return proteins;
};
