import { defineComponent } from "vue";
import { State_UI } from "@ventose/ui";

export const SelectLanguage = defineComponent({
	setup() {
		return {
			State_UI
		};
	},
	data() {
		return {
			languageLabels: {
				"zh-CN": { label: "简体中文", icon: "🇨🇳" },
				"en-US": { label: "English", icon: "🇺🇸" }
			}
		};
	},
	methods: {
		changeLanguage(item: any) {
			const { key } = item || {};
			this.State_UI.language = key;
			setTimeout(() => {
				window.location.reload();
			}, 300);
		}
	},
	computed: {
		vDomMenuItems() {
			return xU.map(this.languageLabels, (locale, prop) => {
				return (
					<ElMenuItem index={prop} v-for="in ">
						<span role="img" ariaLabel={locale.label}>
							{" "}
							{locale.icon}{" "}
						</span>
						<span>{locale.label}</span>
					</ElMenuItem>
				);
			});
		}
	},
	render() {
		const vm = this;
		return (
			<ElDropdown placement="bottomRight">
				<GlobalOutlined />
				{{
					overlay() {
						return (
							<ElMenu
								selected-keys={vm.State_UI.language}
								onClick={vm.changeLanguage}>
								{vm.vDomMenuItems}
							</ElMenu>
						);
					}
				}}
			</ElDropdown>
		);
	}
});
