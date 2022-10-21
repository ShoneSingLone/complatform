export const render = state => {
	const { prefixCls } = state;
	const changeLang = ({ key }) => {
		this.setLang(key);
	};
	const langMenu = (
		<aMenu
			class={["menu", "ant-pro-header-menu"]}
			selectedKeys={[this.currentLang]}
			onClick={changeLang}>
			{locales.map(locale => (
				<aMenuItem key={locale}>
					<span role="img" aria-label={languageLabels[locale]}>
						{languageIcons[locale]}
					</span>{" "}
					{languageLabels[locale]}
				</aMenuItem>
			))}
		</aMenu>
	);
	return (
		<Dropdown overlay={langMenu} placement="bottomRight">
			<span class={prefixCls}>
				<xIcon icon="global" title={i18nRender("navBar.lang")} />
			</span>
		</Dropdown>
	);
};
