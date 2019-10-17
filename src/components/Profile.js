import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { setLoadingTrue } from '../store/auth/actions';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { handleUpdatingProfile } from '../store/chat';
import MyAvatarEditor from '../containers/MyAvatarEditor/MyAvatarEditor';

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
    const { login, email } = this.props.user;
    this.setState({
      login,
      email
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (_.isEmpty(prevProps.user) && !_.isEmpty(this.props.user)) {
      const { login, email } = this.props.user;
      this.setState({
        login,
        email
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { password, login, email, newPassword, confirmNewPassword, error } = this.state;

    const newAvatar = this.props.newAvatar;

    if (error) {
      return Swal.fire({
        type: 'error',
        title: 'Error!',
        text: error
      });
    }
    if (newPassword && newPassword !== confirmNewPassword) {
      return Swal.fire({
        type: 'error',
        title: 'Error!',
        text: 'Wrong confirm new password!'
      });
    }
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
    const { login, email, showNewPass, defaultImage, newPassword, confirmNewPassword } = this.state;
    const {
      user,
      loading,
      user: { avatar }
    } = this.props;
    return (
      <div className="profile">
        {loading && <Loader />}
        <h3>{user.login}</h3>
        <div className="d-flex" onSubmit={this.handleSubmit}>
          <div className="avatar-label">
            {/*{avatar && avatar.secure_url && <img src={avatar.secure_url} alt="user_avatar" className='full-size'/>}*/}
            <MyAvatarEditor
              onChange={this.handleChange}
              image={avatar && avatar.secure_url ? avatar.secure_url : defaultImage}
              // ref={this.setEditorRef}
            />

            {/*<input type="file" placeholder='Change avatar' onChange={this.handleFileUpload}/>*/}
          </div>

          <div className="d-alex ">
            <input
              type="text"
              name="login"
              defaultValue={login}
              placeholder="login"
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="email"
              defaultValue={email}
              placeholder="email"
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
            />
            <button onClick={this.handleShowNewPassword}>Change password</button>
            {showNewPass && (
              <div>
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
            <button type="submit" onClick={this.handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  newAvatar: store.chat.newAvatar,
  user: store.chat.currentUser,
  loading: store.chat.loading
});

const mapDispatchToProps = dispatch => ({
  setLoadingTrue: () => dispatch(setLoadingTrue()),
  handleUpdatingProfile: userData => dispatch(handleUpdatingProfile(userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
