import { defineComponent } from "vue";
import { xU } from "@ventose/ui";
import { API } from "@/api";

/**
 * 对 UsernameAutoComplete的xItem封装
 * @param {*} param0
 * @returns
 */
export const ItemUAC = defineComponent({
	props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
	data() {
		return {
			state: {
				dataSource: [],
				fetching: false
			}
		};
	},
	methods: {
		doSearch: xU.debounce(function (params) {
			debugger;
			API.user
				.searchUser(params)
				.then(({ data }) => {
					debugger;
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
		}
	},
	render() {
		return (
			<ElSelect
				multiple
				filterable
				remote
				remote-show-suffix
				v-model={this.value}
				remoteMethod={this.onSearch}
				style={{ width: "100%" }}
				placeholder="请输入用户名">
				{this.children}
			</ElSelect>
		);
	}
});
