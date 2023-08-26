/*https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup*/
import "./containers/Home/Home.scss";
import "./styles/App.less";
import "./style.less";
import { defineComponent } from "vue";
import { AppFooter } from "./components/Footer/AppFooter";
import { AppHeader } from "./components/Header/AppHeader";
import { Cpt_url } from "@/router/router";
import { Methods_App, stateApp } from "@/state/app";
import { Methods_ProjectInterface } from "@/state/interface";
import { $ } from "@/ventose/ui";
import { RouterView } from "./components/RouterView/RouterView";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

export default defineComponent({
	components: { AppFooter, AppHeader },
	setup() {
		return {
			Cpt_url,
			stateApp
		};
	},
	data() {
		return {
			isLoading: true
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
				await Methods_App.checkLoginState();
				await Methods_App.fetchGroupList();
				if (this.Cpt_url.query.group_id) {
					await Methods_App.setCurrGroup(this.Cpt_url.query.group_id);
					await Methods_App.fetchProjectList(this.Cpt_url.query.group_id);
					if (this.Cpt_url.query.project_id) {
						await Methods_App.setCurrProject(this.Cpt_url.query.project_id);
						await Methods_ProjectInterface.updateInterfaceMenuList();
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
			<ElConfigProvider size={stateApp.globalSize} locale={zhCn}>
				<AppHeader data-view-id="AppHeader" />
				<RouterView
					guards={this.routerViewGuards}
					data-view-id="AppRouterView"
				/>
				<AppFooter />
			</ElConfigProvider>
		);
	}
});
