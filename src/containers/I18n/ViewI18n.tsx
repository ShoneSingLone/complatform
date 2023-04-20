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
										onClick: async () => {
											await xU.sleep(1000);
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
	methods: {},
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
