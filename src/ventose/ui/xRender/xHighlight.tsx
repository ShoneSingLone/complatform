import { defineComponent } from "vue";

export const xHighlight = defineComponent({
	name: "xHighlight",
	props: ["content", "filter"],
	render() {
		if (this.filter !== undefined && String(this.filter).length > 0) {
			let a = String(this.content).split(this.filter);
			a = a.map(
				(i, index) =>
					`<span data-x-highlight="${this.filter}__${index}">${i}</span>`
			);

			return (
				<span
					innerHTML={a.join(
						`<span style="
                            color:var(--app-light-text);
                            text-align:center;
                            font-weight:700;
                            background: var(--app-warning);
                            text-shadow:1px 1px var(--app-light-shadow);
                            padding: 0">
                            ${this.filter}
                        </span>`
					)}></span>
			);
		}
		return this.content;
	}
});
