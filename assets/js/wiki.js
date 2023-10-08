import { o as xScope, a as cptRouter, f as xU, e as API, G as GROUP, P as PROJECT, p as watch, q as sortTreeByOrder, t as setDocumentTitle } from "./index.js";
const defautlValue = ({
  ctx
} = {}) => {
  const belongType = (() => {
    var _a;
    if ((_a = ctx == null ? void 0 : ctx.$props) == null ? void 0 : _a.belongType) {
      return ctx.$props.belongType;
    } else {
      const [_, belong_type] = String(cptRouter.value.pathname).match(/\/wiki_(.*)/) || [];
      if (belong_type) {
        return belong_type;
      } else {
        return "";
      }
    }
  })();
  return {
    treeData: [],
    isLoading: false,
    allWiki: {},
    currentWiki: {},
    expandedKeys: [],
    belongType
  };
};
const _stateWiki = defautlValue();
var stateWiki = xScope(_stateWiki, defautlValue);
const Methods_Wiki = {
  clickWiki(query) {
    const {
      query: oldQuery,
      refresh
    } = cptRouter.value;
    refresh(xU.merge({}, oldQuery, query));
  },
  setExpandedKeys: xU.debounce(async (_id) => {
    const expandedKeys = new Set(stateWiki.expandedKeys);
    let currentWiki = stateWiki.allWiki[_id];
    while (currentWiki) {
      expandedKeys.add(currentWiki._id);
      if (currentWiki.p_id !== 0) {
        currentWiki = stateWiki.allWiki[currentWiki.p_id];
      } else {
        currentWiki = null;
      }
    }
    stateWiki.expandedKeys = [...expandedKeys];
    stateWiki.isLoading = false;
  }, 1e3),
  async setCurrentWiki(_id, item) {
    var _a, _b;
    try {
      xU.loading(true);
      if (!xU.isInput(_id)) {
        _id = cptRouter.value.query.wiki_id;
        if (!_id) {
          _id = (_b = (_a = stateWiki.treeData) == null ? void 0 : _a[0]) == null ? void 0 : _b._id;
          if (!_id) {
            return;
          } else {
            Methods_Wiki.clickWiki({
              wiki_id: _id
            });
            return;
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      xU.loading();
    }
    try {
      xU.loading(true);
      if (item) {
        stateWiki.currentWiki = item;
        Methods_Wiki.setExpandedKeys(item._id);
        return;
      } else {
        const {
          data
        } = await API.wiki.detail(_id);
        if (data) {
          stateWiki.currentWiki = data;
          Methods_Wiki.setExpandedKeys(_id);
        } else {
          stateWiki.currentWiki = {};
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      xU.loading();
    }
  },
  async updateWikiMenuList() {
    const {
      group_id,
      project_id
    } = cptRouter.value.query || {};
    let belong_id;
    if (stateWiki.belongType === GROUP) {
      belong_id = group_id;
    }
    if (stateWiki.belongType === PROJECT) {
      belong_id = project_id;
    }
    const {
      data
    } = await API.wiki.menu({
      belong_type: stateWiki.belongType,
      belong_id
    });
    const {
      list,
      orderArray
    } = data;
    stateWiki.treeData = buildTree(list, orderArray);
    Methods_Wiki.setCurrentWiki();
  }
};
watch(() => {
  var _a;
  return (_a = stateWiki == null ? void 0 : stateWiki.currentWiki) == null ? void 0 : _a.title;
}, () => {
  var _a;
  setDocumentTitle(`\u6587\u6863-${(_a = stateWiki.currentWiki) == null ? void 0 : _a.title}`);
});
watch(() => cptRouter.value.query.wiki_id, (_id) => {
  if (_id) {
    Methods_Wiki.setCurrentWiki(_id);
  }
}, {
  immediate: true
});
function buildTree(dataArray, orderArray) {
  console.time("buildTree");
  stateWiki.allWiki = xU.reduce(dataArray, (target, i) => {
    target[i._id] = i;
    return target;
  }, {});
  xU.each(stateWiki.allWiki, function(item) {
    if (!item)
      return;
    const parent = stateWiki.allWiki[item.p_id];
    if (parent) {
      if (!xU.isArray(parent.children)) {
        parent.children = [];
      }
      parent.children.push(item);
    }
  });
  let tree = xU.filter(stateWiki.allWiki, (item) => item.p_id === 0);
  if (xU.isArrayFill(orderArray)) {
    tree = sortTreeByOrder(tree, orderArray);
  }
  console.timeEnd("buildTree");
  return tree;
}
export {
  Methods_Wiki as M,
  stateWiki as s
};
