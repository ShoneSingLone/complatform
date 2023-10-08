/*https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup*/
import "./containers/Home/Home.scss";
import "./style.less";
import { defineComponent } from "vue";
import { AppFooter } from "@/components/Footer/AppFooter";
import { AppHeader } from "@/components/Header/AppHeader";
import { cptRouter } from "@/router/router";
import { stateApp } from "@/state/app";
import { stateInterface } from "@/state/interface";
import { $ } from "@/ventose/ui";
import { RouterView } from "@/components/RouterView/RouterView";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

async function useVConsole() {
	const { default: VConsole } = await import("vconsole");
	// or init with options
	const vConsole = new VConsole({ theme: "dark" });
}

export default defineComponent({
	components: { AppFooter, AppHeader },
	setup() {
		if (stateApp.isMobile) {
			if (import.meta.env.MODE === "development") {
				useVConsole();
			}
			$("#app").addClass("app-mobile");
		}
		stateApp.__resetState();
		return {
			cptRouter,
			stateApp
		};
	},
	data() {
		return {
			isLoading: true,
			size: {}
		};
	},
	mounted() {
		this.onAfterRefresh();
	},
	methods: {
		routerViewGuards(targetVDom) {
			if (this.isLoading) {
				return <div class="flex1"></div>;
			}
			return targetVDom;
		},
		async onAfterRefresh() {
			/* 刷新之后重新获取基础信息 */
			try {
				if (await stateApp._checkLoginState()) {
					await stateApp._fetchGroupList();
					if (this.cptRouter.query.group_id) {
						await stateApp._setCurrGroup(this.cptRouter.query.group_id);
						await stateApp._fetchProjectList(this.cptRouter.query.group_id);
						if (this.cptRouter.query.project_id) {
							await stateApp._setCurrProject(this.cptRouter.query.project_id);
							await stateInterface._updateInterfaceMenuList();
						}
					}
				}
			} catch (error) {
				console.error(error);
			} finally {
				$("#app").removeClass("x-loading");
				this.isLoading = false;
			}
		}
	},
	render() {
		return (
			<el-config-provider size={stateApp.globalSize} locale={zhCn}>
				<AppHeader data-view-id="AppHeader" />
				<RouterView
					guards={this.routerViewGuards}
					data-view-id="AppRouterView"
					class="height1"
				/>
				<AppFooter />
			</el-config-provider>
		);
	}
});
