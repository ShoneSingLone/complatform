const { _n } = require("@ventose/utils-node");
const path = require("path");
const fs = require("fs");

const pathD = _n.getPathD(__dirname);

const sourceCodeDir = pathD(`../../src`);
const needToTrans = {};
const tagSet = new Set();
async function scanFile(fileurl) {
    if (String(fileurl).indexOf("codedemo") > -1) {
        return;
    }
    const content = await fs.promises.readFile(fileurl, "utf-8");
    const allMatched = String(content).match(/<(a\w+)/g);
    // const allMatched = String(content).match(/import \{(.*)\} from "ant-design-vue";/g);
    if (allMatched) {
        allMatched.forEach(tag => tagSet.add(tag));
        // await fs.promises.writeFile(fileurl, String(content).replace(allMatched[0], ""));
        // console.log(allMatched);
    }
    // _n.each(allMatched, matched => { });
}


(async () => {
    const [dirs, files] = await _n.asyncAllDirAndFile([sourceCodeDir]);
    let file;
    while ((file = files.pop())) {
        if ([`.tsx`, ".vue"].includes(path.extname(file))) {
            await scanFile(file);
        }
    }
    for (const item of tagSet) {
        console.log(item);
    }
})();
