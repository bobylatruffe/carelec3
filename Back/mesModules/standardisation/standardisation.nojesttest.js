const fs = require("fs");
const path = require("path");
const sdd = require("../carnetsEntretiens/initCarnetsEntretiensSdd")();
const toStandardiser = require("./standardisation");

let aTester = null;
aTester = fs.readFileSync(path.join(__dirname, "../../data/aStandardise.data"));
aTester = aTester.toString().split("\r\n");
let nbATester = aTester.length;
let nbStandardise = 0;

aTester.forEach(tester => {
  toStandardiser(sdd, tester) ? nbStandardise++ : null;
})

console.log(`Sur ${nbATester}, ${nbStandardise} ont été standardisé`);
