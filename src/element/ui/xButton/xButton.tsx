//@ts-nocheck

import { defineComponent, computed } from "vue";
import { xU } from "../ventoseUtils";
import { $t } from "../State_UI";

/*$t 可能会变，所以每次render用新的数据*/
const BTN_PRESET_MAP = {
	query: () => ({
		icon: <xIcon class="x-button_icon-wrapper" icon="InsideSearchOutlined" />,
		text: $t("查询").label
	}),
	refresh: () => ({
		icon: <xIcon class="x-button_icon-wrapper" icon="InsideSyncOutlined" />,
		text: $t("刷新").label
	}),
	cancel: () => ({
		text: $t("取消").label
	}),
	save: () => ({
		icon: <xIcon class="x-button_icon-wrapper" icon="InsideSaveOutlined" />,
		text: $t("保存").label
	}),
	upload: () => ({
		icon: <xIcon class="x-button_icon-wrapper" icon="InsideUploadOutlined" />,
		text: $t("上传").label
	}),
	delete: configs => {
		configs.type = "danger";
		configs.ghost = true;
		return {
			icon: <xIcon class="x-button_icon-wrapper" icon="InsideDeleteOutlined" />,
			text: $t("删除").label
		};
	}
};

export type t_buttonOptions = {
	text?: any;
	onClick?: () => Promise<any>;
};

export const THIS_BTN_IS_LOADING = {
	loading: false
};

export default defineComponent({
	name: "xButton",
	inheritAttrs: false,
	props: {
		payload: {
			type: Object,
			default() {
				return {};
			}
		},
		configs: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	beforeMount() {
		if (!this.configs) {
			return;
		}
		/* 预置 */
		const presetFn = BTN_PRESET_MAP[this.configs.preset];
		if (presetFn) {
			const preset = presetFn(this.configs);
			this.configs.icon = preset.icon;
			this.configs.text = <span class="ml4">{preset.text}</span>;
		}
	},
	data() {
		return {
			loading: true
		};
	},
	setup(props) {
		let Cpt_isShow = true;
		if (props.configs.isShow !== undefined) {
			if (xU.isFunction(props.configs.isShow)) {
				Cpt_isShow = computed(props.configs.isShow);
			}
			if (xU.isBoolean(props.configs.isShow)) {
				Cpt_isShow = props.configs.isShow;
			}
		}

		return { Cpt_isShow };
	},
	computed: {
		cpt_type() {
			if (["query", "save"].includes(this.configs.preset)) {
				return "primary";
			}

			if (this.$attrs.type) {
				return this.$attrs.type;
			}
			return this.configs.type;
		},
		title() {
			/*disabled是String则为弹窗提示*/
			if (xU.isString(this.disabled) && this.disabled.length > 0) {
				return this.disabled;
			}
			if (xU.isString(this.configs.title) && this.configs.title.length > 0) {
				return this.configs.title;
			}
			return false;
		},
		disabled() {
			if (xU.isBoolean(this.configs.disabled)) {
				return this.configs.disabled;
			}
			if (xU.isFunction(this.configs.disabled)) {
				return this.configs.disabled(this);
			}
			return false;
		},
		text() {
			/* text作为render */
			if (xU.isFunction(this.configs.text)) {
				return this.configs.text(this) || "";
			}
			/* text 作为 string */
			return this.configs.text || "";
		},
		cpt_onClick() {
			const onClick = (() => {
				if (xU.isFunction(this.$attrs?.onClick)) {
					return this.$attrs?.onClick;
				}
				if (xU.isFunction(this?.configs?.onClick)) {
					return this?.configs?.onClick;
				}
				return () => null;
			})();
			return async (...args) => {
				this.loading = true;
				THIS_BTN_IS_LOADING.loading = this.$el;
				try {
					await onClick.apply(this, args);
				} catch (e) {
					console.error(e);
				} finally {
					THIS_BTN_IS_LOADING.loading = false;
					this.loading = false;
				}
			};
		}
	},
	watch: {
		configs: {
			immediate: true,
			handler(configs) {
				this.loading = !!configs.loading;
			}
		}
	},
	render() {
		if (!this.Cpt_isShow) {
			return null;
		}
		const propsWillDeleteFromProperty = [
			"text",
			"loading",
			"disabled",
			"title",
			"onClick"
		];
		const _properties = xU.omit(this.configs, propsWillDeleteFromProperty);

		if (this.title) {
			_properties.title = this.title;
		}
		return (
			<ElButton
				onClick={this.cpt_onClick}
				class="x-button antdv-button"
				loading={this.loading}
				disabled={!!this.disabled}
				type={this.cpt_type}
				{...xU.omit(_properties, ["icon", "onClick"])}
				v-slots={{
					default: () => {
						const vDomDefautl = this.$slots.default && this.$slots.default();
						return (
							<>
								{this.text}
								{vDomDefautl}
							</>
						);
					}
				}}
			/>
		);
	}
});
