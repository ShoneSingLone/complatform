import { DialogUpsertTags } from "./DialogUpsertTags";
import { $, UI, xU, $t } from "@ventose/ui";
import { defineComponent, markRaw } from "vue";
import { DialogInterfaceStatusModify } from "./DialogInterfaceStatusModify";
import { DialogInterfaceProxyModify } from "./DialogInterfaceProxyModify";
import {
	DialogUpsertProxyEnv,
	RequestArgsPanel,
	ResponsePanel,
	TuiEditor
} from "@/components";

export async function openProxyEnvDialog() {
	const { _layerKey } = await UI.dialog.component({
		title: $t("管理项目接口转发环境").label,
		offset: [20, 20],
		component: DialogUpsertProxyEnv
	});
	/*弹窗里面的弹窗点击之后不关闭（点不到其他位置）*/
	$(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}

export async function openUpsertTagDialog() {
	const { _layerKey } = await UI.dialog.component({
		title: $t("管理项目接口Tags").label,
		offset: [20, 20],
		component: DialogUpsertTags
	});
	/*弹窗里面的弹窗点击之后不关闭（点不到其他位置）*/
	$(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}

export const InpterfacePathParams = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	methods: {
		fnUpdate(prop, value, index) {
			this.properties.value[index][prop] = value;
			this.listeners["onUpdate:value"](this.properties.value);
		}
	},
	render(vm) {
		return xU.map(vm.properties.value, (data, index) => {
			return (
				<div class="flex middel mt10 width100">
					<aTag class="mr10 flex middle" style="min-width:100px">
						{data.name}
					</aTag>
					<span class="mr10 flex1">
						<aInput
							value={data.example}
							onUpdate:value={val => {
								this.fnUpdate("example", val, index);
							}}
						/>
					</span>
					<span class="flex1">
						<aInput
							value={data.desc}
							onUpdate:value={val => {
								this.fnUpdate("desc", val, index);
							}}
						/>
					</span>
				</div>
			);
		});
	}
});

export const EnvSelectRender = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	render(vm) {
		vm.properties.value = vm.properties.value || [];
		const options = vm.properties.options || [];
		const fnUpdate = val => {
			vm.listeners["onUpdate:value"](val);
		};
		const vDomOptions = xU.map(options, item => {
			return (
				<aSelectOption value={item.value} key={item.value}>
					{item.label}
				</aSelectOption>
			);
		});
		return (
			<div class="flex overflow-auto">
				<aSelect
					placeholder="请选择转发环境"
					onChange={fnUpdate}
					value={vm.properties.value}>
					{vDomOptions}
				</aSelect>
				<xGap l="10" />
				<xButton
					configs={{
						text: $t("转发环境设置").label,
						onClick: openProxyEnvDialog
					}}
					class="ml10"
					type="primary"
				/>
			</div>
		);
	}
});

export const TagSelectRender = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	computed: {
		selected: {
			get() {
				if (xU.isArrayFill(this.properties?.value)) {
					return this.properties?.value;
				} else {
					return [];
				}
			},
			set(val) {
				if (this.properties?.value !== val) {
					this.listeners["onUpdate:value"](val);
				}
			}
		},

		vDomOptions() {
			const options = this.properties.options || [];
			const vDomOptions = xU.map(options, item => {
				return (
					<aSelectOption value={item.name} key={item.name}>
						<span v-uiPopover={{ content: item.desc }}>{item.name}</span>
					</aSelectOption>
				);
			});
			return vDomOptions;
		}
	},
	render(vm) {
		return (
			<div class="flex overflow-auto">
				<aSelect
					placeholder="请选择 tag"
					mode="multiple"
					v-model:value={vm.selected}>
					{this.vDomOptions}
				</aSelect>
				<xGap l="10" />
				<xButton
					configs={{
						text: vm.$t("Tag设置").label,
						onClick: openUpsertTagDialog
					}}
					class="ml10"
					type="primary"
				/>
			</div>
		);
	}
});

export const RequestArgsRender = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	render() {
		return (
			<RequestArgsPanel
				params={this.properties?.value}
				apiMethod={this.properties?.deepWatch?.apiMethod}
				onUpdate:params={this.listeners["onUpdate:value"]}
			/>
		);
	}
});

export const MarkdownRender = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	computed: {
		modelValue: {
			get() {
				return this.properties?.value || { md: "", html: "" };
			},
			set(modelValue) {
				this.listeners["onUpdate:value"](modelValue);
			}
		}
	},
	render(vm) {
		return <TuiEditor v-model={vm.modelValue} />;
	}
});

export const ResponseRender = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	computed: {
		body: {
			get() {
				return this.properties?.value?.res_body || "";
			},
			set(res_body) {
				this.listeners["onUpdate:value"]({
					...this.properties.value,
					res_body
				});
			}
		},
		resBodyType: {
			get() {
				return this.properties?.value?.res_body_type || "";
			},
			set(res_body_type) {
				this.listeners["onUpdate:value"]({
					...this.properties.value,
					res_body_type
				});
			}
		}
	},
	render(vm) {
		return (
			<ResponsePanel v-model:body={vm.body} v-model:bodyType={vm.resBodyType} />
		);
	}
});

export async function openDialogInterfaceStatusModify({ selected }) {
	await UI.dialog.component({
		title: $t("变更状态").label,
		component: DialogInterfaceStatusModify,
		selected
	});
}

export async function openDialogInterfaceProxyModify({ selected }) {
	await UI.dialog.component({
		title: $t("变更代理").label,
		component: DialogInterfaceProxyModify,
		selected
	});
}
