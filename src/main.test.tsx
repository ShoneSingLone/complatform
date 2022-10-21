import _ from "lodash";
const viewModules = import.meta.glob("./views/modules/**/*");
const routes = _.reduce(
	viewModules,
	(routes, fn, path) => {
		const originUrl = path.replace("./views/modules/", "");
		const pathArray = originUrl.split("/");
		const filePath = _.last(pathArray);
		const matchRes = filePath.match(/^View(.*)\.(vue|jsx|tsx)$/);
		if (matchRes) {
			const fileName = matchRes[1];
			pathArray[pathArray.length - 1] = fileName;
			console.log(pathArray.map(_.kebabCase).join("/").replaceAll("-", "_"));
		}
		return routes;
	},
	[]
);
