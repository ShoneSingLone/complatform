import { xI, xU } from "@/ventose/ui";
import { defineComponent, ref, watch } from "vue";
import { xScope } from "@/ventose/ui";
import { stateWiki } from "@/state/wiki";
import { stateInterface } from "@/state/interface";
import { API } from "@/api";

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

			async _handleDropInterface(e) {
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
						await vm._switchCategoryOrder(params);
					}
					stateInterface._updateInterfaceMenuList();
				} catch (error) {
					xU.message.error(error.message);
				}
			}
		};
		vm = xScope(vm);

		return function () {
			return (
				<aside class="x-sider_wrapper" style={vm.styleAside}>
					<div class="x-sider_wrapper_tree" ref="wrapper">
						<div class="left-tree box-shadow">
							<ElScrollbar height={vm.siderHeight} class="flex1">
								<ElTree
									v-model:expandedKeys={stateWiki.expandedKeys}
									data={stateWiki.treeData}
									onNodeDragEnd={vm._handleDropInterface}
									draggable
									node-key="_id"
									expand-on-click-node={false}
									default-expand-all>
									{{
										default(item) {
											try {
												const { data } = item;
												const { title, _id, type } = data;
												const classContentString = (() => {
													let _classString = "x-sider-tree_menu";
													if (
														String(_id) == String(stateWiki.currentWiki._id)
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
													Methods_Wiki.clickWiki({ wiki_id: item.data._id });
													vm.$emit("change");
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
								</ElTree>
							</ElScrollbar>
						</div>
					</div>
					<div class="resize_bar" icon="scroll" v-uiMove={vm.configsResize} />
				</aside>
			);
		};
	}
});
