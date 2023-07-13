//@ts-nocheck
import { defineComponent } from "vue";
import { xU } from "../ventoseUtils";
import { setPagination } from "./common";
import { State_UI } from "../State_UI";

const PAGE_SIZE_OPTIONS = ["10", "20", "30"];

export const xPagination = defineComponent({
	name: "xPagination",
	setup() {
		return { State_UI };
	},
	props: {
		onPaginationChange: {
			type: Function,
			default: false
		},
		pagination: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		/* pagination 对象上page,size,total对应的prop字符，可在appConfigs中自定义 */
		const { page, size, total } = State_UI.pagination;
		return {
			pageSizeOptions: PAGE_SIZE_OPTIONS,
			page,
			size,
			total
		};
	},
	methods: {
		onShowSizeChange: xU.debounce(function ({ page, size }) {
			setPagination(this, { page, size });
			if (this.onPaginationChange) {
				this.onPaginationChange(this.pagination);
			}
		}, 30)
	},
	computed: {},
	render() {
		const { page, size, total } = State_UI.pagination;
		xU(page, size, total);
		if (!this.pagination[total]) {
			return null;
		}
		return (
			<ElPagination
				background
				v-model:current-page={this.pagination[page]}
				layout="prev, pager, next,sizes,total"
				total={this.pagination[total]}
				pageSizes={this.pageSizeOptions}
				pageSize={this.pagination[size]}
				show-size-changer
				onSizeChange={size => this.onShowSizeChange({ size })}
				onCurrentChange={page => this.onShowSizeChange({ page })}
			/>
		);
	}
});
