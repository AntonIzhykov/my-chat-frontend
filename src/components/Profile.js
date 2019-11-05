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
    mainPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    showNewPasswordsField: false,
    showMainPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false,
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
    const { mainPassword, login, email, newPassword, confirmNewPassword, error } = this.state;
    const {
      chat: { newAvatar }
    } = this.props;

    if (!mainPassword) return showError('error', 'Error!', 'Please, enter your password!');
    if (!login) return showError('error', 'Error!', 'You can`t use an empty name!');
    if (error) return showError('error', 'Error!', error);
    if (newPassword && newPassword !== confirmNewPassword)
      return showError('error', 'Error!', 'Wrong confirm new password!');

    const userData = {
      password: mainPassword,
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
      showNewPasswordsField: !this.state.showNewPasswordsField
    });
  };

  handleShowPassword = e => {
    this.setState({
      [`show${e.target.id}`]: !this.state[`show${e.target.id}`]
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
      mainPassword,
      defaultImage,
      newPassword,
      confirmNewPassword,
      showNewPasswordsField,
      showMainPassword,
      showNewPassword,
      showConfirmNewPassword
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
        <h3 className="icon-user-tie">{user.login}</h3>
        <div className="d-flex justify-content-around mt-2" onSubmit={this.handleSubmit}>
          <MyAvatarEditor
            width={150}
            height={150}
            onChange={this.handleChange}
            image={secure_url || defaultImage}
          />

          <div className="input-group">
            <div className="d-flex align-items-center mb-1">
              <span className="icon-happy mr-1 fz-20" />
              <input
                type="text"
                name="login"
                defaultValue={login}
                placeholder="login"
                onChange={this.handleChange}
              />
            </div>
            <div className="d-flex align-items-center mb-1">
              <span className="icon-mail4 mr-1 fz-20" />
              <input
                type="text"
                name="email"
                defaultValue={email}
                placeholder="email"
                onChange={this.handleChange}
              />
            </div>
            <div className="d-flex align-items-center mb-1">
              <span
                className={`${
                  showMainPassword ? 'icon-eye-blocked' : 'icon-eye'
                } mr-1 fz-20 cursor-pointer`}
                id="MainPassword"
                onClick={this.handleShowPassword}
              />
              <input
                type={`${showMainPassword ? 'text' : 'password'}`}
                name="mainPassword"
                value={mainPassword}
                placeholder="password"
                onChange={this.handleChange}
              />
            </div>
            <button className="btn" onClick={this.handleShowNewPassword}>
              Change password
            </button>
            {showNewPasswordsField && (
              <div className="d-flex flex-column">
                <div>
                  <span
                    className={`${
                      showNewPassword ? 'icon-eye-blocked' : 'icon-eye'
                    } mr-1 fz-20 cursor-pointer`}
                    id="NewPassword"
                    onClick={this.handleShowPassword}
                  />
                  <input
                    type={`${showNewPassword ? 'text' : 'password'}`}
                    name="newPassword"
                    value={newPassword}
                    placeholder="Enter new password"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <span
                    className={`${
                      showConfirmNewPassword ? 'icon-eye-blocked' : 'icon-eye'
                    } mr-1 fz-20 cursor-pointer`}
                    id="ConfirmNewPassword"
                    onClick={this.handleShowPassword}
                  />
                  <input
                    type={`${showConfirmNewPassword ? 'text' : 'password'}`}
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    placeholder="Confirm password"
                    onChange={this.handleChange}
                  />
                </div>
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
