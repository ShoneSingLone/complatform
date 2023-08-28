import { defineComponent, reactive, ref, watch } from "vue";
import { $, xU, compositionAPI, stateUI, xI } from "@/ventose/ui";
import { API } from "@/api/index";
import { DialogAddArticle } from "./DialogAddArticle";
import { Cpt_url, cpt_isPersonalWikiView } from "@/router/router";
import { _$arrayChangeIndex, getTreeOrder } from "@/utils/common";
import { stateApp } from "@/state/app";
import { Methods_Wiki, stateWiki } from "@/state/wiki";
import type Node from "element-plus/es/components/tree/src/model/node";
import type { NodeDropType } from "element-plus/es/components/tree/src/tree.type";

const { usefnObserveDomResize } = compositionAPI;

/* root 是文件夹，或者文档都可以 */
/* 文件夹 编辑、 添加文档、文件夹 */
/* 文档 编辑、删除 */

export const WikiLeftSider = defineComponent({
	props: ["isShow"],
	emits: ["change"],
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			stateWiki,
			stateApp,
			Cpt_url,
			cpt_isPersonalWikiView,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	watch: {},
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
			siderHeight: 500,
			configs: {
				fieldNames: {
					key: "_id"
				}
			}
		};
	},
	async mounted() {
		this.fnObserveDomResize(this.$refs.wrapper, () => {
			/* mt mb 共计20 */
			const siderHeight = Math.floor($(this.$refs.wrapper).height()) - 52;
			this.setSiderHeight(siderHeight);
		});
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	computed: {
		btnAddNew() {
			return {
				text: xI("新增"),
				isShow() {
					const { user_id } = Cpt_url.value.query;
					if (user_id) {
						return String(user_id) === String(stateApp.user._id);
					}

					return true;
				},
				onClick: () => this.showUpsertArticleDialog()
			};
		},
		btnRefresh() {
			return {
				preset: "refresh",
				onClick: () => Methods_Wiki.updateWikiMenuList()
			};
		},
		vDomTree() {
			const vm = this;
			return (
				<div class="left-tree box-shadow">
					<div class="flex mb10 middle">
						<ElInput v-model={vm.filterText} />
						<xGap l="10" />
						<xIcon
							icon="add"
							onClick={vm.btnAddNew.onClick}
							class="icon-opreation_click"
						/>
						<xGap l="10" />
						<xIcon
							icon="refresh"
							onClick={vm.btnRefresh.onClick}
							class="icon-opreation_click"
						/>
					</div>
					<ElScrollbar height={vm.siderHeight} class="flex1">
						<ElTree
							v-model:expandedKeys={vm.stateWiki.expandedKeys}
							data={vm.stateWiki.treeData}
							onNodeDragEnd={vm.handleDropArticle}
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
											if (String(_id) == String(vm.stateWiki.currentWiki._id)) {
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
													<xHighlight content={title} filter={vm.filterText} />
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
			);
		}
	},
	methods: {
		async handleDropArticle(
			draggingNode: Node,
			dropNode: Node,
			dropType: NodeDropType
		) {
			stateWiki.isLoading = true;
			const params = {
				dragItem: draggingNode.data,
				dropItem: dropNode.data,
				dropType
			};
			try {
				await this.moveItemAndResetOrder(params);
			} catch (error) {
				xU.message.error(error.message);
			} finally {
				stateWiki.isLoading = false;
			}
		},
		/* 同类 testcase */
		async moveItemAndResetOrder({ dragItem, dropItem, dropType }) {
			dragItem = { ...dragItem };
			dropItem = { ...dropItem };
			if (dragItem._id == dropItem._id) {
				return;
			}
			const menuOrderArray = getTreeOrder(stateWiki.treeData);
			const dragIndex = menuOrderArray.indexOf(dragItem._id);
			if (dropType === "inner") {
				dragItem.p_id = dropItem._id;
			}

			if (dropType === "after") {
				dragItem.p_id = dropItem.p_id;
				menuOrderArray.splice(dragIndex, 1);
				const dropIndex = menuOrderArray.indexOf(dropItem._id);
				menuOrderArray.splice(dropIndex + 1, 0, dragItem._id);
			}

			if (dropType === "before") {
				dragItem.p_id = dropItem.p_id;
				menuOrderArray.splice(dragIndex, 1);
				let dropIndex = menuOrderArray.indexOf(dropItem._id);
				if (dropIndex === 0) {
					menuOrderArray.unshift(dragItem._id);
				} else {
					menuOrderArray.splice(dropIndex - 1, 0, dragItem._id);
				}
			}

			try {
				await API.wiki.upsertOne(dragItem);
				await API.wiki.resetMenuOrder({
					order: menuOrderArray,
					belong_type: stateWiki.belongType,
					belong_id: (() => {
						const { group_id, project_id } = Cpt_url.value.query;
						const s_map = {
							group: group_id,
							project: project_id
						};
						return s_map[stateWiki.belongType];
					})()
				});
				await Methods_Wiki.updateWikiMenuList();
				xU.message.success(xI("更新成功"));
			} catch (error) {
				xU.message.error(error.message);
			}
		},
		/* vDomList 需要实际高度 */
		setSiderHeight: xU.debounce(function (siderHeight) {
			this.siderHeight = siderHeight;
		}, 300),
		async deleteArticle(_id) {
			const vm = this;
			xU.deleteConfirm({
				content: `文档删除后无法恢复`,
				async onOk() {
					try {
						await API.wiki.delete(_id);
						xU.message.success("删除文档成功");
						await Methods_Wiki.updateWikiMenuList();
						Methods_Wiki.clickWiki({
							wiki_id: xU.first(stateWiki.treeData)?._id
						});
					} catch (error) {
						xU.message.error(error.message);
					}
				}
			});
		},
		showUpsertArticleDialog(parentDoc) {
			xU.dialog({
				title: xI("添加文档"),
				parentDoc,
				/* 所有人可见 */
				belong_type: "all",
				component: DialogAddArticle
			});
		}
	},
	render() {
		if (!this.isShow) {
			return null;
		}
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
