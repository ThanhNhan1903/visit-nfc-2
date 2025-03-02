import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaLinkedin, FaGlobe, FaMapMarkerAlt, FaQrcode, FaDownload, FaShare, FaSkype, FaWhatsapp, FaWeixin, FaTelegram, FaViber } from 'react-icons/fa';
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

    // Hàm chuyển đổi tiếng Việt có dấu thành không dấu
    const removeVietnameseTones = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }

    // Hàm tạo và tải vCard
    const handleSaveContact = () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Convert image to base64
            const getBase64Image = async (imgUrl) => {
                try {
                    const response = await fetch(imgUrl);
                    const blob = await response.blob();
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result.split(',')[1]);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                } catch (error) {
                    console.error('Error converting image:', error);
                    return '';
                }
            };

            // Create and download vCard
            const createVCard = async () => {
                const photoData = await getBase64Image(userData.avatar);

                const contactUri = `BEGIN:VCARD
VERSION:3.0
N:${removeVietnameseTones(userData.name)};;;;
FN:${removeVietnameseTones(userData.name)}
TITLE:${removeVietnameseTones(userData.title)}
ORG:${removeVietnameseTones(userData.company.name)}
TEL;TYPE=WORK,VOICE:${userData.contact.phone}
EMAIL;TYPE=WORK,INTERNET:${userData.contact.email}
URL;TYPE=WORK:${userData.company.website}
ADR;TYPE=WORK:;;${removeVietnameseTones(userData.company.address)}
${photoData ? `PHOTO;ENCODING=BASE64;TYPE=JPEG:${photoData}\n` : ''}
${userData.social.skype ? `X-SOCIALPROFILE;TYPE=skype:${userData.social.skype}\n` : ''}
${userData.social.whatsapp ? `X-SOCIALPROFILE;TYPE=whatsapp:${userData.social.whatsapp}\n` : ''}
${userData.social.wechat ? `X-SOCIALPROFILE;TYPE=wechat:${userData.social.wechat}\n` : ''}
${userData.social.telegram ? `X-SOCIALPROFILE;TYPE=telegram:${userData.social.telegram}\n` : ''}
${userData.social.linkedin ? `X-SOCIALPROFILE;TYPE=linkedin:${userData.social.linkedin}\n` : ''}
${userData.social.viber ? `X-SOCIALPROFILE;TYPE=viber:${userData.social.viber}\n` : ''}
${userData.social.zalo ? `X-SOCIALPROFILE;TYPE=zalo:${userData.social.zalo}\n` : ''}
${userData.social.teams ? `X-SOCIALPROFILE;TYPE=teams:${userData.social.teams}\n` : ''}
NOTE:${removeVietnameseTones(userData.about)}\n
${removeVietnameseTones(userData.company.description)}
END:VCARD`;

                const vCardData = encodeURIComponent(contactUri);
                const fullUri = `data:text/vcard;charset=utf-8,${vCardData}`;

                const link = document.createElement('a');
                link.href = fullUri;
                link.download = `${removeVietnameseTones(userData.name).replace(/\s+/g, '_').toLowerCase()}.vcf`;
                link.click();

                alert('Please open the downloaded file to add to contacts');
            };

            createVCard();
        } else {
            // Desktop: giữ nguyên logic tải file .vcf
            const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${removeVietnameseTones(userData.name)}
TITLE:${removeVietnameseTones(userData.title)}
ORG:${removeVietnameseTones(userData.company.name)}
TEL;TYPE=WORK,VOICE:${userData.contact.phone}
EMAIL;TYPE=WORK,INTERNET:${userData.contact.email}
URL;TYPE=WORK:${userData.company.website}
ADR;TYPE=WORK:;;${removeVietnameseTones(userData.company.address)}
${userData.social.skype ? `X-SKYPE:${userData.social.skype}\n` : ''}
${userData.social.whatsapp ? `X-WHATSAPP:${userData.social.whatsapp}\n` : ''}
${userData.social.telegram ? `X-TELEGRAM:${userData.social.telegram}\n` : ''}
${userData.social.linkedin ? `X-LINKEDIN:${userData.social.linkedin}\n` : ''}
${userData.social.zalo ? `X-ZALO:${userData.social.zalo}\n` : ''}
${userData.social.teams ? `X-TEAMS:${userData.social.teams}\n` : ''}
NOTE:${removeVietnameseTones(userData.about)}
END:VCARD`;

            const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${removeVietnameseTones(userData.name).replace(/\s+/g, '_').toLowerCase()}.vcf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    };

    // Hàm xử lý chia sẻ
    const handleShare = async () => {
        const shareData = {
            title: userData.name,
            text: `${userData.name} - ${userData.title} at ${userData.company.name}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                // Sử dụng Web Share API nếu có hỗ trợ (mobile)
                await navigator.share(shareData);
            } else {
                // Fallback: Copy URL vào clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    return (
        <div className="business-card dark:bg-gray-800 dark:text-white">
            <div className="card-header dark:bg-gray-700">
                <div className="company-logo dark:bg-gray-600">
                    <img
                        src={userData.company.logo}
                        alt={userData.company.name}
                        className="w-full h-full object-contain"
                    />
                </div>
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
                        <a href={`https://wa.me/${userData.social.whatsapp}`}
                            className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaWhatsapp />
                        </a>
                    )}
                    {userData.social.wechat && (
                        <a href="#"
                            className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaWeixin />
                        </a>
                    )}
                    {userData.social.telegram && (
                        <a href={`https://t.me/${userData.social.telegram}`}
                            className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaTelegram />
                        </a>
                    )}
                    {userData.social.linkedin && (
                        <a href={userData.social.linkedin}
                            className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaLinkedin />
                        </a>
                    )}
                    {userData.social.viber && (
                        <a href={`viber://chat?number=${userData.social.viber}`}
                            className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <FaViber />
                        </a>
                    )}
                    {userData.social.zalo && (
                        <a href={`https://zalo.me/${userData.social.zalo}`}
                            className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <SiZalo />
                        </a>
                    )}
                    {userData.social.teams && (
                        <a href={`https://teams.microsoft.com/l/chat/0/0?users=${userData.social.teams}`}
                            className="social-button dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                            <SiMicrosoftteams />
                        </a>
                    )}
                </div>
            </div>

            <div className="about-section">
                <h2 className="section-title dark:text-white">About Me</h2>
                <p className="section-content dark:text-gray-300">{userData.about}</p>
            </div>

            <div className="services-section">
                <h2 className="section-title dark:text-white">{userData.services.title}</h2>
                <ul className="services-list">
                    {userData.services.list.map((service, index) => (
                        <li key={index} className="service-item">
                            <span className="service-bullet">•</span>
                            {service}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="company-section">
                <h2 className="section-title dark:text-white">Company</h2>
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
                <button
                    onClick={handleSaveContact}
                    className="btn-save dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    <FaDownload />
                    Save Contact
                </button>
                <button
                    onClick={handleShare}
                    className="btn-connect dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                    <FaShare />
                    Share
                </button>
            </div>
        </div>
    );
}

export default BusinessCard;