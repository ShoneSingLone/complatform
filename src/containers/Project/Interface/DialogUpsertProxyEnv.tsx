import {
	AllWasWell,
	defItem,
	pickValueFrom,
	setValueTo,
	UI,
	validateForm,
	xU
} from "@ventose/ui";
import { Methods_App, State_App } from "src/state/State_App";
import { defineComponent } from "vue";
import { FormRules } from "../../../utils/common.FormRules";
import { Form } from "ant-design-vue";
import { API } from "src/api";
import { ITEM_OPTIONS } from "./../../../utils/common.options";
import {
	InputKeyValue,
	makeKeyValueObj,
	makeNameValueObj
} from "./../../../components/InputKeyValue";
import { diff } from "jsondiffpatch";

export const DialogUpsertProxyEnv = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propDialogOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup() {
		return { State_App };
	},
	data() {
		const vm = this;
		return {
			isLoading: true,
			privateEnv: {},
			currentSelected: "",
			configsForm: {
				...defItem({ label: "环境名称", prop: "name" }),
				...defItem({
					label: "环境域名",
					prop: "domain",
					slots: {
						addonBefore: () => <xItem configs={vm.configsForm.protocol} />
					},
					rules: [
						FormRules.custom({
							validator(value, { rule }) {
								if (value.length === 0) {
									rule.msg = "请输入环境域名!";
									return FormRules.FAIL;
								} else if (/\s/.test(value)) {
									rule.msg = "环境域名不允许出现空格!";
									return FormRules.FAIL;
								} else {
									rule.msg = "";
									return FormRules.SUCCESS;
								}
							}
						})
					]
				}),
				...defItem({
					prop: "protocol",
					itemType: "Select",
					options: ITEM_OPTIONS.httpProtocol,
					style: "width:100px;"
				}),
				...defItem({
					value: [],
					label: "Header",
					prop: "header",
					itemType: KeyValuePanel,
					fnCheck(configs) {
						debugger;
						console.log(this);
						if (configs.keyConfigs.value === "Cookie") {
							configs.keyConfigs.itemTips = {
								type: "error",
								msg: `key 不能为 Cookie`
							};
							return FormRules.FAIL;
						} else {
							return FormRules.SUCCESS;
						}
					},
					genItem(args) {
						const { index, key, value } = args;
						return {
							_id: index,
							keyConfigs: defItem.item({
								prop: "key" + index,
								placeholder: "Header名称",
								value: key || ""
							}),
							valueConfigs: defItem.item({
								prop: "value" + index,
								placeholder: "Header值",
								value: value || ""
							})
						};
					}
				}),
				...defItem({
					value: [],
					label: "Cookie",
					prop: "cookie",
					itemType: KeyValuePanel,
					genItem(args) {
						const { index, key, value } = args;
						return {
							_id: index,
							keyConfigs: defItem.item({
								prop: "key" + index,
								placeholder: "Cookie名称",
								value: key || ""
							}),
							valueConfigs: defItem.item({
								prop: "value" + index,
								placeholder: "Cookie值",
								value: value || ""
							})
						};
					}
				}),
				...defItem({
					value: [],
					label: "global",
					prop: "global",
					itemType: KeyValuePanel,
					genItem(args) {
						const { index, key, value } = args;
						return {
							_id: index,
							keyConfigs: defItem.item({
								prop: "key" + index,
								placeholder: "global名称",
								value: key || ""
							}),
							valueConfigs: defItem.item({
								prop: "value" + index,
								placeholder: "global值",
								value: value || ""
							})
						};
					}
				})
			}
		};
	},
	watch: {
		"State_App.currProject.env": {
			immediate: true,
			handler(env) {
				if (!env) {
					return;
				}
				this.privateEnv = xU.cloneDeep(env);
				this.currentSelected = xU.first(this.privateEnv);
			}
		},
		currentSelected: {
			immediate: true,
			handler() {
				this.isLoading = true;
				this.setFormValues();
			}
		}
	},
	computed: {
		propProjectId() {
			if (this.State_App.currProject._id) {
				return this.State_App.currProject._id;
			} else {
				alert("miss projectId");
			}
		},
		vDomLeftSide() {
			return xU.map(this.privateEnv, i => {
				const type = i._id === this.currentSelected._id ? "primary" : "";
				return (
					<aButton type={type} onClick={() => this.switchEvn(i)}>
						{i.name}
					</aButton>
				);
			});
		},
		vdomEnvconfigs() {
			const vDomContent = (() => {
				if (this.isLoading) {
					return (
						<aSpin
							spinning={true}
							class="ant-spin ant-spin-spinning flex middle center height100 width100"
						/>
					);
				}
				return (
					<xForm
						labelStyle={{
							"text-align": "left",
							width: "80px",
							padding: "0 8px"
						}}>
						<xGap t="10" /> <xItem configs={this.configsForm.name} />
						<xGap t="10" /> <xItem configs={this.configsForm.domain} />
						<xGap t="10" /> <xItem configs={this.configsForm.header} />
						<xGap t="10" /> <xItem configs={this.configsForm.cookie} />
						<xGap t="10" /> <xItem configs={this.configsForm.global} />
					</xForm>
				);
			})();
			return (
				<div class="env-configs flex1 padding10 ant-card ant-card-bordered overflow-auto">
					{vDomContent}
				</div>
			);
		}
	},
	methods: {
		async switchEvn(envItem) {
			const continu = () => (this.currentSelected = envItem);
			const rightData = pickValueFrom(this.configsForm);
			var delta = diff(this.leftData, rightData);
			const keys = Object.keys(delta || {});
			if (keys.length > 0) {
				try {
					await UI.dialog.confirm({
						content: "有未保存的修改，切换之后将被放弃"
					});
					continu();
				} catch (e) {}
			} else {
				continu();
			}
		},
		setFormValues() {
			const item = xU.cloneDeep(this.currentSelected || []);
			item.name = item.name || "";

			item.protocol = (() =>
				item.domain ? item.domain.split("//")[0] + "//" : "http://")();

			item.domain = (() => (item.domain ? item.domain.split("//")[1] : ""))();
			/* cookies */
			const cookieIndex = xU.findIndex(item.header, { name: "Cookie" });
			if (~cookieIndex) {
				const cookieString = item.header.splice(cookieIndex, 1)[0].value;
				if (cookieString.length > 2) {
					item.cookie = cookieString.split(";").map(i => {
						if (i) {
							const [key, value] = i.split("=");
							return { key, value };
						}
					});
				}
			} else {
				item.cookie = [];
			}
			item.header = xU.map(item.header || [], makeKeyValueObj);
			item.global = xU.map(item.global || [], makeKeyValueObj);
			setValueTo(this.configsForm, item);
			/* 切换env的时候先对比是否已经修改东西 */
			this.leftData = pickValueFrom(this.configsForm);
			setTimeout(() => {
				this.isLoading = false;
			}, 64);
		},
		async onOk() {
			let { name, domain, protocol, header, cookie, global } = pickValueFrom(
				this.configsForm
			);
			header = xU.map(header, makeNameValueObj);
			cookie = xU.map(cookie, makeNameValueObj);
			global = xU.map(global, makeNameValueObj);

			if (cookie.length > 0) {
				header.push({
					name: "Cookie",
					value: cookie.map(item => item.name + "=" + item.value).join(";")
				});
			}

			const env = {
				_id: this.currentSelected._id,
				name,
				domain: protocol + domain,
				header: header,
				global
			};

			const envIndex = xU.findIndex(this.privateEnv, {
				_id: env._id
			});

			const envArray = xU.cloneDeep(this.privateEnv);
			if (~envIndex) {
				envArray.splice(envIndex, 1, env);
			} else {
				envArray.push(env);
			}
			await API.project.updateProxyEnv({
				id: this.propProjectId,
				env: envArray
			});
			UI.message.success(this.$t("环境设置成功").label);
			Methods_App.setCurrProject(this.propProjectId, { isEnforce: true });
		},
		async addEnv() {}
	},
	render() {
		const vm = this;
		return (
			<>
				<div
					class="DialogUpsertProxyEnv flex1 flex horizon padding20"
					style="overflow:auto;">
					<div class="env-list flex vertical">{this.vDomLeftSide}</div>
					<div class="env-configs-wrapper flex1 flex padding10">
						{this.vdomEnvconfigs}
						{JSON.stringify(this.dataForm)}
					</div>
				</div>
				<xDialogFooter>
					<xButton onClick={this.addEnv} class="flex middle">
						<xIcon icon="add" /> 添加新的环境
					</xButton>
					<xButton onClick={this.addEnv} class="flex middle">
						<xIcon icon="delete" /> 删除当前环境
					</xButton>
					<xGap f="1" />
					<xButton
						configs={{
							preset: "cancel",
							onClick: this.propDialogOptions.closeDialog
						}}
					/>
					<xButton configs={{ preset: "save", onClick: this.onOk }} />
				</xDialogFooter>
			</>
		);
	}
});

const KeyValuePanel = args => {
	args.property.value = args.property.value || [];
	console.log(
		"🚀 ~ file: DialogUpsertProxyEnv.tsx:296 ~ KeyValuePanel ~ args.property.value",
		args.property.value
	);
	args.property.fnCheck = args.property.fnCheck || false;
	args.fnUpdate = val => {
		args.listeners["onUpdate:value"](val);
	};
	return (
		<div class="ant-card ant-card-bordered">
			<InputKeyValue
				items={args.property.value}
				onUpdate:items={args.fnUpdate}
				genItem={args.property.genItem}
				fnCheck={args.property.fnCheck}
			/>
		</div>
	);
};
