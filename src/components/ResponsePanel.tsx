import { defItem, xU } from "@ventose/ui";
import { defineComponent } from "vue";
import { JsonSchemaMonaco } from "../components/JsonSchemaEditor/JsonSchemaMonaco";
import { ITEM_OPTIONS } from "@/utils/common.options";

/* 
1.接收apimethod 默认打开
*/
export const ResponsePanel = defineComponent({
	props: ["body", "bodyType"],
	emits: ["update:body", "update:bodyType"],
	data() {
		return {
			configsPrivateBodyType: defItem.item({
				prop: "configsPrivateBodyType",
				itemType: "RadioGroup",
				options: xU.filter(ITEM_OPTIONS.interfaceBodyType, i =>
					["json", "raw"].includes(i.label)
				)
			})
		};
	},
	computed: {
		privateBody: {
			get() {
				return this.body || `{}`;
			},
			set(val) {
				this.$emit("update:body", val);
			}
		},
		privateBodyType: {
			get() {
				return this.bodyType || `{}`;
			},
			set(val) {
				this.$emit("update:bodyType", val);
			}
		}
	},
	render() {
		return (
			<ElCard>
				{{
					title: () => {
						return (
							<xItem
								v-model={this.privateBodyType}
								configs={this.configsPrivateBodyType}
							/>
						);
					},
					default: () => {
						if (this.privateBodyType === "json") {
							return (
								<JsonSchemaMonaco
									v-model:schemaString={this.privateBody}
									style="height:400px;"
								/>
							);
						}

						return (
							<div style="height:400px;">
								<MonacoEditor
									class="flex1"
									v-model:code={this.privateBody}
									language="json"
								/>
							</div>
						);
					}
				}}
			</ElCard>
		);
	}
});
