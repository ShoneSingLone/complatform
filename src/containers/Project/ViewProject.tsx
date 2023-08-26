import { xU, xI, xScope } from "@/ventose/ui";
import { computed, defineComponent, onMounted, reactive, watch } from "vue";
import { resetStateInterface } from "@/state/interface";
import "./ViewProject.less";
import { RouterView } from "@/components/RouterView/RouterView";
import { Cpt_url, aHashLink } from "@/router/router";
import { stateApp } from "@/state/app";
import {
	OPEN_BLANK,
	PROJECT,
	TAB_KEY_INTERFACE,
	TAB_KEY_PROJECT_WIKI
} from "@/utils/variable";
import { ViewWiki } from "../Wiki/ViewWiki";
import { ProjectInterface } from "../Interface/ProjectInterface";

/* 数据状态由ViewProject 提供，以便subView 切换之后数据状态不变 */

export const ViewProject = defineComponent({
	name: "ViewProject",
	setup() {
		/* 以project为root，共享数据随project生命周期重置 */
		resetStateInterface();
		const [_, a, b] = String(Cpt_url.value.pathname).split("/");

		var vm = {
			asdf: 123,
			_asdf() {}
		};
		vm = xScope(vm);

		const curretProjectTabName = computed({
			get() {
				return Cpt_url.value.query.project_tab;
			},
			set(project_tab) {
				Cpt_url.value.query.project_tab = project_tab;
			}
		});

		const cpt_vDomTabProjectWiki = computed(() => {
			const tipsLabel = xI(OPEN_BLANK);
			let className = "project-tab flex vertical middle";

			if (curretProjectTabName.value === TAB_KEY_PROJECT_WIKI) {
				className += " active";
			}

			const href = aHashLink("/wiki_project", {
				group_id: Cpt_url.value.query.group_id,
				project_id: Cpt_url.value.query.project_id
			});
			const tips = {
				content: `<a href="${href}" target="_blank"> ${tipsLabel} </a>`,
				placement: "right"
			};

			return (
				<div
					v-xTips={tips}
					class={className}
					onClick={() => (curretProjectTabName.value = TAB_KEY_PROJECT_WIKI)}>
					<xIcon icon="icon_project_wiki" />
					<div>{xI(TAB_KEY_PROJECT_WIKI)}</div>
				</div>
			);
		});

		const cpt_vDomTabInterface = computed(() => {
			let className = "project-tab flex vertical middle";

			if (curretProjectTabName.value === TAB_KEY_INTERFACE) {
				className += " active";
			}

			return (
				<div
					class={className}
					onClick={() => (curretProjectTabName.value = TAB_KEY_INTERFACE)}>
					<xIcon icon="icon_interface_mgr" />
					<div>{xI("接口")}</div>
				</div>
			);
		});

		const cpt_vDomViewProjectWiki = computed(() => {
			if (curretProjectTabName.value !== TAB_KEY_PROJECT_WIKI) {
				return null;
			}
			return <ViewWiki belongType={PROJECT} />;
		});

		const cpt_vDomViewIterface = computed(() => {
			if (curretProjectTabName.value !== TAB_KEY_INTERFACE) {
				return null;
			}
			return <ProjectInterface />;
		});

		onMounted(() => {
			if (!curretProjectTabName.value) {
				curretProjectTabName.value = TAB_KEY_INTERFACE;
			}
		});

		return function () {
			/* 如果没有projectId 则重定向到group */
			if (!stateApp.currProject._id) {
				return (
					<div
						v-xloading="true"
						class="flex vertical middle center height100"
					/>
				);
			}

			return (
				<div id="ViewProject">
					<aside class="ViewProject-tabs elevation-1">
						{cpt_vDomTabProjectWiki.value}
						{cpt_vDomTabInterface.value}
						{/* {vDomTabProjectWiki} */}
					</aside>
					<section class="flex vertical flex1">
						{cpt_vDomViewProjectWiki.value}
						{cpt_vDomViewIterface.value}
					</section>
				</div>
			);
		};
	}
});
