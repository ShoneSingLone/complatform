const fs = require("fs");
const path = require("path");
const $ = require('cheerio');
const _ = require("lodash");


const dirPath = path.resolve(__dirname, "../../src/element/assets/svg");
const targetFilePath = path.resolve(dirPath, "insideIconAutoGen.ts");
const files = fs.readdirSync(dirPath);
fs.writeFileSync(targetFilePath, "export const insideIconAutoGen = `");
files.filter(file => {
    return path.extname(file) === ".svg";
}).forEach(file => {
    const filename = path.basename(file).replace(".svg", '');
    const insideName = _.camelCase(`inside_${filename}`);
    const id = `xIcon_${insideName}`;
    let content = fs.readFileSync(path.resolve(dirPath, file));
    content = $.load(content)("svg")
        .attr({
            id,
            fill: "inherit",
            class: "xIcon"
        })
        .removeAttr("style")
        .removeAttr("version")
        .removeAttr("xmlns")
        .removeAttr("p-id")
        .removeAttr("data-icon")
        .removeAttr("aria-hidden")
        .removeAttr("focusable")
        .removeAttr("width")
        .removeAttr("height")
        .prop("outerHTML");
    fs.writeFileSync(targetFilePath, "\r", { flag: "a" });
    fs.writeFileSync(targetFilePath, content, { flag: "a" });
});
fs.writeFileSync(targetFilePath, "`;", { flag: "a" });