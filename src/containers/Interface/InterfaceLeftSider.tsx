import { xI, xU, xScope } from "@/ventose/ui";
import { defineComponent, onMounted } from "vue";
import { API } from "@/api";
import {
	cpt_treeData,
	cpt_interfaceId,
	stateInterface
} from "@/state/interface";
import { _$arrayChangeIndex } from "@/utils/common";
import type Node from "element-plus/es/components/tree/src/model/node";
import type { NodeDropType } from "element-plus/es/components/tree/src/tree.type";
import { Cpt_url } from "@/router/router";
import { ALL, CATEGORY, INTERFACE } from "@/utils/variable";

export const InterfaceLeftSider = defineComponent({
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
					this.State_Project.allCategory,
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
			if (!Cpt_url.value.query.category_id) {
				Cpt_url.value.query.category_id = ALL;
			}
		});

		return function () {
			return (
				<aside class="x-sider_wrapper" style={vm.styleAside}>
					{JSON.stringify(stateInterface.expandedKeys)}
					<div class="x-sider_wrapper_tree" ref="wrapper">
						<div
							class="left-tree box-shadow"
							v-element-size={({ height }) => (vm.siderHeight = height)}>
							<ElScrollbar height={vm.siderHeight} class="flex1">
								<ElTree
									height={vm.siderHeight}
									v-model:expandedKeys={stateInterface.expandedKeys}
									data={cpt_treeData.value}
									onNodeDragEnd={vm._handleDropInterface}
									draggable
									node-key="_id"
									expand-on-click-node={false}
									v-slots={{
										default(item) {
											try {
												const { data } = item;
												const { title, _id, categoryId, menuType } = data;

												const classContentString = (() => {
													let _classString = "x-sider-tree_menu";
													if (
														xU.isSame(_id, Cpt_url.value.query.interface_id)
													) {
														return _classString + " x-sider-tree_menu_active";
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
													Cpt_url.value.query.interface_type = menuType;

													(() => {
														if (menuType == ALL) {
															Cpt_url.value.query.interface_id = undefined;
															Cpt_url.value.query.category_id = undefined;
															return;
														}
														if (menuType == CATEGORY) {
															Cpt_url.value.query.interface_id = undefined;
															Cpt_url.value.query.category_id = categoryId;
															return;
														}
														if (menuType == INTERFACE) {
															Cpt_url.value.query.interface_id = _id;
															Cpt_url.value.query.category_id = categoryId;
														}
													})();
												};

												const canDelete =
													!item?.children || item?.children?.length === 0;

												return (
													<div class={classContentString}>
														<xGap l="10" onClick={handleClick} />
														<xIcon icon="icon_article" onClick={handleClick} />
														<div
															class="x-sider-tree_menu_title"
															onClick={handleClick}>
															<xHighlight
																content={title}
																filter={vm.filterText}
															/>
														</div>
														<div class="x-sider-tree_menu_opration">
															{genIcon({
																icon: "add",
																tips: xI("添加"),
																clickHandler: () =>
																	vm.showUpsertArticleDialog(item.data)
															})}
															{canDelete &&
																genIcon({
																	icon: "delete",
																	tips: xI("删除"),
																	clickHandler: () => vm.deleteArticle(_id)
																})}
														</div>
													</div>
												);
											} catch (error) {
												return null;
											}
										}
									}}
								/>
							</ElScrollbar>
						</div>
					</div>
					<div class="resize_bar" icon="scroll" v-uiMove={vm.configsResize} />
				</aside>
			);
		};
	}
});
