import {resolveComponent} from "vue";
import {xU} from "../../ventoseUtils";

export default ({property, listeners, propsWillDeleteFromConfigs}) => {
    const Select = resolveComponent("aSelect");
    const SelectOption = resolveComponent("aSelectOption");
    const _property = xU.omit(property, [...propsWillDeleteFromConfigs, "options", "renderOptions"]);
    const renderOptions = () => {
        if (property.renderOptions) {
            return property.renderOptions();
        } else {
            return xU.map(property.options, option => {
                return <SelectOption value={option.value}>{option.label}</SelectOption>;
            });
        }
    };
    return (
        <Select
            {...listeners}
            {..._property}
            v-slots={{default: renderOptions}}
        />
    );
};
