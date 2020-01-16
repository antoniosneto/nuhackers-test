const Modeler = require("./Modeler");
const modeler = new Modeler("level2.txt");

modeler.modelerData().then((r) => console.log(r));
