import { LogoSVG } from "@/components/LogoSVG";
import { defineComponent } from "vue";
import { Methods_App, stateApp } from "@/state/app";
import { $ } from "@/ventose/ui";
import { Cpt_url } from "@/router/router";

const TipTitle = () => {
	return (
		<div class="tip-title">
			<h3 class="title">准备好使用了吗？</h3>
			<p class="desc">注册账号尽请使用吧，查看使用文档了解更多信息</p>
		</div>
	);
};

const TipBtns = () => {
	return (
		<div class="tip-btns">
			<div class="btn-group">
				<xButton
					type="primary"
					class="btn-home btn-login"
					onClick={() => Cpt_url.value.go("/login")}>
					登录 / 注册
				</xButton>
				<xButton class="btn-home btn-home-normal">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://hellosean1025.github.io/yapi">
						使用文档
					</a>
				</xButton>
			</div>
		</div>
	);
};
const HomeGuest = params => {
	const { ThirdLogin, introList } = params;
	// return <h1>home guest</h1>;
	return (
		<div class="g-body">
			<div class="m-bg">
				<div class="m-bg-mask m-bg-mask0" />
				<div class="m-bg-mask m-bg-mask1" />
				<div class="m-bg-mask m-bg-mask2" />
				<div class="m-bg-mask m-bg-mask3" />
			</div>
			<div class="main-one">
				<div class="container">
					<ElRow>
						<ElCol span={24}>
							<div class="home-header">
								<a href="#" class="item">
									YAPI
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href="https://hellosean1025.github.io/yapi"
									class="item">
									使用文档
								</a>
							</div>
						</ElCol>
					</ElRow>
					<ElRow>
						<ElCol lg={9} xs={24}>
							<div class="home-des">
								<div class="logo">
									<LogoSVG length="72px" />
									<span class="name">YAPI</span>
								</div>
								<div class="detail">
									高效、易用、功能强大的API管理平台
									<br />
									<span class="desc">
										旨在为开发、产品、测试人员提供更优雅的接口管理服务
									</span>
								</div>
								<div class="btn-group">
									<xButton
										type="primary"
										class="btn-home btn-login"
										onClick={() => Cpt_url.value.go("/login")}>
										登录 / 注册
									</xButton>
									{/* {ThirdLogin ? <ThirdLogin /> : null} */}
								</div>
							</div>
						</ElCol>
						<ElCol lg={15} xs={0} class="col-img">
							<div class="img-container"></div>
						</ElCol>
					</ElRow>
				</div>
			</div>
			<div class="feat-part section-feature">
				<div class="container home-section">
					<h3 class="title">为API开发者设计的管理平台</h3>
					<span class="desc">
						YApi让接口开发更简单高效，让接口的管理更具可读性、可维护性，让团队协作更合理。
					</span>
					<ElRow key="feat-motion-row">
						<ElCol span={8} class="section-item" key="feat-wrapper-1">
							<xIcon icon="appstore-o" class="img" />
							<h4 class="title">项目管理</h4>
							<span class="desc">
								提供基本的项目分组，项目管理，接口管理功能
							</span>
						</ElCol>
						<ElCol span={8} class="section-item" key="feat-wrapper-2">
							<xIcon icon="api" class="img" />
							<h4 class="title">接口管理</h4>
							<span class="desc">
								友好的接口文档，基于websocket的多人协作接口编辑功能和类postman测试工具，让多人协作成倍提升开发效率
							</span>
						</ElCol>
						<ElCol span={8} class="section-item" key="feat-wrapper-3">
							<xIcon icon="database" class="img" />
							<h4 class="title">MockServer</h4>
							<span class="desc">基于Mockjs，使用简单功能强大</span>
						</ElCol>
					</ElRow>
				</div>
			</div>
			<div class="feat-part m-mock m-skew home-section">
				<div class="m-skew-bg">
					<div class="m-bg-mask m-bg-mask0" />
					<div class="m-bg-mask m-bg-mask1" />
					<div class="m-bg-mask m-bg-mask2" />
				</div>
				<div class="container skew-container">
					<h3 class="title">功能强大的 Mock 服务</h3>
					<span class="desc">你想要的 Mock 服务都在这里</span>
					<ElRow class="row-card">
						<ElCol lg={12} xs={24} class="section-card">
							<ElCard title="Mock 规则">
								<p class="mock-desc">
									通过学习一些简单的 Mock
									模板规则即可轻松编写接口，这将大大提高定义接口的效率，并且无需为编写
									Mock 数据烦恼: 所有的数据都可以实时随机生成。
								</p>
								<div class="code">
									<ol start="1">
										<li class="item">
											<span class="orderNum orderNum-first">1</span>
											<span>
												<span>&#123;&ensp;&ensp;</span>
											</span>
										</li>
										<li class="item">
											<span class="orderNum">2</span>
											<span>
												&ensp;&ensp;&ensp;&ensp;
												<span class="string">&quot;errcode|200-500&quot;</span>
												<span>
													:&ensp;<span class="number">200</span>,&ensp;&ensp;
												</span>
											</span>
										</li>
										<li class="item">
											<span class="orderNum">3</span>
											<span>
												&ensp;&ensp;&ensp;&ensp;
												<span class="string">&quot;errmsg|4-8&quot;</span>
												<span>:&ensp;</span>
												<span class="string">&quot;@string&quot;</span>
												<span>,&ensp;&ensp;</span>
											</span>
										</li>
										<li class="item">
											<span class="orderNum">4</span>
											<span>
												&ensp;&ensp;&ensp;&ensp;
												<span class="string">&quot;data&quot;</span>
												<span>:&ensp;&#123;&ensp;&ensp;</span>
											</span>
										</li>
										<li class="item">
											<span class="orderNum">5</span>
											<span>
												&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
												<span class="string">&quot;boolean|1&quot;</span>
												<span>:&ensp;</span>
												<span class="keyword">true</span>
												<span>,&ensp;&ensp;</span>
											</span>
										</li>
										<li class="item">
											<span class="orderNum">6</span>
											<span>
												&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
												<span class="string">&quot;array|2&quot;</span>
												<span>
													:&ensp;&#91;
													<span class="string">&quot;Bob&quot;</span>,&ensp;
													<span class="string">&quot;Jim&quot;</span>
													&#93;,&ensp;&ensp;
												</span>
											</span>
										</li>
										<li class="item">
											<span class="orderNum">7</span>
											<span>
												&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
												<span class="string">&quot;combine&quot;</span>
												<span>:&ensp;</span>
												<span class="string">
													&quot;@boolean&ensp;&amp;&ensp;@array&quot;
												</span>
												<span>&ensp;&ensp;</span>
											</span>
										</li>
										<li class="item">
											<span class="orderNum">8</span>
											<span>&ensp;&ensp;&ensp;&ensp;&#125;&ensp;&ensp;</span>
										</li>
										<li class="item">
											<span class="orderNum orderNum-last">9</span>
											<span>&#125;&ensp;&ensp;</span>
										</li>
									</ol>
								</div>
							</ElCard>
						</ElCol>
						<ElCol lg={12} xs={24} class="section-card mock-after">
							<ElCard title="生成的 Mock 数据">
								<p class="mock-desc">
									生成的 Mock 数据可以直接用 ajax
									请求使用，也可以通过服务器代理使用（不需要修改项目一行代码）
								</p>
								<div class="code">
									<ol start="1">
										<li class="alt">
											<span class="orderNum orderNum-first">1</span>
											<span>
												<span>&#123;&ensp;&ensp;</span>
											</span>
										</li>
										<li class="">
											<span class="orderNum">2</span>
											<span>
												&ensp;&ensp;
												<span class="string">&quot;errcode&quot;</span>
												<span>:&ensp;</span>
												<span class="number">304</span>
												<span>,&ensp;&ensp;</span>
											</span>
										</li>
										<li class="alt">
											<span class="orderNum">3</span>
											<span>
												&ensp;&ensp;
												<span class="string">&quot;errmsg&quot;</span>
												<span>:&ensp;</span>
												<span class="string">
													&quot;JtkMIoRu)N#ie^h%Z77[F)&quot;
												</span>
												<span>,&ensp;&ensp;</span>
											</span>
										</li>
										<li class="">
											<span class="orderNum">4</span>
											<span>
												&ensp;&ensp;<span class="string">&quot;data&quot;</span>
												<span>:&ensp;&#123;&ensp;&ensp;</span>
											</span>
										</li>
										<li class="alt">
											<span class="orderNum">5</span>
											<span>
												&ensp;&ensp;&ensp;&ensp;
												<span class="string">&quot;boolean&quot;</span>
												<span>:&ensp;</span>
												<span class="keyword">true</span>
												<span>,&ensp;&ensp;</span>
											</span>
										</li>
										<li class="">
											<span class="orderNum">6</span>
											<span>
												&ensp;&ensp;&ensp;&ensp;
												<span class="string">&quot;array&quot;</span>
												<span>:&ensp;</span>&#91;
												<span class="string">&quot;Bob&quot;</span>,&ensp;
												<span class="string">&quot;Jim&quot;</span>,&ensp;
												<span class="string">&quot;Bob&quot;</span>,&ensp;
												<span class="string">&quot;Jim&quot;</span>&#93;
												<span>,&ensp;&ensp;</span>
											</span>
										</li>
										<li class="alt">
											<span class="orderNum">7</span>
											<span>
												&ensp;&ensp;&ensp;&ensp;
												<span class="string">&quot;combine&quot;</span>
												<span>:&ensp;</span>
												<span class="string">
													&quot;true & Bob,&ensp;Jim,&ensp;Bob,&ensp;Jim&quot;
												</span>
												<span>&ensp;&ensp;</span>
											</span>
										</li>
										<li class="">
											<span class="orderNum">8</span>
											<span>&ensp;&ensp;&#125;&ensp;&ensp;</span>
										</li>
										<li class="alt">
											<span class="orderNum orderNum-last">9</span>
											<span>&#125;&ensp;&ensp;</span>
										</li>
									</ol>
								</div>
							</ElCard>
						</ElCol>
					</ElRow>
				</div>
			</div>
			<div class="home-section section-manage">
				<div class="container">
					<ElRow class="row-card" style={{ marginBottom: ".48rem" }}>
						<ElCol lg={7} xs={10} class="section-card">
							<ElCard>
								<div class="section-block block-first">
									<h4>超级管理员(* N)</h4>
									<p class="item"> - 创建分组</p>
									<p class="item"> - 分配组长</p>
									<p class="item"> - 管理所有成员信息</p>
								</div>
								<div class="section-block block-second">
									<h4>组长(* N)</h4>
									<p class="item"> - 创建项目</p>
									<p class="item"> - 管理分组或项目的信息</p>
									<p class="item"> - 管理开发者与成员</p>
								</div>
								<div class="section-block block-third">
									<h4>开发者(* N) / 成员(* N)</h4>
									<p class="item"> - 不允许创建分组</p>
									<p class="item"> - 不允许修改分组或项目信息</p>
								</div>
							</ElCard>
						</ElCol>
						<ElCol lg={17} xs={14} class="section-card manage-word">
							<xIcon icon="team" class="icon" />
							<h3 class="title">扁平化管理模式</h3>
							<p class="desc">
								接口管理的逻辑较为复杂，操作频率高，层层审批将严重拖慢生产效率，因此传统的金字塔管理模式并不适用。
							</p>
							<p class="desc">
								YAPI
								将扁平化管理模式的思想引入到产品的权限管理中，超级管理员拥有最高的权限，并将权限分配给若干组长，超级管理员只需管理组长即可，实际上管理YAPI各大分组与项目的是“组长”。组长对分组或项目负责，一般由BU负责人/项目负责人担任。
							</p>
						</ElCol>
					</ElRow>
				</div>
			</div>
		</div>
	);
};

export default defineComponent({
	props: {
		introList: { type: Array },
		login: { type: Boolean },
		history: { type: Object }
	},
	data() {
		return {};
	},
	mounted() {
		if (stateApp.user.isLogin) {
		}
		$("#app").css("overflow", "auto");
	},
	unmounted() {
		$("#app").css("overflow", "hidden");
	},
	methods: {
		toStart() {
			Methods_App.changeMenuItem("/group");
		}
	},
	render() {
		return (
			<div class="home-main">
				<HomeGuest introList={this.introList} />
				<div class="row-tip">
					<div class="container">
						<TipTitle></TipTitle>
						<TipBtns></TipBtns>
					</div>
				</div>
			</div>
		);
	}
});
