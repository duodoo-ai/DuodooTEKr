/** @odoo-module **/

import { _lt, _t } from "@web/core/l10n/translation";
import { session } from "@web/session";
import { useService } from "@web/core/utils/hooks";
import { cookie as cookieManager } from "@web/core/browser/cookie";
import { browser } from "@web/core/browser/browser";
import { user } from "@web/core/user";

import {
	Component,
	onWillDestroy,
	useExternalListener,
	useEffect,
	onPatched,
	onRendered,
	useState,
	useRef,
	onWillUnmount,
} from "@odoo/owl";

export class ThemePanel extends Component {
	setup() {
		super.setup();

		this.user = user;
		this.orm = useService("orm");
		this.notification = useService("notification");
		this.uiService = useService("ui");
		this.theme = session["theme"];
		const old_theme = this.theme;
		this.state = useState({
			theme: session["theme"],
			theme_has_changed: false,
		});

		const theme = this.state.theme;
		// console.log("主题状态", theme.views.list);
		onPatched(() => {
			// console.log("onPatched-----------theme", this.state.theme.main_submenu_position);
			// console.log("onPatched-----------old_theme", old_theme.main_submenu_position);
		});
		onRendered(() => {
			// console.log("onRendered-----------theme", theme.views.list);
			// console.log("onRendered-----------old_theme", old_theme.main_submenu_position);
			// if (JSON.stringify(this.state.theme) !== JSON.stringify(old_theme)) {
			//     this.state.theme_has_changed = true;
			// } else {
			//     this.state.theme_has_changed = false;
			// }
		});
	}

	//-------------------------
	// MAIN
	//-------------------------
	onChangeAppLoadMethod(method) {
		this.state.theme.main.app_load_method.default = method.id.toString();
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		main_app_load_method: method.id.toString(),
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					main_app_load_method: method.id.toString(),
				},
			},
		});
	}

	onToggleMainDisplayDrawerMenuButton(state) {
		this.state.theme.main.display_drawer_menu_button = !state;
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		main_display_drawer_menu_button: !state,
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					main_display_drawer_menu_button: !state,
				},
			},
		});
	}

	onToggleMainOpenActionInTabs(state) {
		this.state.theme.main.open_action_in_tabs = !state;
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		main_open_action_in_tabs: !state,
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					main_open_action_in_tabs: !state,
				},
			},
		});
	}

	onChangeSubmenuPosition(position) {
		this.state.theme.main.submenu.position = position.id;
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		main_submenu_position: position.id.toString(),
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					main_submenu_position: position.id.toString(),
				},
			},
		})
	}

	//-------------------------
	// 侧边栏
	//-------------------------
	onToggleSidebarDisplayNumberOfSubmenus(state) {
		this.state.theme.sidebar.display_number_of_submenus = !state;
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		sidebar_display_number_of_submenus: !state,
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					sidebar_display_number_of_submenus: !state,
				},
			},
		})
	}
	onToggleSidebarShowMinimizeButton(state) {
		this.state.theme.sidebar.show_minimize_button = !state;
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		sidebar_show_minimize_button: !state,
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					sidebar_show_minimize_button: !state,
				},
			},
		})
	}
	onToggleSidebarDefaultMinimizedn(state) {
		this.state.theme.sidebar.default_minimized = !state;
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		sidebar_default_minimized: !state,
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					sidebar_default_minimized: !state,
				},
			},
		})
	}
	onToggleSidebarHoverMaximize(state) {
		this.state.theme.sidebar.hover_maximize = !state;
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		sidebar_hover_maximize: !state,
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					sidebar_hover_maximize: !state,
				},
			},
		})
	}

	//-------------------------
	// 视图
	//-------------------------

	// 视图-向上滚动按钮
	//-------------------------
	onToggleDisplayScrollTopButton(state) {
		this.state.theme.views.display_scroll_top_button = !state;
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		display_scroll_top_button: !state,
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					display_scroll_top_button: !state,
				},
			},
		})

	}


	// 视图-列表-头部固定
	//-------------------------
	onToggleListHerderFixed(state) {
		this.state.theme.views.list.herder_fixed = !state;
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		list_herder_fixed: !state,
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					list_herder_fixed: !state,
				},
			},
		})
	}

	// 视图-列表-列表单页显示数量限制
	//-------------------------
	onChangeListRowsLimit(ev) {
		this.state.theme.views.list.rows.limit = ev.target.value;
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					list_rows_limit: ev.target.value,
				},
			},
		});
	}

	// 视图-Form-Chatter-位置
	//-------------------------
	onChangeChatterPosition(position) {
		this.state.theme.views.form.chatter.position = position.id;
		// this.orm.call("res.users", "set_user_theme", [
		// 	session.uid,
		// 	{
		// 		form_chatter_position: position.id.toString(),
		// 	},
		// ]);
		this.orm.call("res.users", "set_user_theme", [this.user.userId], {
			context: {
				theme: {
					form_chatter_position: position.id.toString(),
				},
			},
		});
	}

	hasKey(key, obj) {
		if (obj.hasOwnProperty(key)) {
			return true;
		} else {
			return false;
		}
	}
}

ThemePanel.template = "eist_web_theme.ThemePanel";
ThemePanel.components = {};
ThemePanel.props = {};
