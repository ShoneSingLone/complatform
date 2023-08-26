import { defineComponent, ref, watch } from "vue";
import { $, xU, compositionAPI, xI } from "@/ventose/ui";
import { DialogUpsertCategory } from "./DialogUpsertCategory";
import { API } from "@/api/index";
import { ALL } from "@/utils/variable";
import {
	Methods_ProjectInterface,
	stateInterface
} from "@/state/interface";
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

export const ProjectInterfaceLeftSider = defineComponent({
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			stateApp,
			State_Project: stateInterface,
			Cpt_url,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	watch: {
		filterText(text) {
			this.State_Project.isLoading = true;
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
			filterText: "",
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
		Methods_ProjectInterface.updateInterfaceMenuList();
		Methods_ProjectInterface.setExpand();
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
			return DefaultInterfaceMenu.concat(this.State_Project.allCategory);
		},
		vDomTree() {
			const vm = this;
			return (
				<div class="left-tree box-shadow">
					<ElTree
						v-model:expandedKeys={vm.State_Project.expandedKeys}
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
													clickHandler:
														Methods_ProjectInterface.updateInterfaceMenuList
												})}
											</div>
										</div>
									);
								}

								if (xU.isArray(list)) {
									/* { "edit_uid": 0, "status": "undone", "isProxy": false, "witchEnv": "", "index": 0, "tag": [], "_id": 9, "method": "GET", "catid": 56, "title": "first", "path": "/aws_ecs/goku/rest/vdc/v3.1/projects", "project_id": 83, "uid": 12, "add_time": 1669122695, "up_time": 1669122695 } */
								}

								const vDomOpration = (() => {
									if (menuType === "category") {
										return (
											<div class="x-sider-tree_menu_opration">
												{genIcon({
													icon: "add",
													tips: xI("添加接口"),
													clickHandler: $event =>
														vm.showAddInterfaceDialog(_id, $event)
												})}
												{genIcon({
													icon: "edit",
													tips: xI("修改分类"),
													clickHandler: $event =>
														vm.showUpsertCategoryDialog(item)
												})}
												{genIcon({
													icon: "delete",
													tips: xI("删除分类"),
													clickHandler: $event => vm.deleteCategory(_id, $event)
												})}
											</div>
										);
									} else {
										return (
											<div class="x-sider-tree_menu_opration">
												{genIcon({
													icon: "delete",
													tips: xI("删除接口"),
													clickHandler: $event =>
														vm.deleteInterface(_id, $event)
												})}
											</div>
										);
									}
								})();

								let iconName = "subCategoryInterface";
								if (menuType === "category") {
									iconName = "subCategory";
								}

								return (
									<div class={classContentString} onClick={handleClickMenuItem}>
										<xGap l="10" />
										<xIcon icon={iconName} />
										<span class="x-sider-tree_menu_title">{title}</span>
										{vDomOpration}
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
		async handleDropInterface(e) {
			this.State_Project.isLoading = true;
			/*
			1.drag interface
				1.1 drop 到同一个category
				1.2 drop 到不同category
			2.drag category
				2.1 调整 category 顺序
			*/
			const dragItem = e.dragNode;
			const dropItem = e.node;
			const isDragInterface = dragItem.menuType === "interface";
			const isDropSameCategory = dragItem.categoryId === dropItem.categoryId;

			const params = { dragItem, dropItem };

			try {
				if (isDragInterface) {
					if (isDropSameCategory) {
						await this.switchSameCategoryInterfaceOrder(params);
					} else {
						await this.switchDiffCategoryInterfaceOrder(params);
					}
				} else {
					await this.switchCategoryOrder(params);
				}
				Methods_ProjectInterface.updateInterfaceMenuList();
			} catch (error) {
				xU.message.error(error.message);
			} finally {
				setTimeout(() => {
					this.State_Project.isLoading = false;
				}, 400);
			}
		},
		/* 同类 interface */
		async switchSameCategoryInterfaceOrder({ dragItem, dropItem }) {
			const category = xU.find(this.State_Project.allCategory, {
				_id: dragItem.categoryId
			});
			const paramsChanges = _$arrayChangeIndex(
				category.list,
				dragItem._id,
				dropItem._id
			);
			await API.project.switchManyInterfaceOrder(paramsChanges);
		},
		/* interface 换 category */
		async switchDiffCategoryInterfaceOrder({ dragItem, dropItem }) {
			await API.project.updateInterface({
				id: dragItem._id,
				catid: dropItem.categoryId
			});
		},
		async switchCategoryOrder({ dragItem, dropItem }) {
			const paramsChanges = _$arrayChangeIndex(
				this.State_Project.allCategory,
				dragItem._id,
				dropItem._id
			);
			await API.project.switchManyCategoryOrder(paramsChanges);
		},
		setFilterText: xU.debounce(function (filterText) {
			this.State_Project.filterText = filterText;
			this.State_Project.isLoading = false;
		}, 600),
		setSelectedKeys(id) {
			this.selectedKeys = [id];
		},
		/* vDomList 需要实际高度 */
		setSiderHeight: xU.debounce(function (siderHeight) {
			this.siderHeight = siderHeight;
		}, 20),
		deleteInterface(id) {
			const vm = this;
			xU.confirm({
				title: xI("您确认删除此接口？"),
				content: xI(`温馨提示：接口删除后，无法恢复`).label,
				async onOk() {
					try {
						await API.project.deleteInterfaceById(id);
						xU.message.success(xI("删除接口成功"));
						Methods_ProjectInterface.updateInterfaceMenuList();
						vm.Cpt_url.go(
							"/interface/all",
							xU.omit(vm.Cpt_url.query, ["category_id", "interface_id"])
						);
					} catch (error) {
						xU.message.error(error.message);
					}
				}
			});
		},
		deleteCategory(id) {
			const vm = this;
			xU.dialog.confirm({
				title: "确定删除此接口分类吗？",
				content: `温馨提示：该操作会删除该分类下所有接口，接口删除后无法恢复`,
				async onOk() {
					try {
						await API.project.deleteCategoryById(id);
						xU.message.success("删除分类成功");
						Methods_ProjectInterface.updateInterfaceMenuList();
						vm.Cpt_url.go(
							"/interface/all",
							xU.omit(vm.Cpt_url.query, ["category_id"])
						);
					} catch (error) {
						xU.message.error(error.message);
						return Promise.reject();
					}
				}
			});
		},
		showUpsertCategoryDialog(category = false) {
			xU.openDialog({
				title: category ? this.xI("修改分类") : this.xI("添加分类"),
				component: DialogUpsertCategory,
				category
			});
		},
		showAddInterfaceDialog(categoryId, $event: Event) {
			$event.stopPropagation();
			$event.preventDefault();
			xU.openDialog({
				title: this.xI("添加接口"),
				categoryId,
				projectId: this.stateApp.currProject._id,
				component: DialogAddInterface
			});
		}
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
