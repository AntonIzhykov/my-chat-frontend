import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoadingTrue } from '../store/auth/actions';
import Loader from './Loader';
import { handleUpdatingProfile } from '../store/chat';
import MyAvatarEditor from '../containers/MyAvatarEditor/MyAvatarEditor';
import { showError } from '../helpers';

class Profile extends Component {
  state = {
    login: '',
    email: '',
    defaultImage: 'https://miro.medium.com/max/360/1*W35QUSvGpcLuxPo3SRTH4w.png',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
    showNewPass: false,
    error: ''
  };

  componentDidMount() {
    const {
      chat: {
        currentUser: { login, email }
      }
    } = this.props;
    this.setState({
      login,
      email
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { password, login, email, newPassword, confirmNewPassword, error } = this.state;
    const {
      chat: { newAvatar }
    } = this.props;

    if (!password) return showError('error', 'Error!', 'Please, enter your password!');
    if (!login) return showError('error', 'Error!', 'You can`t use an empty name!');
    if (error) return showError('error', 'Error!', error);
    if (newPassword && newPassword !== confirmNewPassword)
      return showError('error', 'Error!', 'Wrong confirm new password!');

    const userData = {
      password,
      login,
      email,
      newPassword,
      newAvatar
    };

    this.props.handleUpdatingProfile(userData);
    this.props.setLoadingTrue();
  };

  handleShowNewPassword = e => {
    if (e) e.preventDefault();
    this.setState({
      showNewPass: !this.state.showNewPass
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      login,
      email,
      showNewPass,
      password,
      defaultImage,
      newPassword,
      confirmNewPassword
    } = this.state;
    const {
      chat: {
        loading,
        currentUser: user,
        currentUser: { avatar: { secure_url } = {} }
      }
    } = this.props;
    return (
      <div className="profile">
        {loading && <Loader />}
        <h3>{user.login}</h3>
        <div className="d-flex justify-content-around" onSubmit={this.handleSubmit}>
          <MyAvatarEditor
            width={150}
            height={150}
            onChange={this.handleChange}
            image={secure_url || defaultImage}
          />

          <div className="input-group">
            <input
              type="text"
              name="login"
              value={login}
              placeholder="login"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="email"
              value={email}
              placeholder="email"
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={this.handleChange}
            />
            <button className="btn" onClick={this.handleShowNewPassword}>
              Change password
            </button>
            {showNewPass && (
              <div className="d-flex flex-column">
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  placeholder="Enter new password"
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={confirmNewPassword}
                  placeholder="Confirm new password"
                  onChange={this.handleChange}
                />
              </div>
            )}
            <button className="btn bg-primary" type="submit" onClick={this.handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  chat: store.chat
});

const mapDispatchToProps = dispatch => ({
  setLoadingTrue: () => dispatch(setLoadingTrue()),
  handleUpdatingProfile: userData => dispatch(handleUpdatingProfile(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
