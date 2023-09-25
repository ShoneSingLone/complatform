import "./xInfoCard.less";
import { debounce, isFunction, map } from "lodash";
import { computed, defineComponent, watch } from "vue";
import { xScope } from "@/ventose/ui";

const DISPLAY_NONE = "...";

/**
 * ["title:3", "...", ""],
 * 根据第一行来计算col列数，计算每一个cell的宽度
 * 如果是... cell会显示空白
 * 如果是"" cell不会显示
 */
export const xInfoCardItem = defineComponent({
	name: "xInfoCardItem",
	props: ["item", "unitWidth", "span"],
	setup(props) {
		var labelStyle = computed(() => {
			if (cpt_label.value === DISPLAY_NONE) {
				return {
					opacity: 0
				};
			}
			return {};
		});
		var contentStyle = computed(() => {
			if (cpt_content.value === DISPLAY_NONE) {
				return {
					opacity: 0
				};
			}
			return {};
		});
		var cpt_span = computed(() => {
			return props.item.span || 1;
		});
		var cpt_label = computed(() => {
			if (isFunction(props.item.label)) {
				return props.item.label();
			}
			if (props.item.label) {
				return props.item.label;
			}
			return "";
		});
		var cpt_content = computed(() => {
			if (isFunction(props.item.content)) {
				return props.item.content();
			}
			return props.item.content || DISPLAY_NONE;
		});

		return function () {
			// console.log("props.item", props.item);
			if (!props.item.label) {
				return null;
			}
			return (
				<div
					data-role="cell"
					data-span={cpt_span.value}
					class="el-descriptions-row flex middle cell xInfoCardItem">
					<div class="el-descriptions-item__label is-bordered-label">
						<span style={labelStyle.value}>{cpt_label.value}</span>
					</div>
					<div class="el-descriptions-item__content flex1">
						<span style={contentStyle.value}>{cpt_content.value}</span>
					</div>
				</div>
			);
		};
	}
});

export const xInfoCard = defineComponent({
	name: "xInfoCard",
	props: ["configs"],
	setup(props, { slots, attrs }) {
		var vm = {
			rect: {},
			unitWidth: 0,
			_item(propString) {
				let [prop, span] = String(propString).split(":");
				const item = cpt_items.value[prop] || { label: prop };
				const _span = Number(span) || 1;
				const _item = {
					...item,
					span: _span
				};
				return _item;
			},
			_handleSizeChange: rect => {
				vm.rect = rect;
				const { width } = rect;
				const unitWidth = Math.ceil(width / cpt_col.value) - 1;

				if (vm.unitWidth !== unitWidth) {
					vm.unitWidth = unitWidth;
				}
			}
		};
		type t_vm = typeof vm;
		vm = xScope<t_vm>(vm);

		var cpt_vDomItems = computed(() => {
			if (slots?.default) {
				return slots?.default();
			}

			return map(cpt_layout.value, (layoutRow, index) => {
				// console.log(layoutRow);
				return (
					<div
						class="el-descriptions__body el-descriptions__table is-bordered el-descriptions--small"
						style={cpt_cellStyle.value}
						key={index}>
						{map(layoutRow, prop => {
							return (
								<xInfoCardItem
									key="prop + index"
									item={vm._item(prop)}
									unitWidth={vm.unitWidth}
								/>
							);
						})}
					</div>
				);
			});
		});
		var cpt_cellStyle = computed(() => {
			return {
				// "--columns-count": `repeat(${cpt_col.value}, 1fr)`,
				"--cell-label-width": `${cpt_labelWidth.value}px`,
				"--cell-width-1": `${vm.unitWidth}px`,
				"--cell-width-2": `${vm.unitWidth * 2}px`,
				"--cell-width-3": `${vm.unitWidth * 3}px`,
				"--cell-width-4": `${vm.unitWidth * 4}px`
			};
		});
		var cpt_labelWidth = computed(() => {
			if (props.configs.labelWidth) {
				return props.configs.labelWidth;
			}
			return 140;
		});
		var cpt_items = computed(() => {
			if (props.configs.items) {
				return props.configs.items;
			}
			return {};
		});
		var cpt_layout = computed(() => {
			if (props.configs?.layout) {
				return props.configs.layout({ rect: vm.rect });
			}
			return [];
		});
		var cpt_col = computed(() => {
			return cpt_layout.value?.[0]?.length;
		});
		var cpt_title = computed(() => {
			if (attrs?.title) {
				return attrs.title;
			} else {
				return props.configs.title;
			}
		});
		var cpt_extra = computed(() => {
			return props?.configs?.extra;
		});

		return function () {
			return (
				<div
					class="xInfoCard el-descriptions"
					v-element-size={vm._handleSizeChange}>
					<div class="el-descriptions__header">
						<div class="el-descriptions__title">{cpt_title.value}</div>
						<div class="el-descriptions__extra">{cpt_extra.value}</div>
					</div>
					{cpt_vDomItems.value}
				</div>
			);
		};
	}
});
