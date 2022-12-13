import { xU } from "@ventose/ui";
import { State_App } from "src/state/State_App";
import { defineComponent } from "vue";
import { FormRules } from "../../../utils/common.FormRules";

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
        return { privateTags: {} }
    },
    watch: {
        tags: {
            immediate: true,
            handler() {
                if (xU.isArrayFill(this.propDialogOptions.tags)) {
                    this.privateTags = xU.reduce(this.propDialogOptions.tags, (tags, tag, prop) => {
                        tags[prop] = tag;
                        return tags;
                    }, {});
                } else {
                    this.privateTags = {};
                }
            }
        }
    },
    methods: {
        deleteTag(index) {
            const keys = Object.keys(this.privateTags);
            if (keys.length === 1) {
                this.privateTags = { 0: { desc: "", name: "", _id: "" } };
            } else {
                delete this.privateTags[index]
            }
        },
        addTag() {
            const keys = Object.keys(this.privateTags).map(Number).sort();
            const nextIndex = xU.last(keys) + 1;
            this.privateTags[nextIndex] = { desc: "", name: "", _id: "" };
            this.privateTags = { ...this.privateTags }
        }
    },
    render() {
        const vm = this;
        return <>
            <div class="padding10 pointer">
                <xIcon icon="add" onClick={this.addTag} />
            </div>
            <div class="flex1" style="max-height:500px;overflow:auto;">
                {xU.map(this.privateTags, (data, index) => {
                    const { desc, name, _id } = data || {}
                    return (
                        <div class="flex middle mt10 margin10 " key={_id}>
                            <span class="mr10">
                                <xItem v-model={vm.privateTags[index].name} configs={{
                                    placeholder: "tag名称",
                                    onAfterValueEmit(val) {
                                        vm.privateTags[index].name = val;
                                    },
                                    rules: [FormRules.custom({
                                        msg: vm.privateTags[index].msg,
                                        validator: async (val, { rule }) => {
                                            if (xU.some(this.privateTags, i => i.name === val)) {
                                                vm.privateTags[index].msg = val + "与现有tag名称冲突";
                                                return FormRules.FAIL;
                                            }
                                            return FormRules.SUCCESS;
                                        },
                                    })]
                                }} />
                            </span>
                            <span class="mr10">
                                <xItem configs={{
                                    placeholder: "tag描述信息",
                                    value: desc,
                                    onAfterValueEmit(val) {
                                        vm.privateTags[index].desc = val;
                                    },
                                }} />
                            </span>
                            <xIcon icon="delete" onClick={() => this.deleteTag(index)} />
                        </div>
                    )
                })}
            </div>
            <xDialogFooter configs={
                {
                    onCancel: this.propDialogOptions.closeDialog,
                    onOk: async () => {

                    }
                }
            } />
        </>
    }


})
