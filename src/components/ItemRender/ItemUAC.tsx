import { defineComponent } from "vue";
import { defineComponentProps, usePrivateItemValue, xU } from "@/ventose/ui";
import { API } from "@/api";
import { itemBaseProps } from "@/ventose/ui/xForm/common";

/**
 * 对 UsernameAutoComplete的xItem封装
 * @param {*} param0
 * @returns
 */
export const ItemUAC = defineComponent({
	props: defineComponentProps(itemBaseProps),
	setup(props) {
		return {
			_itemValue: usePrivateItemValue(props)
		};
	},
	data() {
		this.doSearch = xU.debounce(async params => {
			try {
				const { data } = await API.user.searchUser(params);
				this.optionArray = data;
			} catch (error) {
				console.error(error);
			} finally {
				this.isFetching = false;
			}
		}, 600);
		return {
			optionArray: [],
			isFetching: false
		};
	},
	mounted() {
		this.doSearch();
	},
	methods: {
		// 搜索回调
		onSearch(value) {
			const params = { q: value };
			this.isFetching = true;
			this.doSearch(params);
		}
	},
	computed: {
		selectOptionsVNode() {
			return xU.map(this.optionArray, ({ username, uid }) => {
				return (
					<elOption key={uid} value={uid} label={username}>
						{username}
					</elOption>
				);
			});
		}
	},
	render() {
		return (
			<elSelect
				multiple
				filterable
				remote
				remote-show-suffix
				v-model={this._itemValue}
				remoteMethod={this.onSearch}
				style={{ width: "100%" }}
				placeholder="请输入用户名">
				{this.selectOptionsVNode}
			</elSelect>
		);
	}
});
