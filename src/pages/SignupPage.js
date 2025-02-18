import React, { useState } from 'react';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:4500/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
        //  localStorage.setItem('user', JSON.stringify(data.user));
          alert(data.user)
          window.location.href = '/login';
        } else {
          alert(data.message);
        }
      })
      .catch(err => console.error('Error signing up in:', err));

    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div>
        <a href="/signup">ALREADY HAVE AN ACCOUNT?</a>
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignupPage;