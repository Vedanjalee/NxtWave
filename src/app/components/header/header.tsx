'use client';

import React from 'react';
import styles from './header.module.css';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/auth/signIn');
  };

  return (
    <header className={styles.headerWrapper}>
      {/* Top Bar: Logo center, icons right */}
      <div className={styles.topBar}>
        <div className={styles.logo}>LOGO</div>
        <div className={styles.iconGroup}>
          <button className={styles.icon}>🔍</button>
          <button className={styles.icon}>🤍</button>
          <a href="/cart" className={styles.icon}>🛒</a>
          {session ? (
            <>
              <span className={styles.username}>Hi, {session.user?.name?.split(' ')[0]}</span>
              <button className={styles.authButton} onClick={() => signOut()}>Sign Out</button>
            </>
          ) : (
            <button className={styles.authButton} onClick={handleSignIn}>👤</button>
          )}
          <div className={styles.language}>ENG ⌄</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={styles.navBar}>
        <a href="/shop">SHOP</a>
        <a href="/skills">SKILLS</a>
        <a href="/stories">STORIES</a>
        <a href="/about">ABOUT</a>
        <a href="/contact">CONTACT US</a>
      </nav>
    </header>
  );
};

export default Header;
