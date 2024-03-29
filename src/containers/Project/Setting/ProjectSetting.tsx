import { computed, defineComponent, onMounted } from "vue";
import { stateApp } from "@/state/app";
import { aHashLink, cptRouter } from "@/router/router";
import { xI, xScope, xU } from "@/ventose/ui";
import { ProjectSettingCommon } from "./ProjectSettingCommon";
import { ProjectRequestCode } from "./ProjectRequestCode";
import {
	OPEN_BLANK,
	TAB_KEY_GROUP_WIKI,
	TAB_KEY_PROJECT_AUTH,
	TAB_KEY_PROJECT_CONFIGS,
	TAB_KEY_PROJECT_MOCK,
	TAB_KEY_PROJECT_REQUEST,
	TAB_KEY_PROJECT_REQUEST_CODE
} from "@/utils/variable";

export const ProjectSetting = defineComponent({
	setup() {
		var vm = {};
		type t_vm = typeof vm;
		vm = xScope<t_vm>(vm);

		const cptCurrTabName = computed({
			get() {
				return (
					cptRouter.value.query.project_setting_tab || TAB_KEY_PROJECT_CONFIGS
				);
			},
			set(project_setting_tab) {
				cptRouter.value.query.project_setting_tab = project_setting_tab;
			}
		});

		var vDomSwitchPanel = computed(() => {
			let btnArray = [
				TAB_KEY_PROJECT_CONFIGS,
				TAB_KEY_PROJECT_REQUEST,
				TAB_KEY_PROJECT_AUTH,
				TAB_KEY_PROJECT_MOCK,
				TAB_KEY_PROJECT_REQUEST_CODE
			];

			return (
				<div class="flex middle start">
					<el-button-group class="ml-4">
						{xU.map(btnArray, name => {
							const type = cptCurrTabName.value === name ? "primary" : "";
							return (
								<xButton
									type={type}
									onClick={() => (cptCurrTabName.value = name)}>
									{name}
								</xButton>
							);
						})}
					</el-button-group>
					<xGap f="1" />
				</div>
			);
		});

		var vDomProjectConfigs = computed(() => {
			if (
				cptRouter.value.query.project_setting_tab !== TAB_KEY_PROJECT_CONFIGS
			) {
				return null;
			}
			return <ProjectSettingCommon />;
		});

		var vDomTabKeyProjectRequestCode = computed(() => {
			if (
				cptRouter.value.query.project_setting_tab !==
				TAB_KEY_PROJECT_REQUEST_CODE
			) {
				return null;
			}
			return <ProjectRequestCode />;
		});

		onMounted(() => {
			if (!cptRouter.value.query.project_setting_tab) {
				cptRouter.value.query.project_setting_tab = TAB_KEY_PROJECT_CONFIGS;
			}
		});

		return function () {
			return (
				<div class="padding flex1 width100 flex">
					<section class="view-main-section box-shadow flex1">
						{vDomSwitchPanel.value}
						{vDomProjectConfigs.value}
						{vDomTabKeyProjectRequestCode.value}
					</section>
				</div>
			);
		};
	}
});
