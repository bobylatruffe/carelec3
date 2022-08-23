const fs = require("fs");
const path = require("path");
const toStandardiser = require("./standardisation");

let aTester = null;
aTester = fs.readFileSync(path.join(__dirname, "../../data/aStandardise.data"));
aTester = aTester.toString().split("\r\n");
let nbATester = aTester.length;
let nbStandardise = 0;


aTester.forEach(tester => {
  toStandardiser(tester) ? nbStandardise++ : null;
})

console.log(`Sur ${nbATester}, ${nbStandardise} ont été standardisé`);
