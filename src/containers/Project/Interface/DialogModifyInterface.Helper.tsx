import { DialogUpsertTags } from "./DialogUpsertTags";
import { DialogUpsertProxyEnv } from "./DialogUpsertProxyEnv";
import { RequestArgsPanel } from "src/components/RequestArgsPanel";
import { ResponsePanel } from "src/components/ResponsePanel";
import { TuiEditor } from "../../../components/TuiEditor/TuiEditor";
import { $, State_UI, UI, xU } from "@ventose/ui";
import { defineComponent } from "vue";

export const InpterfacePathParams = ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	properties.value = properties.value || [];
	const fnUpdate = (prop, val, index) => {
		properties.value[index][prop] = val;
		listeners["onUpdate:value"](properties.value);
	};
	return xU.map(properties.value, (data, index) => {
		const { desc, example, name, _id } = data;
		return (
			<div class="flex middel mt10 width100">
				<aTag class="mr10 flex middle" style="min-width:100px">
					{name}
				</aTag>
				<span class="mr10 flex1">
					<xItem
						configs={{
							placeholder: "参数示例",
							value: example,
							onAfterValueEmit: val => fnUpdate("example", val, index)
						}}
					/>
				</span>
				<span class="flex1">
					<xItem
						configs={{
							placeholder: "备注",
							value: desc,
							onAfterValueEmit: val => fnUpdate("desc", val, index)
						}}
					/>
				</span>
			</div>
		);
	});
};

export async function openProxyEnvDialog() {
	const { _layerKey } = await UI.dialog.component({
		title: State_UI.$t("管理项目接口转发环境").label,
		component: DialogUpsertProxyEnv
	});
	/*弹窗里面的弹窗点击之后不关闭（点不到其他位置）*/
	$(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}

export async function openUpsertTagDialog() {
	const { _layerKey } = await UI.dialog.component({
		title: State_UI.$t("管理项目接口Tags").label,
		component: DialogUpsertTags
	});
	/*弹窗里面的弹窗点击之后不关闭（点不到其他位置）*/
	$(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}

export const EnvSelectRender = ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	properties.value = properties.value || [];
	const options = properties.options || [];
	const fnUpdate = val => {
		listeners["onUpdate:value"](val);
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
				value={properties.value}>
				{vDomOptions}
			</aSelect>
			<xGap l="10" />
			<xButton
				configs={{
					text: State_UI.$t("转发环境设置").label,
					onClick: openProxyEnvDialog
				}}
				class="ml10"
				type="primary"
			/>
		</div>
	);
};

export const TagSelectRender = ({
	properties,
	slots,
	listeners,
	propsWillDeleteFromConfigs
}) => {
	properties.value = properties.value || [];
	const options = properties.options || [];
	const fnUpdate = val => {
		listeners["onUpdate:value"](val);
	};

	const vDomOptions = xU.map(options, item => {
		return (
			<aSelectOption value={item.name} key={item.name}>
				<span v-uiPopover={{ content: item.desc }}>{item.name}</span>
			</aSelectOption>
		);
	});
	return (
		<div class="flex overflow-auto">
			<aSelect
				placeholder="请选择 tag"
				onChange={fnUpdate}
				mode="multiple"
				value={properties.value}>
				{vDomOptions}
			</aSelect>
			<xGap l="10" />
			<xButton
				configs={{
					text: State_UI.$t("Tag设置").label,
					onClick: openUpsertTagDialog
				}}
				class="ml10"
				type="primary"
			/>
		</div>
	);
};

export const RequestArgsRender = defineComponent({
	props: ["properties", "listeners"],
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
	props: ["properties", "listeners"],
	components: { TuiEditor },
	computed: {
		md: {
			get() {
				return this.properties?.value || "";
			},
			set(val) {
				if (this.properties?.value !== val) {
					this.listeners["onUpdate:value"](val);
				}
			}
		}
	},
	render() {
		return <TuiEditor v-model:md={this.md} />;
	}
});

export const ResponseRender = defineComponent({
	props: ["properties", "listeners"],
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
		}
	},
	render(vm) {
		return <ResponsePanel v-model:body={vm.body} />;
	}
});
