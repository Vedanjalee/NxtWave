'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import styles from '../../styles/home.module.css' 

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(true);
    } else {
      setError(false);
      window.location.href = '/';
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          className={`${styles.input} ${error ? styles.error : ''}`}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          className={`${styles.input} ${error ? styles.error : ''}`}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit" className={styles.button}>Sign In</button>
      </form>
      {error && <p className={styles.errorText}>Invalid email or password</p>}
    </div>
  );
}
