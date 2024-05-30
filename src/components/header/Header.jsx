import React, { useEffect, useRef } from "react";

import { Link, useLocation } from "react-router-dom";

import './header.scss';
import Button, { OutlineButton } from '../button/Button';

import logo from '../../assets/movieplanet.png';


const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'Tv Series',
        path: '/tv'
    }
];

const Header = () => {

    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex( e => e.path === pathname);

    useEffect (() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        }
    }, [])

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/"> Animation-Verse </Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))
                    }
                    <OutlineButton className='small'>Sign Up</OutlineButton>
                </ul>
            </div>
        </div>
    );
}

export default Header;
