import { defineComponent, ref, watch } from "vue";
import { $, _, UI } from "@ventose/ui";
import { DialogAddCategory } from "./DialogAddCategory";
import { usefnObserveDomResize } from "../../../compositions/useDomResize";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";
import { ALL } from "../../../utils/variable";
import {
	Cpt_interfaceMenuForShow,
	Methods_Interface,
	State_Interface
} from "./State_Interface";
import { Cpt_url } from "../../../router/router";

export const InterfaceSider = defineComponent({
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();
		return {
			State_Interface,
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
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	computed: {
		currentSelected() {
			return this.selectedKeys[0] || "NO_SELECTED";
		},
		vDomTree() {
			const vm = this;
			return (
				<aTree
					selectedKeys={vm.selectedKeys}
					height={vm.siderHeight}
					treeData={vm.Cpt_interfaceMenuForShow}
					fieldNames={vm.configs.tree.fieldNames}>
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
								if (String(_id) === String(vm.currentSelected)) {
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

							if (_id === ALL) {
								return (
									<div class={classContentString} onClick={handleClickCategory}>
										<xGap l="10" />
										<xIcon icon="allCategory" />
										<span class="Interfacesider-tree_menu_title">{title}</span>
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
											<xIcon
												icon="add"
												class="Interfacesider-tree_menu_icon"
												onClick={$event =>
													vm.showAddInterfaceDialog(_id, $event)
												}
											/>
											<xGap l="8" />
											<xIcon
												icon="edit"
												class="Interfacesider-tree_menu_icon"
												onClick={() => vm.setSelectedKeys(_id)}
											/>
											<xGap l="8" />
											<xIcon
												icon="delete"
												class="Interfacesider-tree_menu_icon"
												onClick={() => vm.setSelectedKeys(_id)}
											/>
											<xGap l="8" />
										</div>
									);
								}
								return null;
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
		showAddCategoryDialog() {
			UI.dialog.component({
				title: this.$t("添加分类").label,
				component: DialogAddCategory,
				onOk: async instance => {
					const res = await instance.vm.submit();
					if (res) {
						instance.close();
					}
					Methods_Interface.updateInterfaceMenuList();
				}
			});
		},
		showAddInterfaceDialog(_id, $event: Event) {
			$event.stopPropagation();
			$event.preventDefault();
			UI.dialog.component({
				title: this.$t("添加接口").label,
				component: DialogAddCategory,
				onOk: async instance => {
					const res = await instance.vm.submit();
					if (res) {
						instance.close();
					}
					Methods_Interface.updateInterfaceMenuList();
				}
			});
		}
	},
	render() {
		const vm = this;
		return (
			<div class="ViewProject-sider_wrapper flex vertical">
				<div class="flex middle padding16">
					<aTooltip placement="rightTop" title={this.$t("添加分类").label}>
						<xIcon
							icon="category"
							onClick={this.showAddCategoryDialog}
							class="icon-add-1 pointer"
						/>
					</aTooltip>
					<xGap l="10" />
					<aInput
						v-model:value={this.filterText}
						placeholder={this.$t("搜索接口").label}
					/>
				</div>
				<div
					class="ViewProjectInterface_tree flex1"
					ref="wrapper"
					v-loading={vm.loading}>
					{vm.vDomTree}
				</div>
			</div>
		);
	}
});
