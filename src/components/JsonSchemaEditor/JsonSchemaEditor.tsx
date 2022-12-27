import SchemaEditor from "./JsonSchemaEditor.vue";
import JSON5 from "json5";
import GenerateSchema from "generate-schema";
import { xU } from "@ventose/ui";
import { defineComponent } from "vue";

export function string2JsonSchema(jsonString) {
	try {
		let json = JSON5.parse(jsonString);
		if (json.properties && typeof json.properties === "object" && !json.type) {
			json.type = "object";
		}
		if (json.items && typeof json.items === "object" && !json.type) {
			json.type = "array";
		}
		if (!json.type) {
			return false;
		}
		json.type = json.type.toLowerCase();
		let types = ["object", "string", "number", "array", "boolean", "integer"];
		if (types.indexOf(json.type) === -1) {
			return false;
		}
		return json;
	} catch (e) {
		return false;
	}
}
export const JsonSchemaEditor = defineComponent({
	props: ["value"],
	computed: {
		jsonStr: {
			get: function () {
				return JSON.stringify(this.tree, null, 2);
			},
			set: function (newVal) {
				this.tree = JSON.parse(newVal);
			}
		},
		jsonValue: {
			get: function () {
				return this.value;
			},
			set: function (newVal) {
				this.tree = JSON.parse(newVal);
			}
		}
	},
	render() {
		return (
			<SchemaEditor lang="zh_CN" value={this.jsonValue} {...this.$attrs} class="overflow-auto height100 width100" />
		);
	}
});
