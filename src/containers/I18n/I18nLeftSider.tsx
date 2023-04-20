import { defineComponent } from "vue";
import { $, xU, UI, compositionAPI, $t } from "@ventose/ui";
import { API } from "@/api/index";
import { DialogUpsertI18nRecord } from "./DialogUpsertI18nRecord";
import { Cpt_url } from "@/router/router";
import { AntTreeNodeDropEvent } from "ant-design-vue/lib/tree/Tree";
import { _$arrayChangeIndex, getTreeOrder } from "@/utils/common";
import { State_App } from "@/state/State_App";
import { stateI18n } from "./State_i18n";

const { usefnObserveDomResize } = compositionAPI;

stateI18n._$resetSelf();
/* root 是文件夹，或者文档都可以 */
/* 文件夹 编辑、 添加文档、文件夹 */
/* 文档 编辑、删除 */

export const I18nLeftSider = defineComponent({
	emits: ["change"],
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			State_Wiki: stateI18n,
			State_App,
			Cpt_url,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	watch: {
		filterText(text) {
			stateI18n.isLoading = true;
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
				text: $t("新增").label,
				onClick: () => this.openDialogUpsertI18nRecord()
			};
		},
		btnRefresh() {
			return {
				preset: "refresh",
				onClick: () => Methods_Wiki.updateWikiMenuList({ belong_type: "all" })
			};
		},
		vDomTree() {
			const vm = this;
			return (
				<div
					class="elevation-2 height100 padding10"
					style="border-radius: 8px;">
					<div class="flex mb10">
						<xButton configs={vm.btnAddNew} />
						<xGap l="10" />
						<xButton configs={vm.btnRefresh} />
					</div>
					<aTree
						v-model:expandedKeys={stateI18n.expandedKeys}
						height={vm.siderHeight}
						treeData={stateI18n.i18nRecordArray}
						draggable
						onDrop={vm.handleDropArticle}
						fieldNames={vm.configs.fieldNames}>
						{{
							title(item) {
								const { title, _id, type } = item;
								const classContentString = (() => {
									let _classString = "flex middle x-sider-tree_menu";
									if (String(_id) == String(stateI18n.currentI18n._id)) {
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
												v-uiPopover={{ content: tips, delay: 1000 }}
												onClick={clickHandler}
											/>
											<xGap l="8" />
										</>
									);
								};

								const handleClick = () => {
									stateI18n.isLoading = true;
									vm.Cpt_url.go("/i18n", { wiki_id: item.data._id });
									vm.$emit("change");
									setTimeout(() => {
										/* 内网环境，数据3秒都回不来，就有点呵呵了 */
										stateI18n.isLoading = false;
									}, 1000 * 3);
								};

								const canDelete =
									!item?.children || item?.children?.length === 0;

								return (
									<div class={classContentString} onClick={handleClick}>
										<xGap l="10" />
										<xIcon icon="icon_article" />
										<span class="x-sider-tree_menu_title">
											<div class="flex middle">{item.id}</div>
										</span>
										<div class="flex middle x-sider-tree_menu_opration">
											{genIcon({
												icon: "add",
												tips: vm.$t("添加").label,
												clickHandler: () =>
													vm.openDialogUpsertI18nRecord(item.data)
											})}
											{canDelete &&
												genIcon({
													icon: "delete",
													tips: vm.$t("删除").label,
													clickHandler: () => vm.deleteArticle(_id)
												})}
										</div>
									</div>
								);
							}
						}}
					</aTree>
				</div>
			);
		}
	},
	methods: {
		async handleDropArticle(e: AntTreeNodeDropEvent) {
			stateI18n.isLoading = true;
			/*
			 * boolean类型，true代表拖拽到节点之间的缝隙中，false代表拖拽到节点上，即节点的内容区。
			 * dropPosition:dropItemPos=index
			 * * * 拖拽到节点之上： index-1
			 * * * 拖拽到节点上： 	index
			 * * * 拖拽到节点之下： index+1
			 */
			const { dragNode: dragItem, node: dropItem, dropPosition, dropToGap } = e;
			const params = {
				dragItem: dragItem.dataRef,
				dropItem: dropItem.dataRef,
				dropToGap,
				dropPosition
			};
			try {
				await this.moveItemAndResetOrder(params);
			} catch (error) {
				UI.message.error(error.message);
			} finally {
				stateI18n.isLoading = false;
			}
		},
		/* 同类 testcase */
		async moveItemAndResetOrder({
			dragItem,
			dropItem,
			dropToGap,
			dropPosition
		}) {
			dragItem = { ...dragItem };
			dropItem = { ...dropItem };
			const menuOrderArray = getTreeOrder(stateI18n.i18nRecordArray);
			const dragIndex = menuOrderArray.indexOf(dragItem._id);
			const dropIndex = menuOrderArray.indexOf(dropItem._id);

			if (dropToGap) {
				dragItem.p_id = dropItem.p_id;
				menuOrderArray.splice(dragIndex, 1);
				menuOrderArray.splice(dropIndex, 0, dragItem._id);
			} else {
				dragItem.p_id = dropItem._id;
			}

			try {
				await API.wiki.action({ action: "upsertOne", data: dragItem });
				await API.wiki.resetMenuOrder({
					order: menuOrderArray,
					belong_type: "all"
				});
				await Methods_Wiki.updateWikiMenuList({ belong_type: "all" });
				UI.message.success($t("更新成功").label);
			} catch (error) {
				UI.message.error(error.message);
			}
		},
		setFilterText: xU.debounce(function (filterText) {
			stateI18n.filterText = filterText;
			stateI18n.isLoading = false;
		}, 600),
		/* vDomList 需要实际高度 */
		setSiderHeight: xU.debounce(function (siderHeight) {
			this.siderHeight = siderHeight;
		}, 20),
		deleteArticle(_id) {
			const vm = this;
			UI.dialog.confirm({
				title: "确定删除此文档吗？",
				content: `文档删除后无法恢复`,
				async onOk() {
					try {
						await API.wiki.delete(_id);
						UI.message.success("删除文档成功");
						await Methods_Wiki.updateWikiMenuList({ belong_type: "all" });
						vm.Cpt_url.go("/i18n", {
							wiki_id: xU.first(stateI18n.i18nRecordArray)?._id
						});
					} catch (error) {
						UI.message.error(error.message);
						return Promise.reject();
					}
				}
			});
		},
		openDialogUpsertI18nRecord(record) {
			UI.dialog.component({
				title: this.$t("添加记录").label,
				record,
				component: DialogUpsertI18nRecord
			});
		}
	},
	render() {
		return (
			<aside
				class="x-sider_wrapper flex vertical move-transition padding10"
				style={this.styleAside}>
				<div class="x-sider_wrapper_tree flex1 mt10 mb10" ref="wrapper">
					{this.vDomTree}
				</div>
				<div class="resize_bar" icon="scroll" v-uiMove={this.configsResize} />
			</aside>
		);
	}
});
