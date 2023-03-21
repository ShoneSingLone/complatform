import { defineComponent, reactive, ref, watch } from "vue";
import { $, xU, UI, compositionAPI, State_UI, $t } from "@ventose/ui";
import { API } from "@/api/index";
import { ARTICLE, FOLDER } from "@/utils/variable";
import { DialogAddArtical } from "./DialogAddArtical";
import { Cpt_url } from "@/router/router";
import { AntTreeNodeDropEvent } from "ant-design-vue/lib/tree/Tree";
import { _$arrayChangeIndex } from "@/utils/common";
import { State_App } from "@/state/State_App";
import { Methods_Wiki, State_Wiki } from "./State_Wiki";

const { usefnObserveDomResize } = compositionAPI;

/* root 是文件夹，或者文档都可以 */
/* 文件夹 编辑、 添加文档、文件夹 */
/* 文档 编辑、删除 */

export const WikiLeftSider = defineComponent({
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			State_Wiki,
			State_App,
			Cpt_url,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	watch: {
		filterText(text) {
			this.State_Wiki.isLoading = true;
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
			selectedKeys: [ARTICLE],
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
			const siderHeight = Math.floor($(this.$refs.wrapper).height()) - 20;
			this.setSiderHeight(siderHeight);
		});

		const _id = this.Cpt_url.query.wiki_id;
		if (_id) {
			Methods_Wiki.setCurrentWiki(_id);
		}
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	computed: {
		btnAddNew() {
			return {
				text: $t("新增").label,
				onClick: () => this.showUpsertArticleDialog()
			};
		},
		btnRefresh() {
			return {
				preset: "refresh",
				onClick: Methods_Wiki.updateWikiMenuList
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
						v-model:expandedKeys={vm.State_Wiki.expandedKeys}
						height={vm.siderHeight}
						treeData={vm.State_Wiki.treeData}
						draggable
						onDrop={vm.handleDropInterface}
						fieldNames={vm.configs.fieldNames}>
						{{
							title(item) {
								const { title, _id, type } = item;
								const classContentString = (() => {
									let _classString = "flex middle x-sider-tree_menu";
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
								if (type === FOLDER) {
									return (
										<div
											class={classContentString}
											onClick={() => {
												Methods_Wiki.setCurrentWiki(item);
											}}>
											<xGap l="10" />
											<xIcon icon="folder" />
											<span class="x-sider-tree_menu_title">{title}</span>
											<div class="flex middle x-sider-tree_menu_opration">
												{genIcon({
													icon: "refresh",
													tips: vm.$t("刷新").label,
													clickHandler: vm.showUpsertArticleDialog
												})}
											</div>
										</div>
									);
								} else {
									return (
										<div
											class={classContentString}
											onClick={() => {
												vm.Cpt_url.go("/wiki", { wiki_id: item.data._id });
												Methods_Wiki.setCurrentWiki(item.data._id);
											}}>
											<xGap l="10" />
											<xIcon icon="article" />
											<span class="x-sider-tree_menu_title">
												<div class="flex middle">
													<div class="testcase-title__wrapper mr4">
														<span class="testcase-title">{_id}</span>
													</div>
													{title}
												</div>
											</span>
											<div class="flex middle x-sider-tree_menu_opration">
												{genIcon({
													icon: "edit",
													tips: vm.$t("修改文档").label,
													clickHandler: $event =>
														vm.showUpsertArticleDialog(item)
												})}
												{genIcon({
													icon: "delete",
													tips: vm.$t("删除文档").label,
													clickHandler: $event => vm.deleteCategory(_id, $event)
												})}
											</div>
										</div>
									);
								}
							}
						}}
					</aTree>
				</div>
			);
		}
	},
	methods: {
		async handleDropInterface(e: AntTreeNodeDropEvent) {
			this.State_Wiki.isLoading = true;
			/*
			1.drag testcase
				1.1 drop 到同一个category
				1.2 drop 到不同category
			2.drag category
				2.1 调整 category 顺序
			*/
			const dragItem = e.dragNode;
			const dropItem = e.node;
			const isDragInterface = dragItem.type === "testcase";
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
			} catch (error) {
				UI.message.error(error.message);
			} finally {
				setTimeout(() => {
					this.State_Wiki.isLoading = false;
				}, 400);
			}
		},
		/* 同类 testcase */
		async switchSameCategoryInterfaceOrder({ dragItem, dropItem }) {
			const category = xU.find(this.State_Wiki.allCategory, {
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
				this.State_Wiki.allCategory,
				dragItem._id,
				dropItem._id
			);
			await API.project.switchManyCategoryOrder(paramsChanges);
		},
		setFilterText: xU.debounce(function (filterText) {
			this.State_Wiki.filterText = filterText;
			this.State_Wiki.isLoading = false;
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
			UI.confirm({
				title: vm.$t("您确认删除此用例？").label,
				content: vm.$t(`温馨提示：用例删除后，无法恢复`).label,
				async onOk() {
					try {
						await API.project.deleteInterfaceById(id);
						UI.message.success(vm.$t("删除用例成功").label);
						vm.Cpt_url.go(
							"/project/testcase/all",
							xU.omit(vm.Cpt_url.query, ["category_id", "interface_id"])
						);
					} catch (error) {
						UI.message.error(error.message);
					}
				}
			});
		},
		deleteCategory(id) {
			const vm = this;
			UI.dialog.confirm({
				title: "确定删除此用例文档吗？",
				content: `温馨提示：该操作会删除该文档下所有用例，用例删除后无法恢复`,
				async onOk() {
					try {
						await API.project.deleteCategoryById(id);
						UI.message.success("删除文档成功");
						vm.Cpt_url.go(
							"/project/testcase/all",
							xU.omit(vm.Cpt_url.query, ["category_id"])
						);
					} catch (error) {
						UI.message.error(error.message);
						return Promise.reject();
					}
				}
			});
		},
		showUpsertArticleDialog(parentDoc) {
			UI.dialog.component({
				title: parentDoc
					? this.$t("修改文档").label
					: this.$t("添加文档").label,
				parentDoc,
				component: DialogAddArtical
			});
		},
		showAddTestcaseDialog(categoryId, $event: Event) {
			$event.stopPropagation();
			$event.preventDefault();
			UI.dialog.component({
				title: this.$t("添加用例").label,
				categoryId,
				projectId: this.State_App.currProject._id,
				component: DialogAddArtical
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
