import { defineComponent, ref, watch } from "vue";
import { $, xU, compositionAPI, stateUI, xI } from "@/ventose/ui";
import { DialogUpsertCategory } from "./DialogUpsertCategory";
import { API } from "@/api";
import { ALL } from "@/utils/variable";
import { DialogAddInterface } from "./DialogAddInterface";
import { cptRouter } from "@/router/router";
import { _$arrayChangeIndex } from "@/utils/common";
import { stateApp } from "@/state/app";
import {
	stateProjectTestcase,
	Methods_ProjectTestcase
} from "@/state/projectTestcase";

const { usefnObserveDomResize } = compositionAPI;

export const DefaultTestcaseMenu = [
	{
		_id: ALL,
		title: xI("全部用例"),
		menuType: ALL,
		list: []
	}
];

export const ProjectTestcaseLeftSider = defineComponent({
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			stateApp,
			stateProjectTestcase,
			cptRouter,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	watch: {
		filterText(text) {
			this.stateProjectTestcase.isLoading = true;
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
		Methods_ProjectTestcase.updateTestcaseMenuList();
		Methods_ProjectTestcase.setExpand();
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	computed: {
		currentSelectedMenu() {
			const { pathname, query } = this.cptRouter;
			const StrategyMap = {
				"/project/testcase/all": ALL,
				"/project/testcase/category": query.category_id,
				"/project/testcase/detail": query.interface_id
			};
			return StrategyMap[pathname];
		},
		treeData() {
			return DefaultTestcaseMenu.concat(this.stateProjectTestcase.allCategory);
		},
		vDomTree() {
			const vm = this;
			return (
				<div class="left-tree box-shadow">
					<ElTree
						v-model:expandedKeys={vm.stateProjectTestcase.expandedKeys}
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
										cptRouter.value.go(
											"/project/testcase/all",
											xU.omit(cptRouter.value.query, [
												"category_id",
												"interface_id"
											])
										);
									} else if (menuType === "category") {
										cptRouter.value.go("/project/testcase/category", {
											...cptRouter.value.query,
											category_id: _id
										});
									} else {
										cptRouter.value.go("/project/testcase/detail", {
											...cptRouter.value.query,
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
											data-testcase-all-menu
											class={classContentString}
											onClick={handleClickMenuItem}>
											<xGap l="10" />
											<xIcon icon="allCategory" />
											<span class="x-sider-tree_menu_title">{title}</span>
											<div class="x-sider-tree_menu_opration">
												{genIcon({
													icon: "add",
													tips: xI("添加集合"),
													clickHandler: () =>
														vm.showUpsertTestcaseCategoryDialog()
												})}
												{genIcon({
													icon: "refresh",
													tips: xI("刷新"),
													clickHandler:
														Methods_ProjectTestcase.updateTestcaseMenuList
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
													tips: xI("添加用例"),
													clickHandler: $event =>
														vm.showAddTestcaseDialog(_id, $event)
												})}
												{genIcon({
													icon: "edit",
													tips: xI("修改集合"),
													clickHandler: $event =>
														vm.showUpsertTestcaseCategoryDialog(item)
												})}
												{genIcon({
													icon: "delete",
													tips: xI("删除集合"),
													clickHandler: $event => vm.deleteCategory(_id, $event)
												})}
											</div>
										);
									} else {
										return (
											<div class="x-sider-tree_menu_opration">
												{genIcon({
													icon: "delete",
													tips: xI("删除用例"),
													clickHandler: $event =>
														vm.deleteInterface(_id, $event)
												})}
											</div>
										);
									}
								})();

								if (menuType === "category") {
									return (
										<div
											class={classContentString}
											onClick={handleClickMenuItem}>
											<xGap l="10" />
											<xIcon icon="subCategory" />
											<span class="x-sider-tree_menu_title">{title}</span>
											{vDomOpration}
										</div>
									);
								} else {
									return (
										<div
											class={classContentString}
											onClick={handleClickMenuItem}>
											<span class="x-sider-tree_menu_title">
												<div class="flex middle">
													<div class="testcase-title__wrapper mr4">
														<span class="testcase-title">{_id}</span>
													</div>
													{title}
												</div>
											</span>
											{vDomOpration}
										</div>
									);
								}
							}
						}}
					</ElTree>
				</div>
			);
		}
	},
	methods: {
		async handleDropInterface(e: any) {
			this.stateProjectTestcase.isLoading = true;
			/*
			1.drag testcase
				1.1 drop 到同一个category
				1.2 drop 到不同category
			2.drag category
				2.1 调整 category 顺序
			*/
			const dragItem = e.dragNode;
			const dropItem = e.node;
			const isDragInterface = dragItem.menuType === "testcase";
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
				Methods_ProjectTestcase.updateTestcaseMenuList();
			} catch (error) {
				xU.message.error(error.message);
			} finally {
				setTimeout(() => {
					this.stateProjectTestcase.isLoading = false;
				}, 400);
			}
		},
		/* 同类 testcase */
		async switchSameCategoryInterfaceOrder({ dragItem, dropItem }) {
			const category = xU.find(this.stateProjectTestcase.allCategory, {
				_id: dragItem.categoryId
			});
			const paramsChanges = _$arrayChangeIndex(
				category.list,
				dragItem._id,
				dropItem._id
			);
			await API.project.switchManyInterfaceOrder(paramsChanges);
		},
		/* testcase 换 category */
		async switchDiffCategoryInterfaceOrder({ dragItem, dropItem }) {
			await API.project.updateInterface({
				id: dragItem._id,
				catid: dropItem.categoryId
			});
		},
		async switchCategoryOrder({ dragItem, dropItem }) {
			const paramsChanges = _$arrayChangeIndex(
				this.stateProjectTestcase.allCategory,
				dragItem._id,
				dropItem._id
			);
			await API.project.switchManyCategoryOrder(paramsChanges);
		},
		setFilterText: xU.debounce(function (filterText) {
			this.stateProjectTestcase.filterText = filterText;
			this.stateProjectTestcase.isLoading = false;
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
				title: xI("您确认删除此用例？"),
				content: xI(`温馨提示：用例删除后，无法恢复`),
				async onOk() {
					try {
						await API.project.deleteInterfaceById(id);
						xU.message.success(xI("删除用例成功"));
						Methods_ProjectTestcase.updateTestcaseMenuList();
						vm.cptRouter.go(
							"/project/testcase/all",
							xU.omit(vm.cptRouter.query, ["category_id", "interface_id"])
						);
					} catch (error) {
						xU.message.error(error.message);
					}
				}
			});
		},
		deleteCategory(id) {
			const vm = this;
			xU.confirm({
				title: "确定删除此用例集合吗？",
				content: `温馨提示：该操作会删除该集合下所有用例，用例删除后无法恢复`,
				async onOk() {
					try {
						await API.project.deleteCategoryById(id);
						xU.message.success("删除集合成功");
						Methods_ProjectTestcase.updateTestcaseMenuList();
						vm.cptRouter.go(
							"/project/testcase/all",
							xU.omit(vm.cptRouter.query, ["category_id"])
						);
					} catch (error) {
						xU.message.error(error.message);
						return Promise.reject();
					}
				}
			});
		},
		showUpsertTestcaseCategoryDialog(category = false) {
			xU.dialog({
				title: category ? xI("修改集合") : xI("添加集合"),
				component: DialogUpsertCategory,
				category
			});
		},
		showAddTestcaseDialog(categoryId, $event: Event) {
			$event.stopPropagation();
			$event.preventDefault();
			xU.dialog({
				title: xI("添加用例"),
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
