"use client";
import { useAuthContext } from '@/states/auth';
import { useLayoutContext } from '@/states/layout';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

export default function ChatModal () {
  const iframeRef = useRef(null);
  const locale = useLocale();
  const isRTL = locale === "he";
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  useEffect(() => {
    const adjustIframeSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      let width = 700;
      let height = 700;

      if (screenWidth < width + 70) {
        console.log("screenWidth", screenWidth);
        iframeRef.current.contentWindow.postMessage({
          type: 'resize',
          width: screenWidth - 70,
          height: screenHeight - 150,
        }, '*');
      } else {
        iframeRef.current.contentWindow.postMessage({
          type: 'resize',
          width: 630,
          height: 640,
        }, '*');
      }
    };
    adjustIframeSize();

    window.addEventListener('resize', adjustIframeSize);

    const handleMessage = (event) => {
      if (event.data.type === 'chatbot-visibility') {
        setIsChatbotVisible(event.data.isVisible);
        if (event.data.isVisible) {
          adjustIframeSize();
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('resize', adjustIframeSize);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id="chatbot-iframe2"
      src={`https://chatbot-web-3.vercel.app?rtl=${isRTL}&lg=${locale}`}
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
        position: 'fixed',
        zIndex: 9999,
        justifyContent: 'center',
        bottom: '0px',
        right: '2px',
        width: isChatbotVisible ? '100%' : '200px',
        height: isChatbotVisible ? '100%' : '80px',
        border: 'none',
      }}
    />
  );
};
