import { defineComponent, ref, watch } from "vue";
import { $, _, UI } from "@ventose/ui";
import { DialogUpsertCategory } from "./DialogUpsertCategory";
import { usefnObserveDomResize } from "../../../compositions/useDomResize";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";
import { ALL } from "../../../utils/variable";
import {
	Cpt_interfaceMenuForShow,
	Methods_Interface,
	State_Interface
} from "./State_Interface";
import { DialogAddInterface } from "./DialogAddInterface";
import { Cpt_url } from "./../../../router/router";
import { AntTreeNodeDropEvent } from "ant-design-vue/lib/tree/Tree";
import { arrayChangeIndex } from "../../../utils/common";

export const InterfaceSider = defineComponent({
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			State_Interface,
			Cpt_url,
			Cpt_currProject,
			Cpt_interfaceMenuForShow,
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	watch: {
		filterText(text) {
			this.loading = true;
			this.setFilterText(text);
		}
	},
	data(vm) {
		return {
			loading: false,
			filterText: "",
			selectedKeys: [ALL],
			siderHeight: 500,
			configs: {
				tree: {
					fieldNames: {
						children: "list",
						key: "_id"
					}
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
		vDomTree() {
			const vm = this;
			return (
				<aTree
					v-model:expandedKeys={vm.State_Interface.expandedKeys}
					height={vm.siderHeight}
					treeData={vm.Cpt_interfaceMenuForShow}
					fieldNames={vm.configs.tree.fieldNames}
					draggable
					onDrop={vm.handleDropInterface}>
					{{
						title(item) {
							const {
								title,
								name,
								_id,
								list,
								isCategory,
								categoryName,
								categoryId
							} = item;
							const classContentString = (() => {
								let _classString = "flex middle Interfacesider-tree_menu";
								console.log(_id, vm.cpt_currentSelected);
								if (String(_id) == String(vm.cpt_currentSelected)) {
									return _classString + " Interfacesider-tree_menu_active";
								}
								return _classString;
							})();

							const handleClickCategory = () => {
								if (_id === ALL) {
									Cpt_url.value.go(
										"/project/interface/all",
										_.omit(Cpt_url.value.query, ["category_id", "interface_id"])
									);
								} else if (isCategory) {
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

							if (_id === ALL) {
								return (
									<div class={classContentString} onClick={handleClickCategory}>
										<xGap l="10" />
										<xIcon icon="allCategory" />
										<span class="Interfacesider-tree_menu_title">{title}</span>
										<div class="flex middle Interfacesider-tree_menu_opration">
											{genIcon({ icon: "add", tips: vm.$t("添加分类").label, clickHandler: vm.showUpsertCategoryDialog })}
											{genIcon({ icon: "refresh", tips: vm.$t("刷新").label, clickHandler: Methods_Interface.updateInterfaceMenuList })}
										</div>
									</div>
								);
							}

							if (_.isArray(list)) {
								/* { "edit_uid": 0, "status": "undone", "isProxy": false, "witchEnv": "", "index": 0, "tag": [], "_id": 9, "method": "GET", "catid": 56, "title": "first", "path": "/aws_ecs/goku/rest/vdc/v3.1/projects", "project_id": 83, "uid": 12, "add_time": 1669122695, "up_time": 1669122695 } */
							}

							const vDomOpration = (() => {
								if (name) {
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
												clickHandler: $event =>
													vm.showAddInterfaceDialog(_id, $event)
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

							const iconName = vDomOpration
								? "subCategory"
								: "subCategoryInterface";
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
			);
		}
	},
	methods: {
		async handleDropInterface(e: AntTreeNodeDropEvent) {
			const dropCatIndex = e.node.pos.split("-")[1] - 1;
			const dragCatIndex = e.dragNode.pos.split("-")[1] - 1;
			if (dropCatIndex < 0 || dragCatIndex < 0) {
				return;
			}
			const { allInterface } = this.State_Interface;
			const dropCatId = allInterface[dropCatIndex]._id;
			const id = e.dragNode.eventKey;
			const dragCatId = allInterface[dragCatIndex]._id;

			const dropPos = e.node.pos.split("-");
			const dropIndex = Number(dropPos[dropPos.length - 1]);
			const dragPos = e.dragNode.pos.split("-");
			const dragIndex = Number(dragPos[dragPos.length - 1]);

			debugger;
			if (id.indexOf("cat") === -1) {
				if (dropCatId === dragCatId) {
					// 同一个分类下的接口交换顺序
					let colList = list[dropCatIndex].list;
					let changes = arrayChangeIndex(colList, dragIndex, dropIndex);
					axios.post("/api/interface/up_index", changes).then();
				} else {
					await axios.post("/api/interface/up", { id, catid: dropCatId });
				}
				const { projectId, router } = this.props;
				this.props.fetchInterfaceListMenu(projectId);
				this.props.fetchInterfaceList({ project_id: projectId });
				if (router && isNaN(router.params.actionId)) {
					// 更新分类list下的数据
					let catid = router.params.actionId.substr(4);
					this.props.fetchInterfaceCatList({ catid });
				}
			} else {
				// 分类之间拖动
				let changes = arrayChangeIndex(list, dragIndex - 1, dropIndex - 1);
				axios.post("/api/interface/up_cat_index", changes).then();
				this.props.fetchInterfaceListMenu(this.props.projectId);
			}
		},
		setExpand() {
			const { pathname, query } = this.Cpt_url;
			if ("/project/interface/detail" === pathname) {
				this.State_Interface.expandedKeys = [Number(query.category_id)];
			} else {
				this.State_Interface.expandedKeys = [];
			}
		},
		setFilterText: _.debounce(function (filterText) {
			this.State_Interface.filterText = filterText;
			this.loading = false;
		}, 600),
		setSelectedKeys(id) {
			this.selectedKeys = [id];
		},
		/* vDomList 需要实际高度 */
		setSiderHeight: _.debounce(function (siderHeight) {
			this.siderHeight = siderHeight;
		}, 20),
		showUpsertCategoryDialog(category = false) {
			UI.dialog.component({
				title: category ? this.$t("修改分类").label : this.$t("添加分类").label,
				component: DialogUpsertCategory,
				category,
				async onOk({ vm }) {
					await vm.submit(() => {
						Methods_Interface.updateInterfaceMenuList();
					})
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
			<div class="ViewProject-sider_wrapper flex vertical">
				<div
					class="ViewProjectInterface_tree flex1 mt10 mb10"
					ref="wrapper"
					v-loading={this.loading}>
					{this.vDomTree}
				</div>
			</div>
		);
	}
});
