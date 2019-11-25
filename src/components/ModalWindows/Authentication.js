import React from 'react';

const Authentication = ({ handleAuthentication, closeModal }) => {
  const handleSubmit = e => {
    if (e) e.preventDefault();
    const login = loginRef.current.value;
    const password = passwordRef.current.value;
    if (login && password) {
      handleAuthentication(login, password, closeModal);
    }
  };

  const loginRef = React.createRef();
  const passwordRef = React.createRef();

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input className="mb-1" type="text" placeholder="Login" ref={loginRef} />
      <input className="mb-1" type="password" placeholder="Password" ref={passwordRef} />
      <button
        className="btn icon-user-tie fz-16 cursor-pointer w-100 p-1"
        title="Log In"
        onClick={handleSubmit}
      />
    </form>
  );
};

export default Authentication;
