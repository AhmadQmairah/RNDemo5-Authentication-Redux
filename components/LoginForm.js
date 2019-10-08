import React, { Component } from "react";

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from "native-base";

import { connect } from "react-redux";

// Actions
import {
  login,
  signup,
  logout,
  checkForExpiredToken
} from "../redux/actions/auth";

class LoginForm extends Component {
  componentDidMount() {
    this.props.check();
    //checkForExpiredToken();
  }
  state = {
    username: "",
    password: ""
  };
  handleChange = keyValue => {
    this.setState(keyValue);
  };

  handleSubmit = () => {
    this.props.login(this.state);
  };
  handleSubmit2 = () => {
    this.props.signup(this.state);
  };
  getBottom = () => {
    if (!this.props.user) {
      return (
        <Container>
          <Button onPress={this.handleSubmit}>
            <Text>Login</Text>
          </Button>
          <Button onPress={this.handleSubmit2}>
            <Text>SignUp</Text>
          </Button>
        </Container>
      );
    } else {
      return (
        <Button onPress={this.props.logout}>
          <Text>LogOut</Text>
        </Button>
      );
    }
  };

  render() {
    const { username, password } = this.state;

    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input
                name="username"
                value={username}
                placeholder="Username"
                onChangeText={username => this.handleChange({ username })}
              />
            </Item>
            <Item last>
              <Input
                value={password}
                placeholder="Password"
                secureTextEntry
                name="password"
                onChangeText={password => this.handleChange({ password })}
              />
            </Item>

            {this.getBottom()}
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
    signup: user => dispatch(signup(user)),
    logout: user => dispatch(logout(user)),
    check: () => dispatch(checkForExpiredToken())
  };
};
const mapStateToProps = state => {
  return {
    user: state.rootAuth.user
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
