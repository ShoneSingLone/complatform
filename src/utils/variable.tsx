export const ALL = "ALL";
import { State_UI } from "@ventose/ui";
export const DefaultInterfaceMenu = [
	{
		_id: ALL,
		title: State_UI.$t("全部接口").label,
		menuType: ALL,
		list: []
	}
];

// 默认每页展示10条数据
export const PAGE_LIMIT = 10;
// 限制名称的字符长度(中文算两个长度)
export const NAME_LIMIT = 100;
export const HTTP_METHOD = {
	GET: { color: "green", default_tab: "query" },
	HEAD: { color: "purple", default_tab: "query" },
	OPTIONS: { color: "default", default_tab: "query" },
	POST: { color: "pink", request_body: true, default_tab: "body" },
	PUT: { color: "orange", request_body: true, default_tab: "body" },
	DELETE: { color: "red", request_body: true, default_tab: "body" },
	PATCH: { color: "blue", request_body: true, default_tab: "body" }
};

export const STATIC_WORD = {
	ACCESS_TOKEN: "token",
	NEW_TAB: "newTab",
	M: "M",
	GB: "GB"
};

export const TEXT = {
	success(text) {
		return `${text}成功！`;
	}
};

export const LOG_TYPE = {
	project: "项目",
	group: "分组",
	interface: "接口",
	interface_col: "接口集",
	user: "用户",
	other: "其他"
};

export const PROJECT_COLOR = {
	notice: "#faad14",
	blue: "#2395f1",
	green: "#00a854",
	yellow: "#ffbf00",
	red: "#f56a00",
	pink: "#f5317f",
	cyan: "#00a2ae",
	gray: "#bfbfbf",
	purple: "#7265e6"
};
export const PROJECT_ICON = [
	"code-o",
	"swap",
	"clock-circle-o",
	"unlock",
	"calendar",
	"play-circle-o",
	"file-text",
	"desktop",
	"hdd",
	"appstore-o",
	"line-chart",
	"mail",
	"mobile",
	"notification",
	"picture",
	"poweroff",
	"search",
	"setting",
	"share-alt",
	"shopping-cart",
	"tag-o",
	"video-camera",
	"cloud-o",
	"star-o",
	"environment-o",
	"camera-o",
	"team",
	"customer-service",
	"pay-circle-o",
	"rocket",
	"database",
	"tool",
	"wifi",
	"idcard",
	"medicine-box",
	"coffee",
	"safety",
	"global",
	"api",
	"fork",
	"android-o",
	"apple-o"
];
export const HTTP_REQUEST_HEADER = [
	"Accept",
	"Accept-Charset",
	"Accept-Encoding",
	"Accept-Language",
	"Accept-Datetime",
	"Authorization",
	"Cache-Control",
	"Connection",
	"Cookie",
	"Content-Disposition",
	"Content-Length",
	"Content-MD5",
	"Content-Type",
	"Date",
	"Expect",
	"From",
	"Host",
	"If-Match",
	"If-Modified-Since",
	"If-None-Match",
	"If-Range",
	"If-Unmodified-Since",
	"Max-Forwards",
	"Origin",
	"Pragma",
	"Proxy-Authorization",
	"Range",
	"Referer",
	"TE",
	"User-Agent",
	"Upgrade",
	"Via",
	"Warning",
	"X-Requested-With",
	"DNT",
	"X-Forwarded-For",
	"X-Forwarded-Host",
	"X-Forwarded-Proto",
	"Front-End-Https",
	"X-Http-Method-Override",
	"X-ATT-DeviceId",
	"X-Wap-Profile",
	"Proxy-Connection",
	"X-UIDH",
	"X-Csrf-Token"
];
export const METHOD_COLOR = {
	post: { bac: "#d2eafb", color: "#108ee9" },
	get: { bac: "#cfefdf", color: "#00a854" },
	put: { bac: "#fff3cf", color: "#ffbf00" },
	delete: { bac: "#fcdbd9", color: "#f04134" },
	head: { bac: "#fff3cf", color: "#ffbf00" },
	patch: { bac: "#fff3cf", color: "#ffbf00" },
	options: { bac: "#fff3cf", color: "#ffbf00" }
};
export const MOCK_SOURCE = [
	{ name: "字符串", mock: "@string" },
	{ name: "自然数", mock: "@natural" },
	{ name: "浮点数", mock: "@float" },
	{ name: "字符", mock: "@character" },
	{ name: "布尔", mock: "@boolean" },
	{ name: "url", mock: "@url" },
	{ name: "域名", mock: "@domain" },
	{ name: "ip地址", mock: "@ip" },
	{ name: "id", mock: "@id" },
	{ name: "guid", mock: "@guid" },
	{ name: "当前时间", mock: "@now" },
	{ name: "时间戳", mock: "@timestamp" },
	{ name: "日期", mock: "@date" },
	{ name: "时间", mock: "@time" },
	{ name: "日期时间", mock: "@datetime" },
	{ name: "图片连接", mock: "@image" },
	{ name: "图片data", mock: "@imageData" },
	{ name: "颜色", mock: "@color" },
	{ name: "颜色hex", mock: "@hex" },
	{ name: "颜色rgba", mock: "@rgba" },
	{ name: "颜色rgb", mock: "@rgb" },
	{ name: "颜色hsl", mock: "@hsl" },
	{ name: "整数", mock: "@integer" },
	{ name: "email", mock: "@email" },
	{ name: "大段文本", mock: "@paragraph" },
	{ name: "句子", mock: "@sentence" },
	{ name: "单词", mock: "@word" },
	{ name: "大段中文文本", mock: "@cparagraph" },
	{ name: "中文标题", mock: "@ctitle" },
	{ name: "标题", mock: "@title" },
	{ name: "姓名", mock: "@name" },
	{ name: "中文姓名", mock: "@cname" },
	{ name: "中文姓", mock: "@cfirst" },
	{ name: "中文名", mock: "@clast" },
	{ name: "英文姓", mock: "@first" },
	{ name: "英文名", mock: "@last" },
	{ name: "中文句子", mock: "@csentence" },
	{ name: "中文词组", mock: "@cword" },
	{ name: "地址", mock: "@region" },
	{ name: "省份", mock: "@province" },
	{ name: "城市", mock: "@city" },
	{ name: "地区", mock: "@county" },
	{ name: "转换为大写", mock: "@upper" },
	{ name: "转换为小写", mock: "@lower" },
	{ name: "挑选（枚举）", mock: "@pick" },
	{ name: "打乱数组", mock: "@shuffle" },
	{ name: "协议", mock: "@protocol" }
];
export const IP_REGEXP =
	/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
export const docHref = {
	adv_mock_case: "https://hellosean1025.github.io/yapi/documents/mock.html",
	adv_mock_script:
		"https://hellosean1025.github.io/yapi/documents/adv_mock.html"
};
