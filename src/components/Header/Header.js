import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  UncontrolledAlert,
  Dropdown,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  ButtonGroup,
  Button,
  Form,
  FormGroup,
} from "reactstrap";
import Notifications from "../Notifications";
import PowerIcon from "../Icons/HeaderIcons/PowerIcon";
import BellIcon from "../Icons/HeaderIcons/BellIcon";
import SettingsIcon from "../Icons/HeaderIcons/SettingsIcon";
import MessageIcon from "../Icons/HeaderIcons/MessageIcon";
import BurgerIcon from "../Icons/HeaderIcons/BurgerIcon";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon";
import ArrowIcon from "../Icons/HeaderIcons/ArrowIcon";
import { GoogleLogout } from "react-google-login";

import { logoutUser } from "../../actions/user";
import {
  openSidebar,
  closeSidebar,
  changeSidebarPosition,
  changeSidebarVisibility,
} from "../../actions/navigation";

import sender1 from "../../assets/people/a1.jpg";
import sender2 from "../../assets/people/a5.jpg";
import sender3 from "../../assets/people/a4.jpg";

import avatar from "../../assets/people/a7.jpg";

import s from "./Header.module.scss";
import "animate.css";

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

    this.state = {
      visible: true,
      messagesOpen: false,
      supportOpen: false,
      settingsOpen: false,
      searchFocused: false,
      searchOpen: false,
      notificationsOpen: false,
    };
  }

  toggleNotifications = () => {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  };

  onDismiss() {
    this.setState({ visible: false });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  toggleMessagesDropdown() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  toggleSupportDropdown() {
    this.setState({
      supportOpen: !this.state.supportOpen,
    });
  }

  toggleSettingsDropdown() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  toggleAccountDropdown() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  toggleSearchOpen() {
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
  }

  toggleSidebar() {
    this.props.isSidebarOpened
      ? this.props.dispatch(closeSidebar())
      : this.props.dispatch(openSidebar());
  }

  moveSidebar(position) {
    this.props.dispatch(changeSidebarPosition(position));
  }

  toggleVisibilitySidebar(visibility) {
    this.props.dispatch(changeSidebarVisibility(visibility));
  }

  render() {
    return (
      <Navbar className={`d-print-none `}>
        <div className={s.burger}>
          <NavLink
              onClick={this.toggleSidebar}
              className={`d-md-none ${s.navItem} text-white`}
              href="#"
            >
              <BurgerIcon className={s.headerIcon} />
            </NavLink>
        </div>
        <div className={`d-print-none ${s.root}`}>

          <Nav className="ml-md-0">
            <Dropdown
              nav
              id="basic-nav-dropdown"
              className={`${s.notificationsMenu}`}
            >
              <DropdownToggle nav style={{ color: "#C1C3CF", padding: 0 }}>
                <span className={`small d-sm-down-none ${s.accountCheck}`}> {localStorage.getItem('user')}</span>
              </DropdownToggle>
            </Dropdown>

            <NavItem className={`${s.divider} d-none d-sm-block`} />

            <GoogleLogout
                clientId={"981654439897-j5mf7qbpfhkbfmoef7518mualudvnamm.apps.googleusercontent.com"}
                buttonText={"Logout"}
                onLogoutSuccess={this.doLogout}
            ></GoogleLogout>

          </Nav>
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
