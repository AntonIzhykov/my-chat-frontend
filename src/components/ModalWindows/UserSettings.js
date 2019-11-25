import React from 'react';
import { setLoadingTrue } from '../../store/auth/actions';
import { handleUpdatingProfile } from '../../store/chat';
import { connect } from 'react-redux';
import MyAvatarEditor from '../../containers/MyAvatarEditor/MyAvatarEditor';
import Loader from '../Loader';
import { showError } from '../../helpers/showError';

class UserSettings extends React.Component {
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
    showEditorZone: false,
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

    this.props.handleUpdatingProfile(userData, this.handleClose);
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

  handleClose = () => {
    this.props.onClose && this.props.onClose();
  };

  openEditorZone = () => {
    this.setState({
      showEditorZone: true
    });
  };

  closeEditorZone = () => {
    this.setState({
      showEditorZone: false
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
      showConfirmNewPassword,
      showEditorZone
    } = this.state;
    const {
      chat: {
        loading,
        currentUser: user,
        currentUser: { avatar: { secure_url } = {} }
      }
    } = this.props;
    return (
      <div className="user-settings">
        {loading && <Loader />}
        <h3 className="icon-user-tie">{user.login}</h3>
        <div className="d-flex justify-content-around m-2" onSubmit={this.handleSubmit}>
          <MyAvatarEditor
            width={150}
            height={150}
            onChange={this.handleChange}
            image={secure_url || defaultImage}
            showEditorZone={showEditorZone}
            openEditorZone={this.openEditorZone}
            closeEditorZone={this.closeEditorZone}
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
            <button className="btn bg-primary" onClick={this.handleShowNewPassword}>
              Change password
            </button>
            {showNewPasswordsField && (
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center mb-1">
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
                <div className="d-flex align-items-center mb-1">
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
            <div className="control-buttons-group">
              <button
                disabled={showEditorZone}
                className="btn bg-primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Save
              </button>
              <button className="btn bg-primary" onClick={this.handleClose}>
                Cancel
              </button>
            </div>
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
  handleUpdatingProfile: (userData, cb) => dispatch(handleUpdatingProfile(userData, cb))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettings);
