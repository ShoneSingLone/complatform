import { defItem, UI, xU } from "@ventose/ui";
import { defineComponent } from "vue";
import { Methods_App, State_App } from "@/state/State_App";
import { API } from "@/api";
import { orderAsc } from "@/components/InputKeyValue";
import { FormRules } from "@/utils/common.FormRules";

function genTag(name, desc, index) {
	return {
		nameConfigs: defItem.item({
			prop: "name" + index,
			placeholder: "tag名称",
			value: name
		}),
		descConfigs: defItem.item({
			prop: "desc" + index,
			placeholder: "tag描述信息",
			value: desc
		})
	};
}

export const DialogUpsertTags = defineComponent({
	props: {
		/* Dialog 默认传入参数 */
		propDialogOptions: {
			type: Object,
			default() {
				return { __elId: false };
			}
		}
	},
	setup() {
		return { State_App };
	},
	data() {
		return { privateTags: {} };
	},
	watch: {
		formData() {
			this.checkFormDataDebounce();
		},
		"State_App.currProject.tag": {
			immediate: true,
			handler(tags) {
				tags = xU.cloneDeep(tags);
				if (xU.isArrayFill(tags)) {
					let index = 0;
					this.privateTags = xU.reduce(
						tags,
						(tags, tag) => {
							tags[index] = genTag(tag.name, tag.desc, index);
							++index;
							return tags;
						},
						{}
					);
				} else {
					this.privateTags = { 0: genTag("", "", 0) };
				}
			}
		}
	},
	computed: {
		propProjectId() {
			if (this.State_App.currProject._id) {
				return this.State_App.currProject._id;
			} else {
				alert("miss projectId");
			}
		},
		formData() {
			const formData = xU.reduce(
				this.privateTags,
				(formData, privateTag, index) => {
					formData[index] = {
						name: privateTag.nameConfigs.value,
						desc: privateTag.descConfigs.value
					};
					xU(formData, privateTag, index);
					return formData;
				},
				{}
			);
			return formData;
		}
	},
	methods: {
		checkFormDataDebounce: xU.debounce(function () {
			this.isFormDataOk();
		}, 1000),
		isFormDataOk() {
			const res = xU.map(this.formData, ({ name }, index) => {
				if (
					xU.some(this.formData, ({ name: _name }, _index) => {
						if (_index == index) {
							return false;
						} else {
							return _name === name;
						}
					})
				) {
					this.privateTags[index].nameConfigs.itemTips = {
						type: "error",
						msg: `${name} 与已有标识重复`
					};
					return FormRules.FAIL;
				} else {
					this.privateTags[index].nameConfigs.itemTips = {
						type: "",
						msg: ""
					};
					return FormRules.SUCCESS;
				}
			});
			return !xU.some(res, i => i === FormRules.FAIL);
		},
		deleteTag(index) {
			const keys = Object.keys(this.privateTags);
			if (keys.length === 1) {
				this.privateTags = { 0: genTag("", "", 0) };
			} else {
				delete this.privateTags[index];
			}
		},
		addTag() {
			const keys = Object.keys(this.privateTags).map(Number).sort(orderAsc);
			const nextIndex = xU.last(keys) + 1;
			this.privateTags[nextIndex] = genTag("", "", nextIndex);
		},
		async onOk() {
			if (this.isFormDataOk()) {
				const data = {
					id: this.propProjectId,
					tag: xU.map(this.formData, item => item)
				};
				await API.project.updateTags(data);
				await Methods_App.setCurrProject(this.propProjectId, {
					isEnforce: true
				});
				UI.message.success("Tag修改成功");
				this.propDialogOptions.closeDialog();
			}
		}
	},
	render() {
		const vm = this;
		return (
			<>
				<div class="flex1" style="max-height:500px;overflow:auto;">
					{xU.map(this.privateTags, (data, index) => {
						const { descConfigs, nameConfigs } = data || {};
						return (
							<div class="flex baseline mt10 margin10 " key={index}>
								<xItem configs={nameConfigs} />
								<xGap l="10" />
								<span class="flex middle">
									<xItem configs={descConfigs} />
									<xGap l="10" />
									<xButton
										onClick={() => this.deleteTag(index)}
										class="flex middle">
										<xIcon icon="delete" />
									</xButton>
								</span>
							</div>
						);
					})}
				</div>
				<xDialogFooter>
					<xButton onClick={this.addTag} class="flex middle">
						<xIcon icon="add" /> 添加新的Tag
					</xButton>
					<xGap f="1" />
					<xButton
						configs={{
							preset: "cancel",
							onClick: this.propDialogOptions.closeDialog
						}}
					/>
					<xButton configs={{ preset: "save", onClick: this.onOk }} />
				</xDialogFooter>
			</>
		);
	}
});
