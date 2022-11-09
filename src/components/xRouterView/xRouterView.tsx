import {defineComponent} from "vue";
import {routes} from "../../router/router";
import {_} from "@ventose/ui"
import {Cpt_url} from "../../state/State_App";

export const xRouterView = defineComponent({
    name: "xRouterView",
    data() {
        return {
            Cpt_url
        }
    },
    computed: {
        component() {
            const {name} = this.$route;
            if (name) {
                const route = _.find(routes, {name});
                if (route) {
                    return route.component
                }
            }
            return "div"
        }
    },
    render() {
        return <>
            <h1>{JSON.stringify(this.Cpt_url.pathname)}</h1>
            <h1>{JSON.stringify(this.Cpt_url.query)}</h1>
        </>
    },
})
