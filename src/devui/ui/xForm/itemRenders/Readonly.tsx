import { defineComponent } from "vue";

export const ReadonlyItem = defineComponent({
    props: ["value"],
    render() {
        return <div class="ant-input cursor-not-allowed">
            {this.value}
        </div>
    }
})