import { map } from "lodash";
import { computed, defineComponent } from "vue";

export const xTable = defineComponent({
	name: "xTable",
	props: ["columns", "rows"],
	setup(props) {
		const cpt_columns = computed(() => {
			return map(props.columns, column => column);
		});

		return function () {
			return (
				<el-auto-resizer
					v-slots={{
						default: ({ height, width }) => {
							return (
								<el-table-v2
									columns={cpt_columns.value}
									data={props.rows}
									width={width}
									height={height}
									fixed
								/>
							);
						}
					}}
				/>
			);
		};
	}
});
