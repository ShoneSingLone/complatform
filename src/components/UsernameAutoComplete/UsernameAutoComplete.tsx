import { defineComponent } from "vue";
import { API } from "ysrc/api";
import { _ } from "@ventose/ui";

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
	data() {
		return {
			state: {
				dataSource: [],
				fetching: false
			}
		};
	},
	methods: {
		doSearch: _.debounce(function (params) {
			API.user
				.searchUser(params)
				.then(({ data }) => {
					let userList = [];
					if (_.isArrayFill(data)) {
						// 取回搜索值后，设置 dataSource
						userList = _.map(data, v => {
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
			return _.map(this.state.dataSource, (item, index) => (
				<aSelectOption key={index} value={"" + item.id}>
					{item.username}
				</aSelectOption>
			));
		}
	},
	render() {
		let { fetching } = this.state;
		return (
			<aSelect
				mode="multiple"
				style={{ width: "100%" }}
				placeholder="请输入用户名"
				filterOption={false}
				optionLabelProp="children"
				notFoundContent={
					fetching ? (
						<>
							<aSpin />
							<span style="color:gray;margin-left:4px;"> 正在获取用户列表</span>
						</>
					) : null
				}
				onSearch={this.onSearch}
				onChange={this.handleChange}>
				{this.children}
			</aSelect>
		);
	}
});
