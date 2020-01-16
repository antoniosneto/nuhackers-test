const lineReader = require("line-reader");

class File {
    constructor(file) {
        this.file = file;
    }

    getParent(classifier) {
        const classifierSplited = classifier.split("");
        const index = classifierSplited.findIndex((e) => e === "0");
        if (index === 1) return null;
        classifierSplited.splice(index - 1, 1, "0");
        return classifierSplited.join("");
    }

    modelerData = () => {
        return new Promise((resolve, reject) => {
            const result = [];
            lineReader.eachLine(this.file, (line, last) => {
                const arr = line.split("  ");
                let newArray = arr.filter((s) => s != "").map((e) => e.trim());
                const parent = this.getParent(newArray[0]);
                const obj = {
                    description: newArray[1],
                    classifier: newArray[0],
                    openingBalance: parseFloat(newArray[2]),
                    debit: parseFloat(newArray[3]),
                    credit: parseFloat(newArray[4]),
                    finalBalance: parseFloat(newArray[5]),
                    parent
                };
                result.push(obj);
                if (last) resolve(result);
            });
        });
    };
}
module.exports = File;
