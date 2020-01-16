const Modeler = require("./Modeler");
const modeler = new Modeler("level1.txt");

modeler.modelerData().then((r) => console.log(r));
