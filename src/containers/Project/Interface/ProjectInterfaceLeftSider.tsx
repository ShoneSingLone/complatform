import { defineComponent, ref, watch } from "vue";
import { $, xU, UI } from "@ventose/ui";
import { DialogUpsertCategory } from "./DialogUpsertCategory";
import { usefnObserveDomResize } from "../../../compositions/useDomResize";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";
import { ALL, DefaultInterfaceMenu } from "../../../utils/variable";
import { Methods_Interface, State_Project } from "./State_Project";
import { DialogAddInterface } from "./DialogAddInterface";
import { Cpt_url } from "../../../router/router";
import { AntTreeNodeDropEvent } from "ant-design-vue/lib/tree/Tree";
import { _$arrayChangeIndex } from "../../../utils/common";

export const ProjectInterfaceLeftSider = defineComponent({
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			State_Interface: State_Project,
			Cpt_url,
			Cpt_currProject,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	watch: {
		filterText(text) {
			this.State_Interface.isLoading = true;
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
			const siderHeight = Math.floor($(this.$refs.wrapper).height());
			this.setSiderHeight(siderHeight);
		});
		Methods_Interface.updateInterfaceMenuList();
		this.setExpand();
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	computed: {
		cpt_currentSelected() {
			const { pathname, query } = this.Cpt_url;
			const StrategyMap = {
				"/project/interface/all": ALL,
				"/project/interface/category": query.category_id,
				"/project/interface/detail": query.interface_id
			};
			return StrategyMap[pathname];
		},
		treeData() {
			return DefaultInterfaceMenu.concat(this.State_Interface.allCategory);
		},
		vDomTree() {
			const vm = this;
			return (
				<div
					class="elevation-2 height100 padding10"
					style="border-radius: 8px;">
					<aTree
						v-model:expandedKeys={vm.State_Interface.expandedKeys}
						height={vm.siderHeight}
						treeData={vm.treeData}
						draggable
						onDrop={vm.handleDropInterface}
						fieldNames={vm.configs.fieldNames}>
						{{
							title(item) {
								const { title, _id, list, menuType, categoryId } = item;
								const classContentString = (() => {
									let _classString = "flex middle Interfacesider-tree_menu";
									if (String(_id) == String(vm.cpt_currentSelected)) {
										return _classString + " Interfacesider-tree_menu_active";
									}
									return _classString;
								})();

								const handleClickCategory = () => {
									if (menuType === ALL) {
										Cpt_url.value.go(
											"/project/interface/all",
											xU.omit(Cpt_url.value.query, [
												"category_id",
												"interface_id"
											])
										);
									} else if (menuType === "category") {
										Cpt_url.value.go("/project/interface/category", {
											...Cpt_url.value.query,
											category_id: _id
										});
									} else {
										Cpt_url.value.go("/project/interface/detail", {
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
												class="Interfacesider-tree_menu_icon"
												v-uiPopover={{ content: tips, delay: 1000 }}
												onClick={clickHandler}
											/>
											<xGap l="8" />
										</>
									);
								};

								if (menuType === ALL) {
									return (
										<div
											class={classContentString}
											onClick={handleClickCategory}>
											<xGap l="10" />
											<xIcon icon="allCategory" />
											<span class="Interfacesider-tree_menu_title">
												{title}
											</span>
											<div class="flex middle Interfacesider-tree_menu_opration">
												{genIcon({
													icon: "add",
													tips: vm.$t("添加分类").label,
													clickHandler: () => vm.showUpsertCategoryDialog()
												})}
												{genIcon({
													icon: "refresh",
													tips: vm.$t("刷新").label,
													clickHandler:
														Methods_Interface.updateInterfaceMenuList
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
											<div class="flex middle Interfacesider-tree_menu_opration">
												{genIcon({
													icon: "add",
													tips: vm.$t("添加接口").label,
													clickHandler: $event =>
														vm.showAddInterfaceDialog(_id, $event)
												})}
												{genIcon({
													icon: "edit",
													tips: vm.$t("修改分类").label,
													clickHandler: $event =>
														vm.showUpsertCategoryDialog(item)
												})}
												{genIcon({
													icon: "delete",
													tips: vm.$t("删除分类").label,
													clickHandler: $event => vm.deleteCategory(_id, $event)
												})}
											</div>
										);
									} else {
										return (
											<div class="flex middle Interfacesider-tree_menu_opration">
												{genIcon({
													icon: "edit",
													tips: vm.$t("修改接口").label,
													clickHandler: $event =>
														vm.showAddInterfaceDialog(_id, $event)
												})}
												{genIcon({
													icon: "delete",
													tips: vm.$t("删除接口").label,
													clickHandler: $event =>
														vm.showAddInterfaceDialog(_id, $event)
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
									<div class={classContentString} onClick={handleClickCategory}>
										<xGap l="10" />
										<xIcon icon={iconName} />
										<span class="Interfacesider-tree_menu_title">{title}</span>
										{vDomOpration}
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
		async handleDropInterface(e: AntTreeNodeDropEvent) {
			this.State_Interface.isLoading = true;
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
				Methods_Interface.updateInterfaceMenuList();
			} catch (error) {
				UI.message.error(error.message);
			} finally {
				setTimeout(() => {
					this.State_Interface.isLoading = false;
				}, 400);
			}
		},
		/* 同类 interface */
		async switchSameCategoryInterfaceOrder({ dragItem, dropItem }) {
			const category = xU.find(this.State_Interface.allCategory, {
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
				this.State_Interface.allCategory,
				dragItem._id,
				dropItem._id
			);
			await API.project.switchManyCategoryOrder(paramsChanges);
		},
		setExpand() {
			const { pathname, query } = this.Cpt_url;
			if ("/project/interface/detail" === pathname) {
				this.State_Interface.expandedKeys = [Number(query.category_id)];
			} else {
				this.State_Interface.expandedKeys = [];
			}
		},
		setFilterText: xU.debounce(function (filterText) {
			this.State_Interface.filterText = filterText;
			this.State_Interface.isLoading = false;
		}, 600),
		setSelectedKeys(id) {
			this.selectedKeys = [id];
		},
		/* vDomList 需要实际高度 */
		setSiderHeight: xU.debounce(function (siderHeight) {
			this.siderHeight = siderHeight;
		}, 20),
		deleteCategory(id) {
			const vm = this;
			UI.dialog.confirm({
				title: "确定删除此接口分类吗？",
				content: `温馨提示：该操作会删除该分类下所有接口，接口删除后无法恢复`,
				async onOk() {
					try {
						await API.project.deleteInterfaceCategoryById(id);
						UI.message.success("删除分类成功");
						Methods_Interface.updateInterfaceMenuList();
						vm.Cpt_url.go(
							"/project/interface/all",
							xU.omit(vm.Cpt_url.query, ["category_id"])
						);
					} catch (error) {
						UI.message.error(error.message);
						return Promise.reject();
					}
				}
			});
		},
		showUpsertCategoryDialog(category = false) {
			UI.dialog.component({
				title: category ? this.$t("修改分类").label : this.$t("添加分类").label,
				component: DialogUpsertCategory,
				category,
				async onOk({ vm }) {
					await vm.submit(() => {
						Methods_Interface.updateInterfaceMenuList();
					});
				}
			});
		},
		showAddInterfaceDialog(categoryId, $event: Event) {
			$event.stopPropagation();
			$event.preventDefault();
			UI.dialog.component({
				title: this.$t("添加接口").label,
				categoryId,
				projectId: this.Cpt_currProject._id,
				component: DialogAddInterface,
				onOk: async instance => {
					if (await instance.vm.submit()) {
						UI.message.success("添加接口成功");
						instance.close();
					}
					Methods_Interface.updateInterfaceMenuList();
				}
			});
		}
	},
	render() {
		return (
			<aside
				class="ViewProject-sider_wrapper flex vertical move-transition padding10"
				style={this.styleAside}>
				<div class="ViewProjectInterface_tree flex1 mt10 mb10" ref="wrapper">
					{this.vDomTree}
				</div>
				<div class="resize_bar" icon="scroll" v-uiMove={this.configsResize} />
			</aside>
		);
	}
});
