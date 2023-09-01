import { ElTable } from "element-plus";
import { computed, defineComponent, onMounted } from "vue";
import { xU } from "../ventoseUtils";
import { filterColIsShow, t_dataGridOptions } from "./common";
import { xPagination } from "./xPagination";
import { Cpt_UI_locale } from "../stateUI";
import { xScope } from "..";

export default defineComponent({
	name: "XDataGrid",
	components: { xPagination },
	props: ["configs"],
	setup(props) {
		var configs: t_dataGridOptions = configs;

		var vm = { id: xU.genId("xDataGrid") };
		type t_vm = typeof vm;
		vm = xScope<t_vm>(vm);

		/*列*/
		const Cpt_Columns = computed(() => {
			/*如果分组，默认的filter无效，需要自己实现*/
			if (configs.isGroupingColumns) {
				return configs.columns;
			}
			let columns = null;
			columns = xU.map(Cpt_ColumnsOrder.value, prop =>
				xU.find(configs.columns, { prop })
			);
			columns = xU.filter(columns, i => filterColIsShow(i?.isShow, i?.prop));
			return columns;
		});

		/*列顺序 TODO:如果有排序的需求 */
		const Cpt_ColumnsOrder = computed(() => {
			const order = (() => {
				if (configs.columnsOrder) {
					return configs.columnsOrder;
				} else {
					return xU.map(configs.columns, i => i.prop);
				}
			})();
			return xU.filter(order, i => !!i);
		});

		const Cpt_VNodePagination = computed(() => {
			if (configs.isHidePagination) {
				return null;
			}
			return (
				<xPagination
					class="table-pagination"
					pagination={configs.pagination}
					onQuery={configs.onQuery}
				/>
			);
		});

		onMounted(() => {
			if (configs.onMounted) {
				configs.onMounted({ id: vm.id });
			}
		});

		return function () {
			return (
				<>
					<el-auto-resizer
						v-slots={{
							default: ({ height, width }) => {
								return (
									<el-table-v2
										columns={Cpt_Columns.value}
										data={configs.dataSource}
										width={width}
										height={height}
										fixed
									/>
								);
							}
						}}
					/>
					{Cpt_VNodePagination.value}
				</>
			);
		};
	},
	watch: {
		"configs.pagination": {
			deep: true,
			handler(pagination) {
				xU(JSON.stringify(pagination));
			}
		}
	},
	methods: {
		async handlePaginationChange(pagination) {
			if (this?.configs?.onQuery) {
				configs.isLoading = true;
				await configs.onQuery(pagination);
				configs.isLoading = false;
			}
		}
	}
});
