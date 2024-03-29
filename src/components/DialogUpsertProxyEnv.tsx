import { defineComponent, markRaw } from "vue";
import {
	defItem,
	defineComponentProps,
	itemsInvalid,
	pickValueFrom,
	setValueTo,
	xI,
	xU
} from "@/ventose/ui";
import { stateApp } from "@/state/app";
import { FormRules, newRule } from "@/utils/common.FormRules";
import { API } from "@/api";
import { ITEM_OPTIONS } from "@/utils/common.options";
import {
	InputKeyValue,
	makeKeyValueObj,
	makeNameValueObj
} from "@/components/InputKeyValue";
import { diff } from "jsondiffpatch";
import { itemBaseProps, usePrivateItemValue } from "@/ventose/ui/xForm/common";

export const DialogUpsertProxyEnv = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup() {
		return { stateApp };
	},
	data() {
		const vm = this;
		return {
			isLoading: true,
			privateEnv: {},
			currentSelected: "",
			configsForm: {
				name: defItem({
					label: xI("环境名称")
				}),
				domain: defItem({
					label: xI("环境域名"),
					slots: markRaw({
						addonBefore: () => <xItem configs={vm.configsForm.protocol} />
					}),
					rules: [
						newRule({
							validator(value) {
								if (value.length === 0) {
									return "请输入环境域名!";
								} else if (/\s/.test(value)) {
									return "环境域名不允许出现空格!";
								} else {
									return "";
								}
							}
						})
					]
				}),
				protocol: defItem({
					itemType: "Select",
					options: ITEM_OPTIONS.httpProtocol,
					style: "width:100px;"
				}),
				header: defItem({
					value: [],
					label: "Header",
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
							keyConfigs: defItem({
								prop: "key" + index,
								placeholder: "Header名称",
								value: key || ""
							}),
							valueConfigs: defItem({
								prop: "value" + index,
								placeholder: "Header值",
								value: value || ""
							})
						};
					}
				}),
				cookie: defItem({
					value: [],
					label: "Cookie",
					itemType: KeyValuePanel,
					genItem(args) {
						const { index, key, value } = args;
						return {
							_id: index,
							keyConfigs: defItem({
								prop: "key" + index,
								placeholder: "Cookie名称",
								value: key || ""
							}),
							valueConfigs: defItem({
								prop: "value" + index,
								placeholder: "Cookie值",
								value: value || ""
							})
						};
					}
				}),
				global: defItem({
					value: [],
					label: "global",
					itemType: KeyValuePanel,
					genItem(args) {
						const { index, key, value } = args;
						return {
							_id: index,
							keyConfigs: defItem({
								prop: "key" + index,
								placeholder: "global名称",
								value: key || ""
							}),
							valueConfigs: defItem({
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
		"stateApp.currProject.env": {
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
			if (this.stateApp.currProject._id) {
				return this.stateApp.currProject._id;
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
										await xU.confirm({
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
							<xButton
								type="text"
								onClick={() => this.switchEvn(i)}
								class={className}>
								<div class="flex middle">
									<div
										class="flex1 ellipsis"
										style="text-align:left;"
										v-xTips={{ onlyEllipsis: true, placement: "left" }}>
										{i.name}
									</div>
									<xIcon
										icon="delete"
										class="delete-env-icon"
										onClick={fnDelete}
									/>
								</div>
							</xButton>
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
						<div
							x-xloading="true"
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
						<xGap t />
						<xItem configs={this.configsForm.name} />
						<xGap t />
						<xItem configs={this.configsForm.domain} />
						<xGap t />
						<xItem configs={this.configsForm.global} />
						<xGap t />
						<xItem configs={this.configsForm.header} />
						<xGap t />
						<xItem configs={this.configsForm.cookie} />
						<xGap t />
					</xForm>
				);
			})();
			return (
				<div class="env-configs flex1 app-padding ant-card ant-card-bordered overflow-auto">
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
					await xU.confirm({
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
			if (await itemsInvalid()) {
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
			xU.message.success(xI("环境设置成功"));
			stateApp._setCurrProject(this.propProjectId, { isEnforce: true });
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
				await xU.confirm({ content: `删除环境变量${item.name}?` });
				const envIndex = xU.findIndex(this.privateEnv, {
					_id: id
				});
				const envArray = xU.cloneDeep(this.privateEnv);
				envArray.splice(envIndex, 1);
				await API.project.updateProxyEnv({
					id: this.propProjectId,
					env: envArray
				});
				xU.message.success(xI("环境设置成功"));
				stateApp._setCurrProject(this.propProjectId, { isEnforce: true });
			} catch (error) {}
		}
	},
	render() {
		const vm = this;
		return (
			<>
				<div
					class="DialogUpsertProxyEnv flex1 flex horizon app-padding"
					style="overflow:auto;">
					<div class="env-list-wrapper flex vertical">
						<div class="flex center mb10">
							<xIcon
								icon="add"
								onClick={this.addEnv}
								class="flex middle color-primary pointer"
								v-xTips={{ content: "添加新环境", delay: 1000 }}
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
						textOk: xI("暂存"),
						onOk: this.onOk,
						onCancel: this.propOptions.$close
					}}
				/>
			</>
		);
	}
});

const KeyValuePanel = defineComponent({
	props: defineComponentProps(itemBaseProps),
	setup(props) {
		return {
			_itemValue: usePrivateItemValue(props, [])
		};
	},
	components: {
		InputKeyValue
	},
	render() {
		const { properties } = this;
		properties.fnCheck = properties.fnCheck || false;
		return (
			<div class="ant-card ant-card-bordered" style="padding:10px">
				<InputKeyValue
					v-model={this._itemValue}
					genItem={properties.genItem}
					fnCheck={properties.fnCheck}
				/>
			</div>
		);
	}
});
