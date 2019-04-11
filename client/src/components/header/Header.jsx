import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logoutUser } from '../../actions/account/authActions';
import Search from './Search';
import ProfileMenu from './ProfileMenu';
import DrawerMenu from './DrawerMenu';
import EmployeeTable from '../employees/EmployeeTable';

const drawerWidth = 240;

const styles = theme => ({
  hide: {
    display: 'none',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  root: {
    display: 'flex',
    width: '100%',
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});

class BaseLayout extends React.Component {
  state = {
    drawerOpen: false,
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  renderDrawerBtn = (classes, drawerOpen) => (
    <IconButton
      color="inherit"
      aria-label="Open drawer"
      onClick={this.handleDrawerOpen}
      className={classNames(classes.menuButton, {
        [classes.hide]: drawerOpen,
      })}
    >
      <MenuIcon />
    </IconButton>
  );

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { drawerOpen } = this.state;
    // eslint-disable-next-line no-shadow
    const { classes, auth, children, logoutUser, history } = this.props;
    debugger;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: drawerOpen,
          })}
        >
          <Toolbar>
            {this.renderDrawerBtn(classes, drawerOpen)}

            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Hello, {auth.user.name}
            </Typography>

            <Search />

            <ProfileMenu
              handleMobileMenuOpen={this.handleMobileMenuOpen}
              handleProfileMenuOpen={this.handleProfileMenuOpen}
              handleMenuClose={this.handleMenuClose}
              handleMobileMenuClose={this.handleMobileMenuClose}
              logoutUser={logoutUser}
              menuState={this.state}
            />
          </Toolbar>
        </AppBar>

        <DrawerMenu drawerOpen={drawerOpen} handleDrawerClose={this.handleDrawerClose} />

        {children || history.push('/employee/list')}
      </div>
    );
  }
}

BaseLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { logoutUser }
  )
)(BaseLayout);
