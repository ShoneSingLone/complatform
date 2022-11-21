import { defineComponent, ref, watch } from "vue";
import { $, _, UI } from "@ventose/ui";
import { DialogAddCategory } from "./DialogAddCategory";
import { usefnObserveDomResize } from "./../../../compositions/useDomResize";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";

export const InterfaceSider = defineComponent({
	setup() {
		const { fnObserveDomResize, fnUnobserveDomResize } =
			usefnObserveDomResize();

		return {
			fnObserveDomResize,
			fnUnobserveDomResize
		};
	},
	data(vm) {
		return {
			selectedKeys: [],
			siderHeight: 500,
			filterText: "",
			interfaceList: [],
			interfaceListForShow: []
		};
	},
	watch: {
		interfaceList: {
			immediate: true,
			handler() {
				this.setInterfaceListForShow();
			}
		}
	},
	mounted() {
		this.fnObserveDomResize(this.$refs.wrapper, () => {
			const siderHeight = Math.floor($(this.$refs.wrapper).height());
			this.setSiderHeight(siderHeight);
		});
		this.updateInterfaceList();
	},
	beforeUnmount() {
		this.fnUnobserveDomResize(this.$refs.wrapper);
	},
	computed: {
		currentSelected() {
			return this.selectedKeys[0] || "NO_SELECTED";
		}
	},
	methods: {
		setSelectedKeys(id) {
			this.selectedKeys = [id];
		},
		setInterfaceListForShow: _.debounce(function () {
			this.interfaceListForShow = _.cloneDeep(this.interfaceList);
		}, 1000),
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
					this.updateInterfaceList();
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
					this.updateInterfaceList();
				}
			});
		},
		async updateInterfaceList() {
			const { data } = await API.project.fetchInterfaceListMenu(
				Cpt_currProject.value._id
			);
			if (data) {
				this.interfaceList = data;
			}
		}
	},
	render() {
		const vm = this;
		return (
			<div class="ViewProject-sider_wrapper flex vertical">
				<div class="flex padding16">
					<aInput
						v-model:value={this.filterText}
						placeholder={this.$t("搜索接口").label}
					/>
					<xGap l="10" />
					<aButton type="primary" onClick={this.showAddCategoryDialog}>
						{this.$t("添加分类").label}
					</aButton>
				</div>
				<div
					class="ViewProjectInterface_tree flex1"
					ref="wrapper"
					v-loading={
						this.interfaceList.length === 0 &&
						this.interfaceListForShow.length === 0
					}>
					<aTree
						selectedKeys={this.selectedKeys}
						height={this.siderHeight}
						treeData={this.interfaceListForShow}
						fieldNames={{
							children: "list",
							title: "name",
							key: "_id"
						}}>
						{{
							title(item) {
								const { name, _id, list } = item;

								if (list) {
									item.children = list;
								}
								const className = (() => {
									let _classString = "flex middle Interfacesider-tree_menu";
									if (String(_id) === String(vm.currentSelected)) {
										return _classString + " Interfacesider-tree_menu_active";
									}
									return _classString;
								})();
								return (
									<div
										class={className}
										onClick={$event => vm.setSelectedKeys(_id, $event)}>
										<span class="Interfacesider-tree_menu_title">{name}</span>
										<xGap f="1" />
										<xIcon
											icon="add"
											class="Interfacesider-tree_menu_icon"
											onClick={$event => vm.showAddInterfaceDialog(_id, $event)}
										/>
										<xGap f="8" />
										<xIcon
											icon="edit"
											class="Interfacesider-tree_menu_icon"
											onClick={() => vm.setSelectedKeys(_id)}
										/>
										<xGap f="8" />
										<xIcon
											icon="delete"
											class="Interfacesider-tree_menu_icon"
											onClick={() => vm.setSelectedKeys(_id)}
										/>
										<xGap f="8" />
									</div>
								);
							}
						}}
					</aTree>
				</div>
			</div>
		);
	}
});
