const authR = require("./auth");
const recipeR = require("./recipe");
const { headers } = require("../utils/headers/headers");

class Router {
	constructor(url, method) {
		this.url = url;
		this.method = method;
		this.routes = {
			...authR,
			...recipeR
		};
	}

	async usage(req, res) {
		const { url, method, routes } = this;
		// console.log(url);
		for (const route in routes) {
			const regex = new RegExp(route);
			if (regex.test(url)) {
				if (url.includes("?")) {
					const param = url.slice(url.indexOf("=") + 1, url.length);
					const result = await routes[route][method](param);
					res.setHeader("Access-Control-Allow-Origin", "*");
					res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
					res.end(JSON.stringify(result.rows));
				} else {
					const controller = routes[route][method];
					if (controller.length == 2) {
						controller(req, res);
					} else {
						const result = await controller();
						res.setHeader("Access-Control-Allow-Origin", "*");
						res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
						res.end(JSON.stringify(result.rows));
					}
				}
			}
		}
	}
}

module.exports = Router;
