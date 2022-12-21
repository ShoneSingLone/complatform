import { defineComponent } from "vue";
import {
	xU,
	defItem,
	State_UI,
	FormRules,
	validateForm,
	AllWasWell,
	pickValueFrom
} from "@ventose/ui";
import { MonacoEditor } from "../MonacoEditor/MonacoEditor";

const { $t } = State_UI;

export const DialogBulkValues = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propDialogOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	data() {
		return {
			formItems: {
				...defItem({
					isTextarea: true,
					prop: "bulkValue",
					value: "",
					placeholder: "key:value\nkey:value\nkey:value",
					rules: [FormRules.required()],
					style: "width:500px"
				})
			}
		};
	},
	mounted() {
		this.formItems.bulkValue.value = xU
			.map(this.propDialogOptions.formValues, item => {
				if (item.configs_name) {
					return `${item.configs_name.value || ""}:${item.configs_example.value || ""
						}`;
				}
				return `${item.name || ""}:${item.example || ""}`;
			})
			.join("\n");
	},
	computed: {
		onOk() {
			if (!xU.isFunction(this.propDialogOptions?.onOk)) {
				alert("miss onOk function");
				return xU.doNothing
			}
			return this.propDialogOptions?.onOk;
		},
		configsFooter() {
			return {
				onCancel: this.propDialogOptions.closeDialog,
				onOk: async () => {
					const validateResults = await validateForm(this.formItems);
					if (AllWasWell(validateResults)) {
						/* @ts-ignore */
						const { bulkValue } = pickValueFrom(this.formItems);
						const bulkValueArray = bulkValue.split("\n");
						const formArray = xU.map(bulkValueArray, str => str.split(":"));
						this.onOk(formArray);
						this.propDialogOptions.closeDialog();
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
				<div class="flex flex1 vertical padding10" style="min-height:240px">
					<aAlert
						message={`型如key:value一行一个 换行即可，不要使用逗号、分号分隔`}
					/>
					<MonacoEditor v-model:code={this.formItems.bulkValue.value} />
				</div>
				<xDialogFooter configs={this.configsFooter} language="text" />
			</>
		);
	}
});
