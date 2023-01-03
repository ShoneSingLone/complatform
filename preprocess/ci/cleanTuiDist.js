const { _n } = require("@ventose/utils-node");
const pathD = _n.getPathD(__dirname);
const fs = require("fs");

const cleanDir = async () => {
	const dirUrl = pathD("../../public/tui-editor");
	try {
		if (!fs.existsSync(dirUrl)) {
			console.log("[✓] : no assets");
			return;
		}

		const [dirs, files] = await _n.asyncAllDirAndFile([dirUrl]);
		let target;
		while ((target = files.pop())) {
			if (/tui.js/.test(target)) {
				continue;
			} else {
				await fs.promises.unlink(target);
			}
		}

		dirs.shift(/* tui-editor */);
		while ((target = dirs.pop())) {
			if (fs.promises.rm) {
				await fs.promises.rm(target, { recursive: true });
			} else {
				await fs.promises.rmdir(target, { recursive: true });
			}
		}

		console.log("[✓] ", "dist clean done");
	} catch (error) {
		console.error(error);
	}
};

(async () => {
	await cleanDir();
})();
