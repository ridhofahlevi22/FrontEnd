import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import Widget from '../../components/Widget';
import { receiveLogin, loginError } from '../../actions/user';
import { GoogleLogin } from "react-google-login";

const CLIENT_ID =
  "981654439897-j5mf7qbpfhkbfmoef7518mualudvnamm.apps.googleusercontent.com";

class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    static isAuthenticated(token) {
        if (token) return true;
    }

    constructor(props) {
        super(props);

        this.state = {
            email: 'userid',
            password: 'password',
            status:''
        };

        this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
    }


    responseGoogleSuccess = (response) => {
        console.log();
        let userInfo = {
          name: response.profileObj.name,
          emailId: response.profileObj.email,
        };
    
        if(userInfo){
            localStorage.setItem('user', userInfo.name);
            localStorage.setItem('authenticated', true);
            this.props.dispatch(receiveLogin());
        } else {
            this.props.dispatch(loginError(""));
        }
    
        // this.setState({ userInfo, isLoggedIn: true });
      };
    
      // Error Handler
      responseGoogleError = (response) => {
        console.log(response);
      };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/app' } }; // eslint-disable-line

        // cant access login page while logged in
        if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
            return (
                <Redirect to={from} />
            );
        }

        return (
            <div className="auth-page">
                <Container>
                    <Widget className="widget-auth mx-auto" title={<h2 className="mt-0">LOGIN</h2>}>
                        
                            <div className="bg-widget auth-widget-footer">
                                <GoogleLogin
                                clientId={CLIENT_ID}
                                buttonText="Login with Google"
                                onSuccess={this.responseGoogleSuccess}
                                onFailure={this.responseGoogleError}
                                isSignedIn={true}
                                cookiePolicy={"single_host_origin"}
                                />

                                <p className="widget-auth-info mt-4">
                                    
                                </p>
                            </div>
                        
                    </Widget>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Login));

