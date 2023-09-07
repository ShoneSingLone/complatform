<script lang="tsx">
import { defineComponent, computed } from "vue";
import _ from "lodash";

export default defineComponent({
	name: "xContainer",
	props: ["col"],
	setup(props, { slots }) {
		const cpt_col = computed(() => {
			return Number(props.col || 2);
		});

		// const {render} = Vue.compile(`<form :style="styleSSSS"> </form>`);debugger;
		return function () {
			const slots = this.$slots.default();
			return <from class="xContainer" ref="xContainer" style={{
				"--xContainer-col": ` repeat(${cpt_col.value}, 1fr)`
			}}>
				{_.map(slots, slotVNode => {
					if (slotVNode.ctx) {
						const span = (() => {
							console.log("slotVNode.props?.span", slotVNode.props?.span)
							if (slotVNode.props?.span === "full") {
								return cpt_col.value;
							}
							return Number(slotVNode.props?.span || 1);
						})();
						const className = `xContainerItem grid-column${span}`
						return <div class={className}>{slotVNode}</div>
					}
					return slotVNode;
				})}
			</from>;
		};
	}
});
</script>

<style lang="less">
.xContainer {
	//outline: 1px solid red;
	width: 100%;
	display: grid;
	grid-template-columns: var(--xContainer-col);

	.xContainerItem {
		padding: var(--app-padding);

		display: flex;
		align-items: center;

		>div {
			width: 100%;
		}

		&+.xContainerItem {
			//margin-top: var(--ui-padding);
		}
	}

	@listFlex: 1, 2, 3, 4, 5, 6, 7, 8;

	each(@listFlex, {
		.grid-column@{value} {
			grid-column: span @value;
		}
	});
}
</style>
