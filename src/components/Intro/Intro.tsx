import React from "react";
import "./Intro.scss";
import { OverPack } from "rc-scroll-anim";
import TweenOne from "rc-tween-one";
import QueueAnim from "rc-queue-anim";

const IntroPart = props => (
	<li class="switch-content">
		<div class="icon-switch">
			<xIcon icon={props.iconType} />
		</div>
		<div class="text-switch">
			<p>
				<b>{props.title}</b>
			</p>
			<p>{props.des}</p>
		</div>
	</li>
);

IntroPart.propTypes = {
	title: PropTypes.string,
	des: PropTypes.string,
	iconType: PropTypes.string
};

class Intro extends React.PureComponent {
	constructor(props) {
		super(props);
	}
	static propTypes = {
		intro: PropTypes.shape({
			title: PropTypes.string,
			des: PropTypes.string,
			img: PropTypes.string,
			detail: PropTypes.arrayOf(
				PropTypes.shape({
					title: PropTypes.string,
					des: PropTypes.string
				})
			)
		}),
		className: PropTypes.string
	};
	render() {
		const { intro } = this.props;
		const id = "motion";
		const animType = {
			queue: "right",
			one: { x: "-=30", opacity: 0, type: "from" }
		};
		return (
			<div class="intro-container">
				<OverPack playScale="0.3">
					<TweenOne
						animation={animType.one}
						key={`${id}-img`}
						resetStyleBool
						id={`${id}-imgWrapper`}
						class="imgWrapper">
						<div class="img-container" id={`${id}-img-container`}>
							<img src={intro.img} />
						</div>
					</TweenOne>

					<QueueAnim
						type={animType.queue}
						key={`${id}-text`}
						leaveReverse
						ease={["easeOutCubic", "easeInCubic"]}
						id={`${id}-textWrapper`}
						class={`${id}-text des-container textWrapper`}>
						<div key={`${id}-des-content`}>
							<div class="des-title">{intro.title}</div>
							<div class="des-detail">{intro.des}</div>
						</div>
						<ul class="des-switch" key={`${id}-des-switch`}>
							{intro.detail.map(function (item, i) {
								return (
									<IntroPart
										key={i}
										title={item.title}
										des={item.des}
										iconType={item.iconType}
									/>
								);
							})}
						</ul>
					</QueueAnim>
				</OverPack>
			</div>
		);
	}
}

export default Intro;
