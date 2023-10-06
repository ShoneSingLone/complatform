import { defineComponent, ref } from "vue";
import MusicPlayer from "@/music/views/ViewMusic/Player/MusicPlayer.vue";
import { stateMusic } from "@/state/music";
import { stateApp } from "@/state/app";
import { cptRouter } from "@/router/router";
import { RouterView } from "@/components/RouterView/RouterView";
import { xU } from "@/ventose/ui";

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
			stateApp,
			goHome
		};
	},
	data() {
		const selectedKey = cptRouter.value || "playlist";
		return {
			selectedKey
		};
	},
	computed: {
		vDomItem() {
			return xU.map(stateMusic.tabItems, item => {
				const className = {
					"ant-btn-link elevation elevation-2": item.key === this.selectedKey,
					"menu-icon flex middle center": true
				};

				return (
					<div
						key={item.key}
						class={className}
						onClick={() => this.handleClickSelectedKey(item.key)}>
						<xIcon icon={item.icon} />
					</div>
				);
			});
		}
	},
	methods: {
		handleClickSelectedKey(viewName) {
			cptRouter.value.go(`/music/${viewName}`);
			this.selectedKey = viewName;
		}
	},
	render() {
		return (
			<div id="ViewMusic" class="flex vertical">
				{/* <div class="nav-tab top-nav flex middle width100 elevation-2"> <xIcon class="ml16" icon="home" onClick={this.goHome} /> </div> */}
				<div class="flex1 flex" style="height:1px;">
					<RouterView />
				</div>
				<div class="elevation-2">
					<MusicPlayer />
					<div class="nav-tab flex width100 around middle">{this.vDomItem}</div>
				</div>
			</div>
		);
	}
});
