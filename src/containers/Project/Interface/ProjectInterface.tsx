import {defineComponent} from "vue";
import {
    _,
    UI,
    AllWasWell,
    pickValueFrom,
    validateForm
} from "@ventose/ui/dist/VentoseUI.es";
import {Cpt_url, State_App} from "../../../state/State_App";

export const ProjectInterface = defineComponent({
    props: [],
    setup() {
        return {State_App, Cpt_url};
    },
    methods: {},
    computed: {},
    render() {
        return <h1>ProjectInterface</h1>;
    }
});
