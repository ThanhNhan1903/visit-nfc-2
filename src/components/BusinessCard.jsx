import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaLinkedin, FaGlobe, FaMapMarkerAlt, FaQrcode, FaDownload, FaComments, FaSkype, FaWhatsapp, FaWeixin, FaTelegram, FaViber } from 'react-icons/fa';
import { SiMicrosoftteams, SiZalo } from 'react-icons/si';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import usersData from '../data/users.json';

function BusinessCard({ userId = 'nguyen-van-a' }) {
    const userData = usersData.users[userId];
    const [isDark, setIsDark] = useState(false);

    // Kiểm tra theme từ localStorage khi component mount
    useEffect(() => {
        if (localStorage.theme === 'dark' ||
            (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Xử lý chuyển đổi theme
    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
        setIsDark(!isDark);
    };

    // Hàm format số điện thoại
    const formatPhone = (phone) => {
        // Xóa tất cả ký tự không phải số
        const numbers = phone.replace(/\D/g, '');
        // Format: +84 123 456 789
        return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3 $4');
    };

    // Hàm format email
    const formatEmail = (email) => {
        const [username, domain] = email.split('@');
        // Nếu username dài hơn 10 ký tự, truncate nó
        const shortUsername = username.length > 10 ?
            `${username.slice(0, 10)}...` : username;
        return `${shortUsername}@${domain}`;
    };

    return (
        <div className="business-card dark:bg-gray-800 dark:text-white">
            <div className="card-header dark:bg-gray-700">
                <button
                    onClick={toggleTheme}
                    className="theme-toggle hover:scale-110 transition-transform"
                    aria-label="Toggle theme"
                >
                    {isDark ? (
                        <MdLightMode className="text-yellow-400 text-xl" />
                    ) : (
                        <MdDarkMode className="text-gray-600 text-xl" />
                    )}
                </button>
                <div className="card-avatar dark:bg-gray-600">
                    <img
                        src={userData.avatar}
                        alt={userData.name}
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <h1 className="card-name dark:text-white">{userData.name}</h1>
                <p className="card-title dark:text-gray-300">{userData.title}</p>
            </div>

            <div className="contact-section">
                <div className="contact-row flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                        href={`tel:${userData.contact.phone}`}
                        className="contact-button flex-1 justify-center sm:justify-start dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        <FaPhone className="flex-shrink-0" />
                        <span className="truncate">
                            {formatPhone(userData.contact.phone)}
                        </span>
                    </a>
                    <a
                        href={`mailto:${userData.contact.email}`}
                        className="contact-button flex-1 justify-center sm:justify-start dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        <FaEnvelope className="flex-shrink-0" />
                        <span className="truncate">
                            {formatEmail(userData.contact.email)}
                        </span>
                    </a>
                </div>

                <div className="social-links">
                    {userData.social.skype && (
                        <a href={`skype:${userData.social.skype}?chat`}
                            className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaSkype />
                        </a>
                    )}
                    {userData.social.whatsapp && (
                        <a href={`https://wa.me/${userData.social.whatsapp}`} className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaWhatsapp />
                        </a>
                    )}
                    {userData.social.wechat && (
                        <a href="#" className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaWeixin />
                        </a>
                    )}
                    {userData.social.telegram && (
                        <a href={`https://t.me/${userData.social.telegram}`} className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaTelegram />
                        </a>
                    )}
                    {userData.social.linkedin && (
                        <a href={userData.social.linkedin} className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaLinkedin />
                        </a>
                    )}
                    {userData.social.viber && (
                        <a href={`viber://chat?number=${userData.social.viber}`} className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaViber />
                        </a>
                    )}
                    {userData.social.zalo && (
                        <a href={`https://zalo.me/${userData.social.zalo}`} className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <SiZalo />
                        </a>
                    )}
                    {userData.social.teams && (
                        <a href={`https://teams.microsoft.com/l/chat/0/0?users=${userData.social.teams}`} className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <SiMicrosoftteams />
                        </a>
                    )}
                </div>
            </div>

            <div className="about-section">
                <h2 className="section-title dark:text-white">About Me</h2>
                <p className="section-content dark:text-gray-300">{userData.about}</p>
            </div>

            <div className="company-section">
                <h2 className="section-title dark:text-white">Company</h2>
                <div className="company-logo dark:bg-gray-600">
                    <img
                        src={userData.company.logo}
                        alt={userData.company.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <a href={userData.company.website} className="company-link dark:text-blue-400 dark:hover:text-blue-300">
                    {userData.company.website}
                </a>
                <p className="section-content dark:text-gray-300">{userData.company.description}</p>
                <p className="company-address dark:text-gray-300">
                    <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                    <span>{userData.company.address}</span>
                </p>
            </div>

            <div className="action-buttons">
                <button className="btn-save dark:bg-blue-600 dark:hover:bg-blue-700">
                    <FaDownload />
                    Save Contact
                </button>
                <button className="btn-connect dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                    <FaComments />
                    Connect Now
                </button>
            </div>
        </div>
    );
}

export default BusinessCard;