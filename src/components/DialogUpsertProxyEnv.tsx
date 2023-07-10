import { defineComponent, markRaw } from "vue";
import {
	AllWasWell,
	defItem,
	pickValueFrom,
	setValueTo,
	UI,
	validateForm,
	xU
} from "@ventose/ui";
import { Methods_App, State_App } from "@/state/State_App";
import { FormRules } from "@/utils/common.FormRules";
import { API } from "@/api";
import { ITEM_OPTIONS } from "@/utils/common.options";
import {
	InputKeyValue,
	makeKeyValueObj,
	makeNameValueObj
} from "@/components/InputKeyValue";
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
				...defItem({
					label: vm.$t("环境名称").label,
					prop: "name"
				}),
				...defItem({
					label: vm.$t("环境域名").label,
					prop: "domain",
					slots: markRaw({
						addonBefore: () => <xItem configs={vm.configsForm.protocol} />
					}),
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

				let currentSelected = false;
				/* 已经打开，非初始状态 */
				if (this.raw$EnvId) {
					currentSelected = xU.find(this.privateEnv, { _id: this.raw$EnvId });
					this.raw$EnvId = false;
				}
				if (!currentSelected) {
					currentSelected = xU.first(this.privateEnv);
				}
				if (currentSelected) {
					this.switchEvn(currentSelected, { isEnforce: true });
				}
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
			return (
				<div class="env-list flex vertical flex1 width100 overflow-auto height100 ">
					{xU.map(this.privateEnv, i => {
						const className =
							i._id === this.currentSelected._id
								? "delete-env-btn active"
								: "delete-env-btn";

						const fnDelete = (() => {
							if (/^new_env/.test(i._id)) {
								return async () => {
									try {
										await UI.dialog.confirm({
											content: `删除环境变量${i.name}?`
										});
										const envIndex = xU.findIndex(this.privateEnv, {
											_id: i._id
										});
										this.privateEnv.splice(envIndex, 1);
									} catch (error) {}
								};
							}
							return async () => this.deleteEnv(i);
						})();

						return (
							<ElButton
								type="text"
								onClick={() => this.switchEvn(i)}
								class={className}>
								<div class="flex middle">
									<div
										class="flex1 ellipsis"
										style="text-align:left;"
										v-uiPopover={{ onlyEllipsis: true, placement: "left" }}>
										{i.name}
									</div>
									<xIcon
										icon="delete"
										class="delete-env-icon"
										onClick={fnDelete}
									/>
								</div>
							</ElButton>
						);
					})}
				</div>
			);
		},
		vdomEnvconfigs() {
			const vm = this;
			const vDomContent = (() => {
				if (this.isLoading) {
					return (
						<ElSpin
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
							padding: "0 14px"
						}}>
						<xGap t="10" />
						<xItem configs={this.configsForm.name} />
						<xGap t="10" />
						<xItem configs={this.configsForm.domain} />
						<xGap t="10" />
						<xItem configs={this.configsForm.global} />
						<xGap t="10" />
						<xItem configs={this.configsForm.header} />
						<xGap t="10" />
						<xItem configs={this.configsForm.cookie} />
						<xGap t="10" />
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
		async switchEvn(envItem, options: any = {}) {
			const continu = () => {
				this.currentSelected = envItem;
				/* 数据动态更新后，能通过raw$EnvId找回来 */
				this.raw$EnvId = envItem._id;
			};
			const isEnforce = options.isEnforce || false;

			if (isEnforce) {
				continu();
				return;
			}
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
			const validateResults = await validateForm(this.configsForm);
			if (!AllWasWell(validateResults)) {
				return;
			}

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
			if (/^new_env/.test(this.currentSelected._id)) {
				delete env._id;
			}
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
		async addEnv() {
			const newItem = {
				header: [],
				global: [],
				_id: xU.genId("new_env"),
				name: xU.genId("env_name"),
				domain: "http://"
			};
			/* 更新之后Id是全新的，所以默认第一个 */
			this.privateEnv.unshift(newItem);
			this.switchEvn(newItem, { isEnforce: true });
		},
		async deleteEnv(item) {
			const id = item._id;
			try {
				await UI.dialog.confirm({ content: `删除环境变量${item.name}?` });
				const envIndex = xU.findIndex(this.privateEnv, {
					_id: id
				});
				const envArray = xU.cloneDeep(this.privateEnv);
				envArray.splice(envIndex, 1);
				await API.project.updateProxyEnv({
					id: this.propProjectId,
					env: envArray
				});
				UI.message.success(this.$t("环境设置成功").label);
				Methods_App.setCurrProject(this.propProjectId, { isEnforce: true });
			} catch (error) {}
		}
	},
	render() {
		const vm = this;
		return (
			<>
				<div
					class="DialogUpsertProxyEnv flex1 flex horizon padding10"
					style="overflow:auto;">
					<div class="env-list-wrapper flex vertical">
						<div class="flex center mb10">
							<xIcon
								icon="add"
								onClick={this.addEnv}
								class="flex middle color-primary pointer"
								v-uiPopover={{ content: "添加新环境", delay: 1000 }}
							/>
						</div>
						{this.vDomLeftSide}
					</div>
					<div class="env-configs-wrapper flex1 flex">
						{this.vdomEnvconfigs}
					</div>
				</div>
				<xDialogFooter
					configs={{
						textOk: this.$t("暂存").label,
						onOk: this.onOk,
						onCancel: this.propDialogOptions.closeDialog
					}}
				/>
			</>
		);
	}
});

const KeyValuePanel = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	methods: {
		fnUpdate(val) {
			this.listeners["onUpdate:value"](val);
		}
	},
	render(vm) {
		const { properties, fnUpdate } = this;
		properties.value = properties.value || [];
		properties.fnCheck = properties.fnCheck || false;
		return (
			<div class="ant-card ant-card-bordered" style="padding:10px">
				<InputKeyValue
					items={properties.value}
					onUpdate:items={fnUpdate}
					genItem={properties.genItem}
					fnCheck={properties.fnCheck}
				/>
			</div>
		);
	}
});
