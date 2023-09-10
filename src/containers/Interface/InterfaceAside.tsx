import { xI, xU, xScope } from "@/ventose/ui";
import { defineComponent, onMounted } from "vue";
import { API } from "@/api";
import { cpt_treeData, stateInterface } from "@/state/interface";
import { _$arrayChangeIndex } from "@/utils/common";
import type Node from "element-plus/es/components/tree/src/model/node";
import type { NodeDropType } from "element-plus/es/components/tree/src/tree.type";
import { cptRouter } from "@/router/router";
import { ALL, CATEGORY, INTERFACE } from "@/utils/variable";
import { DialogUpsertCategory } from "./DialogUpsertCategory";
import { DialogAddInterface } from "./DialogAddInterface";
import { stateApp } from "@/state/app";

export const InterfaceAside = defineComponent({
	setup() {
		var vm = {
			styleAside: {
				width: "300px",
				position: "relative"
			},
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
			filterText: "",
			btnAddNew: {
				onClick() {}
			},
			siderHeight: 500,
			/* 同类 interface */
			_showAddInterfaceDialog(categoryId, $event: Event) {
				$event.stopPropagation();
				$event.preventDefault();
				xU.dialog({
					component: DialogAddInterface,
					title: xI("添加接口"),
					payload: {
						categoryId,
						projectId: cptRouter.value.query.project_id
					}
				});
			},
			_deleteInterface(id) {
				const vm = this;
				xU.confirm({
					title: xI("您确认删除此接口？"),
					content: xI(`温馨提示：接口删除后，无法恢复`),
					async onOk() {
						try {
							await API.project.deleteInterfaceById(id);
							xU.message.success(xI("删除接口成功"));
							stateInterface._updateInterfaceMenuList();
						} catch (error) {
							xU.message.error(error.message);
						}
					}
				});
			},
			_deleteCategory(id) {
				const vm = this;
				xU.confirm({
					title: "确定删除此接口分类吗？",
					content: `温馨提示：该操作会删除该分类下所有接口，接口删除后无法恢复`,
					async onOk() {
						try {
							await API.project.deleteCategoryById(id);
							xU.message.success("删除分类成功");
							stateInterface._updateInterfaceMenuList();
						} catch (error) {
							xU.message.error(error.message);
							return Promise.reject();
						}
					}
				});
			},
			_showUpsertCategoryDialog({ category }: any = {}) {
				xU.dialog({
					title: category ? xI("修改分类") : xI("添加分类"),
					component: DialogUpsertCategory,
					payload: {
						category
					}
				});
			},

			async _switchSameCategoryInterfaceOrder({ dragItem, dropItem }) {
				const category = xU.find(stateInterface.allCategory, {
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
			_setFilterText: xU.debounce(function (filterText) {
				vm.filterText = filterText;
				stateInterface.isLoading = false;
			}, 600),
			async _switchDiffCategoryInterfaceOrder({ dragItem, dropItem }) {
				await API.project.updateInterface({
					id: dragItem._id,
					catid: dropItem.categoryId
				});
			},

			async _switchCategoryOrder({ dragItem, dropItem }) {
				const paramsChanges = _$arrayChangeIndex(
					State_Project.allCategory,
					dragItem._id,
					dropItem._id
				);
				await API.project.switchManyCategoryOrder(paramsChanges);
			},
			async _handleDropInterface(
				draggingNode: Node,
				dropNode: Node,
				dropType: NodeDropType
			) {
				/*
                1.drag interface
                    1.1 drop 到同一个category
                    1.2 drop 到不同category
                2.drag category
                    2.1 调整 category 顺序
                */
				const dragItem = draggingNode.data;
				const dropItem = dropNode.data;
				const isDragInterface = dragItem.menuType === INTERFACE;
				const isDropSameCategory = dragItem.categoryId === dropItem.categoryId;
				const params = { dragItem, dropItem };
				try {
					if (isDragInterface) {
						if (isDropSameCategory) {
							await vm._switchSameCategoryInterfaceOrder(params);
						} else {
							await vm._switchDiffCategoryInterfaceOrder(params);
						}
					} else {
						await vm._switchCategoryOrder(params);
					}
					stateInterface._updateInterfaceMenuList();
				} catch (error) {
					xU.message.error(error.message);
				}
			}
		};
		vm = xScope(vm);

		onMounted(() => {
			if (!cptRouter.value.query.category_id) {
				cptRouter.value.query.category_id = ALL;
				cptRouter.value.query.interface_type = ALL;
			}
		});

		return function () {
			return (
				<aside class="x-sider_wrapper" style={vm.styleAside}>
					{/* {JSON.stringify(stateInterface.expandedKeys)} */}
					<div class="x-sider_wrapper_tree" ref="wrapper">
						<div
							class="left-tree box-shadow"
							v-element-size={({ height }) => (vm.siderHeight = height)}>
							<elScrollbar height={vm.siderHeight} class="flex1">
								<elTree
									height={vm.siderHeight}
									default-expand-all
									defaultExpandedKeys={stateInterface.expandedKeys}
									data={cpt_treeData.value}
									onNodeDragEnd={vm._handleDropInterface}
									draggable
									node-key="_id"
									expand-on-click-node={false}
									v-slots={{
										default(item) {
											try {
												const { data } = item;
												// console.log("data", data);
												const { title, _id, categoryId, menuType } = data;

												// title = `${title} ${_id} ${categoryId}`;

												const classContentString = (() => {
													let _classString = "x-sider-tree_menu";
													if (
														menuType === INTERFACE &&
														xU.isSame(_id, cptRouter.value.query.interface_id)
													) {
														_classString += " x-sider-tree_menu_active";
													}
													if (
														menuType === CATEGORY &&
														xU.isSame(
															categoryId,
															cptRouter.value.query.category_id
														)
													) {
														_classString += " x-sider-tree_menu_active";
													}

													return _classString;
												})();

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

												const handleClick = () => {
													cptRouter.value.query.interface_type = menuType;

													(() => {
														if (menuType == ALL) {
															cptRouter.value.query.interface_id = undefined;
															cptRouter.value.query.category_id = undefined;
															return;
														}
														if (menuType == CATEGORY) {
															cptRouter.value.query.interface_id = undefined;
															cptRouter.value.query.category_id = categoryId;
															return;
														}
														if (menuType == INTERFACE) {
															cptRouter.value.query.interface_id = _id;
															cptRouter.value.query.category_id = categoryId;
														}
													})();
												};

												if (menuType === ALL) {
													return (
														<div
															data-interface-all-menu
															class={classContentString}>
															<xGap l="10" />
															<xIcon icon="allCategory" />
															<div
																onClick={handleClick}
																class="x-sider-tree_menu_title">
																{title}
															</div>
															<div class="x-sider-tree_menu_opration">
																{/* 全部接口 */}
																{genIcon({
																	icon: "add",
																	tips: xI("添加分类"),
																	clickHandler: () =>
																		vm._showUpsertCategoryDialog()
																})}
																{genIcon({
																	icon: "refresh",
																	tips: xI("刷新"),
																	clickHandler: () =>
																		stateInterface._updateInterfaceMenuList()
																})}
															</div>
														</div>
													);
												}

												const vDomOpration = (() => {
													if (menuType === "category") {
														return (
															<div class="x-sider-tree_menu_opration">
																{genIcon({
																	icon: "add",
																	tips: xI("添加接口"),
																	clickHandler: $event =>
																		vm._showAddInterfaceDialog(
																			categoryId,
																			$event
																		)
																})}
																{genIcon({
																	icon: "edit",
																	tips: xI("修改分类"),
																	clickHandler: $event =>
																		vm._showUpsertCategoryDialog({
																			category: data
																		})
																})}
																{genIcon({
																	icon: "delete",
																	tips: xI("删除分类"),
																	clickHandler: $event =>
																		vm._deleteCategory(_id, $event)
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
																		vm._deleteInterface(_id, $event)
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
													<div class={classContentString}>
														<div
															class="x-sider-tree_menu_title"
															onClick={handleClick}>
															<xGap l="10" />
															<xIcon icon={iconName} />
															{title}
														</div>
														<div class="x-sider-tree_menu_opration">
															{vDomOpration}
														</div>
													</div>
												);
											} catch (error) {
												return null;
											}
										}
									}}
								/>
							</elScrollbar>
						</div>
					</div>
					<div class="resize_bar" icon="scroll" v-uiMove={vm.configsResize} />
				</aside>
			);
		};
	}
});
