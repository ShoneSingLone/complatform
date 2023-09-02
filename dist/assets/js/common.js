var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { r as requireDayjs_min, c as commonjsGlobal, d as defineComponent, a as createVNode, b as createTextVNode, e as cptRouter, f as resolveComponent, g as copyToClipboard, $, x as xU, h as xI, _ as _export_sfc, i as resolveDirective, o as openBlock, j as createElementBlock, k as renderSlot, w as withDirectives, s as stateUI, l as iStorage, m as defineAsyncComponent, v as vModelSelect, F as Fragment, n as getCurrentScope, p as onScopeDispose, u as unref, t as toRef$1, q as readonly, y as customRef, z as ref, A as watch, B as computed, C as reactive, D as nextTick, E as getCurrentInstance, G as onMounted, H as dayjs_minExports, I as installVentoseUI, J as stateApp, R as RouterView } from "./index.js";
var zhCn = { exports: {} };
(function(module2, exports2) {
  !function(e, _) {
    module2.exports = _(requireDayjs_min());
  }(commonjsGlobal, function(e) {
    function _(e2) {
      return e2 && "object" == typeof e2 && "default" in e2 ? e2 : { default: e2 };
    }
    var t = _(e), d = { name: "zh-cn", weekdays: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"), weekdaysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"), weekdaysMin: "\u65E5_\u4E00_\u4E8C_\u4E09_\u56DB_\u4E94_\u516D".split("_"), months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"), monthsShort: "1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"), ordinal: function(e2, _2) {
      return "W" === _2 ? e2 + "\u5468" : e2 + "\u65E5";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY\u5E74M\u6708D\u65E5", LLL: "YYYY\u5E74M\u6708D\u65E5Ah\u70B9mm\u5206", LLLL: "YYYY\u5E74M\u6708D\u65E5ddddAh\u70B9mm\u5206", l: "YYYY/M/D", ll: "YYYY\u5E74M\u6708D\u65E5", lll: "YYYY\u5E74M\u6708D\u65E5 HH:mm", llll: "YYYY\u5E74M\u6708D\u65E5dddd HH:mm" }, relativeTime: { future: "%s\u5185", past: "%s\u524D", s: "\u51E0\u79D2", m: "1 \u5206\u949F", mm: "%d \u5206\u949F", h: "1 \u5C0F\u65F6", hh: "%d \u5C0F\u65F6", d: "1 \u5929", dd: "%d \u5929", M: "1 \u4E2A\u6708", MM: "%d \u4E2A\u6708", y: "1 \u5E74", yy: "%d \u5E74" }, meridiem: function(e2, _2) {
      var t2 = 100 * e2 + _2;
      return t2 < 600 ? "\u51CC\u6668" : t2 < 900 ? "\u65E9\u4E0A" : t2 < 1100 ? "\u4E0A\u5348" : t2 < 1300 ? "\u4E2D\u5348" : t2 < 1800 ? "\u4E0B\u5348" : "\u665A\u4E0A";
    } };
    return t.default.locale(d, null, true), d;
  });
})(zhCn);
const ErrMsg$1 = "";
const ErrMsg = defineComponent({
  name: "ErrMsg",
  props: ["type", "history", "title", "desc", "opration"],
  render() {
    let {
      type,
      title,
      desc,
      opration
    } = this;
    let icon = "frown-o";
    if (type) {
      switch (type) {
        case "noFollow":
          title = "\u4F60\u8FD8\u6CA1\u6709\u5173\u6CE8\u9879\u76EE\u5462";
          desc = createVNode("span", null, [createTextVNode("\u5148\u53BB"), " ", createVNode("a", {
            "onClick": () => cptRouter.value.go("/group")
          }, [createTextVNode("\u201C\u9879\u76EE\u5E7F\u573A\u201D")]), " ", createTextVNode("\u901B\u901B\u5427, \u90A3\u91CC\u53EF\u4EE5\u6DFB\u52A0\u5173\u6CE8\u3002")]);
          break;
        case "noInterface":
          title = "\u8BE5\u9879\u76EE\u8FD8\u6CA1\u6709\u63A5\u53E3\u5462";
          desc = "\u5728\u5DE6\u4FA7 \u201C\u63A5\u53E3\u5217\u8868\u201D \u4E2D\u6DFB\u52A0\u63A5\u53E3";
          break;
        case "noMemberInProject":
          title = "\u8BE5\u9879\u76EE\u8FD8\u6CA1\u6709\u6210\u5458\u5462";
          break;
        case "noMemberInGroup":
          title = "\u8BE5\u5206\u7EC4\u8FD8\u6CA1\u6709\u6210\u5458\u5462";
          break;
        case "noProject":
          title = "\u8BE5\u5206\u7EC4\u8FD8\u6CA1\u6709\u9879\u76EE\u5462";
          desc = createVNode("span", null, [createTextVNode("\u8BF7\u70B9\u51FB\u53F3\u4E0A\u89D2\u6DFB\u52A0\u9879\u76EE\u6309\u94AE\u65B0\u5EFA\u9879\u76EE")]);
          break;
        case "noData":
          title = "\u6682\u65E0\u6570\u636E";
          desc = "\u5148\u53BB\u522B\u5904\u901B\u901B\u5427";
          break;
        case "noChange":
          title = "\u6CA1\u6709\u6539\u52A8";
          desc = "\u8BE5\u64CD\u4F5C\u672A\u6539\u52A8 Api \u6570\u636E";
          icon = "meh-o";
          break;
        default:
          console.log("default");
      }
    }
    return createVNode("div", {
      "class": "err-msg",
      "style": "margin:auto;"
    }, [createVNode(resolveComponent("xIcon"), {
      "icon": icon,
      "class": "icon"
    }, null), createVNode("p", {
      "class": "title"
    }, [title]), createVNode("p", {
      "class": "desc"
    }, [desc]), createVNode("p", {
      "class": "opration"
    }, [opration])]);
  }
});
const _sfc_main = {
  methods: {
    copyText() {
      if (copyToClipboard($(this.$refs.contents).text())) {
        xU.message.success(xI("\u5DF2\u7ECF\u6210\u529F\u590D\u5236\u5230\u526A\u5207\u677F"));
      } else {
        xU.message.error(xI("\u590D\u5236\u5230\u526A\u5207\u677F\u5931\u8D25"));
      }
    }
  }
};
const CopyContent_vue_vue_type_style_index_0_scoped_1dce9b73_lang = "";
const _hoisted_1 = {
  class: "flex middle copy-content-wrapper",
  ref: "contents"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_xIcon = resolveComponent("xIcon");
  const _directive_xTips = resolveDirective("xTips");
  return openBlock(), createElementBlock("span", _hoisted_1, [
    renderSlot(_ctx.$slots, "default", {}, void 0, true),
    withDirectives(createVNode(_component_xIcon, {
      icon: "copy",
      class: "ml10 copy-content-wrapper_icon",
      onClick: $options.copyText
    }, null, 8, ["onClick"]), [
      [_directive_xTips, { content: "copy" }]
    ])
  ], 512);
}
const CopyContent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1dce9b73"]]);
const asyncGetMonaco = async () => {
  if (window.monaco) {
    return window.monaco;
  }
  await xU.asyncGlobalJS("require", `${stateUI.bashPath}monaco/vs/loader.js`);
  window.VentoseUtils = {
    iStorage,
    $,
    xU,
    vs: `${stateUI.bashPath}monaco/vs`
  };
  await xU.asyncGlobalJS(
    "monacoNls",
    `${stateUI.bashPath}monaco/vs/editor/editor.main.nls.js`
  );
  const monacoLoader = await xU.asyncGlobalJS(
    "monaco",
    `${stateUI.bashPath}monaco/vs/editor/editor.main.js`
  );
  return await monacoLoader();
};
const theme = ["vs", "vs-dark", "hc-black", "hc-light"];
const MonacoEditor = defineAsyncComponent(() => new Promise(async (resolve) => {
  const monaco = await asyncGetMonaco();
  resolve(defineComponent({
    props: ["code", "language", "theme", "readOnly"],
    emits: ["update:code"],
    data() {
      return {
        id: xU.genId("MonacoEditor")
      };
    },
    mounted() {
      this.init();
    },
    watch: {
      code: {
        immediate: true,
        handler(value) {
          if (!this.raw$editor) {
            return;
          }
          if (this.readOnly) {
            this.formatDocument && this.formatDocument(this.readOnly);
          }
          if (value !== this.raw$Value) {
            this.raw$editor.setValue(value);
          }
        }
      }
    },
    methods: {
      async init() {
        let vm = this;
        vm.$refs.container.innerHTML = "";
        vm.raw$editor = monaco.editor.create(vm.$refs.container, {
          value: vm.code || "",
          language: vm.language || "javascript",
          minimap: {
            enabled: false
          },
          fontSize: 12,
          readOnly: vm.readOnly || false,
          fixedOverflowWidgets: true,
          theme: vm.theme || theme[3],
          automaticLayout: true
        });
        vm.formatDocument = xU.debounce(function(readOnly) {
          if (readOnly) {
            vm.raw$editor.updateOptions({
              readOnly: false
            });
          }
          vm.raw$editor.trigger("", "editor.action.formatDocument");
          setTimeout(() => {
            if (readOnly) {
              vm.raw$editor.updateOptions({
                readOnly: true
              });
            }
          }, 500);
        }, 600);
        vm.formatDocument(vm.readOnly);
        vm.raw$editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, vm.formatDocument);
        vm.raw$editor.addCommand(monaco.KeyCode.F9, () => {
          xU.launchFullscreen(vm.$refs.container);
        });
        vm.raw$editor.onDidChangeModelContent(vm.syncData);
      },
      syncData() {
        const newCode = this.raw$editor.getValue();
        if (newCode !== this.code) {
          this.raw$Value = newCode;
          this.$emit("update:code", newCode);
        }
      }
    },
    render() {
      return createVNode("div", {
        "id": this.id,
        "ref": "container",
        "class": "flex1",
        "style": "height:100%;width:100%"
      }, null);
    }
  }));
}));
function getDefaults() {
  return {
    async: false,
    baseUrl: null,
    breaks: false,
    extensions: null,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    highlight: null,
    hooks: null,
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    renderer: null,
    sanitize: false,
    sanitizer: null,
    silent: false,
    smartypants: false,
    tokenizer: null,
    walkTokens: null,
    xhtml: false
  };
}
let defaults = getDefaults();
function changeDefaults(newDefaults) {
  defaults = newDefaults;
}
const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, "g");
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
const escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
function unescape(html) {
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase();
    if (n === "colon")
      return ":";
    if (n.charAt(0) === "#") {
      return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
    }
    return "";
  });
}
const caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
  regex = typeof regex === "string" ? regex : regex.source;
  opt = opt || "";
  const obj = {
    replace: (name, val) => {
      val = val.source || val;
      val = val.replace(caret, "$1");
      regex = regex.replace(name, val);
      return obj;
    },
    getRegex: () => {
      return new RegExp(regex, opt);
    }
  };
  return obj;
}
const nonWordAndColonTest = /[^\w:]/g;
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function cleanUrl(sanitize, base, href) {
  if (sanitize) {
    let prot;
    try {
      prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, "").toLowerCase();
    } catch (e) {
      return null;
    }
    if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
      return null;
    }
  }
  if (base && !originIndependentUrl.test(href)) {
    href = resolveUrl(base, href);
  }
  try {
    href = encodeURI(href).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return href;
}
const baseUrls = {};
const justDomain = /^[^:]+:\/*[^/]*$/;
const protocol = /^([^:]+:)[\s\S]*$/;
const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
function resolveUrl(base, href) {
  if (!baseUrls[" " + base]) {
    if (justDomain.test(base)) {
      baseUrls[" " + base] = base + "/";
    } else {
      baseUrls[" " + base] = rtrim(base, "/", true);
    }
  }
  base = baseUrls[" " + base];
  const relativeBase = base.indexOf(":") === -1;
  if (href.substring(0, 2) === "//") {
    if (relativeBase) {
      return href;
    }
    return base.replace(protocol, "$1") + href;
  } else if (href.charAt(0) === "/") {
    if (relativeBase) {
      return href;
    }
    return base.replace(domain, "$1") + href;
  } else {
    return base + href;
  }
}
const noopTest = {
  exec: function noopTest2() {
  }
};
function splitCells(tableRow, count) {
  const row = tableRow.replace(/\|/g, (match, offset, str) => {
    let escaped = false, curr = offset;
    while (--curr >= 0 && str[curr] === "\\")
      escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(/ \|/);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells[cells.length - 1].trim()) {
    cells.pop();
  }
  if (cells.length > count) {
    cells.splice(count);
  } else {
    while (cells.length < count)
      cells.push("");
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(/\\\|/g, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  const l = str.length;
  let level = 0, i = 0;
  for (; i < l; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  return -1;
}
function checkSanitizeDeprecation(opt) {
  if (opt && opt.sanitize && !opt.silent) {
    console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }
}
function repeatString(pattern, count) {
  if (count < 1) {
    return "";
  }
  let result = "";
  while (count > 1) {
    if (count & 1) {
      result += pattern;
    }
    count >>= 1;
    pattern += pattern;
  }
  return result + pattern;
}
function outputLink(cap, link, raw, lexer) {
  const href = link.href;
  const title = link.title ? escape(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, "$1");
  if (cap[0].charAt(0) !== "!") {
    lexer.state.inLink = true;
    const token = {
      type: "link",
      raw,
      href,
      title,
      text,
      tokens: lexer.inlineTokens(text)
    };
    lexer.state.inLink = false;
    return token;
  }
  return {
    type: "image",
    raw,
    href,
    title,
    text: escape(text)
  };
}
function indentCodeCompensation(raw, text) {
  const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(/^\s+/);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
class Tokenizer {
  constructor(options) {
    this.options = options || defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "");
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline._escapes, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (/#$/.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || / $/.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: cap[0]
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ *>[ \t]?/gm, "");
      const top = this.lexer.state.top;
      this.lexer.state.top = true;
      const tokens = this.lexer.blockTokens(text);
      this.lexer.state.top = top;
      return {
        type: "blockquote",
        raw: cap[0],
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let raw, istask, ischecked, indent, i, blankLine, endsWithBlankLine, line, nextLine, rawLine, itemContents, endEarly;
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      while (src) {
        endEarly = false;
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        line = cap[2].split("\n", 1)[0].replace(/^\t+/, (t) => " ".repeat(3 * t.length));
        nextLine = src.split("\n", 1)[0];
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimLeft();
        } else {
          indent = cap[2].search(/[^ ]/);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        blankLine = false;
        if (!line && /^ *$/.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`);
          const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
          const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
          const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
          while (src) {
            rawLine = src.split("\n", 1)[0];
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(src)) {
              break;
            }
            if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLine.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.search(/[^ ]/) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLine.slice(indent);
          }
        }
        if (!list.loose) {
          if (endsWithBlankLine) {
            list.loose = true;
          } else if (/\n *\n *$/.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        if (this.options.gfm) {
          istask = /^\[[ xX]\] /.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(/^\[[ xX]\] +/, "");
          }
        }
        list.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents
        });
        list.raw += raw;
      }
      list.items[list.items.length - 1].raw = raw.trimRight();
      list.items[list.items.length - 1].text = itemContents.trimRight();
      list.raw = list.raw.trimRight();
      const l = list.items.length;
      for (i = 0; i < l; i++) {
        this.lexer.state.top = false;
        list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
        if (!list.loose) {
          const spacers = list.items[i].tokens.filter((t) => t.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => /\n.*\n/.test(t.raw));
          list.loose = hasMultipleLineBreaks;
        }
      }
      if (list.loose) {
        for (i = 0; i < l; i++) {
          list.items[i].loose = true;
        }
      }
      return list;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        raw: cap[0],
        pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
        text: cap[0]
      };
      if (this.options.sanitize) {
        const text = this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]);
        token.type = "paragraph";
        token.text = text;
        token.tokens = this.lexer.inline(text);
      }
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag = cap[1].toLowerCase().replace(/\s+/g, " ");
      const href = cap[2] ? cap[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline._escapes, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline._escapes, "$1") : cap[3];
      return {
        type: "def",
        tag,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (cap) {
      const item = {
        type: "table",
        header: splitCells(cap[1]).map((c) => {
          return {
            text: c
          };
        }),
        align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows: cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, "").split("\n") : []
      };
      if (item.header.length === item.align.length) {
        item.raw = cap[0];
        let l = item.align.length;
        let i, j, k, row;
        for (i = 0; i < l; i++) {
          if (/^ *-+: *$/.test(item.align[i])) {
            item.align[i] = "right";
          } else if (/^ *:-+: *$/.test(item.align[i])) {
            item.align[i] = "center";
          } else if (/^ *:-+ *$/.test(item.align[i])) {
            item.align[i] = "left";
          } else {
            item.align[i] = null;
          }
        }
        l = item.rows.length;
        for (i = 0; i < l; i++) {
          item.rows[i] = splitCells(item.rows[i], item.header.length).map((c) => {
            return {
              text: c
            };
          });
        }
        l = item.header.length;
        for (j = 0; j < l; j++) {
          item.header[j].tokens = this.lexer.inline(item.header[j].text);
        }
        l = item.rows.length;
        for (j = 0; j < l; j++) {
          row = item.rows[j];
          for (k = 0; k < row.length; k++) {
            row[k].tokens = this.lexer.inline(row[k].text);
          }
        }
        return item;
      }
    }
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: escape(cap[1])
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: this.options.sanitize ? "text" : "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && /^</.test(trimmedUrl)) {
        if (!/>$/.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
        if (link) {
          href = link[1];
          title = link[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (/^</.test(href)) {
        if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline._escapes, "$1") : href,
        title: title ? title.replace(this.rules.inline._escapes, "$1") : title
      }, cap[0], this.lexer);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      let link = (cap[2] || cap[1]).replace(/\s+/g, " ");
      link = links[link.toLowerCase()];
      if (!link) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link, cap[0], this.lexer);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrong.lDelim.exec(src);
    if (!match)
      return;
    if (match[3] && prevChar.match(/[\p{L}\p{N}]/u))
      return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || nextChar && (prevChar === "" || this.rules.inline.punctuation.exec(prevChar))) {
      const lLength = match[0].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim)
          continue;
        rLength = rDelim.length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0)
          continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const raw = src.slice(0, lLength + match.index + (match[0].length - rDelim.length) + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(/\n/g, " ");
      const hasNonSpaceChars = /[^ ]/.test(text);
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      text = escape(text, true);
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src, mangle2) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[1]) : cap[1]);
        href = "mailto:" + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [{
          type: "text",
          raw: text,
          text
        }]
      };
    }
  }
  url(src, mangle2) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = escape(this.options.mangle ? mangle2(cap[0]) : cap[0]);
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
        } while (prevCapZero !== cap[0]);
        text = escape(cap[0]);
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [{
          type: "text",
          raw: text,
          text
        }]
      };
    }
  }
  inlineText(src, smartypants2) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      let text;
      if (this.lexer.state.inRawBlock) {
        text = this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
      } else {
        text = escape(this.options.smartypants ? smartypants2(cap[0]) : cap[0]);
      }
      return {
        type: "text",
        raw: cap[0],
        text
      };
    }
  }
}
const block = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: noopTest,
  lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/
};
block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
block.bullet = /(?:[*+-]|\d{1,9}[.)])/;
block.listItemStart = edit(/^( *)(bull) */).replace("bull", block.bullet).getRegex();
block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
block.normal = {
  ...block
};
block.gfm = {
  ...block.normal,
  table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
};
block.gfm.table = edit(block.gfm.table).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.gfm.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("table", block.gfm.table).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", block._tag).getRegex();
block.pedantic = {
  ...block.normal,
  html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
};
const inline = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noopTest,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    rDelimAst: /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
    rDelimUnd: /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: noopTest,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/
};
inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~";
inline.punctuation = edit(inline.punctuation).replace(/punctuation/g, inline._punctuation).getRegex();
inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
inline.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g;
inline._comment = edit(block._comment).replace("(?:-->|$)", "-->").getRegex();
inline.emStrong.lDelim = edit(inline.emStrong.lDelim).replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g").replace(/punct/g, inline._punctuation).getRegex();
inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g").replace(/punct/g, inline._punctuation).getRegex();
inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
inline.tag = edit(inline.tag).replace("comment", inline._comment).replace("attribute", inline._attribute).getRegex();
inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
inline.reflink = edit(inline.reflink).replace("label", inline._label).replace("ref", block._label).getRegex();
inline.nolink = edit(inline.nolink).replace("ref", block._label).getRegex();
inline.reflinkSearch = edit(inline.reflinkSearch, "g").replace("reflink", inline.reflink).replace("nolink", inline.nolink).getRegex();
inline.normal = {
  ...inline
};
inline.pedantic = {
  ...inline.normal,
  strong: {
    start: /^__|\*\*/,
    middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
    endAst: /\*\*(?!\*)/g,
    endUnd: /__(?!_)/g
  },
  em: {
    start: /^_|\*/,
    middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
    endAst: /\*(?!\*)/g,
    endUnd: /_(?!_)/g
  },
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
};
inline.gfm = {
  ...inline.normal,
  escape: edit(inline.escape).replace("])", "~|])").getRegex(),
  _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
  url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
inline.breaks = {
  ...inline.gfm,
  br: edit(inline.br).replace("{2,}", "*").getRegex(),
  text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
function smartypants(text) {
  return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
}
function mangle(text) {
  let out = "", i, ch;
  const l = text.length;
  for (i = 0; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = "x" + ch.toString(16);
    }
    out += "&#" + ch + ";";
  }
  return out;
}
class Lexer {
  constructor(options) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  static get rules() {
    return {
      block,
      inline
    };
  }
  static lex(src, options) {
    const lexer = new Lexer(options);
    return lexer.lex(src);
  }
  static lexInline(src, options) {
    const lexer = new Lexer(options);
    return lexer.inlineTokens(src);
  }
  lex(src) {
    src = src.replace(/\r\n|\r/g, "\n");
    this.blockTokens(src, this.tokens);
    let next;
    while (next = this.inlineQueue.shift()) {
      this.inlineTokens(next.src, next.tokens);
    }
    return this.tokens;
  }
  blockTokens(src, tokens = []) {
    if (this.options.pedantic) {
      src = src.replace(/\t/g, "    ").replace(/^ +$/gm, "");
    } else {
      src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs) => {
        return leading + "    ".repeat(tabs.length);
      });
    }
    let token, lastToken, cutSrc, lastParagraphClipped;
    while (src) {
      if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer) => {
        if (token = extTokenizer.call({
          lexer: this
        }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        if (token.raw.length === 1 && tokens.length > 0) {
          tokens[tokens.length - 1].raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && (lastToken.type === "paragraph" || lastToken.type === "text")) {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({
            lexer: this
          }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        lastToken = tokens[tokens.length - 1];
        if (lastParagraphClipped && lastToken.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({
      src,
      tokens
    });
    return tokens;
  }
  inlineTokens(src, tokens = []) {
    let token, lastToken, cutSrc;
    let maskedSrc = src;
    let match;
    let keepPrevChar, prevChar;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + repeatString("a", match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index + match[0].length - 2) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
      this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
    }
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer) => {
        if (token = extTokenizer.call({
          lexer: this
        }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        lastToken = tokens[tokens.length - 1];
        if (lastToken && token.type === "text" && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src, mangle)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src, mangle))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      cutSrc = src;
      if (this.options.extensions && this.options.extensions.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach(function(getStartIndex) {
          tempStart = getStartIndex.call({
            lexer: this
          }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc, smartypants)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
}
class Renderer {
  constructor(options) {
    this.options = options || defaults;
  }
  code(code, infostring, escaped) {
    const lang = (infostring || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const out = this.options.highlight(code, lang);
      if (out != null && out !== code) {
        escaped = true;
        code = out;
      }
    }
    code = code.replace(/\n$/, "") + "\n";
    if (!lang) {
      return "<pre><code>" + (escaped ? code : escape(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="hljs ' + this.options.langPrefix + escape(lang) + '">' + (escaped ? code : escape(code, true)) + "</code></pre>\n";
  }
  blockquote(quote) {
    return `<blockquote>
${quote}</blockquote>
`;
  }
  html(html) {
    return html;
  }
  heading(text, level, raw, slugger) {
    if (this.options.headerIds) {
      const id = this.options.headerPrefix + slugger.slug(raw);
      return `<h${level} id="${id}">${text}</h${level}>
`;
    }
    return `<h${level}>${text}</h${level}>
`;
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(body, ordered, start) {
    const type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
  }
  listitem(text) {
    return `<li>${text}</li>
`;
  }
  checkbox(checked) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
  }
  paragraph(text) {
    return `<p>${text}</p>
`;
  }
  table(header, body) {
    if (body)
      body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow(content) {
    return `<tr>
${content}</tr>
`;
  }
  tablecell(content, flags) {
    const type = flags.header ? "th" : "td";
    const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
    return tag + content + `</${type}>
`;
  }
  strong(text) {
    return `<strong>${text}</strong>`;
  }
  em(text) {
    return `<em>${text}</em>`;
  }
  codespan(text) {
    return `<code>${text}</code>`;
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(text) {
    return `<del>${text}</del>`;
  }
  link(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image(href, title, text) {
    href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text;
    }
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += this.options.xhtml ? "/>" : ">";
    return out;
  }
  text(text) {
    return `<span>${text}</span>`;
  }
}
class TextRenderer {
  strong(text) {
    return text;
  }
  em(text) {
    return text;
  }
  codespan(text) {
    return text;
  }
  del(text) {
    return text;
  }
  html(text) {
    return text;
  }
  text(text) {
    return text;
  }
  link(href, title, text) {
    return "" + text;
  }
  image(href, title, text) {
    return "" + text;
  }
  br() {
    return "";
  }
}
class Slugger {
  constructor() {
    this.seen = {};
  }
  serialize(value) {
    return value.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
  }
  getNextSafeSlug(originalSlug, isDryRun) {
    let slug = originalSlug;
    let occurenceAccumulator = 0;
    if (this.seen.hasOwnProperty(slug)) {
      occurenceAccumulator = this.seen[originalSlug];
      do {
        occurenceAccumulator++;
        slug = originalSlug + "-" + occurenceAccumulator;
      } while (this.seen.hasOwnProperty(slug));
    }
    if (!isDryRun) {
      this.seen[originalSlug] = occurenceAccumulator;
      this.seen[slug] = 0;
    }
    return slug;
  }
  slug(value, options = {}) {
    const slug = this.serialize(value);
    return this.getNextSafeSlug(slug, options.dryrun);
  }
}
class Parser {
  constructor(options) {
    this.options = options || defaults;
    this.options.renderer = this.options.renderer || new Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.textRenderer = new TextRenderer();
    this.slugger = new Slugger();
  }
  static parse(tokens, options) {
    const parser = new Parser(options);
    return parser.parse(tokens);
  }
  static parseInline(tokens, options) {
    const parser = new Parser(options);
    return parser.parseInline(tokens);
  }
  parse(tokens, top = true) {
    let out = "", i, j, k, l2, l3, row, cell, header, body, token, ordered, start, loose, itemBody, item, checked, task, checkbox, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({
          parser: this
        }, token);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "space": {
          continue;
        }
        case "hr": {
          out += this.renderer.hr();
          continue;
        }
        case "heading": {
          out += this.renderer.heading(this.parseInline(token.tokens), token.depth, unescape(this.parseInline(token.tokens, this.textRenderer)), this.slugger);
          continue;
        }
        case "code": {
          out += this.renderer.code(token.text, token.lang, token.escaped);
          continue;
        }
        case "table": {
          header = "";
          cell = "";
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            cell += this.renderer.tablecell(this.parseInline(token.header[j].tokens), {
              header: true,
              align: token.align[j]
            });
          }
          header += this.renderer.tablerow(cell);
          body = "";
          l2 = token.rows.length;
          for (j = 0; j < l2; j++) {
            row = token.rows[j];
            cell = "";
            l3 = row.length;
            for (k = 0; k < l3; k++) {
              cell += this.renderer.tablecell(this.parseInline(row[k].tokens), {
                header: false,
                align: token.align[k]
              });
            }
            body += this.renderer.tablerow(cell);
          }
          out += this.renderer.table(header, body);
          continue;
        }
        case "blockquote": {
          body = this.parse(token.tokens);
          out += this.renderer.blockquote(body);
          continue;
        }
        case "list": {
          ordered = token.ordered;
          start = token.start;
          loose = token.loose;
          l2 = token.items.length;
          body = "";
          for (j = 0; j < l2; j++) {
            item = token.items[j];
            checked = item.checked;
            task = item.task;
            itemBody = "";
            if (item.task) {
              checkbox = this.renderer.checkbox(checked);
              if (loose) {
                if (item.tokens.length > 0 && item.tokens[0].type === "paragraph") {
                  item.tokens[0].text = checkbox + " " + item.tokens[0].text;
                  if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
                    item.tokens[0].tokens[0].text = checkbox + " " + item.tokens[0].tokens[0].text;
                  }
                } else {
                  item.tokens.unshift({
                    type: "text",
                    text: checkbox
                  });
                }
              } else {
                itemBody += checkbox;
              }
            }
            itemBody += this.parse(item.tokens, loose);
            body += this.renderer.listitem(itemBody, task, checked);
          }
          out += this.renderer.list(body, ordered, start);
          continue;
        }
        case "html": {
          out += this.renderer.html(token.text);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(this.parseInline(token.tokens));
          continue;
        }
        case "text": {
          body = token.tokens ? this.parseInline(token.tokens) : token.text;
          while (i + 1 < l && tokens[i + 1].type === "text") {
            token = tokens[++i];
            body += "\n" + (token.tokens ? this.parseInline(token.tokens) : token.text);
          }
          out += top ? this.renderer.paragraph(body) : body;
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  parseInline(tokens, renderer) {
    renderer = renderer || this.renderer;
    let out = "", i, token, ret;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
        ret = this.options.extensions.renderers[token.type].call({
          parser: this
        }, token);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(token.type)) {
          out += ret || "";
          continue;
        }
      }
      switch (token.type) {
        case "escape": {
          out += renderer.text(token.text);
          break;
        }
        case "html": {
          out += renderer.html(token.text);
          break;
        }
        case "link": {
          out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
          break;
        }
        case "image": {
          out += renderer.image(token.href, token.title, token.text);
          break;
        }
        case "strong": {
          out += renderer.strong(this.parseInline(token.tokens, renderer));
          break;
        }
        case "em": {
          out += renderer.em(this.parseInline(token.tokens, renderer));
          break;
        }
        case "codespan": {
          out += renderer.codespan(token.text);
          break;
        }
        case "br": {
          out += renderer.br();
          break;
        }
        case "del": {
          out += renderer.del(this.parseInline(token.tokens, renderer));
          break;
        }
        case "text": {
          out += renderer.text(token.text);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return;
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
}
class Hooks {
  constructor(options) {
    this.options = options || defaults;
  }
  preprocess(markdown) {
    return markdown;
  }
  postprocess(html) {
    return html;
  }
}
__publicField(Hooks, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess"]));
function onError(silent, async, callback) {
  return (e) => {
    e.message += "\nPlease report this to https://github.com/markedjs/marked.";
    if (silent) {
      const msg = "<p>An error occurred:</p><pre>" + escape(e.message + "", true) + "</pre>";
      if (async) {
        return Promise.resolve(msg);
      }
      if (callback) {
        callback(null, msg);
        return;
      }
      return msg;
    }
    if (async) {
      return Promise.reject(e);
    }
    if (callback) {
      callback(e);
      return;
    }
    throw e;
  };
}
function parseMarkdown(lexer, parser) {
  return (src, opt, callback) => {
    if (typeof opt === "function") {
      callback = opt;
      opt = null;
    }
    const origOpt = {
      ...opt
    };
    opt = {
      ...marked.defaults,
      ...origOpt
    };
    const throwError = onError(opt.silent, opt.async, callback);
    if (typeof src === "undefined" || src === null) {
      return throwError(new Error("marked(): input parameter is undefined or null"));
    }
    if (typeof src !== "string") {
      return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
    }
    checkSanitizeDeprecation(opt);
    if (opt.hooks) {
      opt.hooks.options = opt;
    }
    if (callback) {
      const highlight = opt.highlight;
      let tokens;
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        tokens = lexer(src, opt);
      } catch (e) {
        return throwError(e);
      }
      const done = function(err) {
        let out;
        if (!err) {
          try {
            if (opt.walkTokens) {
              marked.walkTokens(tokens, opt.walkTokens);
            }
            out = parser(tokens, opt);
            if (opt.hooks) {
              out = opt.hooks.postprocess(out);
            }
          } catch (e) {
            err = e;
          }
        }
        opt.highlight = highlight;
        return err ? throwError(err) : callback(null, out);
      };
      if (!highlight || highlight.length < 3) {
        return done();
      }
      delete opt.highlight;
      if (!tokens.length)
        return done();
      let pending = 0;
      marked.walkTokens(tokens, function(token) {
        if (token.type === "code") {
          pending++;
          setTimeout(() => {
            highlight(token.text, token.lang, function(err, code) {
              if (err) {
                return done(err);
              }
              if (code != null && code !== token.text) {
                token.text = code;
                token.escaped = true;
              }
              pending--;
              if (pending === 0) {
                done();
              }
            });
          }, 0);
        }
      });
      if (pending === 0) {
        done();
      }
      return;
    }
    if (opt.async) {
      return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer(src2, opt)).then((tokens) => opt.walkTokens ? Promise.all(marked.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser(tokens, opt)).then((html) => opt.hooks ? opt.hooks.postprocess(html) : html).catch(throwError);
    }
    try {
      if (opt.hooks) {
        src = opt.hooks.preprocess(src);
      }
      const tokens = lexer(src, opt);
      if (opt.walkTokens) {
        marked.walkTokens(tokens, opt.walkTokens);
      }
      let html = parser(tokens, opt);
      if (opt.hooks) {
        html = opt.hooks.postprocess(html);
      }
      return html;
    } catch (e) {
      return throwError(e);
    }
  };
}
function marked(src, opt, callback) {
  return parseMarkdown(Lexer.lex, Parser.parse)(src, opt, callback);
}
marked.options = marked.setOptions = function(opt) {
  marked.defaults = {
    ...marked.defaults,
    ...opt
  };
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = getDefaults;
marked.defaults = defaults;
marked.use = function(...args) {
  const extensions = marked.defaults.extensions || {
    renderers: {},
    childTokens: {}
  };
  args.forEach((pack) => {
    const opts = {
      ...pack
    };
    opts.async = marked.defaults.async || opts.async || false;
    if (pack.extensions) {
      pack.extensions.forEach((ext) => {
        if (!ext.name) {
          throw new Error("extension name required");
        }
        if (ext.renderer) {
          const prevRenderer = extensions.renderers[ext.name];
          if (prevRenderer) {
            extensions.renderers[ext.name] = function(...args2) {
              let ret = ext.renderer.apply(this, args2);
              if (ret === false) {
                ret = prevRenderer.apply(this, args2);
              }
              return ret;
            };
          } else {
            extensions.renderers[ext.name] = ext.renderer;
          }
        }
        if (ext.tokenizer) {
          if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
            throw new Error("extension level must be 'block' or 'inline'");
          }
          if (extensions[ext.level]) {
            extensions[ext.level].unshift(ext.tokenizer);
          } else {
            extensions[ext.level] = [ext.tokenizer];
          }
          if (ext.start) {
            if (ext.level === "block") {
              if (extensions.startBlock) {
                extensions.startBlock.push(ext.start);
              } else {
                extensions.startBlock = [ext.start];
              }
            } else if (ext.level === "inline") {
              if (extensions.startInline) {
                extensions.startInline.push(ext.start);
              } else {
                extensions.startInline = [ext.start];
              }
            }
          }
        }
        if (ext.childTokens) {
          extensions.childTokens[ext.name] = ext.childTokens;
        }
      });
      opts.extensions = extensions;
    }
    if (pack.renderer) {
      const renderer = marked.defaults.renderer || new Renderer();
      for (const prop in pack.renderer) {
        const prevRenderer = renderer[prop];
        renderer[prop] = (...args2) => {
          let ret = pack.renderer[prop].apply(renderer, args2);
          if (ret === false) {
            ret = prevRenderer.apply(renderer, args2);
          }
          return ret;
        };
      }
      opts.renderer = renderer;
    }
    if (pack.tokenizer) {
      const tokenizer = marked.defaults.tokenizer || new Tokenizer();
      for (const prop in pack.tokenizer) {
        const prevTokenizer = tokenizer[prop];
        tokenizer[prop] = (...args2) => {
          let ret = pack.tokenizer[prop].apply(tokenizer, args2);
          if (ret === false) {
            ret = prevTokenizer.apply(tokenizer, args2);
          }
          return ret;
        };
      }
      opts.tokenizer = tokenizer;
    }
    if (pack.hooks) {
      const hooks = marked.defaults.hooks || new Hooks();
      for (const prop in pack.hooks) {
        const prevHook = hooks[prop];
        if (Hooks.passThroughHooks.has(prop)) {
          hooks[prop] = (arg) => {
            if (marked.defaults.async) {
              return Promise.resolve(pack.hooks[prop].call(hooks, arg)).then((ret2) => {
                return prevHook.call(hooks, ret2);
              });
            }
            const ret = pack.hooks[prop].call(hooks, arg);
            return prevHook.call(hooks, ret);
          };
        } else {
          hooks[prop] = (...args2) => {
            let ret = pack.hooks[prop].apply(hooks, args2);
            if (ret === false) {
              ret = prevHook.apply(hooks, args2);
            }
            return ret;
          };
        }
      }
      opts.hooks = hooks;
    }
    if (pack.walkTokens) {
      const walkTokens = marked.defaults.walkTokens;
      opts.walkTokens = function(token) {
        let values = [];
        values.push(pack.walkTokens.call(this, token));
        if (walkTokens) {
          values = values.concat(walkTokens.call(this, token));
        }
        return values;
      };
    }
    marked.setOptions(opts);
  });
};
marked.walkTokens = function(tokens, callback) {
  let values = [];
  for (const token of tokens) {
    values = values.concat(callback.call(marked, token));
    switch (token.type) {
      case "table": {
        for (const cell of token.header) {
          values = values.concat(marked.walkTokens(cell.tokens, callback));
        }
        for (const row of token.rows) {
          for (const cell of row) {
            values = values.concat(marked.walkTokens(cell.tokens, callback));
          }
        }
        break;
      }
      case "list": {
        values = values.concat(marked.walkTokens(token.items, callback));
        break;
      }
      default: {
        if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) {
          marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
            values = values.concat(marked.walkTokens(token[childTokens], callback));
          });
        } else if (token.tokens) {
          values = values.concat(marked.walkTokens(token.tokens, callback));
        }
      }
    }
  }
  return values;
};
marked.parseInline = parseMarkdown(Lexer.lexInline, Parser.parseInline);
marked.Parser = Parser;
marked.parser = Parser.parse;
marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;
marked.Lexer = Lexer;
marked.lexer = Lexer.lex;
marked.Tokenizer = Tokenizer;
marked.Slugger = Slugger;
marked.Hooks = Hooks;
marked.parse = marked;
marked.options;
marked.setOptions;
marked.use;
marked.walkTokens;
marked.parseInline;
Parser.parse;
Lexer.lex;
var hljs = function() {
  function e(t2) {
    return t2 instanceof Map ? t2.clear = t2.delete = t2.set = () => {
      throw Error("map is read-only");
    } : t2 instanceof Set && (t2.add = t2.clear = t2.delete = () => {
      throw Error("set is read-only");
    }), Object.freeze(t2), Object.getOwnPropertyNames(t2).forEach((n2) => {
      var s2 = t2[n2];
      "object" != typeof s2 || Object.isFrozen(s2) || e(s2);
    }), t2;
  }
  var t = e, n = e;
  t.default = n;
  class s {
    constructor(e2) {
      void 0 === e2.data && (e2.data = {}), this.data = e2.data;
    }
    ignoreMatch() {
      this.ignore = true;
    }
  }
  function r(e2) {
    return e2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  }
  function a(e2, ...t2) {
    const n2 = /* @__PURE__ */ Object.create(null);
    for (const t3 in e2)
      n2[t3] = e2[t3];
    return t2.forEach((e3) => {
      for (const t3 in e3)
        n2[t3] = e3[t3];
    }), n2;
  }
  function i(e2) {
    return e2.nodeName.toLowerCase();
  }
  var o = Object.freeze({
    __proto__: null,
    escapeHTML: r,
    inherit: a,
    nodeStream: (e2) => {
      const t2 = [];
      return function e3(n2, s2) {
        for (let r2 = n2.firstChild; r2; r2 = r2.nextSibling)
          3 === r2.nodeType ? s2 += r2.nodeValue.length : 1 === r2.nodeType && (t2.push({
            event: "start",
            offset: s2,
            node: r2
          }), s2 = e3(r2, s2), i(r2).match(/br|hr|img|input/) || t2.push({
            event: "stop",
            offset: s2,
            node: r2
          }));
        return s2;
      }(e2, 0), t2;
    },
    mergeStreams: (e2, t2, n2) => {
      let s2 = 0, a2 = "";
      const o2 = [];
      function l2() {
        return e2.length && t2.length ? e2[0].offset !== t2[0].offset ? e2[0].offset < t2[0].offset ? e2 : t2 : "start" === t2[0].event ? e2 : t2 : e2.length ? e2 : t2;
      }
      function c2(e3) {
        a2 += "<" + i(e3) + [].map.call(e3.attributes, (e4) => " " + e4.nodeName + '="' + r(e4.value) + '"').join("") + ">";
      }
      function u2(e3) {
        a2 += "</" + i(e3) + ">";
      }
      function g2(e3) {
        ("start" === e3.event ? c2 : u2)(e3.node);
      }
      for (; e2.length || t2.length; ) {
        let t3 = l2();
        if (a2 += r(n2.substring(s2, t3[0].offset)), s2 = t3[0].offset, t3 === e2) {
          o2.reverse().forEach(u2);
          do {
            g2(t3.splice(0, 1)[0]), t3 = l2();
          } while (t3 === e2 && t3.length && t3[0].offset === s2);
          o2.reverse().forEach(c2);
        } else
          "start" === t3[0].event ? o2.push(t3[0].node) : o2.pop(), g2(t3.splice(0, 1)[0]);
      }
      return a2 + r(n2.substr(s2));
    }
  });
  const l = (e2) => !!e2.kind;
  class c {
    constructor(e2, t2) {
      this.buffer = "", this.classPrefix = t2.classPrefix, e2.walk(this);
    }
    addText(e2) {
      this.buffer += r(e2);
    }
    openNode(e2) {
      if (!l(e2))
        return;
      let t2 = e2.kind;
      e2.sublanguage || (t2 = `${this.classPrefix}${t2}`), this.span(t2);
    }
    closeNode(e2) {
      l(e2) && (this.buffer += "</span>");
    }
    value() {
      return this.buffer;
    }
    span(e2) {
      this.buffer += `<span class="${e2}">`;
    }
  }
  class u {
    constructor() {
      this.rootNode = {
        children: []
      }, this.stack = [this.rootNode];
    }
    get top() {
      return this.stack[this.stack.length - 1];
    }
    get root() {
      return this.rootNode;
    }
    add(e2) {
      this.top.children.push(e2);
    }
    openNode(e2) {
      const t2 = { kind: e2, children: [] };
      this.add(t2), this.stack.push(t2);
    }
    closeNode() {
      if (this.stack.length > 1)
        return this.stack.pop();
    }
    closeAllNodes() {
      for (; this.closeNode(); )
        ;
    }
    toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    walk(e2) {
      return this.constructor._walk(e2, this.rootNode);
    }
    static _walk(e2, t2) {
      return "string" == typeof t2 ? e2.addText(t2) : t2.children && (e2.openNode(t2), t2.children.forEach((t3) => this._walk(e2, t3)), e2.closeNode(t2)), e2;
    }
    static _collapse(e2) {
      "string" != typeof e2 && e2.children && (e2.children.every((e3) => "string" == typeof e3) ? e2.children = [e2.children.join("")] : e2.children.forEach((e3) => {
        u._collapse(e3);
      }));
    }
  }
  class g extends u {
    constructor(e2) {
      super(), this.options = e2;
    }
    addKeyword(e2, t2) {
      "" !== e2 && (this.openNode(t2), this.addText(e2), this.closeNode());
    }
    addText(e2) {
      "" !== e2 && this.add(e2);
    }
    addSublanguage(e2, t2) {
      const n2 = e2.root;
      n2.kind = t2, n2.sublanguage = true, this.add(n2);
    }
    toHTML() {
      return new c(this, this.options).value();
    }
    finalize() {
      return true;
    }
  }
  function d(e2) {
    return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
  }
  const h = "[a-zA-Z]\\w*", f = "[a-zA-Z_]\\w*", p = "\\b\\d+(\\.\\d+)?", m = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", b = "\\b(0b[01]+)", x = {
    begin: "\\\\[\\s\\S]",
    relevance: 0
  }, E = {
    className: "string",
    begin: "'",
    end: "'",
    illegal: "\\n",
    contains: [x]
  }, v = {
    className: "string",
    begin: '"',
    end: '"',
    illegal: "\\n",
    contains: [x]
  }, _ = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  }, w = (e2, t2, n2 = {}) => {
    const s2 = a({ className: "comment", begin: e2, end: t2, contains: [] }, n2);
    return s2.contains.push(_), s2.contains.push({
      className: "doctag",
      begin: "(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",
      relevance: 0
    }), s2;
  }, N = w("//", "$"), y = w("/\\*", "\\*/"), R = w("#", "$");
  var k = Object.freeze({
    __proto__: null,
    IDENT_RE: h,
    UNDERSCORE_IDENT_RE: f,
    NUMBER_RE: p,
    C_NUMBER_RE: m,
    BINARY_NUMBER_RE: b,
    RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    SHEBANG: (e2 = {}) => {
      const t2 = /^#![ ]*\//;
      return e2.binary && (e2.begin = ((...e3) => e3.map((e4) => d(e4)).join(""))(
        t2,
        /.*\b/,
        e2.binary,
        /\b.*/
      )), a(
        {
          className: "meta",
          begin: t2,
          end: /$/,
          relevance: 0,
          "on:begin": (e3, t3) => {
            0 !== e3.index && t3.ignoreMatch();
          }
        },
        e2
      );
    },
    BACKSLASH_ESCAPE: x,
    APOS_STRING_MODE: E,
    QUOTE_STRING_MODE: v,
    PHRASAL_WORDS_MODE: _,
    COMMENT: w,
    C_LINE_COMMENT_MODE: N,
    C_BLOCK_COMMENT_MODE: y,
    HASH_COMMENT_MODE: R,
    NUMBER_MODE: { className: "number", begin: p, relevance: 0 },
    C_NUMBER_MODE: { className: "number", begin: m, relevance: 0 },
    BINARY_NUMBER_MODE: { className: "number", begin: b, relevance: 0 },
    CSS_NUMBER_MODE: {
      className: "number",
      begin: p + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      relevance: 0
    },
    REGEXP_MODE: {
      begin: /(?=\/[^/\n]*\/)/,
      contains: [
        {
          className: "regexp",
          begin: /\//,
          end: /\/[gimuy]*/,
          illegal: /\n/,
          contains: [x, { begin: /\[/, end: /\]/, relevance: 0, contains: [x] }]
        }
      ]
    },
    TITLE_MODE: { className: "title", begin: h, relevance: 0 },
    UNDERSCORE_TITLE_MODE: { className: "title", begin: f, relevance: 0 },
    METHOD_GUARD: {
      begin: "\\.\\s*[a-zA-Z_]\\w*",
      relevance: 0
    },
    END_SAME_AS_BEGIN: (e2) => Object.assign(e2, {
      "on:begin": (e3, t2) => {
        t2.data._beginMatch = e3[1];
      },
      "on:end": (e3, t2) => {
        t2.data._beginMatch !== e3[1] && t2.ignoreMatch();
      }
    })
  });
  const M = [
    "of",
    "and",
    "for",
    "in",
    "not",
    "or",
    "if",
    "then",
    "parent",
    "list",
    "value"
  ];
  function O(e2) {
    function t2(t3, n3) {
      return RegExp(
        d(t3),
        "m" + (e2.case_insensitive ? "i" : "") + (n3 ? "g" : "")
      );
    }
    class n2 {
      constructor() {
        this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
      }
      addRule(e3, t3) {
        t3.position = this.position++, this.matchIndexes[this.matchAt] = t3, this.regexes.push([t3, e3]), this.matchAt += ((e4) => RegExp(e4.toString() + "|").exec("").length - 1)(e3) + 1;
      }
      compile() {
        0 === this.regexes.length && (this.exec = () => null);
        const e3 = this.regexes.map((e4) => e4[1]);
        this.matcherRe = t2(
          ((e4, t3 = "|") => {
            const n3 = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
            let s3 = 0, r3 = "";
            for (let a2 = 0; a2 < e4.length; a2++) {
              s3 += 1;
              const i2 = s3;
              let o2 = d(e4[a2]);
              for (a2 > 0 && (r3 += t3), r3 += "("; o2.length > 0; ) {
                const e5 = n3.exec(o2);
                if (null == e5) {
                  r3 += o2;
                  break;
                }
                r3 += o2.substring(0, e5.index), o2 = o2.substring(e5.index + e5[0].length), "\\" === e5[0][0] && e5[1] ? r3 += "\\" + (Number(e5[1]) + i2) : (r3 += e5[0], "(" === e5[0] && s3++);
              }
              r3 += ")";
            }
            return r3;
          })(e3),
          true
        ), this.lastIndex = 0;
      }
      exec(e3) {
        this.matcherRe.lastIndex = this.lastIndex;
        const t3 = this.matcherRe.exec(e3);
        if (!t3)
          return null;
        const n3 = t3.findIndex((e4, t4) => t4 > 0 && void 0 !== e4), s3 = this.matchIndexes[n3];
        return t3.splice(0, n3), Object.assign(t3, s3);
      }
    }
    class s2 {
      constructor() {
        this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
      }
      getMatcher(e3) {
        if (this.multiRegexes[e3])
          return this.multiRegexes[e3];
        const t3 = new n2();
        return this.rules.slice(e3).forEach(([e4, n3]) => t3.addRule(e4, n3)), t3.compile(), this.multiRegexes[e3] = t3, t3;
      }
      resumingScanAtSamePosition() {
        return 0 !== this.regexIndex;
      }
      considerAll() {
        this.regexIndex = 0;
      }
      addRule(e3, t3) {
        this.rules.push([e3, t3]), "begin" === t3.type && this.count++;
      }
      exec(e3) {
        const t3 = this.getMatcher(this.regexIndex);
        t3.lastIndex = this.lastIndex;
        let n3 = t3.exec(e3);
        if (this.resumingScanAtSamePosition())
          if (n3 && n3.index === this.lastIndex)
            ;
          else {
            const t4 = this.getMatcher(0);
            t4.lastIndex = this.lastIndex + 1, n3 = t4.exec(e3);
          }
        return n3 && (this.regexIndex += n3.position + 1, this.regexIndex === this.count && this.considerAll()), n3;
      }
    }
    function r2(e3, t3) {
      "." === e3.input[e3.index - 1] && t3.ignoreMatch();
    }
    if (e2.contains && e2.contains.includes("self"))
      throw Error(
        "ERR: contains `self` is not supported at the top-level of a language.  See documentation."
      );
    return e2.classNameAliases = a(e2.classNameAliases || {}), function n3(i2, o2) {
      const l2 = i2;
      if (i2.compiled)
        return l2;
      i2.compiled = true, i2.__beforeBegin = null, i2.keywords = i2.keywords || i2.beginKeywords;
      let c2 = null;
      if ("object" == typeof i2.keywords && (c2 = i2.keywords.$pattern, delete i2.keywords.$pattern), i2.keywords && (i2.keywords = ((e3, t3) => {
        const n4 = {};
        return "string" == typeof e3 ? s3("keyword", e3) : Object.keys(e3).forEach((t4) => {
          s3(t4, e3[t4]);
        }), n4;
        function s3(e4, s4) {
          t3 && (s4 = s4.toLowerCase()), s4.split(" ").forEach((t4) => {
            const s5 = t4.split("|");
            n4[s5[0]] = [e4, A(s5[0], s5[1])];
          });
        }
      })(i2.keywords, e2.case_insensitive)), i2.lexemes && c2)
        throw Error(
          "ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) "
        );
      return l2.keywordPatternRe = t2(i2.lexemes || c2 || /\w+/, true), o2 && (i2.beginKeywords && (i2.begin = "\\b(" + i2.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", i2.__beforeBegin = r2), i2.begin || (i2.begin = /\B|\b/), l2.beginRe = t2(i2.begin), i2.endSameAsBegin && (i2.end = i2.begin), i2.end || i2.endsWithParent || (i2.end = /\B|\b/), i2.end && (l2.endRe = t2(i2.end)), l2.terminator_end = d(i2.end) || "", i2.endsWithParent && o2.terminator_end && (l2.terminator_end += (i2.end ? "|" : "") + o2.terminator_end)), i2.illegal && (l2.illegalRe = t2(i2.illegal)), void 0 === i2.relevance && (i2.relevance = 1), i2.contains || (i2.contains = []), i2.contains = [].concat(
        ...i2.contains.map(
          (e3) => ((e4) => (e4.variants && !e4.cached_variants && (e4.cached_variants = e4.variants.map(
            (t3) => a(
              e4,
              {
                variants: null
              },
              t3
            )
          )), e4.cached_variants ? e4.cached_variants : L(e4) ? a(e4, {
            starts: e4.starts ? a(e4.starts) : null
          }) : Object.isFrozen(e4) ? a(e4) : e4))("self" === e3 ? i2 : e3)
        )
      ), i2.contains.forEach((e3) => {
        n3(e3, l2);
      }), i2.starts && n3(i2.starts, o2), l2.matcher = ((e3) => {
        const t3 = new s2();
        return e3.contains.forEach(
          (e4) => t3.addRule(e4.begin, { rule: e4, type: "begin" })
        ), e3.terminator_end && t3.addRule(e3.terminator_end, { type: "end" }), e3.illegal && t3.addRule(e3.illegal, { type: "illegal" }), t3;
      })(l2), l2;
    }(e2);
  }
  function L(e2) {
    return !!e2 && (e2.endsWithParent || L(e2.starts));
  }
  function A(e2, t2) {
    return t2 ? Number(t2) : ((e3) => M.includes(e3.toLowerCase()))(e2) ? 0 : 1;
  }
  function j(e2) {
    const t2 = {
      props: ["language", "code", "autodetect"],
      data: () => ({ detectedLanguage: "", unknownLanguage: false }),
      computed: {
        className() {
          return this.unknownLanguage ? "" : "hljs " + this.detectedLanguage;
        },
        highlighted() {
          if (!this.autoDetect && !e2.getLanguage(this.language))
            return console.warn(
              `The language "${this.language}" you specified could not be found.`
            ), this.unknownLanguage = true, r(this.code);
          let t3;
          return this.autoDetect ? (t3 = e2.highlightAuto(this.code), this.detectedLanguage = t3.language) : (t3 = e2.highlight(
            this.language,
            this.code,
            this.ignoreIllegals
          ), this.detectedLanguage = this.language), t3.value;
        },
        autoDetect() {
          return !(this.language && (e3 = this.autodetect, !e3 && "" !== e3));
          var e3;
        },
        ignoreIllegals: () => true
      },
      render(e3) {
        return e3("pre", {}, [
          e3("code", {
            class: this.className,
            domProps: { innerHTML: this.highlighted }
          })
        ]);
      }
    };
    return {
      Component: t2,
      VuePlugin: {
        install(e3) {
          e3.component("highlightjs", t2);
        }
      }
    };
  }
  const I = r, S = a, { nodeStream: T, mergeStreams: B } = o, P = Symbol("nomatch");
  return ((e2) => {
    const n2 = [], r2 = /* @__PURE__ */ Object.create(null), a2 = /* @__PURE__ */ Object.create(null), i2 = [];
    let o2 = true;
    const l2 = /(^(<[^>]+>|\t|)+|\n)/gm, c2 = "Could not find the language '{}', did you forget to load/include a language module?", u2 = {
      disableAutodetect: true,
      name: "Plain text",
      contains: []
    };
    let d2 = {
      noHighlightRe: /^(no-?highlight)$/i,
      languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
      classPrefix: "hljs-",
      tabReplace: null,
      useBR: false,
      languages: null,
      __emitter: g
    };
    function h2(e3) {
      return d2.noHighlightRe.test(e3);
    }
    function f2(e3, t2, n3, s2) {
      const r3 = { code: t2, language: e3 };
      N2("before:highlight", r3);
      const a3 = r3.result ? r3.result : p2(r3.language, r3.code, n3, s2);
      return a3.code = r3.code, N2("after:highlight", a3), a3;
    }
    function p2(e3, t2, n3, a3) {
      const i3 = t2;
      function l3(e4, t3) {
        const n4 = _3.case_insensitive ? t3[0].toLowerCase() : t3[0];
        return Object.prototype.hasOwnProperty.call(e4.keywords, n4) && e4.keywords[n4];
      }
      function u3() {
        null != y2.subLanguage ? (() => {
          if ("" === M2)
            return;
          let e4 = null;
          if ("string" == typeof y2.subLanguage) {
            if (!r2[y2.subLanguage])
              return void k2.addText(M2);
            e4 = p2(y2.subLanguage, M2, true, R2[y2.subLanguage]), R2[y2.subLanguage] = e4.top;
          } else
            e4 = m2(M2, y2.subLanguage.length ? y2.subLanguage : null);
          y2.relevance > 0 && (L2 += e4.relevance), k2.addSublanguage(e4.emitter, e4.language);
        })() : (() => {
          if (!y2.keywords)
            return void k2.addText(M2);
          let e4 = 0;
          y2.keywordPatternRe.lastIndex = 0;
          let t3 = y2.keywordPatternRe.exec(M2), n4 = "";
          for (; t3; ) {
            n4 += M2.substring(e4, t3.index);
            const s2 = l3(y2, t3);
            if (s2) {
              const [e5, r3] = s2;
              k2.addText(n4), n4 = "", L2 += r3;
              const a4 = _3.classNameAliases[e5] || e5;
              k2.addKeyword(t3[0], a4);
            } else
              n4 += t3[0];
            e4 = y2.keywordPatternRe.lastIndex, t3 = y2.keywordPatternRe.exec(M2);
          }
          n4 += M2.substr(e4), k2.addText(n4);
        })(), M2 = "";
      }
      function g2(e4) {
        return e4.className && k2.openNode(_3.classNameAliases[e4.className] || e4.className), y2 = Object.create(e4, { parent: { value: y2 } }), y2;
      }
      function h3(e4, t3, n4) {
        let r3 = ((e5, t4) => {
          const n5 = e5 && e5.exec(t4);
          return n5 && 0 === n5.index;
        })(e4.endRe, n4);
        if (r3) {
          if (e4["on:end"]) {
            const n5 = new s(e4);
            e4["on:end"](t3, n5), n5.ignore && (r3 = false);
          }
          if (r3) {
            for (; e4.endsParent && e4.parent; )
              e4 = e4.parent;
            return e4;
          }
        }
        if (e4.endsWithParent)
          return h3(e4.parent, t3, n4);
      }
      function f3(e4) {
        return 0 === y2.matcher.regexIndex ? (M2 += e4[0], 1) : (S2 = true, 0);
      }
      function b3(e4) {
        const t3 = e4[0], n4 = i3.substr(e4.index), s2 = h3(y2, e4, n4);
        if (!s2)
          return P;
        const r3 = y2;
        r3.skip ? M2 += t3 : (r3.returnEnd || r3.excludeEnd || (M2 += t3), u3(), r3.excludeEnd && (M2 = t3));
        do {
          y2.className && k2.closeNode(), y2.skip || y2.subLanguage || (L2 += y2.relevance), y2 = y2.parent;
        } while (y2 !== s2.parent);
        return s2.starts && (s2.endSameAsBegin && (s2.starts.endRe = s2.endRe), g2(s2.starts)), r3.returnEnd ? 0 : t3.length;
      }
      let x3 = {};
      function E3(t3, r3) {
        const a4 = r3 && r3[0];
        if (M2 += t3, null == a4)
          return u3(), 0;
        if ("begin" === x3.type && "end" === r3.type && x3.index === r3.index && "" === a4) {
          if (M2 += i3.slice(r3.index, r3.index + 1), !o2) {
            const t4 = Error("0 width match regex");
            throw t4.languageName = e3, t4.badRule = x3.rule, t4;
          }
          return 1;
        }
        if (x3 = r3, "begin" === r3.type)
          return function(e4) {
            const t4 = e4[0], n4 = e4.rule, r4 = new s(n4), a5 = [n4.__beforeBegin, n4["on:begin"]];
            for (const n5 of a5)
              if (n5 && (n5(e4, r4), r4.ignore))
                return f3(t4);
            return n4 && n4.endSameAsBegin && (n4.endRe = RegExp(
              t4.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "m"
            )), n4.skip ? M2 += t4 : (n4.excludeBegin && (M2 += t4), u3(), n4.returnBegin || n4.excludeBegin || (M2 = t4)), g2(n4), n4.returnBegin ? 0 : t4.length;
          }(r3);
        if ("illegal" === r3.type && !n3) {
          const e4 = Error(
            'Illegal lexeme "' + a4 + '" for mode "' + (y2.className || "<unnamed>") + '"'
          );
          throw e4.mode = y2, e4;
        }
        if ("end" === r3.type) {
          const e4 = b3(r3);
          if (e4 !== P)
            return e4;
        }
        if ("illegal" === r3.type && "" === a4)
          return 1;
        if (j2 > 1e5 && j2 > 3 * r3.index)
          throw Error(
            "potential infinite loop, way more iterations than matches"
          );
        return M2 += a4, a4.length;
      }
      const _3 = v2(e3);
      if (!_3)
        throw console.error(c2.replace("{}", e3)), Error('Unknown language: "' + e3 + '"');
      const w3 = O(_3);
      let N3 = "", y2 = a3 || w3;
      const R2 = {}, k2 = new d2.__emitter(d2);
      (() => {
        const e4 = [];
        for (let t3 = y2; t3 !== _3; t3 = t3.parent)
          t3.className && e4.unshift(t3.className);
        e4.forEach((e5) => k2.openNode(e5));
      })();
      let M2 = "", L2 = 0, A2 = 0, j2 = 0, S2 = false;
      try {
        for (y2.matcher.considerAll(); ; ) {
          j2++, S2 ? S2 = false : y2.matcher.considerAll(), y2.matcher.lastIndex = A2;
          const e4 = y2.matcher.exec(i3);
          if (!e4)
            break;
          const t3 = E3(i3.substring(A2, e4.index), e4);
          A2 = e4.index + t3;
        }
        return E3(i3.substr(A2)), k2.closeAllNodes(), k2.finalize(), N3 = k2.toHTML(), {
          relevance: L2,
          value: N3,
          language: e3,
          illegal: false,
          emitter: k2,
          top: y2
        };
      } catch (t3) {
        if (t3.message && t3.message.includes("Illegal"))
          return {
            illegal: true,
            illegalBy: {
              msg: t3.message,
              context: i3.slice(A2 - 100, A2 + 100),
              mode: t3.mode
            },
            sofar: N3,
            relevance: 0,
            value: I(i3),
            emitter: k2
          };
        if (o2)
          return {
            illegal: false,
            relevance: 0,
            value: I(i3),
            emitter: k2,
            language: e3,
            top: y2,
            errorRaised: t3
          };
        throw t3;
      }
    }
    function m2(e3, t2) {
      t2 = t2 || d2.languages || Object.keys(r2);
      const n3 = ((e4) => {
        const t3 = {
          relevance: 0,
          emitter: new d2.__emitter(d2),
          value: I(e4),
          illegal: false,
          top: u2
        };
        return t3.emitter.addText(e4), t3;
      })(e3), s2 = t2.filter(v2).filter(w2).map((t3) => p2(t3, e3, false));
      s2.unshift(n3);
      const a3 = s2.sort((e4, t3) => {
        if (e4.relevance !== t3.relevance)
          return t3.relevance - e4.relevance;
        if (e4.language && t3.language) {
          if (v2(e4.language).supersetOf === t3.language)
            return 1;
          if (v2(t3.language).supersetOf === e4.language)
            return -1;
        }
        return 0;
      }), [i3, o3] = a3, l3 = i3;
      return l3.second_best = o3, l3;
    }
    function b2(e3) {
      return d2.tabReplace || d2.useBR ? e3.replace(
        l2,
        (e4) => "\n" === e4 ? d2.useBR ? "<br>" : e4 : d2.tabReplace ? e4.replace(/\t/g, d2.tabReplace) : e4
      ) : e3;
    }
    function x2(e3) {
      let t2 = null;
      const n3 = ((e4) => {
        let t3 = e4.className + " ";
        t3 += e4.parentNode ? e4.parentNode.className : "";
        const n4 = d2.languageDetectRe.exec(t3);
        if (n4) {
          const t4 = v2(n4[1]);
          return t4 || (console.warn(c2.replace("{}", n4[1])), console.warn(
            "Falling back to no-highlight mode for this block.",
            e4
          )), t4 ? n4[1] : "no-highlight";
        }
        return t3.split(/\s+/).find((e5) => h2(e5) || v2(e5));
      })(e3);
      if (h2(n3))
        return;
      N2("before:highlightBlock", { block: e3, language: n3 }), d2.useBR ? (t2 = document.createElement("div"), t2.innerHTML = e3.innerHTML.replace(/\n/g, "").replace(/<br[ /]*>/g, "\n")) : t2 = e3;
      const s2 = t2.textContent, r3 = n3 ? f2(n3, s2, true) : m2(s2), i3 = T(t2);
      if (i3.length) {
        const e4 = document.createElement("div");
        e4.innerHTML = r3.value, r3.value = B(i3, T(e4), s2);
      }
      r3.value = b2(r3.value), N2("after:highlightBlock", { block: e3, result: r3 }), e3.innerHTML = r3.value, e3.className = ((e4, t3, n4) => {
        const s3 = t3 ? a2[t3] : n4, r4 = [e4.trim()];
        return e4.match(/\bhljs\b/) || r4.push("hljs"), e4.includes(s3) || r4.push(s3), r4.join(" ").trim();
      })(e3.className, n3, r3.language), e3.result = {
        language: r3.language,
        re: r3.relevance,
        relavance: r3.relevance
      }, r3.second_best && (e3.second_best = {
        language: r3.second_best.language,
        re: r3.second_best.relevance,
        relavance: r3.second_best.relevance
      });
    }
    const E2 = () => {
      if (E2.called)
        return;
      E2.called = true;
      const e3 = document.querySelectorAll("pre code");
      n2.forEach.call(e3, x2);
    };
    function v2(e3) {
      return e3 = (e3 || "").toLowerCase(), r2[e3] || r2[a2[e3]];
    }
    function _2(e3, { languageName: t2 }) {
      "string" == typeof e3 && (e3 = [e3]), e3.forEach((e4) => {
        a2[e4] = t2;
      });
    }
    function w2(e3) {
      const t2 = v2(e3);
      return t2 && !t2.disableAutodetect;
    }
    function N2(e3, t2) {
      const n3 = e3;
      i2.forEach((e4) => {
        e4[n3] && e4[n3](t2);
      });
    }
    Object.assign(e2, {
      highlight: f2,
      highlightAuto: m2,
      fixMarkup: (e3) => (console.warn(
        "fixMarkup is deprecated and will be removed entirely in v11.0"
      ), console.warn(
        "Please see https://github.com/highlightjs/highlight.js/issues/2534"
      ), b2(e3)),
      highlightBlock: x2,
      configure: (e3) => {
        e3.useBR && (console.warn(
          "'useBR' option is deprecated and will be removed entirely in v11.0"
        ), console.warn(
          "Please see https://github.com/highlightjs/highlight.js/issues/2559"
        )), d2 = S(d2, e3);
      },
      initHighlighting: E2,
      initHighlightingOnLoad: () => {
        window.addEventListener("DOMContentLoaded", E2, false);
      },
      registerLanguage: (t2, n3) => {
        let s2 = null;
        try {
          s2 = n3(e2);
        } catch (e3) {
          if (console.error(
            "Language definition for '{}' could not be registered.".replace(
              "{}",
              t2
            )
          ), !o2)
            throw e3;
          console.error(e3), s2 = u2;
        }
        s2.name || (s2.name = t2), r2[t2] = s2, s2.rawDefinition = n3.bind(null, e2), s2.aliases && _2(s2.aliases, { languageName: t2 });
      },
      listLanguages: () => Object.keys(r2),
      getLanguage: v2,
      registerAliases: _2,
      requireLanguage: (e3) => {
        console.warn(
          "requireLanguage is deprecated and will be removed entirely in the future."
        ), console.warn(
          "Please see https://github.com/highlightjs/highlight.js/pull/2844"
        );
        const t2 = v2(e3);
        if (t2)
          return t2;
        throw Error(
          "The '{}' language is required, but not loaded.".replace("{}", e3)
        );
      },
      autoDetection: w2,
      inherit: S,
      addPlugin: (e3) => {
        i2.push(e3);
      },
      vuePlugin: j(e2).VuePlugin
    }), e2.debugMode = () => {
      o2 = false;
    }, e2.safeMode = () => {
      o2 = true;
    }, e2.versionString = "10.4.0";
    for (const e3 in k)
      "object" == typeof k[e3] && t(k[e3]);
    return Object.assign(e2, k), e2;
  })({});
}();
"object" == typeof exports && "undefined" != typeof module && (module.exports = hljs);
hljs.registerLanguage(
  "java",
  (() => {
    return (e) => {
      var n = "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do", a = {
        className: "meta",
        begin: "@[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*",
        contains: [{ begin: /\(/, end: /\)/, contains: ["self"] }]
      }, s = "\\.([0-9](_*[0-9])*)", i = "[0-9a-fA-F](_*[0-9a-fA-F])*", r = {
        className: "number",
        variants: [
          {
            begin: `(\\b([0-9](_*[0-9])*)((${s})|\\.)?|(${s}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
          },
          { begin: `\\b([0-9](_*[0-9])*)((${s})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
          {
            begin: `(${s})[fFdD]?\\b`
          },
          { begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b" },
          {
            begin: `\\b0[xX]((${i})\\.?|(${i})?\\.(${i}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
          },
          { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
          { begin: `\\b0[xX](${i})[lL]?\\b` },
          {
            begin: "\\b0(_*[0-7])*[lL]?\\b"
          },
          { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
        ],
        relevance: 0
      };
      return {
        name: "Java",
        aliases: ["jsp"],
        keywords: n,
        illegal: /<\/|#/,
        contains: [
          e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [
              { begin: /\w+@/, relevance: 0 },
              { className: "doctag", begin: "@[A-Za-z]+" }
            ]
          }),
          {
            begin: /import java\.[a-z]+\./,
            keywords: "import",
            relevance: 2
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          {
            className: "class",
            beginKeywords: "class interface enum",
            end: /[{;=]/,
            excludeEnd: true,
            keywords: "class interface enum",
            illegal: /[:"\[\]]/,
            contains: [
              {
                beginKeywords: "extends implements"
              },
              e.UNDERSCORE_TITLE_MODE
            ]
          },
          {
            beginKeywords: "new throw return else",
            relevance: 0
          },
          {
            className: "class",
            begin: "record\\s+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: true,
            excludeEnd: true,
            end: /[{;=]/,
            keywords: n,
            contains: [
              { beginKeywords: "record" },
              {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: true,
                relevance: 0,
                contains: [e.UNDERSCORE_TITLE_MODE]
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: n,
                relevance: 0,
                contains: [e.C_BLOCK_COMMENT_MODE]
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          {
            className: "function",
            begin: "([\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*(<[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*(\\s*,\\s*[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*)*>)?\\s+)+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: true,
            end: /[{;=]/,
            excludeEnd: true,
            keywords: n,
            contains: [
              {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: true,
                relevance: 0,
                contains: [e.UNDERSCORE_TITLE_MODE]
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: n,
                relevance: 0,
                contains: [
                  a,
                  e.APOS_STRING_MODE,
                  e.QUOTE_STRING_MODE,
                  r,
                  e.C_BLOCK_COMMENT_MODE
                ]
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          r,
          a
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "http",
  (() => {
    return (e) => {
      var n = "HTTP/[0-9\\.]+";
      return {
        name: "HTTP",
        aliases: ["https"],
        illegal: "\\S",
        contains: [
          {
            begin: "^" + n,
            end: "$",
            contains: [{ className: "number", begin: "\\b\\d{3}\\b" }]
          },
          {
            begin: "^[A-Z]+ (.*?) " + n + "$",
            returnBegin: true,
            end: "$",
            contains: [
              {
                className: "string",
                begin: " ",
                end: " ",
                excludeBegin: true,
                excludeEnd: true
              },
              {
                begin: n
              },
              { className: "keyword", begin: "[A-Z]+" }
            ]
          },
          {
            className: "attribute",
            begin: "^\\w",
            end: ": ",
            excludeEnd: true,
            illegal: "\\n|\\s|=",
            starts: { end: "$", relevance: 0 }
          },
          { begin: "\\n\\n", starts: { subLanguage: [], endsWithParent: true } }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "nginx",
  (() => {
    return (e) => {
      const n = {
        className: "variable",
        variants: [
          { begin: /\$\d+/ },
          { begin: /\$\{/, end: /\}/ },
          {
            begin: /[$@]/ + e.UNDERSCORE_IDENT_RE
          }
        ]
      }, a = {
        endsWithParent: true,
        keywords: {
          $pattern: "[a-z/_]+",
          literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
        },
        relevance: 0,
        illegal: "=>",
        contains: [
          e.HASH_COMMENT_MODE,
          {
            className: "string",
            contains: [e.BACKSLASH_ESCAPE, n],
            variants: [
              { begin: /"/, end: /"/ },
              { begin: /'/, end: /'/ }
            ]
          },
          {
            begin: "([a-z]+):/",
            end: "\\s",
            endsWithParent: true,
            excludeEnd: true,
            contains: [n]
          },
          {
            className: "regexp",
            contains: [e.BACKSLASH_ESCAPE, n],
            variants: [
              { begin: "\\s\\^", end: "\\s|\\{|;", returnEnd: true },
              { begin: "~\\*?\\s+", end: "\\s|\\{|;", returnEnd: true },
              {
                begin: "\\*(\\.[a-z\\-]+)+"
              },
              { begin: "([a-z\\-]+\\.)+\\*" }
            ]
          },
          {
            className: "number",
            begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
          },
          {
            className: "number",
            begin: "\\b\\d+[kKmMgGdshdwy]*\\b",
            relevance: 0
          },
          n
        ]
      };
      return {
        name: "Nginx config",
        aliases: ["nginxconf"],
        contains: [
          e.HASH_COMMENT_MODE,
          {
            begin: e.UNDERSCORE_IDENT_RE + "\\s+\\{",
            returnBegin: true,
            end: /\{/,
            contains: [
              {
                className: "section",
                begin: e.UNDERSCORE_IDENT_RE
              }
            ],
            relevance: 0
          },
          {
            begin: e.UNDERSCORE_IDENT_RE + "\\s",
            end: ";|\\{",
            returnBegin: true,
            contains: [
              {
                className: "attribute",
                begin: e.UNDERSCORE_IDENT_RE,
                starts: a
              }
            ],
            relevance: 0
          }
        ],
        illegal: "[^\\s\\}]"
      };
    };
  })()
);
hljs.registerLanguage(
  "coffeescript",
  (() => {
    const e = [
      "as",
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends"
    ], n = ["true", "false", "null", "undefined", "NaN", "Infinity"], a = [].concat(
      [
        "setInterval",
        "setTimeout",
        "clearInterval",
        "clearTimeout",
        "require",
        "exports",
        "eval",
        "isFinite",
        "isNaN",
        "parseFloat",
        "parseInt",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "unescape"
      ],
      [
        "arguments",
        "this",
        "super",
        "console",
        "window",
        "document",
        "localStorage",
        "module",
        "global"
      ],
      [
        "Intl",
        "DataView",
        "Number",
        "Math",
        "Date",
        "String",
        "RegExp",
        "Object",
        "Function",
        "Boolean",
        "Error",
        "Symbol",
        "Set",
        "Map",
        "WeakSet",
        "WeakMap",
        "Proxy",
        "Reflect",
        "JSON",
        "Promise",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Float32Array",
        "Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "ArrayBuffer"
      ],
      [
        "EvalError",
        "InternalError",
        "RangeError",
        "ReferenceError",
        "SyntaxError",
        "TypeError",
        "URIError"
      ]
    );
    return (r) => {
      const t = {
        keyword: e.concat([
          "then",
          "unless",
          "until",
          "loop",
          "by",
          "when",
          "and",
          "or",
          "is",
          "isnt",
          "not"
        ]).filter(
          (i = ["var", "const", "let", "function", "static"], (e2) => !i.includes(e2))
        ).join(" "),
        literal: n.concat(["yes", "no", "on", "off"]).join(" "),
        built_in: a.concat(["npm", "print"]).join(" ")
      };
      var i;
      const s = "[A-Za-z$_][0-9A-Za-z$_]*", o = { className: "subst", begin: /#\{/, end: /\}/, keywords: t }, c = [
        r.BINARY_NUMBER_MODE,
        r.inherit(r.C_NUMBER_MODE, {
          starts: {
            end: "(\\s*/)?",
            relevance: 0
          }
        }),
        {
          className: "string",
          variants: [
            { begin: /'''/, end: /'''/, contains: [r.BACKSLASH_ESCAPE] },
            { begin: /'/, end: /'/, contains: [r.BACKSLASH_ESCAPE] },
            { begin: /"""/, end: /"""/, contains: [r.BACKSLASH_ESCAPE, o] },
            { begin: /"/, end: /"/, contains: [r.BACKSLASH_ESCAPE, o] }
          ]
        },
        {
          className: "regexp",
          variants: [
            { begin: "///", end: "///", contains: [o, r.HASH_COMMENT_MODE] },
            { begin: "//[gim]{0,3}(?=\\W)", relevance: 0 },
            { begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/ }
          ]
        },
        { begin: "@" + s },
        {
          subLanguage: "javascript",
          excludeBegin: true,
          excludeEnd: true,
          variants: [
            {
              begin: "```",
              end: "```"
            },
            { begin: "`", end: "`" }
          ]
        }
      ];
      o.contains = c;
      const l = r.inherit(r.TITLE_MODE, { begin: s }), d = "(\\(.*\\))?\\s*\\B[-=]>", g = {
        className: "params",
        begin: "\\([^\\(]",
        returnBegin: true,
        contains: [
          {
            begin: /\(/,
            end: /\)/,
            keywords: t,
            contains: ["self"].concat(c)
          }
        ]
      };
      return {
        name: "CoffeeScript",
        aliases: ["coffee", "cson", "iced"],
        keywords: t,
        illegal: /\/\*/,
        contains: c.concat([
          r.COMMENT("###", "###"),
          r.HASH_COMMENT_MODE,
          {
            className: "function",
            begin: "^\\s*" + s + "\\s*=\\s*" + d,
            end: "[-=]>",
            returnBegin: true,
            contains: [l, g]
          },
          {
            begin: /[:\(,=]\s*/,
            relevance: 0,
            contains: [
              {
                className: "function",
                begin: d,
                end: "[-=]>",
                returnBegin: true,
                contains: [g]
              }
            ]
          },
          {
            className: "class",
            beginKeywords: "class",
            end: "$",
            illegal: /[:="\[\]]/,
            contains: [
              {
                beginKeywords: "extends",
                endsWithParent: true,
                illegal: /[:="\[\]]/,
                contains: [l]
              },
              l
            ]
          },
          {
            begin: s + ":",
            end: ":",
            returnBegin: true,
            returnEnd: true,
            relevance: 0
          }
        ])
      };
    };
  })()
);
hljs.registerLanguage(
  "cpp",
  (() => {
    return (e) => {
      const t = ((e2) => {
        function t2(e3) {
          return "(?:" + e3 + ")?";
        }
        var n = e2.COMMENT("//", "$", {
          contains: [
            {
              begin: /\\\n/
            }
          ]
        }), r = "[a-zA-Z_]\\w*::", a = "(decltype\\(auto\\)|" + t2(r) + "[a-zA-Z_]\\w*" + t2("<.*?>") + ")", i = {
          className: "keyword",
          begin: "\\b[a-z\\d_]*_t\\b"
        }, s = {
          className: "string",
          variants: [
            {
              begin: '(u8?|U|L)?"',
              end: '"',
              illegal: "\\n",
              contains: [e2.BACKSLASH_ESCAPE]
            },
            {
              begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
              end: "'",
              illegal: "."
            },
            e2.END_SAME_AS_BEGIN({
              begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
              end: /\)([^()\\ ]{0,16})"/
            })
          ]
        }, c = {
          className: "number",
          variants: [
            { begin: "\\b(0b[01']+)" },
            {
              begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
            },
            {
              begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }
          ],
          relevance: 0
        }, o = {
          className: "meta",
          begin: /#\s*[a-z]+\b/,
          end: /$/,
          keywords: {
            "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
          },
          contains: [
            { begin: /\\\n/, relevance: 0 },
            e2.inherit(s, { className: "meta-string" }),
            {
              className: "meta-string",
              begin: /<.*?>/,
              end: /$/,
              illegal: "\\n"
            },
            n,
            e2.C_BLOCK_COMMENT_MODE
          ]
        }, l = { className: "title", begin: t2(r) + e2.IDENT_RE, relevance: 0 }, d = t2(r) + e2.IDENT_RE + "\\s*\\(", u = {
          keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
          built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
          literal: "true false nullptr NULL"
        }, m = [o, i, n, e2.C_BLOCK_COMMENT_MODE, c, s], p = {
          variants: [
            { begin: /=/, end: /;/ },
            { begin: /\(/, end: /\)/ },
            {
              beginKeywords: "new throw return else",
              end: /;/
            }
          ],
          keywords: u,
          contains: m.concat([
            {
              begin: /\(/,
              end: /\)/,
              keywords: u,
              contains: m.concat(["self"]),
              relevance: 0
            }
          ]),
          relevance: 0
        }, _ = {
          className: "function",
          begin: "(" + a + "[\\*&\\s]+)+" + d,
          returnBegin: true,
          end: /[{;=]/,
          excludeEnd: true,
          keywords: u,
          illegal: /[^\w\s\*&:<>]/,
          contains: [
            { begin: "decltype\\(auto\\)", keywords: u, relevance: 0 },
            { begin: d, returnBegin: true, contains: [l], relevance: 0 },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              keywords: u,
              relevance: 0,
              contains: [
                n,
                e2.C_BLOCK_COMMENT_MODE,
                s,
                c,
                i,
                {
                  begin: /\(/,
                  end: /\)/,
                  keywords: u,
                  relevance: 0,
                  contains: ["self", n, e2.C_BLOCK_COMMENT_MODE, s, c, i]
                }
              ]
            },
            i,
            n,
            e2.C_BLOCK_COMMENT_MODE,
            o
          ]
        };
        return {
          aliases: ["c", "cc", "h", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
          keywords: u,
          disableAutodetect: true,
          illegal: "</",
          contains: [].concat(p, _, m, [
            o,
            {
              begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
              end: ">",
              keywords: u,
              contains: ["self", i]
            },
            { begin: e2.IDENT_RE + "::", keywords: u },
            {
              className: "class",
              beginKeywords: "enum class struct union",
              end: /[{;:<>=]/,
              contains: [{ beginKeywords: "final class struct" }, e2.TITLE_MODE]
            }
          ]),
          exports: {
            preprocessor: o,
            strings: s,
            keywords: u
          }
        };
      })(e);
      return t.disableAutodetect = false, t.name = "C++", t.aliases = ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"], t;
    };
  })()
);
hljs.registerLanguage(
  "objectivec",
  (() => {
    return (e) => {
      const n = /[a-zA-Z@][a-zA-Z0-9_]*/, _ = {
        $pattern: n,
        keyword: "@interface @class @protocol @implementation"
      };
      return {
        name: "Objective-C",
        aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"],
        keywords: {
          $pattern: n,
          keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
          literal: "false true FALSE TRUE nil YES NO NULL",
          built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
        },
        illegal: "</",
        contains: [
          {
            className: "built_in",
            begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|xU|WK|XC)\\w+"
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          e.C_NUMBER_MODE,
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          {
            className: "string",
            variants: [
              {
                begin: '@"',
                end: '"',
                illegal: "\\n",
                contains: [e.BACKSLASH_ESCAPE]
              }
            ]
          },
          {
            className: "meta",
            begin: /#\s*[a-z]+\b/,
            end: /$/,
            keywords: {
              "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"
            },
            contains: [
              { begin: /\\\n/, relevance: 0 },
              e.inherit(e.QUOTE_STRING_MODE, {
                className: "meta-string"
              }),
              {
                className: "meta-string",
                begin: /<.*?>/,
                end: /$/,
                illegal: "\\n"
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          {
            className: "class",
            begin: "(" + _.keyword.split(" ").join("|") + ")\\b",
            end: /(\{|$)/,
            excludeEnd: true,
            keywords: _,
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          {
            begin: "\\." + e.UNDERSCORE_IDENT_RE,
            relevance: 0
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "less",
  (() => {
    return (e) => {
      var n = "([\\w-]+|@\\{[\\w-]+\\})", a = [], s = [], t = (e2) => ({ className: "string", begin: "~?" + e2 + ".*?" + e2 }), r = (e2, n2, a2) => ({ className: e2, begin: n2, relevance: a2 }), i = {
        begin: "\\(",
        end: "\\)",
        contains: s,
        relevance: 0
      };
      s.push(
        e.C_LINE_COMMENT_MODE,
        e.C_BLOCK_COMMENT_MODE,
        t("'"),
        t('"'),
        e.CSS_NUMBER_MODE,
        {
          begin: "(url|data-uri)\\(",
          starts: { className: "string", end: "[\\)\\n]", excludeEnd: true }
        },
        r("number", "#[0-9A-Fa-f]+\\b"),
        i,
        r("variable", "@@?[\\w-]+", 10),
        r("variable", "@\\{[\\w-]+\\}"),
        r("built_in", "~?`[^`]*?`"),
        {
          className: "attribute",
          begin: "[\\w-]+\\s*:",
          end: ":",
          returnBegin: true,
          excludeEnd: true
        },
        { className: "meta", begin: "!important" }
      );
      var c = s.concat({ begin: /\{/, end: /\}/, contains: a }), l = {
        beginKeywords: "when",
        endsWithParent: true,
        contains: [
          {
            beginKeywords: "and not"
          }
        ].concat(s)
      }, g = {
        begin: n + "\\s*:",
        returnBegin: true,
        end: "[;}]",
        relevance: 0,
        contains: [
          {
            className: "attribute",
            begin: n,
            end: ":",
            excludeEnd: true,
            starts: {
              endsWithParent: true,
              illegal: "[<=$]",
              relevance: 0,
              contains: s
            }
          }
        ]
      }, d = {
        className: "keyword",
        begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
        starts: { end: "[;{}]", returnEnd: true, contains: s, relevance: 0 }
      }, o = {
        className: "variable",
        variants: [
          { begin: "@[\\w-]+\\s*:", relevance: 15 },
          {
            begin: "@[\\w-]+"
          }
        ],
        starts: { end: "[;}]", returnEnd: true, contains: c }
      }, b = {
        variants: [
          {
            begin: "[\\.#:&\\[>]",
            end: "[;{}]"
          },
          { begin: n, end: /\{/ }
        ],
        returnBegin: true,
        returnEnd: true,
        illegal: `[<='$"]`,
        relevance: 0,
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          l,
          r("keyword", "all\\b"),
          r("variable", "@\\{[\\w-]+\\}"),
          r("selector-tag", n + "%?", 0),
          r("selector-id", "#" + n),
          r("selector-class", "\\." + n, 0),
          r("selector-tag", "&", 0),
          {
            className: "selector-attr",
            begin: "\\[",
            end: "\\]"
          },
          {
            className: "selector-pseudo",
            begin: /:(:)?[a-zA-Z0-9_\-+()"'.]+/
          },
          { begin: "\\(", end: "\\)", contains: c },
          {
            begin: "!important"
          }
        ]
      };
      return a.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, d, o, g, b), {
        name: "Less",
        case_insensitive: true,
        illegal: `[=>'/<($"]`,
        contains: a
      };
    };
  })()
);
hljs.registerLanguage(
  "typescript",
  (() => {
    const e = "[A-Za-z$_][0-9A-Za-z$_]*", n = [
      "as",
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends"
    ], a = ["true", "false", "null", "undefined", "NaN", "Infinity"], s = [].concat(
      [
        "setInterval",
        "setTimeout",
        "clearInterval",
        "clearTimeout",
        "require",
        "exports",
        "eval",
        "isFinite",
        "isNaN",
        "parseFloat",
        "parseInt",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "unescape"
      ],
      [
        "arguments",
        "this",
        "super",
        "console",
        "window",
        "document",
        "localStorage",
        "module",
        "global"
      ],
      [
        "Intl",
        "DataView",
        "Number",
        "Math",
        "Date",
        "String",
        "RegExp",
        "Object",
        "Function",
        "Boolean",
        "Error",
        "Symbol",
        "Set",
        "Map",
        "WeakSet",
        "WeakMap",
        "Proxy",
        "Reflect",
        "JSON",
        "Promise",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Float32Array",
        "Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "ArrayBuffer"
      ],
      [
        "EvalError",
        "InternalError",
        "RangeError",
        "ReferenceError",
        "SyntaxError",
        "TypeError",
        "URIError"
      ]
    );
    function t(e2) {
      return i("(?=", e2, ")");
    }
    function i(...e2) {
      return e2.map((e3) => {
        return (n2 = e3) ? "string" == typeof n2 ? n2 : n2.source : null;
        var n2;
      }).join("");
    }
    return (r) => {
      const c = {
        $pattern: e,
        keyword: n.concat([
          "type",
          "namespace",
          "typedef",
          "interface",
          "public",
          "private",
          "protected",
          "implements",
          "declare",
          "abstract",
          "readonly"
        ]).join(" "),
        literal: a.join(" "),
        built_in: s.concat([
          "any",
          "void",
          "number",
          "boolean",
          "string",
          "object",
          "never",
          "enum"
        ]).join(" ")
      }, o = { className: "meta", begin: "@[A-Za-z$_][0-9A-Za-z$_]*" }, l = (e2, n2, a2) => {
        const s2 = e2.contains.findIndex((e3) => e3.label === n2);
        if (-1 === s2)
          throw Error("can not find mode to replace");
        e2.contains.splice(s2, 1, a2);
      }, b = ((r2) => {
        const c2 = e, o2 = {
          begin: /<[A-Za-z0-9\\._:-]+/,
          end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
          isTrulyOpeningTag: (e2, n2) => {
            const a2 = e2[0].length + e2.index, s2 = e2.input[a2];
            "<" !== s2 ? ">" === s2 && (((e3, { after: n3 }) => {
              const a3 = "</" + e3[0].slice(1);
              return -1 !== e3.input.indexOf(a3, n3);
            })(e2, { after: a2 }) || n2.ignoreMatch()) : n2.ignoreMatch();
          }
        }, l2 = {
          $pattern: e,
          keyword: n.join(" "),
          literal: a.join(" "),
          built_in: s.join(" ")
        }, b2 = "\\.([0-9](_?[0-9])*)", d = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", g = {
          className: "number",
          variants: [
            {
              begin: `(\\b(${d})((${b2})|\\.)?|(${b2}))[eE][+-]?([0-9](_?[0-9])*)\\b`
            },
            {
              begin: `\\b(${d})\\b((${b2})\\b|\\.)?|(${b2})\\b`
            },
            {
              begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
            },
            {
              begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
            },
            {
              begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
            },
            { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
            {
              begin: "\\b0[0-7]+n?\\b"
            }
          ],
          relevance: 0
        }, u = {
          className: "subst",
          begin: "\\$\\{",
          end: "\\}",
          keywords: l2,
          contains: []
        }, E = {
          begin: "html`",
          end: "",
          starts: {
            end: "`",
            returnEnd: false,
            contains: [r2.BACKSLASH_ESCAPE, u],
            subLanguage: "xml"
          }
        }, m = {
          begin: "css`",
          end: "",
          starts: {
            end: "`",
            returnEnd: false,
            contains: [r2.BACKSLASH_ESCAPE, u],
            subLanguage: "css"
          }
        }, _ = {
          className: "string",
          begin: "`",
          end: "`",
          contains: [r2.BACKSLASH_ESCAPE, u]
        }, y = {
          className: "comment",
          variants: [
            r2.COMMENT("/\\*\\*", "\\*/", {
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+",
                  contains: [
                    {
                      className: "type",
                      begin: "\\{",
                      end: "\\}",
                      relevance: 0
                    },
                    {
                      className: "variable",
                      begin: c2 + "(?=\\s*(-)|$)",
                      endsParent: true,
                      relevance: 0
                    },
                    {
                      begin: /(?=[^\n])\s/,
                      relevance: 0
                    }
                  ]
                }
              ]
            }),
            r2.C_BLOCK_COMMENT_MODE,
            r2.C_LINE_COMMENT_MODE
          ]
        }, p = [
          r2.APOS_STRING_MODE,
          r2.QUOTE_STRING_MODE,
          E,
          m,
          _,
          g,
          r2.REGEXP_MODE
        ];
        u.contains = p.concat({
          begin: /\{/,
          end: /\}/,
          keywords: l2,
          contains: ["self"].concat(p)
        });
        const N = [].concat(y, u.contains), f = N.concat([
          {
            begin: /\(/,
            end: /\)/,
            keywords: l2,
            contains: ["self"].concat(N)
          }
        ]), A = {
          className: "params",
          begin: /\(/,
          end: /\)/,
          excludeBegin: true,
          excludeEnd: true,
          keywords: l2,
          contains: f
        };
        return {
          name: "Javascript",
          aliases: ["js", "jsx", "mjs", "cjs"],
          keywords: l2,
          exports: { PARAMS_CONTAINS: f },
          illegal: /#(?![$_A-z])/,
          contains: [
            r2.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }),
            {
              label: "use_strict",
              className: "meta",
              relevance: 10,
              begin: /^\s*['"]use (strict|asm)['"]/
            },
            r2.APOS_STRING_MODE,
            r2.QUOTE_STRING_MODE,
            E,
            m,
            _,
            y,
            g,
            {
              begin: i(
                /[{,\n]\s*/,
                t(
                  i(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, c2 + "\\s*:")
                )
              ),
              relevance: 0,
              contains: [
                { className: "attr", begin: c2 + t("\\s*:"), relevance: 0 }
              ]
            },
            {
              begin: "(" + r2.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
              keywords: "return throw case",
              contains: [
                y,
                r2.REGEXP_MODE,
                {
                  className: "function",
                  begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)|" + r2.UNDERSCORE_IDENT_RE + ")\\s*=>",
                  returnBegin: true,
                  end: "\\s*=>",
                  contains: [
                    {
                      className: "params",
                      variants: [
                        {
                          begin: r2.UNDERSCORE_IDENT_RE,
                          relevance: 0
                        },
                        { className: null, begin: /\(\s*\)/, skip: true },
                        {
                          begin: /\(/,
                          end: /\)/,
                          excludeBegin: true,
                          excludeEnd: true,
                          keywords: l2,
                          contains: f
                        }
                      ]
                    }
                  ]
                },
                { begin: /,/, relevance: 0 },
                { className: "", begin: /\s/, end: /\s*/, skip: true },
                {
                  variants: [
                    { begin: "<>", end: "</>" },
                    {
                      begin: o2.begin,
                      "on:begin": o2.isTrulyOpeningTag,
                      end: o2.end
                    }
                  ],
                  subLanguage: "xml",
                  contains: [
                    {
                      begin: o2.begin,
                      end: o2.end,
                      skip: true,
                      contains: ["self"]
                    }
                  ]
                }
              ],
              relevance: 0
            },
            {
              className: "function",
              beginKeywords: "function",
              end: /[{;]/,
              excludeEnd: true,
              keywords: l2,
              contains: ["self", r2.inherit(r2.TITLE_MODE, { begin: c2 }), A],
              illegal: /%/
            },
            {
              beginKeywords: "while if switch catch for"
            },
            {
              className: "function",
              begin: r2.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)\\s*\\{",
              returnBegin: true,
              contains: [A, r2.inherit(r2.TITLE_MODE, { begin: c2 })]
            },
            {
              variants: [
                {
                  begin: "\\." + c2
                },
                { begin: "\\$" + c2 }
              ],
              relevance: 0
            },
            {
              className: "class",
              beginKeywords: "class",
              end: /[{;=]/,
              excludeEnd: true,
              illegal: /[:"[\]]/,
              contains: [
                {
                  beginKeywords: "extends"
                },
                r2.UNDERSCORE_TITLE_MODE
              ]
            },
            {
              begin: /\b(?=constructor)/,
              end: /[{;]/,
              excludeEnd: true,
              contains: [r2.inherit(r2.TITLE_MODE, { begin: c2 }), "self", A]
            },
            {
              begin: "(get|set)\\s+(?=" + c2 + "\\()",
              end: /\{/,
              keywords: "get set",
              contains: [
                r2.inherit(r2.TITLE_MODE, { begin: c2 }),
                { begin: /\(\)/ },
                A
              ]
            },
            { begin: /\$[(.]/ }
          ]
        };
      })(r);
      return Object.assign(b.keywords, c), b.exports.PARAMS_CONTAINS.push(o), b.contains = b.contains.concat([
        o,
        {
          beginKeywords: "namespace",
          end: /\{/,
          excludeEnd: true
        },
        {
          beginKeywords: "interface",
          end: /\{/,
          excludeEnd: true,
          keywords: "interface extends"
        }
      ]), l(b, "shebang", r.SHEBANG()), l(b, "use_strict", {
        className: "meta",
        relevance: 10,
        begin: /^\s*['"]use strict['"]/
      }), b.contains.find((e2) => "function" === e2.className).relevance = 0, Object.assign(b, {
        name: "TypeScript",
        aliases: ["ts"]
      }), b;
    };
  })()
);
hljs.registerLanguage(
  "ruby",
  (() => {
    function e(...e2) {
      return e2.map((e3) => {
        return (n = e3) ? "string" == typeof n ? n : n.source : null;
        var n;
      }).join("");
    }
    return (n) => {
      var a, i = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)", s = {
        keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor __FILE__",
        built_in: "proc lambda",
        literal: "true false nil"
      }, r = { className: "doctag", begin: "@[A-Za-z]+" }, b = { begin: "#<", end: ">" }, t = [
        n.COMMENT("#", "$", { contains: [r] }),
        n.COMMENT("^=begin", "^=end", { contains: [r], relevance: 10 }),
        n.COMMENT("^__END__", "\\n$")
      ], c = { className: "subst", begin: /#\{/, end: /\}/, keywords: s }, d = {
        className: "string",
        contains: [n.BACKSLASH_ESCAPE, c],
        variants: [
          {
            begin: /'/,
            end: /'/
          },
          { begin: /"/, end: /"/ },
          { begin: /`/, end: /`/ },
          { begin: /%[qQwWx]?\(/, end: /\)/ },
          { begin: /%[qQwWx]?\[/, end: /\]/ },
          { begin: /%[qQwWx]?\{/, end: /\}/ },
          {
            begin: /%[qQwWx]?</,
            end: />/
          },
          { begin: /%[qQwWx]?\//, end: /\// },
          { begin: /%[qQwWx]?%/, end: /%/ },
          { begin: /%[qQwWx]?-/, end: /-/ },
          { begin: /%[qQwWx]?\|/, end: /\|/ },
          {
            begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
          },
          {
            begin: /<<[-~]?'?(\w+)(?:.|\n)*?\n\s*\1\b/,
            returnBegin: true,
            contains: [
              {
                begin: /<<[-~]?'?/
              },
              n.END_SAME_AS_BEGIN({
                begin: /(\w+)/,
                end: /(\w+)/,
                contains: [n.BACKSLASH_ESCAPE, c]
              })
            ]
          }
        ]
      }, g = "[0-9](_?[0-9])*", l = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: `\\b([1-9](_?[0-9])*|0)(\\.(${g}))?([eE][+-]?(${g})|r)?i?\\b`
          },
          {
            begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
          },
          { begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
          { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
          {
            begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
          },
          {
            begin: "\\b0(_?[0-7])+r?i?\\b"
          }
        ]
      }, o = {
        className: "params",
        begin: "\\(",
        end: "\\)",
        endsParent: true,
        keywords: s
      }, _ = [
        d,
        {
          className: "class",
          beginKeywords: "class module",
          end: "$|;",
          illegal: /=/,
          contains: [
            n.inherit(n.TITLE_MODE, {
              begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
            }),
            {
              begin: "<\\s*",
              contains: [
                {
                  begin: "(" + n.IDENT_RE + "::)?" + n.IDENT_RE
                }
              ]
            }
          ].concat(t)
        },
        {
          className: "function",
          begin: e(/def\s*/, (a = i + "\\s*(\\(|;|$)", e("(?=", a, ")"))),
          keywords: "def",
          end: "$|;",
          contains: [n.inherit(n.TITLE_MODE, { begin: i }), o].concat(t)
        },
        { begin: n.IDENT_RE + "::" },
        {
          className: "symbol",
          begin: n.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
          relevance: 0
        },
        {
          className: "symbol",
          begin: ":(?!\\s)",
          contains: [d, { begin: i }],
          relevance: 0
        },
        l,
        {
          className: "variable",
          begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
        },
        {
          className: "params",
          begin: /\|/,
          end: /\|/,
          relevance: 0,
          keywords: s
        },
        {
          begin: "(" + n.RE_STARTERS_RE + "|unless)\\s*",
          keywords: "unless",
          contains: [
            {
              className: "regexp",
              contains: [n.BACKSLASH_ESCAPE, c],
              illegal: /\n/,
              variants: [
                {
                  begin: "/",
                  end: "/[a-z]*"
                },
                { begin: /%r\{/, end: /\}[a-z]*/ },
                { begin: "%r\\(", end: "\\)[a-z]*" },
                { begin: "%r!", end: "![a-z]*" },
                { begin: "%r\\[", end: "\\][a-z]*" }
              ]
            }
          ].concat(b, t),
          relevance: 0
        }
      ].concat(b, t);
      c.contains = _, o.contains = _;
      var E = [
        {
          begin: /^\s*=>/,
          starts: { end: "$", contains: _ }
        },
        {
          className: "meta",
          begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)(?=[ ])",
          starts: { end: "$", contains: _ }
        }
      ];
      return t.unshift(b), {
        name: "Ruby",
        aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
        keywords: s,
        illegal: /\/\*/,
        contains: [n.SHEBANG({ binary: "ruby" })].concat(E).concat(t).concat(_)
      };
    };
  })()
);
hljs.registerLanguage(
  "json",
  (() => {
    return (n) => {
      const e = {
        literal: "true false null"
      }, i = [n.C_LINE_COMMENT_MODE, n.C_BLOCK_COMMENT_MODE], a = [n.QUOTE_STRING_MODE, n.C_NUMBER_MODE], l = {
        end: ",",
        endsWithParent: true,
        excludeEnd: true,
        contains: a,
        keywords: e
      }, t = {
        begin: /\{/,
        end: /\}/,
        contains: [
          {
            className: "attr",
            begin: /"/,
            end: /"/,
            contains: [n.BACKSLASH_ESCAPE],
            illegal: "\\n"
          },
          n.inherit(l, { begin: /:/ })
        ].concat(i),
        illegal: "\\S"
      }, s = {
        begin: "\\[",
        end: "\\]",
        contains: [n.inherit(l)],
        illegal: "\\S"
      };
      return a.push(t, s), i.forEach((n2) => {
        a.push(n2);
      }), { name: "JSON", contains: a, keywords: e, illegal: "\\S" };
    };
  })()
);
hljs.registerLanguage(
  "c",
  (() => {
    return (e) => {
      const t = ((e2) => {
        function t2(e3) {
          return "(?:" + e3 + ")?";
        }
        var n = e2.COMMENT("//", "$", {
          contains: [
            {
              begin: /\\\n/
            }
          ]
        }), r = "[a-zA-Z_]\\w*::", a = "(decltype\\(auto\\)|" + t2(r) + "[a-zA-Z_]\\w*" + t2("<.*?>") + ")", i = {
          className: "keyword",
          begin: "\\b[a-z\\d_]*_t\\b"
        }, s = {
          className: "string",
          variants: [
            {
              begin: '(u8?|U|L)?"',
              end: '"',
              illegal: "\\n",
              contains: [e2.BACKSLASH_ESCAPE]
            },
            {
              begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
              end: "'",
              illegal: "."
            },
            e2.END_SAME_AS_BEGIN({
              begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
              end: /\)([^()\\ ]{0,16})"/
            })
          ]
        }, c = {
          className: "number",
          variants: [
            { begin: "\\b(0b[01']+)" },
            {
              begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
            },
            {
              begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }
          ],
          relevance: 0
        }, o = {
          className: "meta",
          begin: /#\s*[a-z]+\b/,
          end: /$/,
          keywords: {
            "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
          },
          contains: [
            { begin: /\\\n/, relevance: 0 },
            e2.inherit(s, { className: "meta-string" }),
            {
              className: "meta-string",
              begin: /<.*?>/,
              end: /$/,
              illegal: "\\n"
            },
            n,
            e2.C_BLOCK_COMMENT_MODE
          ]
        }, l = { className: "title", begin: t2(r) + e2.IDENT_RE, relevance: 0 }, d = t2(r) + e2.IDENT_RE + "\\s*\\(", u = {
          keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
          built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
          literal: "true false nullptr NULL"
        }, m = [o, i, n, e2.C_BLOCK_COMMENT_MODE, c, s], p = {
          variants: [
            { begin: /=/, end: /;/ },
            { begin: /\(/, end: /\)/ },
            {
              beginKeywords: "new throw return else",
              end: /;/
            }
          ],
          keywords: u,
          contains: m.concat([
            {
              begin: /\(/,
              end: /\)/,
              keywords: u,
              contains: m.concat(["self"]),
              relevance: 0
            }
          ]),
          relevance: 0
        }, _ = {
          className: "function",
          begin: "(" + a + "[\\*&\\s]+)+" + d,
          returnBegin: true,
          end: /[{;=]/,
          excludeEnd: true,
          keywords: u,
          illegal: /[^\w\s\*&:<>]/,
          contains: [
            { begin: "decltype\\(auto\\)", keywords: u, relevance: 0 },
            { begin: d, returnBegin: true, contains: [l], relevance: 0 },
            {
              className: "params",
              begin: /\(/,
              end: /\)/,
              keywords: u,
              relevance: 0,
              contains: [
                n,
                e2.C_BLOCK_COMMENT_MODE,
                s,
                c,
                i,
                {
                  begin: /\(/,
                  end: /\)/,
                  keywords: u,
                  relevance: 0,
                  contains: ["self", n, e2.C_BLOCK_COMMENT_MODE, s, c, i]
                }
              ]
            },
            i,
            n,
            e2.C_BLOCK_COMMENT_MODE,
            o
          ]
        };
        return {
          aliases: ["c", "cc", "h", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
          keywords: u,
          disableAutodetect: true,
          illegal: "</",
          contains: [].concat(p, _, m, [
            o,
            {
              begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
              end: ">",
              keywords: u,
              contains: ["self", i]
            },
            { begin: e2.IDENT_RE + "::", keywords: u },
            {
              className: "class",
              beginKeywords: "enum class struct union",
              end: /[{;:<>=]/,
              contains: [{ beginKeywords: "final class struct" }, e2.TITLE_MODE]
            }
          ]),
          exports: {
            preprocessor: o,
            strings: s,
            keywords: u
          }
        };
      })(e);
      return t.name = "C", t.aliases = ["c", "h"], t;
    };
  })()
);
hljs.registerLanguage(
  "makefile",
  (() => {
    return (e) => {
      const i = {
        className: "variable",
        variants: [
          {
            begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)",
            contains: [e.BACKSLASH_ESCAPE]
          },
          { begin: /\$[@%<?\^\+\*]/ }
        ]
      }, a = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [e.BACKSLASH_ESCAPE, i]
      }, n = {
        className: "variable",
        begin: /\$\([\w-]+\s/,
        end: /\)/,
        keywords: {
          built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
        },
        contains: [i]
      }, s = { begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)" }, r = {
        className: "section",
        begin: /^[^\s]+:/,
        end: /$/,
        contains: [i]
      };
      return {
        name: "Makefile",
        aliases: ["mk", "mak"],
        keywords: {
          $pattern: /[\w-]+/,
          keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
        },
        contains: [
          e.HASH_COMMENT_MODE,
          i,
          a,
          n,
          s,
          {
            className: "meta",
            begin: /^\.PHONY:/,
            end: /$/,
            keywords: { $pattern: /[\.\w]+/, "meta-keyword": ".PHONY" }
          },
          r
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "xml",
  (() => {
    function e(e2) {
      return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
    }
    function n(e2) {
      return a("(?=", e2, ")");
    }
    function a(...n2) {
      return n2.map((n3) => e(n3)).join("");
    }
    function s(...n2) {
      return "(" + n2.map((n3) => e(n3)).join("|") + ")";
    }
    return (e2) => {
      const t = a(/[A-Z_]/, a("(", /[A-Z0-9_.-]+:/, ")?"), /[A-Z0-9_.-]*/), i = {
        className: "symbol",
        begin: "&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;"
      }, c = {
        begin: "\\s",
        contains: [
          {
            className: "meta-keyword",
            begin: "#?[a-z_][a-z1-9_-]+",
            illegal: "\\n"
          }
        ]
      }, r = e2.inherit(c, { begin: "\\(", end: "\\)" }), l = e2.inherit(e2.APOS_STRING_MODE, {
        className: "meta-string"
      }), g = e2.inherit(e2.QUOTE_STRING_MODE, {
        className: "meta-string"
      }), m = {
        endsWithParent: true,
        illegal: /</,
        relevance: 0,
        contains: [
          { className: "attr", begin: "[A-Za-z0-9\\._:-]+", relevance: 0 },
          {
            begin: /=\s*/,
            relevance: 0,
            contains: [
              {
                className: "string",
                endsParent: true,
                variants: [
                  {
                    begin: /"/,
                    end: /"/,
                    contains: [i]
                  },
                  { begin: /'/, end: /'/, contains: [i] },
                  {
                    begin: /[^\s"'=<>`]+/
                  }
                ]
              }
            ]
          }
        ]
      };
      return {
        name: "HTML, XML",
        aliases: [
          "html",
          "xhtml",
          "rss",
          "atom",
          "xjb",
          "xsd",
          "xsl",
          "plist",
          "wsf",
          "svg"
        ],
        case_insensitive: true,
        contains: [
          {
            className: "meta",
            begin: "<![a-z]",
            end: ">",
            relevance: 10,
            contains: [
              c,
              g,
              l,
              r,
              {
                begin: "\\[",
                end: "\\]",
                contains: [
                  {
                    className: "meta",
                    begin: "<![a-z]",
                    end: ">",
                    contains: [c, r, g, l]
                  }
                ]
              }
            ]
          },
          e2.COMMENT("<!--", "-->", { relevance: 10 }),
          { begin: "<!\\[CDATA\\[", end: "\\]\\]>", relevance: 10 },
          i,
          { className: "meta", begin: /<\?xml/, end: /\?>/, relevance: 10 },
          {
            className: "tag",
            begin: "<style(?=\\s|>)",
            end: ">",
            keywords: {
              name: "style"
            },
            contains: [m],
            starts: {
              end: "</style>",
              returnEnd: true,
              subLanguage: ["css", "xml"]
            }
          },
          {
            className: "tag",
            begin: "<script(?=\\s|>)",
            end: ">",
            keywords: { name: "script" },
            contains: [m],
            starts: {
              end: /<\/script>/,
              returnEnd: true,
              subLanguage: ["javascript", "handlebars", "xml"]
            }
          },
          { className: "tag", begin: /<>|<\/>/ },
          {
            className: "tag",
            begin: a(/</, n(a(t, s(/\/>/, />/, /\s/)))),
            end: /\/?>/,
            contains: [
              {
                className: "name",
                begin: t,
                relevance: 0,
                starts: m
              }
            ]
          },
          {
            className: "tag",
            begin: a(/<\//, n(a(t, />/))),
            contains: [
              { className: "name", begin: t, relevance: 0 },
              {
                begin: />/,
                relevance: 0
              }
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "bash",
  (() => {
    function e(...e2) {
      return e2.map((e3) => {
        return (s = e3) ? "string" == typeof s ? s : s.source : null;
        var s;
      }).join("");
    }
    return (s) => {
      const n = {}, t = {
        begin: /\$\{/,
        end: /\}/,
        contains: [
          "self",
          {
            begin: /:-/,
            contains: [n]
          }
        ]
      };
      Object.assign(n, {
        className: "variable",
        variants: [
          {
            begin: e(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
          },
          t
        ]
      });
      const a = {
        className: "subst",
        begin: /\$\(/,
        end: /\)/,
        contains: [s.BACKSLASH_ESCAPE]
      }, i = {
        begin: /<<-?\s*(?=\w+)/,
        starts: {
          contains: [
            s.END_SAME_AS_BEGIN({
              begin: /(\w+)/,
              end: /(\w+)/,
              className: "string"
            })
          ]
        }
      }, c = {
        className: "string",
        begin: /"/,
        end: /"/,
        contains: [s.BACKSLASH_ESCAPE, n, a]
      };
      a.contains.push(c);
      const o = {
        begin: /\$\(\(/,
        end: /\)\)/,
        contains: [
          { begin: /\d+#[0-9a-f]+/, className: "number" },
          s.NUMBER_MODE,
          n
        ]
      }, r = s.SHEBANG({
        binary: "(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",
        relevance: 10
      }), l = {
        className: "function",
        begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        returnBegin: true,
        contains: [s.inherit(s.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
        relevance: 0
      };
      return {
        name: "Bash",
        aliases: ["sh", "zsh"],
        keywords: {
          $pattern: /\b[a-z._-]+\b/,
          keyword: "if then else elif fi for while in do done case esac function",
          literal: "true false",
          built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"
        },
        contains: [
          r,
          s.SHEBANG(),
          l,
          o,
          s.HASH_COMMENT_MODE,
          i,
          c,
          { className: "", begin: /\\"/ },
          { className: "string", begin: /'/, end: /'/ },
          n
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "swift",
  (() => {
    return (e) => {
      var i = {
        $pattern: /[\w#]+/,
        keyword: "#available #colorLiteral #column #else #elseif #endif #file #fileLiteral #function #if #imageLiteral #line #selector #sourceLocation _ __COLUMN__ __FILE__ __FUNCTION__ __LINE__ Any as as! as? associatedtype associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false fileprivate final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating open operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set some static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",
        literal: "true false nil",
        built_in: "abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c compactMap contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"
      }, n = e.COMMENT("/\\*", "\\*/", { contains: ["self"] }), t = {
        className: "subst",
        begin: /\\\(/,
        end: "\\)",
        keywords: i,
        contains: []
      }, a = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, t],
        variants: [
          { begin: /"""/, end: /"""/ },
          { begin: /"/, end: /"/ }
        ]
      }, r = "([0-9a-fA-F]_*)+", s = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
          },
          {
            begin: `\\b0x(${r})(\\.(${r}))?([pP][+-]?(([0-9]_*)+))?\\b`
          },
          {
            begin: /\b0o([0-7]_*)+\b/
          },
          { begin: /\b0b([01]_*)+\b/ }
        ]
      };
      return t.contains = [s], {
        name: "Swift",
        keywords: i,
        contains: [
          a,
          e.C_LINE_COMMENT_MODE,
          n,
          { className: "type", begin: "\\b[A-Z][\\w\xC0-\u02B8']*[!?]" },
          {
            className: "type",
            begin: "\\b[A-Z][\\w\xC0-\u02B8']*",
            relevance: 0
          },
          s,
          {
            className: "function",
            beginKeywords: "func",
            end: /\{/,
            excludeEnd: true,
            contains: [
              e.inherit(e.TITLE_MODE, {
                begin: /[A-Za-z$_][0-9A-Za-z$_]*/
              }),
              { begin: /</, end: />/ },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                endsParent: true,
                keywords: i,
                contains: [
                  "self",
                  s,
                  a,
                  e.C_BLOCK_COMMENT_MODE,
                  { begin: ":" }
                ],
                illegal: /["']/
              }
            ],
            illegal: /\[|%/
          },
          {
            className: "class",
            beginKeywords: "struct protocol class extension enum",
            keywords: i,
            end: "\\{",
            excludeEnd: true,
            contains: [
              e.inherit(e.TITLE_MODE, {
                begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
              })
            ]
          },
          {
            className: "meta",
            begin: "(@discardableResult|@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@objcMembers|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain|@dynamicMemberLookup|@propertyWrapper|@main)\\b"
          },
          {
            beginKeywords: "import",
            end: /$/,
            contains: [e.C_LINE_COMMENT_MODE, n],
            relevance: 0
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "python",
  (() => {
    return (e) => {
      const n = {
        keyword: "and as assert async await break class continue def del elif else except finally for  from global if import in is lambda nonlocal|10 not or pass raise return try while with yield",
        built_in: "__import__ abs all any ascii bin bool breakpoint bytearray bytes callable chr classmethod compile complex delattr dict dir divmod enumerate eval exec filter float format frozenset getattr globals hasattr hash help hex id input int isinstance issubclass iter len list locals map max memoryview min next object oct open ord pow print property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip",
        literal: "__debug__ Ellipsis False None NotImplemented True"
      }, a = {
        className: "meta",
        begin: /^(>>>|\.\.\.) /
      }, s = {
        className: "subst",
        begin: /\{/,
        end: /\}/,
        keywords: n,
        illegal: /#/
      }, i = { begin: /\{\{/, relevance: 0 }, r = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE],
        variants: [
          {
            begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
            end: /'''/,
            contains: [e.BACKSLASH_ESCAPE, a],
            relevance: 10
          },
          {
            begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
            end: /"""/,
            contains: [e.BACKSLASH_ESCAPE, a],
            relevance: 10
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])'''/,
            end: /'''/,
            contains: [e.BACKSLASH_ESCAPE, a, i, s]
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])"""/,
            end: /"""/,
            contains: [e.BACKSLASH_ESCAPE, a, i, s]
          },
          { begin: /([uU]|[rR])'/, end: /'/, relevance: 10 },
          { begin: /([uU]|[rR])"/, end: /"/, relevance: 10 },
          {
            begin: /([bB]|[bB][rR]|[rR][bB])'/,
            end: /'/
          },
          { begin: /([bB]|[bB][rR]|[rR][bB])"/, end: /"/ },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])'/,
            end: /'/,
            contains: [e.BACKSLASH_ESCAPE, i, s]
          },
          {
            begin: /([fF][rR]|[rR][fF]|[fF])"/,
            end: /"/,
            contains: [e.BACKSLASH_ESCAPE, i, s]
          },
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE
        ]
      }, t = "[0-9](_?[0-9])*", l = `(\\b(${t}))?\\.(${t})|\\b(${t})\\.`, b = {
        className: "number",
        relevance: 0,
        variants: [
          {
            begin: `(\\b(${t})|(${l}))[eE][+-]?(${t})[jJ]?\\b`
          },
          { begin: `(${l})[jJ]?` },
          {
            begin: "\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b"
          },
          {
            begin: "\\b0[bB](_?[01])+[lL]?\\b"
          },
          { begin: "\\b0[oO](_?[0-7])+[lL]?\\b" },
          {
            begin: "\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b"
          },
          { begin: `\\b(${t})[jJ]\\b` }
        ]
      }, o = {
        className: "params",
        variants: [
          { begin: /\(\s*\)/, skip: true, className: null },
          {
            begin: /\(/,
            end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: n,
            contains: ["self", a, b, r, e.HASH_COMMENT_MODE]
          }
        ]
      };
      return s.contains = [r, b, a], {
        name: "Python",
        aliases: ["py", "gyp", "ipython"],
        keywords: n,
        illegal: /(<\/|->|\?)|=>/,
        contains: [
          a,
          b,
          { begin: /\bself\b/ },
          { beginKeywords: "if", relevance: 0 },
          r,
          e.HASH_COMMENT_MODE,
          {
            variants: [
              { className: "function", beginKeywords: "def" },
              { className: "class", beginKeywords: "class" }
            ],
            end: /:/,
            illegal: /[${=;\n,]/,
            contains: [
              e.UNDERSCORE_TITLE_MODE,
              o,
              { begin: /->/, endsWithParent: true, keywords: "None" }
            ]
          },
          {
            className: "meta",
            begin: /^[\t ]*@/,
            end: /(?=#)|$/,
            contains: [b, o, r]
          },
          { begin: /\b(print|exec)\(/ }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "kotlin",
  (() => {
    return (e) => {
      const n = {
        keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
        built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
        literal: "true false null"
      }, a = { className: "symbol", begin: e.UNDERSCORE_IDENT_RE + "@" }, s = {
        className: "subst",
        begin: /\$\{/,
        end: /\}/,
        contains: [e.C_NUMBER_MODE]
      }, i = {
        className: "variable",
        begin: "\\$" + e.UNDERSCORE_IDENT_RE
      }, t = {
        className: "string",
        variants: [
          { begin: '"""', end: '"""(?=[^"])', contains: [i, s] },
          {
            begin: "'",
            end: "'",
            illegal: /\n/,
            contains: [e.BACKSLASH_ESCAPE]
          },
          {
            begin: '"',
            end: '"',
            illegal: /\n/,
            contains: [e.BACKSLASH_ESCAPE, i, s]
          }
        ]
      };
      s.contains.push(t);
      const l = {
        className: "meta",
        begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?"
      }, r = {
        className: "meta",
        begin: "@" + e.UNDERSCORE_IDENT_RE,
        contains: [
          {
            begin: /\(/,
            end: /\)/,
            contains: [e.inherit(t, { className: "meta-string" })]
          }
        ]
      }, c = e.COMMENT("/\\*", "\\*/", { contains: [e.C_BLOCK_COMMENT_MODE] }), o = {
        variants: [
          {
            className: "type",
            begin: e.UNDERSCORE_IDENT_RE
          },
          { begin: /\(/, end: /\)/, contains: [] }
        ]
      }, d = o;
      return d.variants[1].contains = [o], o.variants[1].contains = [d], {
        name: "Kotlin",
        aliases: ["kt"],
        keywords: n,
        contains: [
          e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
          }),
          e.C_LINE_COMMENT_MODE,
          c,
          {
            className: "keyword",
            begin: /\b(break|continue|return|this)\b/,
            starts: { contains: [{ className: "symbol", begin: /@\w+/ }] }
          },
          a,
          l,
          r,
          {
            className: "function",
            beginKeywords: "fun",
            end: "[(]|$",
            returnBegin: true,
            excludeEnd: true,
            keywords: n,
            illegal: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
            relevance: 5,
            contains: [
              {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: true,
                relevance: 0,
                contains: [e.UNDERSCORE_TITLE_MODE]
              },
              {
                className: "type",
                begin: /</,
                end: />/,
                keywords: "reified",
                relevance: 0
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                endsParent: true,
                keywords: n,
                relevance: 0,
                contains: [
                  {
                    begin: /:/,
                    end: /[=,\/]/,
                    endsWithParent: true,
                    contains: [o, e.C_LINE_COMMENT_MODE, c],
                    relevance: 0
                  },
                  e.C_LINE_COMMENT_MODE,
                  c,
                  l,
                  r,
                  t,
                  e.C_NUMBER_MODE
                ]
              },
              c
            ]
          },
          {
            className: "class",
            beginKeywords: "class interface trait",
            end: /[:\{(]|$/,
            excludeEnd: true,
            illegal: "extends implements",
            contains: [
              {
                beginKeywords: "public protected internal private constructor"
              },
              e.UNDERSCORE_TITLE_MODE,
              {
                className: "type",
                begin: /</,
                end: />/,
                excludeBegin: true,
                excludeEnd: true,
                relevance: 0
              },
              {
                className: "type",
                begin: /[,:]\s*/,
                end: /[<\(,]|$/,
                excludeBegin: true,
                returnEnd: true
              },
              l,
              r
            ]
          },
          t,
          {
            className: "meta",
            begin: "^#!/usr/bin/env",
            end: "$",
            illegal: "\n"
          },
          {
            className: "number",
            begin: "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
            relevance: 0
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "scss",
  (() => {
    return (e) => {
      var t = "@[a-z-]+", i = {
        className: "variable",
        begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b"
      }, r = {
        className: "number",
        begin: "#[0-9A-Fa-f]+"
      };
      return e.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, e.C_BLOCK_COMMENT_MODE, {
        name: "SCSS",
        case_insensitive: true,
        illegal: "[=/|']",
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          {
            className: "selector-id",
            begin: "#[A-Za-z0-9_-]+",
            relevance: 0
          },
          {
            className: "selector-class",
            begin: "\\.[A-Za-z0-9_-]+",
            relevance: 0
          },
          {
            className: "selector-attr",
            begin: "\\[",
            end: "\\]",
            illegal: "$"
          },
          {
            className: "selector-tag",
            begin: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
            relevance: 0
          },
          {
            className: "selector-pseudo",
            begin: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
          },
          {
            className: "selector-pseudo",
            begin: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
          },
          i,
          {
            className: "attribute",
            begin: "\\b(src|z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
            illegal: "[^\\s]"
          },
          {
            begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
          },
          {
            begin: ":",
            end: ";",
            contains: [
              i,
              r,
              e.CSS_NUMBER_MODE,
              e.QUOTE_STRING_MODE,
              e.APOS_STRING_MODE,
              {
                className: "meta",
                begin: "!important"
              }
            ]
          },
          {
            begin: "@(page|font-face)",
            lexemes: t,
            keywords: "@page @font-face"
          },
          {
            begin: "@",
            end: "[{;]",
            returnBegin: true,
            keywords: "and or not only",
            contains: [
              { begin: t, className: "keyword" },
              i,
              e.QUOTE_STRING_MODE,
              e.APOS_STRING_MODE,
              r,
              e.CSS_NUMBER_MODE
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "yaml",
  (() => {
    return (e) => {
      var n = "true false yes no null", a = "[\\w#;/?:@&=+$,.~*'()[\\]]+", s = {
        className: "string",
        relevance: 0,
        variants: [
          { begin: /'/, end: /'/ },
          { begin: /"/, end: /"/ },
          { begin: /\S+/ }
        ],
        contains: [
          e.BACKSLASH_ESCAPE,
          {
            className: "template-variable",
            variants: [
              { begin: /\{\{/, end: /\}\}/ },
              { begin: /%\{/, end: /\}/ }
            ]
          }
        ]
      }, i = e.inherit(s, {
        variants: [
          { begin: /'/, end: /'/ },
          { begin: /"/, end: /"/ },
          { begin: /[^\s,{}[\]]+/ }
        ]
      }), l = {
        end: ",",
        endsWithParent: true,
        excludeEnd: true,
        contains: [],
        keywords: n,
        relevance: 0
      }, t = {
        begin: /\{/,
        end: /\}/,
        contains: [l],
        illegal: "\\n",
        relevance: 0
      }, g = {
        begin: "\\[",
        end: "\\]",
        contains: [l],
        illegal: "\\n",
        relevance: 0
      }, b = [
        {
          className: "attr",
          variants: [
            { begin: "\\w[\\w :\\/.-]*:(?=[ 	]|$)" },
            {
              begin: '"\\w[\\w :\\/.-]*":(?=[ 	]|$)'
            },
            { begin: "'\\w[\\w :\\/.-]*':(?=[ 	]|$)" }
          ]
        },
        { className: "meta", begin: "^---\\s*$", relevance: 10 },
        {
          className: "string",
          begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^\\n]+\\n(\\2[^\\n]+\\n?)*"
        },
        {
          begin: "<%[%=-]?",
          end: "[%-]?%>",
          subLanguage: "ruby",
          excludeBegin: true,
          excludeEnd: true,
          relevance: 0
        },
        { className: "type", begin: "!\\w+!" + a },
        { className: "type", begin: "!<" + a + ">" },
        { className: "type", begin: "!" + a },
        { className: "type", begin: "!!" + a },
        { className: "meta", begin: "&" + e.UNDERSCORE_IDENT_RE + "$" },
        { className: "meta", begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$" },
        { className: "bullet", begin: "-(?=[ ]|$)", relevance: 0 },
        e.HASH_COMMENT_MODE,
        { beginKeywords: n, keywords: { literal: n } },
        {
          className: "number",
          begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
        },
        { className: "number", begin: e.C_NUMBER_RE + "\\b", relevance: 0 },
        t,
        g,
        s
      ], r = [...b];
      return r.pop(), r.push(i), l.contains = r, {
        name: "YAML",
        case_insensitive: true,
        aliases: ["yml", "YAML"],
        contains: b
      };
    };
  })()
);
hljs.registerLanguage(
  "markdown",
  (() => {
    function n(...n2) {
      return n2.map((n3) => {
        return (e = n3) ? "string" == typeof e ? e : e.source : null;
        var e;
      }).join("");
    }
    return (e) => {
      const a = {
        begin: /<\/?[A-Za-z_]/,
        end: ">",
        subLanguage: "xml",
        relevance: 0
      }, i = {
        variants: [
          { begin: /\[.+?\]\[.*?\]/, relevance: 0 },
          {
            begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
            relevance: 2
          },
          {
            begin: n(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
            relevance: 2
          },
          { begin: /\[.+?\]\([./?&#].*?\)/, relevance: 1 },
          {
            begin: /\[.+?\]\(.*?\)/,
            relevance: 0
          }
        ],
        returnBegin: true,
        contains: [
          {
            className: "string",
            relevance: 0,
            begin: "\\[",
            end: "\\]",
            excludeBegin: true,
            returnEnd: true
          },
          {
            className: "link",
            relevance: 0,
            begin: "\\]\\(",
            end: "\\)",
            excludeBegin: true,
            excludeEnd: true
          },
          {
            className: "symbol",
            relevance: 0,
            begin: "\\]\\[",
            end: "\\]",
            excludeBegin: true,
            excludeEnd: true
          }
        ]
      }, s = {
        className: "strong",
        contains: [],
        variants: [
          { begin: /_{2}/, end: /_{2}/ },
          { begin: /\*{2}/, end: /\*{2}/ }
        ]
      }, c = {
        className: "emphasis",
        contains: [],
        variants: [
          { begin: /\*(?!\*)/, end: /\*/ },
          {
            begin: /_(?!_)/,
            end: /_/,
            relevance: 0
          }
        ]
      };
      s.contains.push(c), c.contains.push(s);
      let t = [a, i];
      return s.contains = s.contains.concat(t), c.contains = c.contains.concat(t), t = t.concat(s, c), {
        name: "Markdown",
        aliases: ["md", "mkdown", "mkd"],
        contains: [
          {
            className: "section",
            variants: [
              { begin: "^#{1,6}", end: "$", contains: t },
              {
                begin: "(?=^.+?\\n[=-]{2,}$)",
                contains: [
                  { begin: "^[=-]*$" },
                  { begin: "^", end: "\\n", contains: t }
                ]
              }
            ]
          },
          a,
          {
            className: "bullet",
            begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
            end: "\\s+",
            excludeEnd: true
          },
          s,
          c,
          { className: "quote", begin: "^>\\s+", contains: t, end: "$" },
          {
            className: "code",
            variants: [
              { begin: "(`{3,})(.|\\n)*?\\1`*[ ]*" },
              {
                begin: "(~{3,})(.|\\n)*?\\1~*[ ]*"
              },
              { begin: "```", end: "```+[ ]*$" },
              { begin: "~~~", end: "~~~+[ ]*$" },
              { begin: "`.+?`" },
              {
                begin: "(?=^( {4}|\\t))",
                contains: [
                  {
                    begin: "^( {4}|\\t)",
                    end: "(\\n)$"
                  }
                ],
                relevance: 0
              }
            ]
          },
          { begin: "^[-\\*]{3,}", end: "$" },
          i,
          {
            begin: /^\[[^\n]+\]:/,
            returnBegin: true,
            contains: [
              {
                className: "symbol",
                begin: /\[/,
                end: /\]/,
                excludeBegin: true,
                excludeEnd: true
              },
              { className: "link", begin: /:\s*/, end: /$/, excludeBegin: true }
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "lua",
  (() => {
    return (e) => {
      const t = "\\[=*\\[", a = "\\]=*\\]", n = { begin: t, end: a, contains: ["self"] }, o = [
        e.COMMENT("--(?!\\[=*\\[)", "$"),
        e.COMMENT("--\\[=*\\[", a, { contains: [n], relevance: 10 })
      ];
      return {
        name: "Lua",
        keywords: {
          $pattern: e.UNDERSCORE_IDENT_RE,
          literal: "true false nil",
          keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
          built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
        },
        contains: o.concat([
          {
            className: "function",
            beginKeywords: "function",
            end: "\\)",
            contains: [
              e.inherit(e.TITLE_MODE, {
                begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
              }),
              {
                className: "params",
                begin: "\\(",
                endsWithParent: true,
                contains: o
              }
            ].concat(o)
          },
          e.C_NUMBER_MODE,
          e.APOS_STRING_MODE,
          e.QUOTE_STRING_MODE,
          { className: "string", begin: t, end: a, contains: [n], relevance: 5 }
        ])
      };
    };
  })()
);
hljs.registerLanguage(
  "go",
  (() => {
    return (e) => {
      const n = {
        keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
        literal: "true false iota nil",
        built_in: "append cap close complex copy imag len make new panic print println real recover delete"
      };
      return {
        name: "Go",
        aliases: ["golang"],
        keywords: n,
        illegal: "</",
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          {
            className: "string",
            variants: [
              e.QUOTE_STRING_MODE,
              e.APOS_STRING_MODE,
              { begin: "`", end: "`" }
            ]
          },
          {
            className: "number",
            variants: [
              { begin: e.C_NUMBER_RE + "[i]", relevance: 1 },
              e.C_NUMBER_MODE
            ]
          },
          { begin: /:=/ },
          {
            className: "function",
            beginKeywords: "func",
            end: "\\s*(\\{|$)",
            excludeEnd: true,
            contains: [
              e.TITLE_MODE,
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: n,
                illegal: /["']/
              }
            ]
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "properties",
  (() => {
    return (e) => {
      var n = "[ \\t\\f]*", a = n + "[:=]" + n, t = "(" + a + "|[ \\t\\f]+)", r = "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+", s = "([^\\\\:= \\t\\f\\n]|\\\\.)+", i = {
        end: t,
        relevance: 0,
        starts: {
          className: "string",
          end: /$/,
          relevance: 0,
          contains: [
            {
              begin: "\\\\\\n"
            }
          ]
        }
      };
      return {
        name: ".properties",
        case_insensitive: true,
        illegal: /\S/,
        contains: [
          e.COMMENT("^\\s*[!#]", "$"),
          {
            returnBegin: true,
            variants: [
              { begin: r + a, relevance: 1 },
              { begin: r + "[ \\t\\f]+", relevance: 0 }
            ],
            contains: [
              { className: "attr", begin: r, endsParent: true, relevance: 0 }
            ],
            starts: i
          },
          {
            begin: s + t,
            returnBegin: true,
            relevance: 0,
            contains: [
              { className: "meta", begin: s, endsParent: true, relevance: 0 }
            ],
            starts: i
          },
          { className: "attr", relevance: 0, begin: s + n + "$" }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "diff",
  (() => {
    return (e) => ({
      name: "Diff",
      aliases: ["patch"],
      contains: [
        {
          className: "meta",
          relevance: 10,
          variants: [
            {
              begin: /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/
            },
            { begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ },
            {
              begin: /^--- +\d+,\d+ +----$/
            }
          ]
        },
        {
          className: "comment",
          variants: [
            { begin: /Index: /, end: /$/ },
            { begin: /^index/, end: /$/ },
            { begin: /={3,}/, end: /$/ },
            { begin: /^-{3}/, end: /$/ },
            { begin: /^\*{3} /, end: /$/ },
            { begin: /^\+{3}/, end: /$/ },
            { begin: /^\*{15}$/ },
            {
              begin: /^diff --git/,
              end: /$/
            }
          ]
        },
        { className: "addition", begin: /^\+/, end: /$/ },
        {
          className: "deletion",
          begin: /^-/,
          end: /$/
        },
        { className: "addition", begin: /^!/, end: /$/ }
      ]
    });
  })()
);
hljs.registerLanguage(
  "javascript",
  (() => {
    const e = "[A-Za-z$_][0-9A-Za-z$_]*", n = [
      "as",
      "in",
      "of",
      "if",
      "for",
      "while",
      "finally",
      "var",
      "new",
      "function",
      "do",
      "return",
      "void",
      "else",
      "break",
      "catch",
      "instanceof",
      "with",
      "throw",
      "case",
      "default",
      "try",
      "switch",
      "continue",
      "typeof",
      "delete",
      "let",
      "yield",
      "const",
      "class",
      "debugger",
      "async",
      "await",
      "static",
      "import",
      "from",
      "export",
      "extends"
    ], a = ["true", "false", "null", "undefined", "NaN", "Infinity"], s = [].concat(
      [
        "setInterval",
        "setTimeout",
        "clearInterval",
        "clearTimeout",
        "require",
        "exports",
        "eval",
        "isFinite",
        "isNaN",
        "parseFloat",
        "parseInt",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "unescape"
      ],
      [
        "arguments",
        "this",
        "super",
        "console",
        "window",
        "document",
        "localStorage",
        "module",
        "global"
      ],
      [
        "Intl",
        "DataView",
        "Number",
        "Math",
        "Date",
        "String",
        "RegExp",
        "Object",
        "Function",
        "Boolean",
        "Error",
        "Symbol",
        "Set",
        "Map",
        "WeakSet",
        "WeakMap",
        "Proxy",
        "Reflect",
        "JSON",
        "Promise",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Float32Array",
        "Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "ArrayBuffer"
      ],
      [
        "EvalError",
        "InternalError",
        "RangeError",
        "ReferenceError",
        "SyntaxError",
        "TypeError",
        "URIError"
      ]
    );
    function r(e2) {
      return i("(?=", e2, ")");
    }
    function i(...e2) {
      return e2.map((e3) => {
        return (n2 = e3) ? "string" == typeof n2 ? n2 : n2.source : null;
        var n2;
      }).join("");
    }
    return (t) => {
      const c = e, o = {
        begin: /<[A-Za-z0-9\\._:-]+/,
        end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
        isTrulyOpeningTag: (e2, n2) => {
          const a2 = e2[0].length + e2.index, s2 = e2.input[a2];
          "<" !== s2 ? ">" === s2 && (((e3, { after: n3 }) => {
            const a3 = "</" + e3[0].slice(1);
            return -1 !== e3.input.indexOf(a3, n3);
          })(e2, { after: a2 }) || n2.ignoreMatch()) : n2.ignoreMatch();
        }
      }, l = {
        $pattern: e,
        keyword: n.join(" "),
        literal: a.join(" "),
        built_in: s.join(" ")
      }, b = "\\.([0-9](_?[0-9])*)", g = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", d = {
        className: "number",
        variants: [
          {
            begin: `(\\b(${g})((${b})|\\.)?|(${b}))[eE][+-]?([0-9](_?[0-9])*)\\b`
          },
          {
            begin: `\\b(${g})\\b((${b})\\b|\\.)?|(${b})\\b`
          },
          {
            begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
          },
          {
            begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
          },
          {
            begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
          },
          { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
          {
            begin: "\\b0[0-7]+n?\\b"
          }
        ],
        relevance: 0
      }, E = {
        className: "subst",
        begin: "\\$\\{",
        end: "\\}",
        keywords: l,
        contains: []
      }, u = {
        begin: "html`",
        end: "",
        starts: {
          end: "`",
          returnEnd: false,
          contains: [t.BACKSLASH_ESCAPE, E],
          subLanguage: "xml"
        }
      }, _ = {
        begin: "css`",
        end: "",
        starts: {
          end: "`",
          returnEnd: false,
          contains: [t.BACKSLASH_ESCAPE, E],
          subLanguage: "css"
        }
      }, m = {
        className: "string",
        begin: "`",
        end: "`",
        contains: [t.BACKSLASH_ESCAPE, E]
      }, N = {
        className: "comment",
        variants: [
          t.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [
              {
                className: "doctag",
                begin: "@[A-Za-z]+",
                contains: [
                  {
                    className: "type",
                    begin: "\\{",
                    end: "\\}",
                    relevance: 0
                  },
                  {
                    className: "variable",
                    begin: c + "(?=\\s*(-)|$)",
                    endsParent: true,
                    relevance: 0
                  },
                  {
                    begin: /(?=[^\n])\s/,
                    relevance: 0
                  }
                ]
              }
            ]
          }),
          t.C_BLOCK_COMMENT_MODE,
          t.C_LINE_COMMENT_MODE
        ]
      }, y = [
        t.APOS_STRING_MODE,
        t.QUOTE_STRING_MODE,
        u,
        _,
        m,
        d,
        t.REGEXP_MODE
      ];
      E.contains = y.concat({
        begin: /\{/,
        end: /\}/,
        keywords: l,
        contains: ["self"].concat(y)
      });
      const f = [].concat(N, E.contains), A = f.concat([
        { begin: /\(/, end: /\)/, keywords: l, contains: ["self"].concat(f) }
      ]), p = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: l,
        contains: A
      };
      return {
        name: "Javascript",
        aliases: ["js", "jsx", "mjs", "cjs"],
        keywords: l,
        exports: { PARAMS_CONTAINS: A },
        illegal: /#(?![$_A-z])/,
        contains: [
          t.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }),
          {
            label: "use_strict",
            className: "meta",
            relevance: 10,
            begin: /^\s*['"]use (strict|asm)['"]/
          },
          t.APOS_STRING_MODE,
          t.QUOTE_STRING_MODE,
          u,
          _,
          m,
          N,
          d,
          {
            begin: i(
              /[{,\n]\s*/,
              r(i(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, c + "\\s*:"))
            ),
            relevance: 0,
            contains: [
              { className: "attr", begin: c + r("\\s*:"), relevance: 0 }
            ]
          },
          {
            begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
            keywords: "return throw case",
            contains: [
              N,
              t.REGEXP_MODE,
              {
                className: "function",
                begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>",
                returnBegin: true,
                end: "\\s*=>",
                contains: [
                  {
                    className: "params",
                    variants: [
                      {
                        begin: t.UNDERSCORE_IDENT_RE,
                        relevance: 0
                      },
                      { className: null, begin: /\(\s*\)/, skip: true },
                      {
                        begin: /\(/,
                        end: /\)/,
                        excludeBegin: true,
                        excludeEnd: true,
                        keywords: l,
                        contains: A
                      }
                    ]
                  }
                ]
              },
              { begin: /,/, relevance: 0 },
              { className: "", begin: /\s/, end: /\s*/, skip: true },
              {
                variants: [
                  { begin: "<>", end: "</>" },
                  {
                    begin: o.begin,
                    "on:begin": o.isTrulyOpeningTag,
                    end: o.end
                  }
                ],
                subLanguage: "xml",
                contains: [
                  { begin: o.begin, end: o.end, skip: true, contains: ["self"] }
                ]
              }
            ],
            relevance: 0
          },
          {
            className: "function",
            beginKeywords: "function",
            end: /[{;]/,
            excludeEnd: true,
            keywords: l,
            contains: ["self", t.inherit(t.TITLE_MODE, { begin: c }), p],
            illegal: /%/
          },
          {
            beginKeywords: "while if switch catch for"
          },
          {
            className: "function",
            begin: t.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)\\s*\\{",
            returnBegin: true,
            contains: [p, t.inherit(t.TITLE_MODE, { begin: c })]
          },
          {
            variants: [
              {
                begin: "\\." + c
              },
              { begin: "\\$" + c }
            ],
            relevance: 0
          },
          {
            className: "class",
            beginKeywords: "class",
            end: /[{;=]/,
            excludeEnd: true,
            illegal: /[:"[\]]/,
            contains: [
              {
                beginKeywords: "extends"
              },
              t.UNDERSCORE_TITLE_MODE
            ]
          },
          {
            begin: /\b(?=constructor)/,
            end: /[{;]/,
            excludeEnd: true,
            contains: [t.inherit(t.TITLE_MODE, { begin: c }), "self", p]
          },
          {
            begin: "(get|set)\\s+(?=" + c + "\\()",
            end: /\{/,
            keywords: "get set",
            contains: [
              t.inherit(t.TITLE_MODE, { begin: c }),
              { begin: /\(\)/ },
              p
            ]
          },
          { begin: /\$[(.]/ }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "perl",
  (() => {
    function e(...e2) {
      return e2.map((e3) => {
        return (n = e3) ? "string" == typeof n ? n : n.source : null;
        var n;
      }).join("");
    }
    return (n) => {
      var t = {
        $pattern: /[\w.]+/,
        keyword: "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qq fileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmget sub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedir ioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when"
      }, s = { className: "subst", begin: "[$@]\\{", end: "\\}", keywords: t }, r = { begin: /->\{/, end: /\}/ }, i = {
        variants: [
          { begin: /\$\d/ },
          {
            begin: e(
              /[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/,
              "(?![A-Za-z])(?![@$%])"
            )
          },
          { begin: /[$%@][^\s\w{]/, relevance: 0 }
        ]
      }, a = [n.BACKSLASH_ESCAPE, s, i], o = [
        i,
        n.HASH_COMMENT_MODE,
        n.COMMENT(/^=\w/, /=cut/, {
          endsWithParent: true
        }),
        r,
        {
          className: "string",
          contains: a,
          variants: [
            {
              begin: "q[qwxr]?\\s*\\(",
              end: "\\)",
              relevance: 5
            },
            { begin: "q[qwxr]?\\s*\\[", end: "\\]", relevance: 5 },
            { begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5 },
            {
              begin: "q[qwxr]?\\s*\\|",
              end: "\\|",
              relevance: 5
            },
            { begin: "q[qwxr]?\\s*<", end: ">", relevance: 5 },
            { begin: "qw\\s+q", end: "q", relevance: 5 },
            { begin: "'", end: "'", contains: [n.BACKSLASH_ESCAPE] },
            { begin: '"', end: '"' },
            { begin: "`", end: "`", contains: [n.BACKSLASH_ESCAPE] },
            { begin: /\{\w+\}/, contains: [], relevance: 0 },
            {
              begin: "-?\\w+\\s*=>",
              contains: [],
              relevance: 0
            }
          ]
        },
        {
          className: "number",
          begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
          relevance: 0
        },
        {
          begin: "(\\/\\/|" + n.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
          keywords: "split return print reverse grep",
          relevance: 0,
          contains: [
            n.HASH_COMMENT_MODE,
            {
              className: "regexp",
              begin: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
              relevance: 10
            },
            {
              className: "regexp",
              begin: "(m|qr)?/",
              end: "/[a-z]*",
              contains: [n.BACKSLASH_ESCAPE],
              relevance: 0
            }
          ]
        },
        {
          className: "function",
          beginKeywords: "sub",
          end: "(\\s*\\(.*?\\))?[;{]",
          excludeEnd: true,
          relevance: 5,
          contains: [n.TITLE_MODE]
        },
        {
          begin: "-\\w\\b",
          relevance: 0
        },
        {
          begin: "^__DATA__$",
          end: "^__END__$",
          subLanguage: "mojolicious",
          contains: [{ begin: "^@@.*", end: "$", className: "comment" }]
        }
      ];
      return s.contains = o, r.contains = o, { name: "Perl", aliases: ["pl", "pm"], keywords: t, contains: o };
    };
  })()
);
hljs.registerLanguage(
  "plaintext",
  (() => {
    return (t) => ({
      name: "Plain text",
      aliases: ["text", "txt"],
      disableAutodetect: true
    });
  })()
);
hljs.registerLanguage(
  "ini",
  (() => {
    function e(e2) {
      return e2 ? "string" == typeof e2 ? e2 : e2.source : null;
    }
    function n(...n2) {
      return n2.map((n3) => e(n3)).join("");
    }
    return (s) => {
      const a = {
        className: "number",
        relevance: 0,
        variants: [{ begin: /([+-]+)?[\d]+_[\d_]+/ }, { begin: s.NUMBER_RE }]
      }, i = s.COMMENT();
      i.variants = [
        { begin: /;/, end: /$/ },
        { begin: /#/, end: /$/ }
      ];
      const t = {
        className: "variable",
        variants: [{ begin: /\$[\w\d"][\w\d_]*/ }, { begin: /\$\{(.*?)\}/ }]
      }, r = { className: "literal", begin: /\bon|off|true|false|yes|no\b/ }, l = {
        className: "string",
        contains: [s.BACKSLASH_ESCAPE],
        variants: [
          { begin: "'''", end: "'''", relevance: 10 },
          { begin: '"""', end: '"""', relevance: 10 },
          { begin: '"', end: '"' },
          { begin: "'", end: "'" }
        ]
      }, c = {
        begin: /\[/,
        end: /\]/,
        contains: [i, r, t, l, a, "self"],
        relevance: 0
      }, g = "(" + [/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/].map((n2) => e(n2)).join("|") + ")";
      return {
        name: "TOML, also INI",
        aliases: ["toml"],
        case_insensitive: true,
        illegal: /\S/,
        contains: [
          i,
          { className: "section", begin: /\[+/, end: /\]+/ },
          {
            begin: n(
              g,
              "(\\s*\\.\\s*",
              g,
              ")*",
              n("(?=", /\s*=\s*[^#\s]/, ")")
            ),
            className: "attr",
            starts: { end: /$/, contains: [i, c, r, t, l, a] }
          }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "sql",
  (() => {
    return (e) => {
      var t = e.COMMENT("--", "$");
      return {
        name: "SQL",
        case_insensitive: true,
        illegal: /[<>{}*]/,
        contains: [
          {
            beginKeywords: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment values with",
            end: /;/,
            endsWithParent: true,
            keywords: {
              $pattern: /[\w\.]+/,
              keyword: "as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select self semi sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
              literal: "true false null unknown",
              built_in: "array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp tinyint varchar varchar2 varying void"
            },
            contains: [
              {
                className: "string",
                begin: "'",
                end: "'",
                contains: [{ begin: "''" }]
              },
              {
                className: "string",
                begin: '"',
                end: '"',
                contains: [{ begin: '""' }]
              },
              {
                className: "string",
                begin: "`",
                end: "`"
              },
              e.C_NUMBER_MODE,
              e.C_BLOCK_COMMENT_MODE,
              t,
              e.HASH_COMMENT_MODE
            ]
          },
          e.C_BLOCK_COMMENT_MODE,
          t,
          e.HASH_COMMENT_MODE
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "python-repl",
  (() => {
    return (s) => ({
      aliases: ["pycon"],
      contains: [
        {
          className: "meta",
          starts: { end: / |$/, starts: { end: "$", subLanguage: "python" } },
          variants: [
            { begin: /^>>>(?=[ ]|$)/ },
            {
              begin: /^\.\.\.(?=[ ]|$)/
            }
          ]
        }
      ]
    });
  })()
);
hljs.registerLanguage(
  "csharp",
  (() => {
    return (e) => {
      var n = {
        keyword: [
          "abstract",
          "as",
          "base",
          "break",
          "case",
          "class",
          "const",
          "continue",
          "do",
          "else",
          "event",
          "explicit",
          "extern",
          "finally",
          "fixed",
          "for",
          "foreach",
          "goto",
          "if",
          "implicit",
          "in",
          "interface",
          "internal",
          "is",
          "lock",
          "namespace",
          "new",
          "operator",
          "out",
          "override",
          "params",
          "private",
          "protected",
          "public",
          "readonly",
          "record",
          "ref",
          "return",
          "sealed",
          "sizeof",
          "stackalloc",
          "static",
          "struct",
          "switch",
          "this",
          "throw",
          "try",
          "typeof",
          "unchecked",
          "unsafe",
          "using",
          "virtual",
          "void",
          "volatile",
          "while"
        ].concat([
          "add",
          "alias",
          "and",
          "ascending",
          "async",
          "await",
          "by",
          "descending",
          "equals",
          "from",
          "get",
          "global",
          "group",
          "init",
          "into",
          "join",
          "let",
          "nameof",
          "not",
          "notnull",
          "on",
          "or",
          "orderby",
          "partial",
          "remove",
          "select",
          "set",
          "unmanaged",
          "value|0",
          "var",
          "when",
          "where",
          "with",
          "yield"
        ]).join(" "),
        built_in: "bool byte char decimal delegate double dynamic enum float int long nint nuint object sbyte short string ulong unit ushort",
        literal: "default false null true"
      }, a = e.inherit(e.TITLE_MODE, {
        begin: "[a-zA-Z](\\.?\\w)*"
      }), i = {
        className: "number",
        variants: [
          {
            begin: "\\b(0b[01']+)"
          },
          {
            begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
          },
          {
            begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
          }
        ],
        relevance: 0
      }, s = {
        className: "string",
        begin: '@"',
        end: '"',
        contains: [{ begin: '""' }]
      }, t = e.inherit(s, { illegal: /\n/ }), r = { className: "subst", begin: /\{/, end: /\}/, keywords: n }, l = e.inherit(r, { illegal: /\n/ }), c = {
        className: "string",
        begin: /\$"/,
        end: '"',
        illegal: /\n/,
        contains: [
          { begin: /\{\{/ },
          { begin: /\}\}/ },
          e.BACKSLASH_ESCAPE,
          l
        ]
      }, o = {
        className: "string",
        begin: /\$@"/,
        end: '"',
        contains: [
          {
            begin: /\{\{/
          },
          { begin: /\}\}/ },
          { begin: '""' },
          r
        ]
      }, d = e.inherit(o, {
        illegal: /\n/,
        contains: [{ begin: /\{\{/ }, { begin: /\}\}/ }, { begin: '""' }, l]
      });
      r.contains = [
        o,
        c,
        s,
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        i,
        e.C_BLOCK_COMMENT_MODE
      ], l.contains = [
        d,
        c,
        t,
        e.APOS_STRING_MODE,
        e.QUOTE_STRING_MODE,
        i,
        e.inherit(e.C_BLOCK_COMMENT_MODE, {
          illegal: /\n/
        })
      ];
      var g = { variants: [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE] }, E = {
        begin: "<",
        end: ">",
        contains: [{ beginKeywords: "in out" }, a]
      }, _ = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?", b = {
        begin: "@" + e.IDENT_RE,
        relevance: 0
      };
      return {
        name: "C#",
        aliases: ["cs", "c#"],
        keywords: n,
        illegal: /::/,
        contains: [
          e.COMMENT("///", "$", {
            returnBegin: true,
            contains: [
              {
                className: "doctag",
                variants: [
                  { begin: "///", relevance: 0 },
                  {
                    begin: "<!--|-->"
                  },
                  { begin: "</?", end: ">" }
                ]
              }
            ]
          }),
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE,
          {
            className: "meta",
            begin: "#",
            end: "$",
            keywords: {
              "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
            }
          },
          g,
          i,
          {
            beginKeywords: "class interface",
            relevance: 0,
            end: /[{;=]/,
            illegal: /[^\s:,]/,
            contains: [
              { beginKeywords: "where class" },
              a,
              E,
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          {
            beginKeywords: "namespace",
            relevance: 0,
            end: /[{;=]/,
            illegal: /[^\s:]/,
            contains: [a, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          },
          {
            beginKeywords: "record",
            relevance: 0,
            end: /[{;=]/,
            illegal: /[^\s:]/,
            contains: [a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          },
          {
            className: "meta",
            begin: "^\\s*\\[",
            excludeBegin: true,
            end: "\\]",
            excludeEnd: true,
            contains: [
              {
                className: "meta-string",
                begin: /"/,
                end: /"/
              }
            ]
          },
          {
            beginKeywords: "new return throw await else",
            relevance: 0
          },
          {
            className: "function",
            begin: "(" + _ + "\\s+)+" + e.IDENT_RE + "\\s*(<.+>)?\\s*\\(",
            returnBegin: true,
            end: /\s*[{;=]/,
            excludeEnd: true,
            keywords: n,
            contains: [
              {
                beginKeywords: "public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",
                relevance: 0
              },
              {
                begin: e.IDENT_RE + "\\s*(<.+>)?\\s*\\(",
                returnBegin: true,
                contains: [e.TITLE_MODE, E],
                relevance: 0
              },
              {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: true,
                excludeEnd: true,
                keywords: n,
                relevance: 0,
                contains: [g, i, e.C_BLOCK_COMMENT_MODE]
              },
              e.C_LINE_COMMENT_MODE,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          b
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "php",
  (() => {
    return (e) => {
      const r = {
        className: "variable",
        begin: "\\$+[a-zA-Z_\x7F-\xFF][a-zA-Z0-9_\x7F-\xFF]*(?![A-Za-z0-9])(?![$])"
      }, t = {
        className: "meta",
        variants: [
          { begin: /<\?php/, relevance: 10 },
          { begin: /<\?[=]?/ },
          {
            begin: /\?>/
          }
        ]
      }, a = {
        className: "subst",
        variants: [{ begin: /\$\w+/ }, { begin: /\{\$/, end: /\}/ }]
      }, n = e.inherit(e.APOS_STRING_MODE, { illegal: null }), i = e.inherit(e.QUOTE_STRING_MODE, {
        illegal: null,
        contains: e.QUOTE_STRING_MODE.contains.concat(a)
      }), o = e.END_SAME_AS_BEGIN({
        begin: /<<<[ \t]*(\w+)\n/,
        end: /[ \t]*(\w+)\b/,
        contains: e.QUOTE_STRING_MODE.contains.concat(a)
      }), l = {
        className: "string",
        contains: [e.BACKSLASH_ESCAPE, t],
        variants: [
          e.inherit(n, { begin: "b'", end: "'" }),
          e.inherit(i, { begin: 'b"', end: '"' }),
          i,
          n,
          o
        ]
      }, c = {
        variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE]
      }, s = {
        keyword: "__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 new object or private protected public real return string switch throw trait try unset use var void while xor yield",
        literal: "false null true",
        built_in: "Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Throwable Traversable WeakReference Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass"
      };
      return {
        aliases: ["php", "php3", "php4", "php5", "php6", "php7", "php8"],
        case_insensitive: true,
        keywords: s,
        contains: [
          e.HASH_COMMENT_MODE,
          e.COMMENT("//", "$", { contains: [t] }),
          e.COMMENT("/\\*", "\\*/", {
            contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
          }),
          e.COMMENT("__halt_compiler.+?;", false, {
            endsWithParent: true,
            keywords: "__halt_compiler"
          }),
          t,
          { className: "keyword", begin: /\$this\b/ },
          r,
          {
            begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
          },
          {
            className: "function",
            relevance: 0,
            beginKeywords: "fn function",
            end: /[;{]/,
            excludeEnd: true,
            illegal: "[$%\\[]",
            contains: [
              e.UNDERSCORE_TITLE_MODE,
              { begin: "=>" },
              {
                className: "params",
                begin: "\\(",
                end: "\\)",
                excludeBegin: true,
                excludeEnd: true,
                keywords: s,
                contains: ["self", r, e.C_BLOCK_COMMENT_MODE, l, c]
              }
            ]
          },
          {
            className: "class",
            beginKeywords: "class interface",
            relevance: 0,
            end: /\{/,
            excludeEnd: true,
            illegal: /[:($"]/,
            contains: [
              { beginKeywords: "extends implements" },
              e.UNDERSCORE_TITLE_MODE
            ]
          },
          {
            beginKeywords: "namespace",
            relevance: 0,
            end: ";",
            illegal: /[.']/,
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          {
            beginKeywords: "use",
            relevance: 0,
            end: ";",
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          l,
          c
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "php-template",
  (() => {
    return (n) => ({
      name: "PHP template",
      subLanguage: "xml",
      contains: [
        {
          begin: /<\?(php|=)?/,
          end: /\?>/,
          subLanguage: "php",
          contains: [
            { begin: "/\\*", end: "\\*/", skip: true },
            { begin: 'b"', end: '"', skip: true },
            { begin: "b'", end: "'", skip: true },
            n.inherit(n.APOS_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: true
            }),
            n.inherit(n.QUOTE_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: true
            })
          ]
        }
      ]
    });
  })()
);
hljs.registerLanguage(
  "rust",
  (() => {
    return (e) => {
      const n = "([ui](8|16|32|64|128|size)|f(32|64))?", t = "drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";
      return {
        name: "Rust",
        aliases: ["rs"],
        keywords: {
          $pattern: e.IDENT_RE + "!?",
          keyword: "abstract as async await become box break const continue crate do dyn else enum extern false final fn for if impl in let loop macro match mod move mut override priv pub ref return self Self static struct super trait true try type typeof unsafe unsized use virtual where while yield",
          literal: "true false Some None Ok Err",
          built_in: t
        },
        illegal: "</",
        contains: [
          e.C_LINE_COMMENT_MODE,
          e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
          e.inherit(e.QUOTE_STRING_MODE, { begin: /b?"/, illegal: null }),
          {
            className: "string",
            variants: [
              { begin: /r(#*)"(.|\n)*?"\1(?!#)/ },
              {
                begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
              }
            ]
          },
          { className: "symbol", begin: /'[a-zA-Z_][a-zA-Z0-9_]*/ },
          {
            className: "number",
            variants: [
              {
                begin: "\\b0b([01_]+)" + n
              },
              { begin: "\\b0o([0-7_]+)" + n },
              {
                begin: "\\b0x([A-Fa-f0-9_]+)" + n
              },
              {
                begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + n
              }
            ],
            relevance: 0
          },
          {
            className: "function",
            beginKeywords: "fn",
            end: "(\\(|<)",
            excludeEnd: true,
            contains: [e.UNDERSCORE_TITLE_MODE]
          },
          {
            className: "meta",
            begin: "#!?\\[",
            end: "\\]",
            contains: [{ className: "meta-string", begin: /"/, end: /"/ }]
          },
          {
            className: "class",
            beginKeywords: "type",
            end: ";",
            contains: [
              e.inherit(e.UNDERSCORE_TITLE_MODE, {
                endsParent: true
              })
            ],
            illegal: "\\S"
          },
          {
            className: "class",
            beginKeywords: "trait enum struct union",
            end: /\{/,
            contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { endsParent: true })],
            illegal: "[\\w\\d]"
          },
          { begin: e.IDENT_RE + "::", keywords: { built_in: t } },
          { begin: "->" }
        ]
      };
    };
  })()
);
hljs.registerLanguage(
  "shell",
  (() => {
    return (s) => ({
      name: "Shell Session",
      aliases: ["console"],
      contains: [
        {
          className: "meta",
          begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,
          starts: { end: /[^\\](?=\s*$)/, subLanguage: "bash" }
        }
      ]
    });
  })()
);
hljs.registerLanguage(
  "apache",
  (() => {
    return (e) => {
      const n = {
        className: "number",
        begin: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?"
      };
      return {
        name: "Apache config",
        aliases: ["apacheconf"],
        case_insensitive: true,
        contains: [
          e.HASH_COMMENT_MODE,
          {
            className: "section",
            begin: "</?",
            end: ">",
            contains: [
              n,
              { className: "number", begin: ":\\d{1,5}" },
              e.inherit(e.QUOTE_STRING_MODE, { relevance: 0 })
            ]
          },
          {
            className: "attribute",
            begin: /\w+/,
            relevance: 0,
            keywords: {
              nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
              end: /$/,
              relevance: 0,
              keywords: { literal: "on off all deny allow" },
              contains: [
                { className: "meta", begin: "\\s\\[", end: "\\]$" },
                {
                  className: "variable",
                  begin: "[\\$%]\\{",
                  end: "\\}",
                  contains: [
                    "self",
                    { className: "number", begin: "[\\$%]\\d+" }
                  ]
                },
                n,
                { className: "number", begin: "\\d+" },
                e.QUOTE_STRING_MODE
              ]
            }
          }
        ],
        illegal: /\S/
      };
    };
  })()
);
hljs.registerLanguage(
  "css",
  (() => {
    return (e) => {
      var n = "[a-zA-Z-][a-zA-Z0-9_-]*", a = {
        begin: /([*]\s?)?(?:[A-Z_.\-\\]+|--[a-zA-Z0-9_-]+)\s*(\/\*\*\/)?:/,
        returnBegin: true,
        end: ";",
        endsWithParent: true,
        contains: [
          {
            className: "attribute",
            begin: /\S/,
            end: ":",
            excludeEnd: true,
            starts: {
              endsWithParent: true,
              excludeEnd: true,
              contains: [
                {
                  begin: /[\w-]+\(/,
                  returnBegin: true,
                  contains: [
                    { className: "built_in", begin: /[\w-]+/ },
                    {
                      begin: /\(/,
                      end: /\)/,
                      contains: [
                        e.APOS_STRING_MODE,
                        e.QUOTE_STRING_MODE,
                        e.CSS_NUMBER_MODE
                      ]
                    }
                  ]
                },
                e.CSS_NUMBER_MODE,
                e.QUOTE_STRING_MODE,
                e.APOS_STRING_MODE,
                e.C_BLOCK_COMMENT_MODE,
                {
                  className: "number",
                  begin: "#[0-9A-Fa-f]+"
                },
                { className: "meta", begin: "!important" }
              ]
            }
          }
        ]
      };
      return {
        name: "CSS",
        case_insensitive: true,
        illegal: /[=|'\$]/,
        contains: [
          e.C_BLOCK_COMMENT_MODE,
          { className: "selector-id", begin: /#[A-Za-z0-9_-]+/ },
          { className: "selector-class", begin: "\\." + n },
          {
            className: "selector-attr",
            begin: /\[/,
            end: /\]/,
            illegal: "$",
            contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
          },
          { className: "selector-pseudo", begin: /:(:)?[a-zA-Z0-9_+()"'.-]+/ },
          {
            begin: "@(page|font-face)",
            lexemes: "@[a-z-]+",
            keywords: "@page @font-face"
          },
          {
            begin: "@",
            end: "[{;]",
            illegal: /:/,
            returnBegin: true,
            contains: [
              { className: "keyword", begin: /@-?\w[\w]*(-\w+)*/ },
              {
                begin: /\s/,
                endsWithParent: true,
                excludeEnd: true,
                relevance: 0,
                keywords: "and or not only",
                contains: [
                  { begin: /[a-z-]+:/, className: "attribute" },
                  e.APOS_STRING_MODE,
                  e.QUOTE_STRING_MODE,
                  e.CSS_NUMBER_MODE
                ]
              }
            ]
          },
          { className: "selector-tag", begin: n, relevance: 0 },
          {
            begin: /\{/,
            end: /\}/,
            illegal: /\S/,
            contains: [e.C_BLOCK_COMMENT_MODE, { begin: /;/ }, a]
          }
        ]
      };
    };
  })()
);
const MkitCsslist = [
  {
    value: "a11y-dark.css",
    label: "a11y-dark.css"
  },
  {
    value: "a11y-light.css",
    label: "a11y-light.css"
  },
  {
    value: "agate.css",
    label: "agate.css"
  },
  {
    value: "an-old-hope.css",
    label: "an-old-hope.css"
  },
  {
    value: "androidstudio.css",
    label: "androidstudio.css"
  },
  {
    value: "arduino-light.css",
    label: "arduino-light.css"
  },
  {
    value: "arta.css",
    label: "arta.css"
  },
  {
    value: "ascetic.css",
    label: "ascetic.css"
  },
  {
    value: "atelier-cave-dark.css",
    label: "atelier-cave-dark.css"
  },
  {
    value: "atelier-cave-light.css",
    label: "atelier-cave-light.css"
  },
  {
    value: "atelier-dune-dark.css",
    label: "atelier-dune-dark.css"
  },
  {
    value: "atelier-dune-light.css",
    label: "atelier-dune-light.css"
  },
  {
    value: "atelier-estuary-dark.css",
    label: "atelier-estuary-dark.css"
  },
  {
    value: "atelier-estuary-light.css",
    label: "atelier-estuary-light.css"
  },
  {
    value: "atelier-forest-dark.css",
    label: "atelier-forest-dark.css"
  },
  {
    value: "atelier-forest-light.css",
    label: "atelier-forest-light.css"
  },
  {
    value: "atelier-heath-dark.css",
    label: "atelier-heath-dark.css"
  },
  {
    value: "atelier-heath-light.css",
    label: "atelier-heath-light.css"
  },
  {
    value: "atelier-lakeside-dark.css",
    label: "atelier-lakeside-dark.css"
  },
  {
    value: "atelier-lakeside-light.css",
    label: "atelier-lakeside-light.css"
  },
  {
    value: "atelier-plateau-dark.css",
    label: "atelier-plateau-dark.css"
  },
  {
    value: "atelier-plateau-light.css",
    label: "atelier-plateau-light.css"
  },
  {
    value: "atelier-savanna-dark.css",
    label: "atelier-savanna-dark.css"
  },
  {
    value: "atelier-savanna-light.css",
    label: "atelier-savanna-light.css"
  },
  {
    value: "atelier-seaside-dark.css",
    label: "atelier-seaside-dark.css"
  },
  {
    value: "atelier-seaside-light.css",
    label: "atelier-seaside-light.css"
  },
  {
    value: "atelier-sulphurpool-dark.css",
    label: "atelier-sulphurpool-dark.css"
  },
  {
    value: "atelier-sulphurpool-light.css",
    label: "atelier-sulphurpool-light.css"
  },
  {
    value: "atom-one-dark-reasonable.css",
    label: "atom-one-dark-reasonable.css"
  },
  {
    value: "atom-one-dark.css",
    label: "atom-one-dark.css"
  },
  {
    value: "atom-one-light.css",
    label: "atom-one-light.css"
  },
  {
    value: "brown-paper.css",
    label: "brown-paper.css"
  },
  {
    value: "codepen-embed.css",
    label: "codepen-embed.css"
  },
  {
    value: "color-brewer.css",
    label: "color-brewer.css"
  },
  {
    value: "darcula.css",
    label: "darcula.css"
  },
  {
    value: "dark.css",
    label: "dark.css"
  },
  {
    value: "default.css",
    label: "default.css"
  },
  {
    value: "docco.css",
    label: "docco.css"
  },
  {
    value: "dracula.css",
    label: "dracula.css"
  },
  {
    value: "far.css",
    label: "far.css"
  },
  {
    value: "foundation.css",
    label: "foundation.css"
  },
  {
    value: "github-gist.css",
    label: "github-gist.css"
  },
  {
    value: "github.css",
    label: "github.css"
  },
  {
    value: "gml.css",
    label: "gml.css"
  },
  {
    value: "googlecode.css",
    label: "googlecode.css"
  },
  {
    value: "gradient-dark.css",
    label: "gradient-dark.css"
  },
  {
    value: "gradient-light.css",
    label: "gradient-light.css"
  },
  {
    value: "grayscale.css",
    label: "grayscale.css"
  },
  {
    value: "gruvbox-dark.css",
    label: "gruvbox-dark.css"
  },
  {
    value: "gruvbox-light.css",
    label: "gruvbox-light.css"
  },
  {
    value: "hopscotch.css",
    label: "hopscotch.css"
  },
  {
    value: "hybrid.css",
    label: "hybrid.css"
  },
  {
    value: "idea.css",
    label: "idea.css"
  },
  {
    value: "ir-black.css",
    label: "ir-black.css"
  },
  {
    value: "isbl-editor-dark.css",
    label: "isbl-editor-dark.css"
  },
  {
    value: "isbl-editor-light.css",
    label: "isbl-editor-light.css"
  },
  {
    value: "kimbie.dark.css",
    label: "kimbie.dark.css"
  },
  {
    value: "kimbie.light.css",
    label: "kimbie.light.css"
  },
  {
    value: "lightfair.css",
    label: "lightfair.css"
  },
  {
    value: "lioshi.css",
    label: "lioshi.css"
  },
  {
    value: "magula.css",
    label: "magula.css"
  },
  {
    value: "mono-blue.css",
    label: "mono-blue.css"
  },
  {
    value: "monokai-sublime.css",
    label: "monokai-sublime.css"
  },
  {
    value: "monokai.css",
    label: "monokai.css"
  },
  {
    value: "night-owl.css",
    label: "night-owl.css"
  },
  {
    value: "nnfx-dark.css",
    label: "nnfx-dark.css"
  },
  {
    value: "nnfx.css",
    label: "nnfx.css"
  },
  {
    value: "nord.css",
    label: "nord.css"
  },
  {
    value: "obsidian.css",
    label: "obsidian.css"
  },
  {
    value: "ocean.css",
    label: "ocean.css"
  },
  {
    value: "paraiso-dark.css",
    label: "paraiso-dark.css"
  },
  {
    value: "paraiso-light.css",
    label: "paraiso-light.css"
  },
  {
    value: "pojoaque.css",
    label: "pojoaque.css"
  },
  {
    value: "purebasic.css",
    label: "purebasic.css"
  },
  {
    value: "qtcreator_dark.css",
    label: "qtcreator_dark.css"
  },
  {
    value: "qtcreator_light.css",
    label: "qtcreator_light.css"
  },
  {
    value: "railscasts.css",
    label: "railscasts.css"
  },
  {
    value: "rainbow.css",
    label: "rainbow.css"
  },
  {
    value: "routeros.css",
    label: "routeros.css"
  },
  {
    value: "school-book.css",
    label: "school-book.css"
  },
  {
    value: "shades-of-purple.css",
    label: "shades-of-purple.css"
  },
  {
    value: "solarized-dark.css",
    label: "solarized-dark.css"
  },
  {
    value: "solarized-light.css",
    label: "solarized-light.css"
  },
  {
    value: "srcery.css",
    label: "srcery.css"
  },
  {
    value: "stackoverflow-dark.css",
    label: "stackoverflow-dark.css"
  },
  {
    value: "stackoverflow-light.css",
    label: "stackoverflow-light.css"
  },
  {
    value: "sunburst.css",
    label: "sunburst.css"
  },
  {
    value: "tomorrow-night-blue.css",
    label: "tomorrow-night-blue.css"
  },
  {
    value: "tomorrow-night-bright.css",
    label: "tomorrow-night-bright.css"
  },
  {
    value: "tomorrow-night-eighties.css",
    label: "tomorrow-night-eighties.css"
  },
  {
    value: "tomorrow-night.css",
    label: "tomorrow-night.css"
  },
  {
    value: "tomorrow.css",
    label: "tomorrow.css"
  },
  {
    value: "vs.css",
    label: "vs.css"
  },
  {
    value: "vs2015.css",
    label: "vs2015.css"
  },
  {
    value: "xcode.css",
    label: "xcode.css"
  },
  {
    value: "xt256.css",
    label: "xt256.css"
  },
  {
    value: "zenburn.css",
    label: "zenburn.css"
  }
];
const setTheme = async (theme2 = "") => {
  theme2 = theme2 || localStorage.markdownHightlightTheme || "monokai-sublime.css";
  const cssURL = `${stateUI.assetsPath}/highlightstyles/${theme2}`;
  localStorage.markdownHightlightTheme = theme2;
  const id = `markdonw-hightlight-style`;
  await xU.asyncLoadStyle(cssURL, {
    isReplace: true,
    id
  });
};
const MkitTheme = defineComponent({
  setup() {
    return {
      setTheme
    };
  },
  computed: {
    cssURL() {
      return;
    }
  },
  watch: {
    theme: {
      immediate: true,
      async handler(theme2) {
        this.setTheme(theme2);
      }
    }
  },
  data() {
    return {
      theme: localStorage.markdownHightlightTheme || "monokai-sublime.css"
    };
  },
  render() {
    return withDirectives(createVNode("select", {
      "class": "markdown-theme",
      "onUpdate:modelValue": ($event) => this.theme = $event
    }, [xU.map(MkitCsslist, (i) => {
      return createVNode("option", {
        "key": i.value,
        "value": i.value
      }, [i.label]);
    })]), [[vModelSelect, this.theme]]);
  }
});
const rightArrow = `<div class="x-tui-image-preview-switch-right right"><span role="img" aria-label="right" class="anticon anticon-right"><svg focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg></span></div>`;
const leftArrow = `<div class="x-tui-image-preview-switch-left left"><span role="img" aria-label="left" class="anticon anticon-left"><svg focusable="false" class="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg></span></div>`;
function newImageDomString(title, text, href, index) {
  return `<div class="x-tui-image pointer el-card flex center middle" data-x-tui-image-index="${index}">
	<img class="x-tui-image-img" src="${href}" title="${title}" alt="${text}">
</div>`;
}
class PreprocessHTML {
  constructor(html) {
    this.html = html;
    this.$html = $(this.html);
    this.img().a().codejs();
    this.toc();
  }
  toc() {
    const TOC_TAG = `&lt;!-- toc --&gt;`;
    const headers = xU.filter(this.$html, (ele) => {
      xU(ele.tagName);
      return /^h(\d+)/i.test(ele.tagName);
    });
    if (headers.length === 0) {
      return this;
    }
    if (!String(this.html).includes(TOC_TAG)) {
      return this;
    }
    let $toc = $("<ul/>").css({
      border: "1px solid #ccc"
    });
    let stack = [];
    for (const header of headers) {
      let level = parseInt(header.tagName.replace("H", ""), 10);
      while (stack.length < level) {
        stack.push(0);
      }
      while (stack.length > level) {
        stack.pop();
      }
      stack[stack.length - 1]++;
      let index = stack.join(".");
      let id = "title" + index;
      header.setAttribute("id", id);
      header.textContent = index + " " + header.textContent;
      $toc.append($(`<li>
    <a>${new Array(level * 4).join("&nbsp;") + header.textContent}</a>
</li>`));
    }
    this.html = this.html.replace(TOC_TAG, $toc[0].outerHTML);
    return this;
  }
  img() {
    const imgArray = this.$html.find("img");
    xU.each(imgArray, (img, index) => {
      const {
        alt,
        src
      } = img;
      this.html = this.html.replace(img.outerHTML, newImageDomString(alt, alt, src, index));
    });
    return this;
  }
  a() {
    const aArray = this.$html.find("a");
    xU.each(aArray, (aDom, index) => {
      const aDomOuterHTML = aDom.outerHTML;
      const outerHTML = $(aDom).attr({
        target: "_blank",
        "data-markdwon-a-index": index
      })[0].outerHTML;
      this.html = this.html.replace(aDomOuterHTML, outerHTML);
    });
    return this;
  }
  codejs() {
    const codeArray = this.$html.find("code[data-language='js']");
    xU.each(codeArray, (codeDom, index) => {
      const $codeDom = $(codeDom);
      const codeDomOuterHTML = codeDom.outerHTML;
      $codeDom.addClass("hljs");
      let codeDomInnerHTML = String($codeDom[0].innerHTML);
      const innerHTML = hljs.highlightAuto(codeDomInnerHTML).value;
      const innerHTMLReplaceGreatThan = innerHTML.replace(/=\&amp;gt;/g, "=>");
      $codeDom[0].innerHTML = innerHTMLReplaceGreatThan;
      this.html = this.html.replace(codeDomOuterHTML, $codeDom[0].outerHTML);
    });
    return this;
  }
}
const MarkdownIt$1 = "";
const MarkdownIt = defineComponent({
  props: ["md"],
  setup() {
    setTheme();
  },
  data() {
    return {
      visible: false,
      imgSrc: "",
      originHTML: "",
      html: "",
      configsPopoverChangeTheme: {
        trigger: "rightClick",
        content: MkitTheme,
        openAtPoint: true
      }
    };
  },
  async mounted() {
    this.init();
  },
  beforeUnmount() {
    this.destoryListener();
  },
  watch: {
    md() {
      this.init();
    }
  },
  methods: {
    init() {
      this.originHTML = (() => {
        var _a, _b;
        if (xU.isInput(this.md)) {
          return this.md;
        }
        if (xU.isFunction((_a = this.$slots) == null ? void 0 : _a.default)) {
          const defaultItems = (_b = this.$slots) == null ? void 0 : _b.default();
          if (xU.isArrayFill(defaultItems)) {
            return xU.first(defaultItems).children;
          }
        }
        return "---";
      })();
      marked.options = {
        langClass: "hljs"
      };
      const renderer = new Renderer();
      renderer.image = function(href, title, text) {
        title = title || text;
        if (!href) {
          return text || "";
        }
        return newImageDomString(title, text, href);
      };
      this.html = marked(this.originHTML, {
        renderer,
        highlight: (code) => hljs.highlightAuto(code).value
      });
    },
    setVisible(visible) {
      this.visible = visible;
    },
    destoryListener() {
      if (this.$previewer) {
        this.$previewer.off("click");
        this.$previewer = null;
      }
    },
    showImg(imgSrc) {
      this.imgSrc = imgSrc;
      this.setVisible(true);
      this.ifHasMulImageAddArrow(imgSrc);
    },
    ifHasMulImageAddArrow(imgSrc) {
      const $md = $(this.$refs.markdown);
      const imgList = $md.find("img");
      if (imgList.length > 1) {
        this.$rawImgList = imgList;
        this.$rawImgIndex = xU.findIndex(imgList, (i) => $(i).attr("src") === imgSrc);
        setTimeout(() => {
          this.destoryListener();
          this.$previewer = $(".x-tui-image-preview-body");
          this.$previewer.on("click", "[class^=x-tui-image-preview-switch-]", this.handleClickPreviewSwitch);
          this.$previewer.append(leftArrow);
          this.$previewer.append(rightArrow);
        }, 500);
      }
    },
    handleClickPreviewSwitch({
      currentTarget
    }) {
      const {
        length
      } = this.$rawImgList;
      if ($(currentTarget).hasClass("right")) {
        this.$rawImgIndex = (this.$rawImgIndex + 1) % length;
      } else {
        this.$rawImgIndex = (this.$rawImgIndex - 1 + length) % length;
      }
      const imgSrc = $(this.$rawImgList[this.$rawImgIndex]).attr("src");
      $(".x-tui-image-preview-img").attr("src", imgSrc);
    },
    handleClick(event) {
      const {
        target
      } = event;
      const $ele = $(target).parents(".x-tui-image[data-src]");
      if ($ele && $ele.length) {
        this.showImg($ele.attr("data-src"));
      }
    }
  },
  render({
    visible,
    setVisible,
    imgSrc,
    handleClick
  }) {
    return createVNode(Fragment, null, [withDirectives(createVNode("div", {
      "ref": "markdown",
      "onClick": handleClick,
      "class": "markdown-wrapper_description mt10",
      "innerHTML": this.html,
      "title": "\u53F3\u952E\u70B9\u51FB\u53EF\u4EE5\u4FEE\u6539<code/>\u5143\u7D20\u9AD8\u4EAE\u6837\u5F0F"
    }, null), [[resolveDirective("xTips"), this.configsPopoverChangeTheme]]), createVNode("div", {
      "class": "display-none"
    }, [createVNode(resolveComponent("ElImage"), {
      "src": imgSrc,
      "preview": {
        visible,
        onVisibleChange: setVisible
      }
    }, null)])]);
  }
});
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
const isClient = typeof window !== "undefined";
const notNullish = (val) => val != null;
const noop = () => {
};
const isIOS = /* @__PURE__ */ getIsIOS();
function getIsIOS() {
  var _a;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /* @__PURE__ */ /iP(ad|hone|od)/.test(window.navigator.userAgent);
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  const filter = (invoke) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(invoke());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke());
      }, duration);
    });
  };
  return filter;
}
function throttleFilter(ms, trailing = true, leading = true, rejectOnCancel = false) {
  let lastExec = 0;
  let timer;
  let isLeading = true;
  let lastRejector = noop;
  let lastValue;
  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
      lastRejector();
      lastRejector = noop;
    }
  };
  const filter = (_invoke) => {
    const duration = toValue(ms);
    const elapsed = Date.now() - lastExec;
    const invoke = () => {
      return lastValue = _invoke();
    };
    clear();
    if (duration <= 0) {
      lastExec = Date.now();
      return invoke();
    }
    if (elapsed > duration && (leading || !isLeading)) {
      lastExec = Date.now();
      invoke();
    } else if (trailing) {
      lastValue = new Promise((resolve, reject) => {
        lastRejector = rejectOnCancel ? reject : resolve;
        timer = setTimeout(() => {
          lastExec = Date.now();
          isLeading = true;
          resolve(invoke());
          clear();
        }, Math.max(0, duration - elapsed));
      });
    }
    if (!leading && !timer)
      timer = setTimeout(() => isLeading = true, duration);
    isLeading = false;
    return lastValue;
  };
  return filter;
}
const directiveHooks = {
  mounted: "mounted",
  updated: "updated",
  unmounted: "unmounted"
};
function toRef(...args) {
  if (args.length !== 1)
    return toRef$1(...args);
  const r = args[0];
  return typeof r === "function" ? readonly(customRef(() => ({ get: r, set: noop }))) : ref(r);
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn
  );
}
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
  return createFilterWrapper(
    throttleFilter(ms, trailing, leading, rejectOnCancel),
    fn
  );
}
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = isClient ? window : void 0;
function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      cleanups.push(
        ...events.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, options2));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
let _iOSWorkaround = false;
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2)
    return;
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true;
    Array.from(window2.document.body.children).forEach((el) => el.addEventListener("click", noop));
    window2.document.documentElement.addEventListener("click", noop);
  }
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return ignore.some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  const listener = (event) => {
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      if (el)
        shouldListen = !e.composedPath().includes(el) && !shouldIgnore(e);
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement)))
          handler(event);
      }, 0);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
({
  [directiveHooks.mounted](el, binding) {
    const capture = !binding.modifiers.bubble;
    if (typeof binding.value === "function") {
      el.__onClickOutside_stop = onClickOutside(el, binding.value, { capture });
    } else {
      const [handler, options] = binding.value;
      el.__onClickOutside_stop = onClickOutside(el, handler, Object.assign({ capture }, options));
    }
  },
  [directiveHooks.unmounted](el) {
    el.__onClickOutside_stop();
  }
});
function createKeyPredicate(keyFilter) {
  if (typeof keyFilter === "function")
    return keyFilter;
  else if (typeof keyFilter === "string")
    return (event) => event.key === keyFilter;
  else if (Array.isArray(keyFilter))
    return (event) => keyFilter.includes(event.key);
  return () => true;
}
function onKeyStroke(...args) {
  let key;
  let handler;
  let options = {};
  if (args.length === 3) {
    key = args[0];
    handler = args[1];
    options = args[2];
  } else if (args.length === 2) {
    if (typeof args[1] === "object") {
      key = true;
      handler = args[0];
      options = args[1];
    } else {
      key = args[0];
      handler = args[1];
    }
  } else {
    key = true;
    handler = args[0];
  }
  const {
    target = defaultWindow,
    eventName = "keydown",
    passive = false,
    dedupe = false
  } = options;
  const predicate = createKeyPredicate(key);
  const listener = (e) => {
    if (e.repeat && toValue(dedupe))
      return;
    if (predicate(e))
      handler(e);
  };
  return useEventListener(target, eventName, listener, passive);
}
var __defProp$e = Object.defineProperty;
var __getOwnPropSymbols$g = Object.getOwnPropertySymbols;
var __hasOwnProp$g = Object.prototype.hasOwnProperty;
var __propIsEnum$g = Object.prototype.propertyIsEnumerable;
var __defNormalProp$e = (obj, key, value) => key in obj ? __defProp$e(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$e = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$g.call(b, prop))
      __defNormalProp$e(a, prop, b[prop]);
  if (__getOwnPropSymbols$g)
    for (var prop of __getOwnPropSymbols$g(b)) {
      if (__propIsEnum$g.call(b, prop))
        __defNormalProp$e(a, prop, b[prop]);
    }
  return a;
};
({
  [directiveHooks.mounted](el, binding) {
    var _a, _b;
    const keys = (_b = (_a = binding.arg) == null ? void 0 : _a.split(",")) != null ? _b : true;
    if (typeof binding.value === "function") {
      onKeyStroke(keys, binding.value, {
        target: el
      });
    } else {
      const [handler, options] = binding.value;
      onKeyStroke(keys, handler, __spreadValues$e({
        target: el
      }, options));
    }
  }
});
const DEFAULT_DELAY = 500;
function onLongPress(target, handler, options) {
  var _a, _b;
  const elementRef = computed(() => unrefElement(target));
  let timeout;
  function clear() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = void 0;
    }
  }
  function onDown(ev) {
    var _a2, _b2, _c, _d;
    if (((_a2 = options == null ? void 0 : options.modifiers) == null ? void 0 : _a2.self) && ev.target !== elementRef.value)
      return;
    clear();
    if ((_b2 = options == null ? void 0 : options.modifiers) == null ? void 0 : _b2.prevent)
      ev.preventDefault();
    if ((_c = options == null ? void 0 : options.modifiers) == null ? void 0 : _c.stop)
      ev.stopPropagation();
    timeout = setTimeout(
      () => handler(ev),
      (_d = options == null ? void 0 : options.delay) != null ? _d : DEFAULT_DELAY
    );
  }
  const listenerOptions = {
    capture: (_a = options == null ? void 0 : options.modifiers) == null ? void 0 : _a.capture,
    once: (_b = options == null ? void 0 : options.modifiers) == null ? void 0 : _b.once
  };
  useEventListener(elementRef, "pointerdown", onDown, listenerOptions);
  useEventListener(elementRef, ["pointerup", "pointerleave"], clear, listenerOptions);
}
({
  [directiveHooks.mounted](el, binding) {
    if (typeof binding.value === "function")
      onLongPress(el, binding.value, { modifiers: binding.modifiers });
    else
      onLongPress(el, ...binding.value);
  }
});
function useMounted() {
  const isMounted = ref(false);
  if (getCurrentInstance()) {
    onMounted(() => {
      isMounted.value = true;
    });
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useElementHover(el, options = {}) {
  const {
    delayEnter = 0,
    delayLeave = 0,
    window: window2 = defaultWindow
  } = options;
  const isHovered = ref(false);
  let timer;
  const toggle = (entering) => {
    const delay = entering ? delayEnter : delayLeave;
    if (timer) {
      clearTimeout(timer);
      timer = void 0;
    }
    if (delay)
      timer = setTimeout(() => isHovered.value = entering, delay);
    else
      isHovered.value = entering;
  };
  if (!window2)
    return isHovered;
  useEventListener(el, "mouseenter", () => toggle(true), { passive: true });
  useEventListener(el, "mouseleave", () => toggle(false), { passive: true });
  return isHovered;
}
({
  [directiveHooks.mounted](el, binding) {
    if (typeof binding.value === "function") {
      const isHovered = useElementHover(el);
      watch(isHovered, (v) => binding.value(v));
    }
  }
});
var __getOwnPropSymbols$c = Object.getOwnPropertySymbols;
var __hasOwnProp$c = Object.prototype.hasOwnProperty;
var __propIsEnum$c = Object.prototype.propertyIsEnumerable;
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$c.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$c)
    for (var prop of __getOwnPropSymbols$c(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$c.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a = options, { window: window2 = defaultWindow } = _a, observerOptions = __objRest$1(_a, ["window"]);
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(
    () => Array.isArray(target) ? target.map((el) => unrefElement(el)) : [unrefElement(target)]
  );
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup();
      if (isSupported.value && window2) {
        observer = new ResizeObserver(callback);
        for (const _el of els)
          _el && observer.observe(_el, observerOptions);
      }
    },
    { immediate: true, flush: "post", deep: true }
  );
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const { window: window2 = defaultWindow, box = "content-box" } = options;
  const isSVG = computed(() => {
    var _a, _b;
    return (_b = (_a = unrefElement(target)) == null ? void 0 : _a.namespaceURI) == null ? void 0 : _b.includes("svg");
  });
  const width = ref(initialSize.width);
  const height = ref(initialSize.height);
  useResizeObserver(
    target,
    ([entry]) => {
      const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
      if (window2 && isSVG.value) {
        const $elem = unrefElement(target);
        if ($elem) {
          const styles = window2.getComputedStyle($elem);
          width.value = Number.parseFloat(styles.width);
          height.value = Number.parseFloat(styles.height);
        }
      } else {
        if (boxSize) {
          const formatBoxSize = Array.isArray(boxSize) ? boxSize : [boxSize];
          width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
          height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
        } else {
          width.value = entry.contentRect.width;
          height.value = entry.contentRect.height;
        }
      }
    },
    options
  );
  watch(
    () => unrefElement(target),
    (ele) => {
      width.value = ele ? initialSize.width : 0;
      height.value = ele ? initialSize.height : 0;
    }
  );
  return {
    width,
    height
  };
}
const vElementSize = {
  [directiveHooks.mounted](el, binding) {
    var _a;
    const handler = typeof binding.value === "function" ? binding.value : (_a = binding.value) == null ? void 0 : _a[0];
    const options = typeof binding.value === "function" ? [] : binding.value.slice(1);
    const { width, height } = useElementSize(el, ...options);
    watch([width, height], ([width2, height2]) => handler({ width: width2, height: height2 }));
  }
};
function useIntersectionObserver(target, callback, options = {}) {
  const {
    root,
    rootMargin = "0px",
    threshold = 0.1,
    window: window2 = defaultWindow,
    immediate = true
  } = options;
  const isSupported = useSupported(() => window2 && "IntersectionObserver" in window2);
  const targets = computed(() => {
    const _target = toValue(target);
    return (Array.isArray(_target) ? _target : [_target]).map(unrefElement).filter(notNullish);
  });
  let cleanup = noop;
  const isActive = ref(immediate);
  const stopWatch = isSupported.value ? watch(
    () => [targets.value, unrefElement(root), isActive.value],
    ([targets2, root2]) => {
      cleanup();
      if (!isActive.value)
        return;
      if (!targets2.length)
        return;
      const observer = new IntersectionObserver(
        callback,
        {
          root: unrefElement(root2),
          rootMargin,
          threshold
        }
      );
      targets2.forEach((el) => el && observer.observe(el));
      cleanup = () => {
        observer.disconnect();
        cleanup = noop;
      };
    },
    { immediate, flush: "post" }
  ) : noop;
  const stop = () => {
    cleanup();
    stopWatch();
    isActive.value = false;
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    isActive,
    pause() {
      cleanup();
      isActive.value = false;
    },
    resume() {
      isActive.value = true;
    },
    stop
  };
}
function useElementVisibility(element, { window: window2 = defaultWindow, scrollTarget } = {}) {
  const elementIsVisible = ref(false);
  useIntersectionObserver(
    element,
    ([{ isIntersecting }]) => {
      elementIsVisible.value = isIntersecting;
    },
    {
      root: scrollTarget,
      window: window2
    }
  );
  return elementIsVisible;
}
({
  [directiveHooks.mounted](el, binding) {
    if (typeof binding.value === "function") {
      const handler = binding.value;
      const isVisible = useElementVisibility(el);
      watch(isVisible, (v) => handler(v), { immediate: true });
    } else {
      const [handler, options] = binding.value;
      const isVisible = useElementVisibility(el, options);
      watch(isVisible, (v) => handler(v), { immediate: true });
    }
  }
});
const ARRIVED_STATE_THRESHOLD_PIXELS = 1;
function useScroll(element, options = {}) {
  const {
    throttle = 0,
    idle = 200,
    onStop = noop,
    onScroll = noop,
    offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    eventListenerOptions = {
      capture: false,
      passive: true
    },
    behavior = "auto",
    window: window2 = defaultWindow
  } = options;
  const internalX = ref(0);
  const internalY = ref(0);
  const x = computed({
    get() {
      return internalX.value;
    },
    set(x2) {
      scrollTo(x2, void 0);
    }
  });
  const y = computed({
    get() {
      return internalY.value;
    },
    set(y2) {
      scrollTo(void 0, y2);
    }
  });
  function scrollTo(_x, _y) {
    var _a, _b, _c;
    if (!window2)
      return;
    const _element = toValue(element);
    if (!_element)
      return;
    (_c = _element instanceof Document ? window2.document.body : _element) == null ? void 0 : _c.scrollTo({
      top: (_a = toValue(_y)) != null ? _a : y.value,
      left: (_b = toValue(_x)) != null ? _b : x.value,
      behavior: toValue(behavior)
    });
  }
  const isScrolling = ref(false);
  const arrivedState = reactive({
    left: true,
    right: false,
    top: true,
    bottom: false
  });
  const directions = reactive({
    left: false,
    right: false,
    top: false,
    bottom: false
  });
  const onScrollEnd = (e) => {
    if (!isScrolling.value)
      return;
    isScrolling.value = false;
    directions.left = false;
    directions.right = false;
    directions.top = false;
    directions.bottom = false;
    onStop(e);
  };
  const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle + idle);
  const setArrivedState = (target) => {
    if (!window2)
      return;
    const el = target === window2 ? target.document.documentElement : target === window2.document ? target.documentElement : target;
    const { display, flexDirection } = getComputedStyle(el);
    const scrollLeft = el.scrollLeft;
    directions.left = scrollLeft < internalX.value;
    directions.right = scrollLeft > internalX.value;
    const left = Math.abs(scrollLeft) <= 0 + (offset.left || 0);
    const right = Math.abs(scrollLeft) + el.clientWidth >= el.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    if (display === "flex" && flexDirection === "row-reverse") {
      arrivedState.left = right;
      arrivedState.right = left;
    } else {
      arrivedState.left = left;
      arrivedState.right = right;
    }
    internalX.value = scrollLeft;
    let scrollTop = el.scrollTop;
    if (target === window2.document && !scrollTop)
      scrollTop = window2.document.body.scrollTop;
    directions.top = scrollTop < internalY.value;
    directions.bottom = scrollTop > internalY.value;
    const top = Math.abs(scrollTop) <= 0 + (offset.top || 0);
    const bottom = Math.abs(scrollTop) + el.clientHeight >= el.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
    if (display === "flex" && flexDirection === "column-reverse") {
      arrivedState.top = bottom;
      arrivedState.bottom = top;
    } else {
      arrivedState.top = top;
      arrivedState.bottom = bottom;
    }
    internalY.value = scrollTop;
  };
  const onScrollHandler = (e) => {
    if (!window2)
      return;
    const eventTarget = e.target === window2.document ? e.target.documentElement : e.target;
    setArrivedState(eventTarget);
    isScrolling.value = true;
    onScrollEndDebounced(e);
    onScroll(e);
  };
  useEventListener(
    element,
    "scroll",
    throttle ? useThrottleFn(onScrollHandler, throttle, true, false) : onScrollHandler,
    eventListenerOptions
  );
  useEventListener(
    element,
    "scrollend",
    onScrollEnd,
    eventListenerOptions
  );
  return {
    x,
    y,
    isScrolling,
    arrivedState,
    directions,
    measure() {
      const _element = toValue(element);
      if (window2 && _element)
        setArrivedState(_element);
    }
  };
}
var __defProp$8 = Object.defineProperty;
var __defProps$7 = Object.defineProperties;
var __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$8 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$9.call(b, prop))
      __defNormalProp$8(a, prop, b[prop]);
  if (__getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(b)) {
      if (__propIsEnum$9.call(b, prop))
        __defNormalProp$8(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$7 = (a, b) => __defProps$7(a, __getOwnPropDescs$7(b));
function useInfiniteScroll(element, onLoadMore, options = {}) {
  var _a;
  const {
    direction = "bottom",
    interval = 100
  } = options;
  const state = reactive(useScroll(
    element,
    __spreadProps$7(__spreadValues$8({}, options), {
      offset: __spreadValues$8({
        [direction]: (_a = options.distance) != null ? _a : 0
      }, options.offset)
    })
  ));
  const promise = ref();
  const isLoading = computed(() => !!promise.value);
  const observedElement = computed(() => {
    const el = toValue(element);
    if (el instanceof Window)
      return window.document.documentElement;
    if (el instanceof Document)
      return document.documentElement;
    return el;
  });
  const isElementVisible = useElementVisibility(observedElement);
  function checkAndLoad() {
    state.measure();
    if (!observedElement.value || !isElementVisible.value)
      return;
    const { scrollHeight, clientHeight, scrollWidth, clientWidth } = observedElement.value;
    const isNarrower = direction === "bottom" || direction === "top" ? scrollHeight <= clientHeight : scrollWidth <= clientWidth;
    if (state.arrivedState[direction] || isNarrower) {
      if (!promise.value) {
        promise.value = Promise.all([
          onLoadMore(state),
          new Promise((resolve) => setTimeout(resolve, interval))
        ]).finally(() => {
          promise.value = null;
          nextTick(() => checkAndLoad());
        });
      }
    }
  }
  watch(
    () => [state.arrivedState[direction], isElementVisible.value],
    checkAndLoad,
    { immediate: true }
  );
  return {
    isLoading
  };
}
({
  [directiveHooks.mounted](el, binding) {
    if (typeof binding.value === "function")
      useInfiniteScroll(el, binding.value);
    else
      useInfiniteScroll(el, ...binding.value);
  }
});
({
  [directiveHooks.mounted](el, binding) {
    if (typeof binding.value === "function")
      useIntersectionObserver(el, binding.value);
    else
      useIntersectionObserver(el, ...binding.value);
  }
});
var __defProp$3 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
({
  [directiveHooks.mounted](el, binding) {
    if (typeof binding.value === "function") {
      const handler = binding.value;
      const state = useScroll(el, {
        onScroll() {
          handler(state);
        },
        onStop() {
          handler(state);
        }
      });
    } else {
      const [handler, options] = binding.value;
      const state = useScroll(el, __spreadProps$2(__spreadValues$3({}, options), {
        onScroll(e) {
          var _a;
          (_a = options.onScroll) == null ? void 0 : _a.call(options, e);
          handler(state);
        },
        onStop(e) {
          var _a;
          (_a = options.onStop) == null ? void 0 : _a.call(options, e);
          handler(state);
        }
      }));
    }
  }
});
function checkOverflowScroll(ele) {
  const style = window.getComputedStyle(ele);
  if (style.overflowX === "scroll" || style.overflowY === "scroll" || style.overflowX === "auto" && ele.clientWidth < ele.scrollWidth || style.overflowY === "auto" && ele.clientHeight < ele.scrollHeight) {
    return true;
  } else {
    const parent = ele.parentNode;
    if (!parent || parent.tagName === "BODY")
      return false;
    return checkOverflowScroll(parent);
  }
}
function preventDefault(rawEvent) {
  const e = rawEvent || window.event;
  const _target = e.target;
  if (checkOverflowScroll(_target))
    return false;
  if (e.touches.length > 1)
    return true;
  if (e.preventDefault)
    e.preventDefault();
  return false;
}
function useScrollLock(element, initialState = false) {
  const isLocked = ref(initialState);
  let stopTouchMoveListener = null;
  let initialOverflow;
  watch(toRef(element), (el) => {
    if (el) {
      const ele = el;
      initialOverflow = ele.style.overflow;
      if (isLocked.value)
        ele.style.overflow = "hidden";
    }
  }, {
    immediate: true
  });
  const lock = () => {
    const ele = toValue(element);
    if (!ele || isLocked.value)
      return;
    if (isIOS) {
      stopTouchMoveListener = useEventListener(
        ele,
        "touchmove",
        (e) => {
          preventDefault(e);
        },
        { passive: false }
      );
    }
    ele.style.overflow = "hidden";
    isLocked.value = true;
  };
  const unlock = () => {
    const ele = toValue(element);
    if (!ele || !isLocked.value)
      return;
    isIOS && (stopTouchMoveListener == null ? void 0 : stopTouchMoveListener());
    ele.style.overflow = initialOverflow;
    isLocked.value = false;
  };
  tryOnScopeDispose(unlock);
  return computed({
    get() {
      return isLocked.value;
    },
    set(v) {
      if (v)
        lock();
      else
        unlock();
    }
  });
}
function onScrollLock() {
  let isMounted = false;
  const state = ref(false);
  return (el, binding) => {
    state.value = binding.value;
    if (isMounted)
      return;
    isMounted = true;
    const isLocked = useScrollLock(el, binding.value);
    watch(state, (v) => isLocked.value = v);
  };
}
onScrollLock();
const elementTheme = "";
dayjs_minExports.locale("zh-cn");
const appUiPlugin = {
  install: (app) => {
    app.use(installVentoseUI, {
      appUiPlugin,
      appState: stateApp
    });
    app.use({
      install: (app2, {
        watch: watch2
      } = {}) => {
        app2.directive("ElementSize", vElementSize);
        app2.component("Mkit", MarkdownIt);
        app2.component("RouterView", RouterView);
        app2.component("ErrMsg", ErrMsg);
        app2.component("CopyContent", CopyContent);
        app2.component("MonacoEditor", MonacoEditor);
        stateUI.setAssetsBaseById("favicon-icon");
        $("html").attr("lang", stateUI.language);
        watch2 && watch2();
      }
    });
    return app;
  }
};
const _$pickRandomProperty = (obj) => {
  let result;
  let count = 0;
  for (let prop in obj) {
    if (Math.random() < 1 / ++count) {
      result = prop;
    }
  }
  return result;
};
const _$randomValueAndProp = (obj) => {
  if (xU.isArray(obj) && obj.length > 0) {
    const start = 0;
    const end = obj.length;
    const key = Math.floor(Math.random() * end + start);
    return [obj[key], key];
  } else if (xU.isPlainObject(obj)) {
    const objArray = Object.keys(obj);
    const [prop] = _$randomValueAndProp(objArray);
    return [obj[prop], prop];
  } else {
    return ["", 0];
  }
};
const _$randomNum = (start = 0, end = 100) => {
  return Math.floor(Math.random() * end + start);
};
const _$handlePath = (path) => {
  path = xU.trim(path);
  if (!path) {
    return path;
  }
  if (path === "/") {
    return "";
  }
  path = path[0] !== "/" ? "/" + path : path;
  path = path[path.length - 1] === "/" ? path.substr(0, path.length - 1) : path;
  return path;
};
const _$timeAgo = function(timestamp) {
  let minutes, hours, days, mouth;
  let year;
  const timeNow = parseInt(String(new Date().getTime() / 1e3));
  let seconds = timeNow - timestamp;
  if (seconds > 86400 * 30 * 12) {
    year = parseInt(String(seconds / (86400 * 30 * 12)));
  } else {
    year = 0;
  }
  if (seconds > 86400 * 30) {
    mouth = parseInt(String(seconds / (86400 * 30)));
  } else {
    mouth = 0;
  }
  if (seconds > 86400) {
    days = parseInt(String(seconds / 86400));
  } else {
    days = 0;
  }
  if (seconds > 3600) {
    hours = parseInt(String(seconds / 3600));
  } else {
    hours = 0;
  }
  minutes = parseInt(String(seconds / 60));
  if (year > 0) {
    return year + "\u5E74\u524D";
  } else if (mouth > 0 && year <= 0) {
    return mouth + "\u6708\u524D";
  } else if (days > 0 && mouth <= 0) {
    return days + "\u5929\u524D";
  } else if (days <= 0 && hours > 0) {
    return hours + "\u5C0F\u65F6\u524D";
  } else if (hours <= 0 && minutes > 0) {
    return minutes + "\u5206\u949F\u524D";
  } else if (minutes <= 0 && seconds > 0) {
    if (seconds < 30) {
      return "\u521A\u521A";
    } else {
      return seconds + "\u79D2\u524D";
    }
  } else {
    return "\u521A\u521A";
  }
};
const _$arrayChangeIndex = (arr, dragId, dropId) => {
  arr = JSON.parse(JSON.stringify(arr));
  const findBy = {
    _id: dragId
  };
  const dragItem = xU.find(arr, findBy);
  const dragIndex = xU.findIndex(arr, findBy);
  const dropIndex = xU.findIndex(arr, {
    _id: dropId
  });
  if (dragIndex > -1 && dropIndex > -1) {
    arr[dragIndex] = null;
    arr.splice(dropIndex, 0, dragItem);
    let index = 0;
    return xU.reduce(arr, (_arr, item) => {
      if (item) {
        _arr.push({
          id: item._id,
          index: index++
        });
      }
      return _arr;
    }, []);
  } else {
    return [];
  }
};
const getTreeOrder = (treeData, orderArray = []) => {
  treeData = xU.cloneDeep(treeData);
  let item;
  while (item = treeData.shift()) {
    orderArray.push(item._id);
    if (xU.isArrayFill(item.children)) {
      treeData.unshift(...item.children);
    }
  }
  return orderArray;
};
function sortTreeByOrder(treeData, orderArray = []) {
  treeData = xU.cloneDeep(treeData);
  treeData.sort((nowItem, nextItem) => {
    const nowIndex = orderArray.indexOf(nowItem._id);
    const nextIndex = orderArray.indexOf(nextItem._id);
    return nowIndex - nextIndex;
  });
  return xU.map(treeData, (item) => {
    if (xU.isArrayFill(item.children)) {
      item.children = sortTreeByOrder(item.children, orderArray);
    }
    return item;
  });
}
const getAvatarSrcByid = (user_id) => `${stateApp.BASE_URL}/api/user/avatar?uid=${user_id}`;
const common = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appUiPlugin,
  _$pickRandomProperty,
  _$randomValueAndProp,
  _$randomNum,
  _$handlePath,
  _$timeAgo,
  _$arrayChangeIndex,
  getTreeOrder,
  sortTreeByOrder,
  getAvatarSrcByid
}, Symbol.toStringTag, { value: "Module" }));
export {
  ErrMsg as E,
  MonacoEditor as M,
  PreprocessHTML as P,
  _$handlePath as _,
  _$randomValueAndProp as a,
  MkitTheme as b,
  getAvatarSrcByid as c,
  _$timeAgo as d,
  _$arrayChangeIndex as e,
  common as f,
  getTreeOrder as g,
  sortTreeByOrder as s
};
