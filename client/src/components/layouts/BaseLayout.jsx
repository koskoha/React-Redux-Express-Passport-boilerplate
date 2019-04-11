import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import Header from '../header/Header';
import EmployeeTable from '../employees/EmployeeTable';
import AddEmployee from '../employees/AddEmployee';

const styles = theme => ({});

class BaseLayout extends Component {
  render() {
    const { match } = this.props;
    return (
      <Header {...this.props}>
        <Route path={`${match.url}/list`} component={EmployeeTable} />
        <Route path={`${match.url}/add`} component={AddEmployee} />
      </Header>
    );
  }
}

BaseLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(BaseLayout);
