import { defineComponent } from "vue";
import { API } from "@/api";
import { xU } from "@ventose/ui";

/**
 * 用户名输入框自动完成组件
 *
 * @component UsernameAutoComplete
 * @examplelanguage js
 *
 * * 用户名输入框自动完成组件
 * * 用户名输入框自动完成组件
 *
 *s
 */

/**
 * 获取自动输入的用户信息
 *
 * 获取子组件state
 * @property callbackState
 * @type function
 * @description 类型提示：支持数组传值；也支持用函数格式化字符串：函数有两个参数(scale, index)；
 * 受控属性：滑块滑到某一刻度时所展示的刻度文本信息。如果不需要标签，请将该属性设置为 [] 空列表来覆盖默认转换函数。
 * @returns {object} {uid: xxx, username: xxx}
 * @examplelanguage js
 * @example
 * onUserSelect(childState) {
 *   this.setState({
 *     uid: childState.uid,
 *     username: childState.username
 *   })
 * }
 *
 */

export default defineComponent({
	props: ["callbackState"],
	methods: {
		doSearch: xU.debounce(function (params) {
			API.user
				.searchUser(params)
				.then(({ data }) => {
					let userList = [];
					if (xU.isArrayFill(data)) {
						// 取回搜索值后，设置 dataSource
						userList = xU.map(data, v => {
							return {
								username: v.username,
								id: v.uid
							};
						});
					}
					this.state.dataSource = userList;
				})
				.finally(() => {
					this.state.fetching = false;
				});
		}, 600),
		// 搜索回调
		onSearch(value) {
			if (!value) return;
			const params = { q: value };
			this.state.fetching = true;
			this.doSearch(params);
		},
		// 选中候选词时
		handleChange(value) {
			this.state.dataSource = [];
			// value,
			this.state.fetching = false;
			this.callbackState(value);
		}
	},
	computed: {
		children() {
			return xU.map(this.state.dataSource, (item, index) => (
				<ElOption key={item.id} value={"" + item.id} data-index={index}>
					{item.username}
				</ElOption>
			));
		}
	},
	render() {
		let { fetching } = this.state;
		return (
			<ElSelect
				multiple
				filterable
				remote
				remote-show-suffix
				onChange={this.handleChange}
				remoteMethod={this.onSearch}
				style={{ width: "100%" }}
				placeholder="请输入用户名">
				{this.children}
			</ElSelect>
		);
	}
});
