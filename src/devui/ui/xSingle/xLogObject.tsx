import { defineComponent } from "vue";
import { xU } from "../ventoseUtils";

export const xLogObject = defineComponent({
	name: "xLogObject",
	/* a:all,top left right bottom;class flex1,2,3,4 */
	props: ["obj"],
	computed: {
		objString: {
			get() {
				if (xU.isObject(this.obj)) {
					return JSON.stringify(this.obj, null, 2);
				} else {
					return "";
				}
			}
		}
	},
	render() {
		if (
			localStorage.___VENTOSE_UI_IS_DEV_MODE !== "VENTOSE_UI_IS_DEV_MODE" ||
			this.$attrs.hide
		) {
			return null;
		} else {
			return (
				<pre style="width:500px;height:400px;">
					<code> {this.objString} </code>
				</pre>
			);
		}
	}
});
