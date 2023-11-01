import { defItem, xU } from "@/ventose/ui";
import { defineComponent } from "vue";
import { JsonSchemaMonaco } from "../components/JsonSchemaEditor/JsonSchemaMonaco";
import { ITEM_OPTIONS } from "@/utils/common.options";

/* 
1.接收apimethod 默认打开
*/
export const ResponsePanel = defineComponent({
	props: ["body", "bodyType", "resBackupJson"],
	emits: ["update:body", "update:bodyType", "update:resBackupJson"],
	data() {
		const configsPrivateBodyType = defItem({
			prop: "configsPrivateBodyType",
			itemType: "RadioGroup",
			options: ITEM_OPTIONS.interfaceBodyType
		});
		return {
			configsPrivateBodyType
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
		},
		_resBackupJson: {
			get() {
				return this.resBackupJson || `{}`;
			},
			set(val) {
				this.$emit("update:resBackupJson", val);
			}
		}
	},
	render() {
		return (
			<elCard>
				{{
					header: () => {
						console.log("this.privateBodyType", this.privateBodyType);
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
						if (this.privateBodyType === "backup") {
							return (
								<div style="height:400px;">
									<MonacoEditor
										class="flex1"
										v-model:code={this._resBackupJson}
										language="json"
									/>
								</div>
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
			</elCard>
		);
	}
});
