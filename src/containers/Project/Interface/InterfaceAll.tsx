import { defineComponent, ref, watch } from "vue";
import { $, _, UI, State_UI, defCol } from "@ventose/ui";
import { DialogAddCategory } from "./DialogAddCategory";
import { usefnObserveDomResize } from "../../../compositions/useDomResize";
import { API } from "../../../api";
import { Cpt_currProject } from "../../../state/State_App";
import { ALL } from "../../../utils/variable";
import { Methods_Interface, State_Interface } from "./State_Interface";
import { ITEM_OPTIONS } from "../../../utils/common.options";
const { $t } = State_UI;

export const InterfaceAll = defineComponent({
	setup() {
		return {
			State_Interface
		};
	},
	computed: {},
	watch: {
		"State_Interface.allInterface": {
			immediate: true,
			handler() {
				this.updateListForShow();
			}
		},
		filterParams: {
			deep: true,
			handler(allInterface) {
				this.isLoading = true;
				this.updateListForShow();
			}
		}
	},
	methods: {
		updateListForShow: _.debounce(function () {
			const { allInterface } = this.State_Interface;
			let interfaceForShow = _.isArrayFill(allInterface) ? allInterface : [];
			let paramKeys = Object.keys(this.filterParams);
			let prop = paramKeys.pop();
			while (prop) {
				const search = this.filterParams[prop];
				if (_.isInput(search)) {
					interfaceForShow = _.filter(interfaceForShow, i => {
						if (prop == "status") {
							return i.status === search;
						} else if (prop == "catid") {
							return search.includes(i.catid);
						} else if (prop == "tag") {
							return _.some(i.tag, tag => search.includes(tag));
						} else {
							return new RegExp(search, "i").test(i[prop]);
						}
					});
				}
				prop = paramKeys.pop();
			}
			this.configs_allInterface.dataSource = _.sortBy(interfaceForShow, [
				"catid",
				"title",
				"path",
				"status",
				"tag"
			]);
			this.isLoading = false;
		}, 1000)
	},
	data() {
		const vm = this;
		return {
			isLoading: true,
			filterParams: {
				name: "",
				path: "",
				catid: [],
				status: "",
				tag: []
			},
			records: {},
			configs_allInterface: {
				rowHeight: 72,
				dataSource: [],
				columns: {
					...defCol({
						label: "接口分类",
						prop: "catid",
						renderHeader({ label }) {
							return (
								<div class="flex">
									<span class="flex1">
										<span>{label}</span>
										{_.isArrayFill(vm.filterParams.catid) ? (
											<aTag class="ml10">{vm.filterParams.catid.length}</aTag>
										) : null}
									</span>
									<aPopover placement="bottomRight" trigger="click">
										{{
											default() {
												return <xIcon icon="search" class="pointer" />;
											},
											content() {
												return (
													<div style="padding: 8px">
														<aSelect
															allowClear
															mode="multiple"
															style="width: 188px"
															v-model:value={vm.filterParams.catid}
															class="select">
															{_.map(vm.State_Interface.allCategory, i => {
																return (
																	<aSelectOption value={i.value}>
																		<span class={"tag-status " + i.value}>
																			{i.label}
																		</span>
																	</aSelectOption>
																);
															})}
														</aSelect>
													</div>
												);
											}
										}}
									</aPopover>
								</div>
							);
						},
						renderCell({ cell }) {
							const item = _.find(vm.State_Interface.allCategory, {
								value: cell
							});
							return item ? (
								<span class={"ml10 tag-status " + item.value}>
									{item.label}
								</span>
							) : null;
						}
					}),
					...defCol({
						label: "接口名称",
						prop: "title",
						selectedType: "many",
						selected: [],
						selectedBy: "_id",
						onSelected() {},
						renderHeader({ label }) {
							return (
								<div class="flex">
									<span class="flex1">
										<span>{label}</span>
										{_.isInput(vm.filterParams.title) ? (
											<aTag color="cyan" class="ml10">
												{vm.filterParams.title}
											</aTag>
										) : null}
									</span>
									<aPopover placement="bottomRight" trigger="click">
										{{
											default() {
												return <xIcon icon="search" class="pointer" />;
											},
											content() {
												return (
													<div style="padding: 8px">
														<aInput
															ref="searchInput"
															placeholder={vm.$t("接口名称").label}
															v-model:value={vm.filterParams.title}
															allowClear
															style="width: 188px"
														/>
													</div>
												);
											}
										}}
									</aPopover>
								</div>
							);
						},
						renderCell({ records, cell, index }) {
							return <a>{cell}</a>;
						}
					}),
					...defCol({
						label: "接口路径",
						prop: "path",
						renderHeader({ label }) {
							return (
								<div class="flex">
									<span class="flex1">
										<span>{label}</span>
										{_.isInput(vm.filterParams.path) ? (
											<aTag color="cyan" class="ml10">
												{vm.filterParams.path}
											</aTag>
										) : null}
									</span>
									<aPopover placement="bottomRight" trigger="click">
										{{
											default() {
												return <xIcon icon="search" class="pointer" />;
											},
											content() {
												return (
													<div style="padding: 8px">
														<aInput
															ref="searchInput"
															placeholder={vm.$t("接口路径").label}
															v-model:value={vm.filterParams.path}
															allowClear
															style="width: 188px"
														/>
													</div>
												);
											}
										}}
									</aPopover>
								</div>
							);
						},
						renderCell({ cell }) {
							return <p>{cell}</p>;
						}
					}),
					...defCol({
						label: "状态",
						prop: "status",
						renderHeader({ label }) {
							const item = _.find(ITEM_OPTIONS.interfaceStatus, {
								value: vm.filterParams.status
							});

							return (
								<div class="flex">
									<span class="flex1">
										<span>{label}</span>
										{item ? (
											<span class={"ml10 tag-status " + item.value}>
												{item.label}
											</span>
										) : null}
									</span>
									<aPopover placement="bottomRight" trigger="click">
										{{
											default() {
												return <xIcon icon="search" class="pointer" />;
											},
											content() {
												return (
													<div style="padding: 8px">
														<aSelect
															allowClear
															style="width: 188px"
															v-model:value={vm.filterParams.status}
															class="select">
															{_.map(ITEM_OPTIONS.interfaceStatus, i => {
																return (
																	<aSelectOption value={i.value}>
																		<span class={"tag-status " + i.value}>
																			{i.label}
																		</span>
																	</aSelectOption>
																);
															})}
														</aSelect>
													</div>
												);
											}
										}}
									</aPopover>
								</div>
							);
						},
						renderCell({ cell }) {
							const item = _.find(ITEM_OPTIONS.interfaceStatus, {
								value: cell
							});
							return item ? (
								<span class={"ml10 tag-status " + item.value}>
									{item.label}
								</span>
							) : null;
						}
					}),
					...defCol({
						label: "tag",
						prop: "tag",
						renderHeader({ label }) {
							return (
								<div class="flex">
									<span class="flex1">
										<span>{label}</span>
										{_.isArrayFill(vm.filterParams.tag) ? (
											<aTag class="ml10">{vm.filterParams.tag.length}</aTag>
										) : null}
									</span>
									<aPopover placement="bottomRight" trigger="click">
										{{
											default() {
												return <xIcon icon="search" class="pointer" />;
											},
											content() {
												return (
													<div style="padding: 8px">
														<aSelect
															allowClear
															mode="multiple"
															style="width: 188px"
															v-model:value={vm.filterParams.tag}
															class="select">
															{_.map(vm.State_Interface.allTags, i => {
																return (
																	<aSelectOption value={i}>{i}</aSelectOption>
																);
															})}
														</aSelect>
													</div>
												);
											}
										}}
									</aPopover>
								</div>
							);
						},
						renderCell({ cell }) {
							return (
								<>
									{_.map(cell, i => (
										<aTag color="blue">{i}</aTag>
									))}
								</>
							);
						}
					})
				}
			}
		};
	},
	render() {
		return (
			<xView class="flex height100 padding20 vertical InterfaceAll-view">
				<div class="Operation mb10">
					<aCard>
						<aButton>{JSON.stringify(this.filterParams.name)}</aButton>
					</aCard>
				</div>
				<div
					class="elevation-1 padding20 flex1"
					style={{ height: "100px" }}
					v-loading={true}>
					<xVirTable
						configs={this.configs_allInterface}
						class="flex1 width100 "
					/>
				</div>
			</xView>
		);
	}
});
