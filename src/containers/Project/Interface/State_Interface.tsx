import { reactive } from "vue";
import { _ } from "@ventose/ui"


const defautlValue = () => ({ list: [] })

function resetStateInterface() {
    _.map(defautlValue(), (value, prop) => {
        State_Interface[prop] = value;
    })
}

export const State_Interface = reactive(defautlValue());
