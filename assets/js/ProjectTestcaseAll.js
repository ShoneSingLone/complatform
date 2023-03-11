import { d as defineComponent, C as Cpt_url, e as createVNode } from "./index.js";
const ProjectTestcaseAll = defineComponent({
  setup() {
    return {
      Cpt_url
    };
  },
  render() {
    return createVNode("h1", null, [this.Cpt_url.pathname]);
  }
});
export {
  ProjectTestcaseAll
};
