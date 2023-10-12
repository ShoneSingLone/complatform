export function newWsPayload(type, payload = {}) {
	try {
		return JSON.stringify({ type, payload });
	} catch (error) {
		return "{type:'error',payload:{}}";
	}
}

export const socket = {
	ws: null,
	open(url) {
		return new Promise(r => {
			this.ws = new WebSocket(url);
			this.ws.addEventListener("open", event => {
				this.ws.addEventListener("message", event => {
					try {
						const data = JSON.parse(event.data);
						const { type, payload } = data;
						if ("_$auth" === type) {
							r(data);
						} else {
							const handler = this.handlerMap.get(type);
							handler(payload);
							console.log("Message from server ", data);
						}
					} catch (error) {
						console.error(error);
					}
				});

				this.ws.addEventListener("error", event => {
					console.log("error from server ", event.data);
				});

				this.ws.addEventListener("close", event => {
					console.log("close from server ", event.data);
				});
			});
		});
	},
	handlerMap: new Map(),
	on(type, handler) {
		if (!this.handlerMap.get(type)) {
			this.handlerMap.set(type, handler);
		}
	},
	emit(type, payload) {
		this.ws.send(JSON.stringify({ type, payload }));
	}
};
