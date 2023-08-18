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
		_modelValue: {
			get() {
				return this.properties.value;
			},
			set(val) {
				this.listeners["onEmitItemValue"](val);
			}
		},
		selectOptionsVNode() {
			return xU.map(this.optionArray, ({ username, uid }) => {
				return (
					<ElOption key={uid} value={uid} label={username}>
						{username}
					</ElOption>
				);
			});
		}
	},
	render() {
		return (
			<ElSelect
				multiple
				filterable
				remote
				remote-show-suffix
				v-model={this._modelValue}
				remoteMethod={this.onSearch}
				style={{ width: "100%" }}
				placeholder="请输入用户名">
				{this.selectOptionsVNode}
			</ElSelect>
		);
	}
});
