import React from 'react';

function NavigationBar({ user }) {
  return (
    <div className="navbar">
      <a href="/">LOGO</a>
      <a>"!Honest Social"</a>
      {user ? (
        <a href={`/${user.username}`}>{user.username}</a>
      ) : (
        <a href="/login">Log in</a>
      )}
    </div>
  );
}

export default NavigationBar;