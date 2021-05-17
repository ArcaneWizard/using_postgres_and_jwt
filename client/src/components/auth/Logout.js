import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

function Logout(props) {
    return <Fragment>
        <a onClick={() => { props.logout(); props.setTheMode("Register"); }} class="nav-link navbar-brand" href="#">
            Logout
        </a>
    </Fragment>
}


Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout);