import { f as xU, a4 as HTTP_METHOD, x as xI, aa as FOLDER, A as ARTICLE, h as createVNode, r as resolveComponent, j as isVNode } from "./index.js";
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ITEM_OPTIONS = {
  httpMethod: xU.map(HTTP_METHOD, (item, prop) => ({
    label: prop,
    value: prop,
    color: item.color,
    type: item.type
  })),
  interfaceBodyType: [{
    label: "form",
    value: "form",
    isForm: true
  }, {
    label: "json",
    value: "json"
  }, {
    label: "file",
    value: "file"
  }, {
    label: "raw",
    value: "raw"
  }],
  interfaceBodyFormType: [{
    label: "text",
    value: "text"
  }, {
    label: "file",
    value: "file"
  }],
  httpProtocol: [{
    label: "http://",
    value: "http://"
  }, {
    label: "https://",
    value: "https://"
  }],
  interfaceStatus: [{
    label: "\u672A\u5B8C\u6210",
    value: "undone"
  }, {
    label: "\u5DF2\u5B8C\u6210",
    value: "done"
  }],
  status: [{
    label: "\u5F00\u901A",
    value: "ACTIVATED"
  }, {
    label: "\u672A\u5F00\u901A",
    value: "NONACTIVATED"
  }],
  YesOrNo: [{
    label: "\u662F",
    value: "true"
  }, {
    label: "\u5426",
    value: "false"
  }],
  wikiType: [{
    label: xI("\u6587\u4EF6\u5939"),
    value: FOLDER
  }, {
    label: xI("\u6587\u6863"),
    value: ARTICLE
  }],
  trueOrFalse: [{
    label: "\u662F",
    value: true
  }, {
    label: "\u5426",
    value: false
  }],
  required: [{
    label: "\u5FC5\u9700",
    value: "1",
    color: "red"
  }, {
    label: "\u975E\u5FC5\u9700",
    value: "0"
  }],
  statusFn(action) {
    if (action === "all") {
      return [{
        label: "\u6240\u6709\u72B6\u6001",
        value: ""
      }].concat(this.status);
    }
    return this.status;
  }
};
const ITEM_OPTIONS_VDOM = {
  interfaceBodyFormType(cell) {
    if (!xU.isInput(cell))
      return null;
    const i = xU.find(ITEM_OPTIONS.interfaceBodyFormType, {
      value: cell
    });
    if (!i) {
      return null;
    }
    return createVNode(resolveComponent("ElTag"), null, {
      default: () => [i == null ? void 0 : i.label]
    });
  },
  required(cell) {
    if (!xU.isInput(cell))
      return null;
    const i = xU.find(ITEM_OPTIONS.required, {
      value: String(cell).toLocaleUpperCase()
    });
    return createVNode(resolveComponent("ElTag"), {
      "color": i.color
    }, {
      default: () => [i.label]
    });
  },
  httpMethod(cell) {
    if (!xU.isInput(cell))
      return null;
    const i = xU.find(ITEM_OPTIONS.httpMethod, {
      value: String(cell).toLocaleUpperCase()
    });
    return createVNode("div", {
      "class": "flex end width100"
    }, [createVNode(resolveComponent("ElTag"), {
      "type": i.type
    }, {
      default: () => [i.label]
    })]);
  },
  status: (status) => {
    if (!xU.isInput(status))
      return null;
    const item = xU.find(ITEM_OPTIONS.interfaceStatus, {
      value: status
    });
    return createVNode("span", {
      "class": "tag-status " + item.value
    }, [item.label]);
  },
  trueOrFalse: (trueOrFalse) => {
    if (!xU.isInput(trueOrFalse))
      return null;
    const item = xU.find(ITEM_OPTIONS.trueOrFalse, {
      value: trueOrFalse
    });
    if (item.label === ITEM_OPTIONS.trueOrFalse[0].label) {
      return createVNode(resolveComponent("ElTag"), {
        "type": "success"
      }, {
        default: () => [item.label]
      });
    } else {
      return createVNode(resolveComponent("ElTag"), {
        "type": "danger"
      }, {
        default: () => [item.label]
      });
    }
  },
  tags: (tags) => {
    if (!xU.isInput(tags))
      return null;
    if (typeof tags === "string") {
      tags = tags.split(",");
    }
    return xU.map(tags, (i) => createVNode(resolveComponent("ElTag"), {
      "effect": "plain",
      "round": true,
      "class": "mr4"
    }, _isSlot(i) ? i : {
      default: () => [i]
    }));
  }
};
export {
  ITEM_OPTIONS as I,
  ITEM_OPTIONS_VDOM as a
};
