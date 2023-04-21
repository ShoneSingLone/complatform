import "./ViewI18n.scss";
import { defineComponent } from "vue";
import { I18nLeftSider } from "./I18nLeftSider";
import { stateI18n, useStateI18n } from "./State_i18n";
import {
	defXVirTableConfigs,
	defCol,
	$t,
	setDataGridInfo,
	xU,
	UI,
	defColActions,
	defColActionsBtnlist
} from "@ventose/ui";
import { Cpt_url } from "@/router/router";
import { DialogImportI18nJSON } from "./DialogImportI18nJSON";
import { MonacoEditor } from "@/components/MonacoEditor/MonacoEditor";
import * as _ from "lodash";
import { DialogUpsertI18nRecord } from "./DialogUpsertI18nRecord";
import { ITEM_OPTIONS } from "@/utils/common";
import { API } from "@/api";
import { State_App } from "@/state/State_App";

export const ViewI18n = defineComponent({
	setup() {
		return {
			Cpt_url,
			/* 作为root节点，使用useStateI18n，mounted会重置数据 */
			stateI18n: useStateI18n()
		};
	},
	mounted() {
		stateI18n._$updateList();
	},
	data(vm) {
		return {
			configsI18nTable: defXVirTableConfigs({
				queryTableList() {
					stateI18n._$updateList();
				},
				rowHeight: 32,
				dataSource: [],
				selectedConfigs: {
					type: "many",
					prop: "_id"
				},
				columns: {
					...defCol({
						label: "key",
						prop: "key"
					}),
					...defCol({
						label: $t("描述").label,
						prop: "desc"
					}),
					...defCol({
						label: $t("校正").label,
						width: "80px",
						prop: "isRectified",
						renderCell({ record }) {
							return xU.valueToLabel(
								record.isRectified,
								ITEM_OPTIONS.trueOrFalse
							);
						}
					}),
					...defColActions({
						renderCell({ record }) {
							return defColActionsBtnlist({
								fold: 7,
								btns: [
									{
										text: $t("查看valueArray").label,
										onClick: async () => {
											await stateI18n._$updateCurrent(record._id);
										}
									},
									{
										text: $t("修改").label,
										onClick: async () => {
											await stateI18n._$updateCurrent(record._id);
											UI.dialog.component({
												title: this.$t("修改记录").label,
												record: xU.cloneDeep(stateI18n.currentI18n),
												component: DialogUpsertI18nRecord
											});
										}
									},
									{
										text: $t("删除").label,
										isShow: State_App.user.role === "admin",
										onClick: async () => {
											vm.deleteI18nRecords([record]);
										}
									}
								]
							});
						}
					})
				}
			})
		};
	},
	methods: {
		async exportRecordAsJson(records) {
			function download(url, name) {
				const aTag = document.createElement("a");
				aTag.href = url;
				aTag.download = name;
				aTag.click();
			}
			const { data } = await API.god.i18nRecords({
				ids: xU.map(records, i => i._id)
			});
			const content = JSON.stringify(
				xU.reduce(
					data,
					(target, d) => {
						target[d.key] = JSON.parse(d.valueArray);
						return target;
					},
					{}
				),
				null,
				2
			);
			const url = `data:,${content}`;
			download(url, "i18nRecords.json");
			// 最终下载名为a.json的文件
		},
		deleteI18nRecords(records) {
			UI.confirm({
				title: "确定删除这些吗？",
				content: `记录删除后无法恢复`,
				async onOk() {
					try {
						await stateI18n._$deleteI18nRecords(records);
						UI.message.success("删除记录成功");
						stateI18n._$updateList({});
					} catch (error) {
						UI.message.error(error.message);
						return Promise.reject();
					}
				}
			});
		}
	},
	computed: {
		btnImport() {
			return {
				text: $t("导入").label,
				async onClick() {
					await UI.dialog.component({
						title: $t("导入国际化JSON文件").label,
						component: DialogImportI18nJSON
					});
				}
			};
		},
		btnDelete() {
			const vm = this;
			return {
				text: $t("删除").label,
				isShow: State_App.user.role === "admin",
				disabled() {
					return !xU.isArrayFill(vm.configsI18nTable.selected);
				},
				onClick() {
					vm.deleteI18nRecords(vm.configsI18nTable.getSelectedRow());
				}
			};
		},
		btnDownload() {
			const vm = this;
			return {
				text: $t("导出").label,
				disabled() {
					return !xU.isArrayFill(vm.configsI18nTable.selected);
				},
				onClick() {
					vm.exportRecordAsJson(vm.configsI18nTable.getSelectedRow());
				}
			};
		},
		modelCode: {
			get() {
				return JSON.stringify(stateI18n.currentI18n, null, 2);
			},
			set(val) {
				try {
					stateI18n.currentI18n = JSON.parse(val);
				} catch (error) {}
			}
		}
	},
	watch: {
		"stateI18n.i18nRecordArray"(i18nRecordArray) {
			setDataGridInfo(this.configsI18nTable, { data: i18nRecordArray });
		}
	},
	render() {
		return (
			<section id="ViewI18n" class="flex flex1" v-loading={stateI18n.isLoading}>
				<I18nLeftSider />
				<main class="flex flex1 padding10 vertical paddingB20">
					<xDataGridToolbar configs={this.configsI18nTable}>
						<xButton configs={this.btnImport} />
						<xGap l="4" />
						<xButton configs={this.btnDownload} />
						<xGap l="4" />
						<xButton configs={this.btnDelete} />
					</xDataGridToolbar>
					<xVirTable configs={this.configsI18nTable} class="flex1 width100 " />
					{stateI18n.currentI18n?.valueArray && (
						<aCard>
							<div style={"height:300px"}>
								<MonacoEditor
									v-model:code={stateI18n.currentI18n.valueArray}
									language="json"
								/>
							</div>
						</aCard>
					)}
				</main>
			</section>
		);
	}
});
