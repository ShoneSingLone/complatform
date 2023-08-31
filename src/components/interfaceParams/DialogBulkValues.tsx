import { defineComponent } from "vue";
import {
	xU,
	defItem,
	stateUI,
	itemsInvalid,
	pickValueFrom
} from "@/ventose/ui";
import { FormRules } from "@/utils/common.FormRules";
import { MonacoEditor } from "../MonacoEditor/MonacoEditor";

export const DialogBulkValues = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	data() {
		return {
			formItems: {
				bulkdValue: defItem({
					isTextarea: true,
					value: "",
					placeholder: "key:value\nkey:value\nkey:value",
					rules: [FormRules.required()],
					style: "width:500px"
				})
			}
		};
	},
	watch: {
		"propOptions.formValues": {
			immediate: true,
			handler() {}
		}
	},
	mounted() {
		this.formItems.bulkValue.value = xU
			.map(this.propOptions.formValues, item => {
				return `${item.key || ""}:${item.value || ""}`;
			})
			.join("\n");
	},
	computed: {
		styleBody() {
			return "min-height:500px:width:500px";
		},
		onOk() {
			if (!xU.isFunction(this.propOptions?.onOk)) {
				alert("miss onOk function");
				return xU.doNothing;
			}
			return this.propOptions?.onOk;
		},
		configsFooter() {
			return {
				onCancel: this.propOptions.$close,
				onOk: async () => {
					if (!(await itemsInvalid())) {
						/* @ts-ignore */
						const { bulkValue } = pickValueFrom(this.formItems);
						const bulkValueArray = bulkValue.split("\n");
						const formArray = xU.map(bulkValueArray, str => str.split(":"));
						this.onOk(formArray);
						this.propOptions.$close();
					}
				}
			};
		},
		vDomFormItems() {
			return xU.map(this.formItems, (item, prop) => {
				return (
					<>
						<xGap t="10" />
						<xItem configs={item} />
					</>
				);
			});
		}
	},
	render() {
		return (
			<>
				<div class="flex flex1 vertical app-padding">
					<ElAlert
						title={`型如key:value一行一个 换行即可，不要使用逗号、分号分隔`}
					/>
					<div style="height:340px;width:500px">
						<MonacoEditor
							v-model:code={this.formItems.bulkValue.value}
							language="text"
						/>
					</div>
				</div>
				<xDialogFooter configs={this.configsFooter} />
			</>
		);
	}
});
