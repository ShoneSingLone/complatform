import { UI, xU, $t, defCol, defXVirTableConfigs } from "@ventose/ui";
import { defineComponent } from "vue";
import { API } from "@/api";
import { stateI18n } from "./State_i18n";
import { Cpt_url } from "@/router/router";

export const DialogImportI18nJSON = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	data() {
		return {
			isLoading: false,
			isShowCoverView: false,
			raw$configsTableExistedRecords: {}
		};
	},
	computed: {
		configsBtnCancel() {
			return {
				preset: "cancel",
				onClick: this.propOptions.$close
			};
		},
		configsBtnUpdateExistedRecord() {
			return {
				text: $t("覆盖").label,
				disabled: () => {
					return !xU.isArrayFill(
						this?.raw$configsTableExistedRecords?.selected
					);
				},
				onClick: this.onCoverExisted
			};
		}
	},
	created() {
		this.handleChangeDebounce = xU.debounce(async file => {
			try {
				const formData = new FormData();
				formData.append("file", file);
				const { data } = await API.god.importI18nJSON(formData);
				const { different } = data;

				UI.message.success(`成功添加记录`);
				if (xU.isArrayFill(different)) {
					this.showCoverExistedConfirm(data);
				} else {
					await stateI18n._$updateList();
					this.propOptions.$close();
				}
			} catch (error) {
				xU(error);
			} finally {
				this.isLoading = false;
			}
		}, 1000);

		this.handleChange = file => {
			this.isLoading = true;
			this.handleChangeDebounce(file);
			return false;
		};
	},
	methods: {
		showCoverExistedConfirm({ existed, different }) {
			this.raw$tips = (
				<>
					{/* <div>{`有${existed.length + different.length}条记录已存在`}</div> */}
					<div>{`有${different.length}条记录有变化,请选择需要覆盖的记录`}</div>
				</>
			);
			this.raw$configsTableExistedRecords = defXVirTableConfigs({
				rowHeight: 120,
				dataSource: xU.map(different, i => ({
					...i,
					_id: i.existedRecord._id
				})),
				selectedConfigs: {
					type: "many",
					prop: "_id"
				},
				columns: {
					...defCol({
						label: "key",
						prop: "key",
						renderCell({ record }) {
							return record.existedRecord.key;
						}
					}),
					...defCol({
						label: $t("描述").label,
						width: "80px",
						prop: "desc",
						renderCell({ record }) {
							return record.existedRecord.desc;
						}
					}),
					...defCol({
						label: $t("diff").label,
						prop: "different",
						renderCell({ record }) {
							let valueArray, desc;
							if (record?.diffRes?.valueArray) {
								valueArray = record.diffRes.valueArray.map(JSON.parse);
								valueArray = (
									<xInfoDiffCard
										title={"valueArray"}
										old={JSON.stringify(valueArray[1], null, 2)}
										new={JSON.stringify(valueArray[0], null, 2)}
									/>
								);
							}
							if (record?.diffRes?.desc) {
								desc = record?.diffRes?.desc;
								desc = (
									<xInfoDiffCard
										title={$t("描述").label}
										old={desc[1]}
										new={desc[0]}
									/>
								);
							}

							return (
								<div class="height100 overflow-auto width100">
									{valueArray}
									{desc}
								</div>
							);
						}
					})
				}
			});

			this.isShowCoverView = true;
			this.$nextTick(() => this.propOptions.dialogInst.offset());
		},
		async onCoverExisted() {
			try {
				const selected = this.raw$configsTableExistedRecords.getSelectedRow();
				const params = xU.map(selected, ({ diffRes, existedRecord }) => {
					return {
						...existedRecord,
						valueArray: diffRes.valueArray
							? diffRes.valueArray[0]
							: existedRecord.valueArray,
						desc: diffRes.desc ? diffRes.desc[0] : existedRecord.desc
					};
				});
				await API.god.upsertI18nRecordMany(params);
				UI.message.success(`修改记录成功`);
				await stateI18n._$updateList();
				this.propOptions.$close();
			} catch (error) {
				xU(error);
			}
		}
	},
	render({ isShowCoverView, raw$tips }) {
		if (isShowCoverView) {
			return (
				<>
					<div
						class="x-dialog-boddy-wrapper margin20 flex vertical"
						style="height:40vh">
						<ElAlert title={raw$tips} />
						<xGap t="10" />
						<xVirTable
							configs={this.raw$configsTableExistedRecords}
							class="flex1 width100 "
						/>
					</div>
					<xDialogFooter>
						<xGap f="1" />
						<xButton configs={this.configsBtnCancel} />
						<xButton configs={this.configsBtnUpdateExistedRecord} />
					</xDialogFooter>
				</>
			);
		}
		return (
			<div class="x-dialog-boddy-wrapper margin20" v-xloading={this.isLoading}>
				<aUploadDragger
					name="file"
					beforeUpload={this.handleChange}
					multiple={false}>
					<p class="ant-upload-drag-icon">
						<xIcon icon="icon_inbox" />
					</p>
					<p class="ant-upload-text">
						{/* Click or drag file to this area to upload */}
						{$t("单击或拖动文件到此区域进行上传").label}
					</p>
				</aUploadDragger>
			</div>
		);
	}
});
