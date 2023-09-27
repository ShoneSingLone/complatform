import { computed, defineComponent, onBeforeUnmount, onMounted } from "vue";
import { xU } from "../ventoseUtils";
import { filterColIsShow, t_dataGridOptions } from "./common";
import { xPagination } from "./xPagination";
import { Cpt_UI_locale } from "../stateUI";
import { xScope } from "..";
import $ from "jquery";

let curr = {
	id: 0,
	x: 0,
	grow: 0
};

const vmCollection = {};

const sResizer = id => `.xDataGrid[data-table-resizer-id=${id}]`;
const sMask = id => `.xDataGrid_mask[data-table-mask=${id}]`;
const sLine = id =>
	`.xDataGrid_mask[data-table-mask=${id}] .xDataGrid_mask-line`;

$("body").on(
	"mousedown.colResize",
	".el-table-v2__header-cell",
	function (event) {
		const { offsetX, offsetY, pageX, pageY, target, clientX, screenX } = event;
		const $cell = $(this);
		if ($cell.width() - offsetX < 3) {
			curr.id = $(target)
				.parents(".el-auto-resizer")
				.attr("data-table-resizer-id");
			$(sMask(curr.id)).addClass("active");
			const { left } = $(sResizer(curr.id)).offset();
			$(sLine(curr.id)).css("left", `${clientX - left}px`);
			const prop = $cell.attr("data-key");
			curr = {
				prop,
				id: curr.id,
				x: pageX
			};
		}
	}
);
$("body").on("mousemove.colResize", ".xDataGrid_mask.active", function (event) {
	const { offsetX, offsetY, pageX, pageY, target } = event;
	const $target = $(target);
	$target.find(".xDataGrid_mask-line").css("left", `${offsetX}px`);
	curr.grow = pageX - curr.x;
});

$("body").on("mouseup.colResize", () => {
	$(`.xDataGrid_mask`).removeClass("active");
	const setPropWidth = vmCollection[curr.id];
	if (setPropWidth) {
		setPropWidth(curr);
	}
	curr = {};
});

export default defineComponent({
	name: "XDataGrid",
	components: { xPagination },
	props: ["configs"],
	setup(props) {
		var configs: t_dataGridOptions = props.configs;

		var vm = { id: xU.genId("xDataGrid") };
		type t_vm = typeof vm;
		vm = xScope<t_vm>(vm);

		/*列*/
		const cpt_columns = computed(() => {
			let columns = [];
			xU.each(configs.columns, i => {
				if (filterColIsShow(i?.isShow, i?.prop)) {
					let _columns = {
						key: i.key || i.prop,
						dataKey: i.prop,
						title: i.label,
						...i
					};
					columns.push(_columns);
				}
			});

			/*列顺序 TODO:如果有排序的需求 */
			if (configs.columnsOrder) {
				columns = xU.map(configs.columnsOrder, prop =>
					xU.find(columns, { prop })
				);
			}

			return columns;
		});

		const Cpt_VNodePagination = computed(() => {
			if (configs?.isHidePagination) {
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
			vmCollection[vm.id] = function setPropWidth({ prop, grow }) {
				if (["checkbox"].includes(prop)) {
					return;
				}
				const item = xU.find(props?.configs?.columns, { prop });
				if (item) {
					const width = item.width + grow;
					if (width) {
						item.width = width;
					}
				}
			};

			if (configs.onMounted) {
				configs.onMounted({ id: vm.id });
			}
		});

		onBeforeUnmount(() => {
			delete vmCollection[vm.id];
		});

		return function () {
			return (
				<>
					<el-auto-resizer
						class="xDataGrid"
						data-table-resizer-id={vm.id}
						v-slots={{
							default: ({ height, width }) => {
								return (
									<>
										<el-table-v2
											class="xDataGrid_table"
											data-table={vm.id}
											columns={cpt_columns.value}
											data={configs.dataSource}
											width={width}
											height={height}
											fixed
										/>
										<div class="xDataGrid_mask" data-table-mask={vm.id}>
											<div class="xDataGrid_mask-line" />
										</div>
									</>
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
