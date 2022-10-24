<script lang="jsx">
import { State_App } from "@/state/State_App";
import { _ } from "@ventose/ui";
import { defineComponent } from "vue";
import { STATIC_WORD } from "@/utils/common";
import { useRouter } from "vue-router.jsx";

const pathAndIdCollection = {};

const getIcon = icon => {
	return <xIcon icon={icon} style="width:16px;height:100%;" />;
};

const render_GenMenuItem = (menuInfo, parentId, router) => {
	const currentId = `${parentId}###${menuInfo.id}`;
	_.doNothing("🚀:", menuInfo, parentId, currentId);
	if (_.isArrayFill(menuInfo.children)) {
		return (
			<aSubMenu
				key={currentId}
				v-slots={{
					icon: () => getIcon(menuInfo.icon),
					title: () => menuInfo.label,
					default: () =>
						_.map(menuInfo.children, i => {
							return render_GenMenuItem(i, currentId, router);
						})
				}}
			/>
		);
	} else {
		pathAndIdCollection[menuInfo.id] = currentId;
		return (
			<aMenuItem key={currentId} class="flex middle">
				{{
					icon: () => getIcon(menuInfo.icon),
					title: () => menuInfo.label,
					default: () => {
						/*其他配置信息*/
						if (menuInfo.payload) {
							/*使用浏览器newTab展示新页面*/
							if (
								menuInfo.payload.openType &&
								menuInfo.payload.openType === STATIC_WORD.NEW_TAB
							) {
								return (
									<a
										href={menuInfo.path}
										target="_blank"
										onClick={e => {
											e.stopPropagation();
											e.preventDefault();
											window.open(menuInfo.path, "_blank");
										}}>
										{menuInfo.label}
									</a>
								);
							}
						}
						let to = (({ name, path }) => {
							if (path) {
								return path;
							}
							if (name) {
								return { name };
							}
							return "/404";
						})(menuInfo);

						return (
							<>
								{JSON.stringify(menuInfo)}
								<a
									title={JSON.stringify(menuInfo)}
									href={menuInfo.path}
									onClick={e => {
										e.stopPropagation();
										e.preventDefault();
										router.push(menuInfo);
									}}>
									{menuInfo.label}
								</a>
							</>
						);
					}
				}}
			</aMenuItem>
		);
	}
};

const render_GenMenu = (tree, router) => {
	return _.map(tree, i => render_GenMenuItem(i, "", router));
};

export default defineComponent({
	name: "MenuTree",
	props: {
		tree: {
			type: Object,
			default() {
				return [];
			}
		}
	},
	setup() {
		return {
			State_App,
			render_GenMenu,
			render_GenMenuItem
		};
	},
	data() {
		return {
			state: {
				openKeys: []
			}
		};
	},
	computed: {
		currentPath() {
			return this.$route.path;
		}
	},
	mounted() {
		this.onOpenChange([pathAndIdCollection[this.currentPath]]);
		this.State_App.arr_selectedMenuId = [
			pathAndIdCollection[this.currentPath]
		].filter(_.isInput);
	},
	methods: {
		onSelect({ item, key, selectedKeys }) {
			_.doNothing("onSelect");
		},
		onOpenChange(openKeys) {
			_.doNothing("onOpenChange");
			const latestOpenKey = _.last(openKeys);
			const openKeyArray = _.safeSplit(latestOpenKey, "###").filter(_.isInput);
			const _openKeys = [];
			for (let index = 0; index < openKeyArray.length; index++) {
				const element = openKeyArray[index];
				if (index === 0) {
					_openKeys[0] = `###${element}`;
				} else {
					_openKeys[index] = `${_openKeys[index - 1]}###${element}`;
				}
			}
			this.state.openKeys = _openKeys;
		}
	},
	render() {
		return (
			<div class="layout-menu beautiful-scroll flex1">
				{/* JSON.stringify(this.State_App.arr_selectedMenuId) */}
				<aMenu
					theme={this.State_App.theme}
					openKeys={this.state.openKeys}
					openChange={this.onOpenChange}
					select={this.onSelect}
					selectedKeys={this.State_App.arr_selectedMenuId}
					mode="inline">
					{render_GenMenu(this.tree, this.$router)}
				</aMenu>
			</div>
		);
	}
});
</script>
<style lang="less">
.layout-menu {
	//background-color: white;
	height: 100%;
	overflow: auto;
	overflow-x: hidden;
}
</style>
