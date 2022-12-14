import { AllWasWell, defItem, pickValueFrom, UI, validateForm, xU } from "@ventose/ui";
import { Methods_App, State_App } from "src/state/State_App";
import { defineComponent } from "vue";
import { FormRules } from "../../../utils/common.FormRules";
import { Form } from "ant-design-vue";
import { API } from "src/api";

function genTag(name, desc, index) {
    return {
        nameConfigs: defItem.item({ prop: 'name' + index, placeholder: "tag名称", value: name }),
        descConfigs: defItem.item({ prop: "desc" + index, placeholder: "tag描述信息", value: desc })
    }
}

export const DialogUpsertProxyEnv = defineComponent({
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
        return { privateEnv: {}, currentSelected: "" }
    },
    watch: {
        "propDialogOptions.env": {
            immediate: true,
            handler(env) {
                if (!env) {
                    return;
                }
                this.privateEnv = xU.cloneDeep(env);
                const item = xU.first(this.privateEnv);
                if (item) {
                    this.currentSelected = item;
                }
                console.log("privateEnv", this.privateEnv);
            }
        }
    },
    computed: {
        propProjectId() {
            if (this.propDialogOptions.projectId) {
                return this.propDialogOptions.projectId;
            } else {
                alert("miss projectId")
            }
        },
        formData() {


        },
        vDomLeftSide() {
            return xU.map(this.privateEnv, i => {
                const type = i._id === this.currentSelected._id ? "primary" : ""
                return <aButton type={type} onClick={() => this.currentSelected = i}>
                    {i.name}
                </aButton>
            })
        },
        vdomEnvconfigs() {
            console.log(this.currentSelected);
            return <div class="env-configs flex1">
                {this.currentSelected.domain}
                {this.currentSelected.header}
                {this.currentSelected.global}
            </div>
        }
    },
    methods: {
        async onOk() {

        }
    },
    render() {
        const vm = this;
        return <>
            <div class="flex1 flex horizon DialogUpsertProxyEnv padding20" style="max-height:500px;overflow:auto;">
                <div class="env-list flex vertical">
                    {this.vDomLeftSide}
                </div>
                <div class="env-configs-wrapper flex1 flex">
                    {this.vdomEnvconfigs}
                </div>
            </div>
            <xDialogFooter>
                <xButton onClick={this.addTag} class="flex middle">
                    <xIcon icon="add" /> 添加新的环境
                </xButton>
                <xGap f="1" />
                <xButton configs={{ preset: "cancel", onClick: this.propDialogOptions.closeDialog }} />
                <xButton configs={{ preset: "save", onClick: this.onOk }} />
            </xDialogFooter>
        </>
    }
})
