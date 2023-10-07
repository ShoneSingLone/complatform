import { h as createVNode, r as resolveComponent } from "./index.js";
const VNodeCollection = {
  labelTips: (popContent) => (configs, className) => {
    const {
      prop,
      label
    } = configs;
    return createVNode("div", {
      "class": "x-form-item-label"
    }, [createVNode("label", {
      "for": prop,
      "class": className
    }, [createVNode("span", {
      "class": "mr10"
    }, [label]), createVNode(resolveComponent("ElPopover"), {
      "trigger": "hover",
      "placement": "top"
    }, {
      content: () => popContent,
      default: () => createVNode(resolveComponent("xIcon"), {
        "icon": "insideTips",
        "class": "pointer ml4"
      }, null)
    })])]);
  }
};
export {
  VNodeCollection as V
};
