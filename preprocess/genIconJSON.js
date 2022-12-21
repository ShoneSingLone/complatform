const fs = require("fs");
const path = require("path");

const icons = fs.readdirSync(
	path.resolve(__dirname, "../public/assets/svg")
);

const content = `export default ${JSON.stringify(
	icons.map(icon => {
		return icon.split(".")[0];
	}),
	null,
	2
)};`;

const targetPath = path.resolve(
	__dirname,
	"..",
	"src/utils/common.options.xIcon.ts"
);
fs.writeFileSync(targetPath, content);

console.log("🚀:", "targetPath", JSON.stringify(targetPath, null, 2));
