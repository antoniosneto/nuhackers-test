const lineReader = require("line-reader");

class File {
    constructor(file) {
        this.file = file;
    }

    getParent(classifier, lastClassifier, lastParent) {
        if (classifier.length === 1 || !lastClassifier) return null;
        if (classifier.startsWith(lastClassifier)) return lastClassifier;
        if (classifier.startsWith(lastParent)) return lastParent;
        classifier = classifier.split("");
        lastClassifier = lastClassifier.split("");
        let parent = [];
        for (let i in classifier) {
            if (classifier[i] === lastClassifier[i]) parent.push(classifier[i]);
        }
        return parent.join("");
    }

    pointsModeler(arr) {
        for (let i = 2; i < arr.length; i++) {
            arr[i] = arr[i]
                .split(".")
                .join("")
                .split(",")
                .join(".")
                .split(/[DC]/)
                .join("");
        }
        return arr.filter((e) => e != "");
    }

    dataModeler(data) {
        const newData = data.split(/\s\s/);
        const dataModeled = newData.filter((s) => s != "").map((e) => e.trim());
        return this.pointsModeler(dataModeled);
    }

    classifierModeler(arr) {
        let classifier = arr[0].split("").filter((e) => e != ".");
        for (let i = classifier.length - 1; i > 0; i--) {
            if (classifier[i] != "0") break;
            classifier[i] = null;
        }
        arr[0] = classifier.filter((e) => e != null).join("");
        return arr;
    }

    modelerData = () => {
        return new Promise((resolve, reject) => {
            const result = [];
            let parent = null;
            let lastClassifier = null;
            lineReader.eachLine(this.file, (line, last) => {
                let arr = this.dataModeler(line);
                if (!arr.length) return;
                const newArray = this.classifierModeler(arr);
                parent = this.getParent(newArray[0], lastClassifier, parent);
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
                lastClassifier = newArray[0];
                if (last) resolve(result);
            });
        });
    };
}
module.exports = File;
