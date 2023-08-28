import { defineComponent, ref, watch } from "vue";
import { $, xU, compositionAPI, xI } from "@/ventose/ui";
import { DialogUpsertCategory } from "./DialogUpsertCategory";
import { API } from "@/api/index";
import { ALL } from "@/utils/variable";
import { stateInterface } from "@/state/interface";
import { DialogAddInterface } from "./DialogAddInterface";
import { Cpt_url } from "@/router/router";
import { _$arrayChangeIndex } from "@/utils/common";
import { stateApp } from "@/state/app";

const DefaultInterfaceMenu = [
	{
		_id: ALL,
		title: xI("全部接口"),
		menuType: ALL,
		list: []
	}
];

const { usefnObserveDomResize } = compositionAPI;

export const InterfaceLeftSider = defineComponent({
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			stateApp,
			stateInterface: stateInterface,
			Cpt_url,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	watch: {
		cpt_filterText(text) {
			this.stateInterface.isLoading = true;
			this.setFilterText(text);
		}
	},
	data(vm) {
		return {
			configsResize: {
				onMoving({ clickEvent, movingEvent, clickInfo }) {
					const { left: leftStart } = clickInfo;
					let left = 16 + leftStart + movingEvent.clientX - clickEvent.clientX;
					if (left < 100) {
						left = 100;
					}
					vm.styleAside.width = `${left}px`;
				}
			},
			styleAside: {
				width: "300px",
				position: "relative"
			},
			cpt_filterText: "",
			selectedKeys: [ALL],
			siderHeight: 500,
			configs: {
				fieldNames: {
					children: "list",
					key: "_id"
				}
			}
		};
	},
	mounted() {
		this.fnObserveDomResize(this.$refs.wrapper, () => {
			/* mt mb 共计20 */
			const siderHeight = Math.floor($(this.$refs.wrapper).height()) - 20;
			this.setSiderHeight(siderHeight);
		});
		stateInterface._updateInterfaceMenuList();
		stateInterface._setExpand();
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	computed: {
		currentSelectedMenu() {
			const { pathname, query } = this.Cpt_url;
			const StrategyMap = {
				"/interface/all": ALL,
				"/interface/category": query.category_id,
				"/interface/detail": query.interface_id
			};
			return StrategyMap[pathname];
		},
		treeData() {
			return DefaultInterfaceMenu.concat(this.stateInterface.allCategory);
		},
		vDomTree() {
			const vm = this;
			return (
				<div class="left-tree box-shadow">
					<ElTree
						v-model:expandedKeys={vm.stateInterface.expandedKeys}
						height={vm.siderHeight}
						treeData={vm.treeData}
						draggable
						onDrop={vm.handleDropInterface}
						fieldNames={vm.configs.fieldNames}>
						{{
							title(item) {
								const { title, _id, list, menuType, categoryId } = item;
								const classContentString = (() => {
									let _classString = "x-sider-tree_menu";
									if (String(_id) == String(vm.currentSelectedMenu)) {
										return _classString + " x-sider-tree_menu_active";
									}
									return _classString;
								})();

								const handleClickMenuItem = () => {
									if (menuType === ALL) {
										Cpt_url.value.go(
											"/interface/all",
											xU.omit(Cpt_url.value.query, [
												"category_id",
												"interface_id"
											])
										);
									} else if (menuType === "category") {
										Cpt_url.value.go("/interface/category", {
											...Cpt_url.value.query,
											category_id: _id
										});
									} else {
										Cpt_url.value.go("/interface/detail", {
											...Cpt_url.value.query,
											category_id: categoryId,
											interface_id: _id
										});
									}
									vm.setSelectedKeys(_id);
								};
								const genIcon = ({ icon, tips, clickHandler }) => {
									return (
										<>
											<xIcon
												icon={icon}
												class="x-sider-tree_menu_icon"
												v-xTips={{ content: tips, delay: 1000 }}
												onClick={clickHandler}
											/>
											<xGap l="8" />
										</>
									);
								};

								if (menuType === ALL) {
									return (
										<div
											data-interface-all-menu
											class={classContentString}
											onClick={handleClickMenuItem}>
											<xGap l="10" />
											<xIcon icon="allCategory" />
											<span class="x-sider-tree_menu_title">{title}</span>
											<div class="x-sider-tree_menu_opration">
												{genIcon({
													icon: "add",
													tips: xI("添加分类"),
													clickHandler: () => vm.showUpsertCategoryDialog()
												})}
												{genIcon({
													icon: "refresh",
													tips: xI("刷新"),
													clickHandler: stateInterface._updateInterfaceMenuList
												})}
											</div>
										</div>
									);
								}

								if (xU.isArray(list)) {
									/* { "edit_uid": 0, "status": "undone", "isProxy": false, "witchEnv": "", "index": 0, "tag": [], "_id": 9, "method": "GET", "catid": 56, "title": "first", "path": "/aws_ecs/goku/rest/vdc/v3.1/projects", "project_id": 83, "uid": 12, "add_time": 1669122695, "up_time": 1669122695 } */
								}

								return (
									<div class={classContentString} onClick={handleClickMenuItem}>
										<xGap l="10" />
										<xIcon icon={iconName} />
										<span class="x-sider-tree_menu_title">{title}</span>
									</div>
								);
							}
						}}
					</ElTree>
				</div>
			);
		}
	},
	methods: {
		setSelectedKeys(id) {
			this.selectedKeys = [id];
		},
		/* vDomList 需要实际高度 */
		setSiderHeight: xU.debounce(function (siderHeight) {
			this.siderHeight = siderHeight;
		}, 20)
	},
	render() {
		return (
			<aside class="x-sider_wrapper" style={this.styleAside}>
				<div class="x-sider_wrapper_tree" ref="wrapper">
					{this.vDomTree}
				</div>
				<div class="resize_bar" icon="scroll" v-uiMove={this.configsResize} />
			</aside>
		);
	}
});
