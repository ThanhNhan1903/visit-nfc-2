import React from 'react';
import { FaPhone, FaEnvelope, FaLinkedin, FaGlobe, FaMapMarkerAlt, FaQrcode, FaDownload, FaComments } from 'react-icons/fa';
import { MdLightMode } from 'react-icons/md';
import usersData from '../data/users.json';

function BusinessCard({ userId = 'nguyen-van-a' }) {
    const userData = usersData.users[userId];

    return (
        <div className="business-card">
            <div className="card-header">
                <button className="theme-toggle">
                    <MdLightMode className="text-gray-600" />
                </button>
                <div className="card-avatar"></div>
                <h1 className="card-name">{userData.name}</h1>
                <p className="card-title">{userData.title}</p>
            </div>

            <div className="contact-section">
                <div className="contact-row">
                    <a href={`tel:${userData.contact.phone}`} className="contact-button">
                        <FaPhone />
                        <span>{userData.contact.phone}</span>
                    </a>
                    <a href={`mailto:${userData.contact.email}`} className="contact-button">
                        <FaEnvelope />
                        <span>{userData.contact.email.split('@')[0]}@...</span>
                    </a>
                </div>

                <div className="social-links">
                    <a href={userData.social.linkedin} className="social-button">
                        <FaLinkedin />
                    </a>
                    <a href={userData.social.chat} className="social-button">
                        <FaComments />
                    </a>
                    <a href={userData.social.website} className="social-button">
                        <FaGlobe />
                    </a>
                    <a href={userData.social.qr} className="social-button">
                        <FaQrcode />
                    </a>
                </div>
            </div>

            <div className="about-section">
                <h2 className="section-title">About Me</h2>
                <p className="section-content">
                    {userData.about}
                </p>
            </div>

            <div className="company-section">
                <h2 className="section-title">Company</h2>
                <div className="company-logo"></div>
                <a href={userData.company.website} className="company-link">
                    {userData.company.website}
                </a>
                <p className="section-content">
                    {userData.company.description}
                </p>
                <p className="company-address">
                    <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                    <span>{userData.company.address}</span>
                </p>
            </div>

            <div className="action-buttons">
                <button className="btn-save">
                    <FaDownload />
                    Save Contact
                </button>
                <button className="btn-connect">
                    <FaComments />
                    Connect Now
                </button>
            </div>
        </div>
    );
}

export default BusinessCard;