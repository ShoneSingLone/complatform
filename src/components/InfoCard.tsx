import {defineComponent} from "vue";

export const InfoCard = defineComponent({
    render() {
        return <div class="ant-descriptions ant-descriptions-middle ant-descriptions-bordered">
            <div class="ant-descriptions-header">
                <div class="ant-descriptions-title">{this.$slots.title()}</div>
            </div>
            <div class="ant-descriptions-view">
                {this.$slots.default()}
            </div>
        </div>
    }
})
