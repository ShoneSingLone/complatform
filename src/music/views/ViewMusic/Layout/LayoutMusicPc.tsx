import { defineComponent } from "vue";
import MusicPlayer from "@/music/views/ViewMusic/Player/MusicPlayer.vue";
import { stateMusic } from "@/state/music";
import { xU, xI } from "@/ventose/ui";
import { cptRouter } from "@/router/router";
import { RouterView } from "@/components/RouterView/RouterView";

function goHome() {
	debugger;
}

export default defineComponent({
	components: {
		MusicPlayer
	},
	setup() {
		return {
			stateMusic,
			goHome
		};
	},
	data() {
		const selectedKey = cptRouter.value.pathname || "playlist";
		return {
			collapsed: false,
			selectedKeys: [selectedKey]
		};
	},
	watch: {
		selectedKeys(selectedKeys) {
			const viewName = selectedKeys[0];
			this.$router.push({ path: `/music/${viewName}` });
		}
	},
	computed: {
		vDomMenuItem() {
			return xU.map(stateMusic.tabItems, menuItem => {
				return (
					<AMenuItem key={menuItem.key}>
						<span class="flex">
							<xGap l="10" />
							<xIcon icon={menuItem.icon} class="ml10" />
							{xI(menuItem.label)}
						</span>
					</AMenuItem>
				);
			});
		}
	},
	render() {
		return (
			<ALayout id="ViewMusic" style="height: 100vh">
				<ALayoutSider class="elevation-2">
					<AMenu
						v-model:selectedKeys={this.selectedKeys}
						theme="light"
						mode="inline">
						{this.vDomMenuItem}
					</AMenu>
				</ALayoutSider>
				<ALayout style="height: 100vh" class="flex vertical">
					<ALayoutHeader
						style="background: #fff; padding: 0"
						class="elevation-1 flex middle">
						<xButton configs={{ onClick: goHome }} style="margin-left: 16px">
							<xIcon icon="gohome" />
						</xButton>
					</ALayoutHeader>
					<main
						class="ant-layout-content elevation-1 flex1"
						style="margin: 16px">
						<div
							style="
						height: 100%;
						padding: 24px;
						background: rgb(255, 255, 255);
						overflow: hidden;
					">
							<RouterView />
						</div>
					</main>
					<ALayoutFooter
						style="height: 88px; background: white"
						class="flex middle elevation-1">
						<MusicPlayer />
					</ALayoutFooter>
				</ALayout>
			</ALayout>
		);
	}
});
