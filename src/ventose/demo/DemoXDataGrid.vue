<template>
	<DemoAndCode
		title="xVirTable：虚拟列表用于无分页的大量数据展示"
		path="/boundless/demo/table/DemoXDataGridxVirTable.sfc" />
	<DemoAndCode
		title="xVirTable动态添加行记录"
		path="/boundless/demo/table/DemoXDataGridxVirTableDynamicAdd.sfc" />
	<mkit md="### xDataGrid" />
	<xDataGrid :configs="configs_table" />
	<mkit md="### xPagination" />
	<xPagination
		class="table-pagination"
		:pagination="configs_table.pagination"
		:onQuery="handlePaginationChange" />
</template>

<script lang="tsx">
import { defCol, defDataGrid, xU, xI } from "@ventose/ui";
import { ITEM_OPTIONS } from "@/common/options";

export default {
	name: "DemoXDataGrid",
	methods: {
		handlePaginationChange(pagination) {
			xU("🚀:", "pagination", JSON.stringify(pagination, null, 2));
		}
	},
	data() {
		return {
			configs_table: defDataGrid({
				async queryTableList(params) {},
				dataSource: [],
				columns: {
					...defCol({ prop: "name", label: xI("名称") }),
					...defCol({
						prop: "status",
						label: xI("状态"),
						renderCell({ record }) {
							return `${xU.valueToLabel(record.status, ITEM_OPTIONS.status)}`;
						}
					}),
					...defCol({
						prop: "capacity",
						label: xI("总容量"),
						renderCell({ record }) {
							const { totalCapacity, usedCapacity, status } = record;
							/*开通中*/
							if (status === "ACTIVATION") {
								return "--";
							}
							return `${usedCapacity || "--"} / ${totalCapacity || "--"} GB`;
						}
					}),
					...defCol({
						prop: "category",
						label: xI("类别"),
						renderCell({ record }) {
							if (record.tenant) {
								return xI("租户");
							}
							if (record.level) {
								return xI("级VDC", { level: record.level || "1" });
							}
							return "--";
						}
					}),
					...defCol({
						prop: "upperName",
						isShow: false,
						label: xI("上级名称")
					}),
					...defCol({
						prop: "startDate",
						label: xI("开始时间"),
						renderCell({ record }) {
							return xU.dateFormat(record.startDate);
						}
					}),
					...defCol({
						prop: "endDate",
						label: xI("到期时间"),
						renderCell({ record }) {
							return xU.dateFormat(record.endDate);
						}
					})
				}
			})
		};
	}
};
</script>
