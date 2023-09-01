import { xI } from "@/ventose/ui";
import { ref } from "vue";

export function useColHeader({
	controller,
	onFilter,
	onReset,
	prop,
	title,
	style,
	width
}: {
	controller: any;
	onFilter: Function;
	onReset: Function;
	prop: string;
	title: any;
	style: object;
	width?: number;
}) {
	width = width || 300;
	const popoverRef = ref(null);
	return {
		vDom: (
			<el-popover ref={popoverRef} trigger="click" width={width}>
				{{
					default() {
						return (
							<div style="max-height:500px;padding:14px;" class="flex vertical">
								<div class="flex1 el-card" style="overflow:auto;padding:14px;">
									{controller}
								</div>
								<div class="flex middle end" style="padding-top:12px">
									<xButton
										onClick={() =>
											onFilter({
												ref: popoverRef,
												prop: prop
											})
										}>
										{xI("确认")}
									</xButton>
									<xButton
										onClick={() =>
											onReset({
												ref: popoverRef,
												prop: prop
											})
										}>
										{xI("重置")}
									</xButton>
								</div>
							</div>
						);
					},
					reference: () => (
						<div class="flex middle center width100" style={style}>
							<span class="mr4">{title}</span>
							<xIcon icon="icon_filter" />
						</div>
					)
				}}
			</el-popover>
		)
	};
}
