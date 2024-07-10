"use client";
import React, { useEffect, useRef } from 'react';

const ChatModal: React.FC = () => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const chatIframeRef = useRef<HTMLIFrameElement>(null);

  const adjustIframeSize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const width = 630;
    const height = 640;
    
    if (chatIframeRef.current) {
      if (screenWidth < width + 70) {
        chatIframeRef.current.style.width = `${screenWidth - 20}px`;
        chatIframeRef.current.style.height = `${screenHeight/1.5}px`;
        chatIframeRef.current.style.borderRadius = '15px';
      } else {
        chatIframeRef.current.style.width = `${width}px`;
        chatIframeRef.current.style.height = `${height}px`;
        chatIframeRef.current.style.borderRadius = '15px';
      }
    }

    if (chatIframeRef.current?.contentWindow && screenWidth < width + 70) { // Adjust the width threshold as needed
      chatIframeRef.current.contentWindow.postMessage({
        type: 'resize',
        width: screenWidth - 20,
        height: screenHeight/1.5,
      }, '*');
    } else if (chatIframeRef.current?.contentWindow){
      chatIframeRef.current.contentWindow.postMessage({
        type: 'resize',
        width: width,
        height: height,
      }, '*');
    }
  };


  useEffect(() => {
    const handleResize = () => {
      adjustIframeSize();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalOverlayRef.current && chatIframeRef.current && event.target === modalOverlayRef.current) {
        modalOverlayRef.current.style.display = 'none';
        chatIframeRef.current.style.width = '630px';
        chatIframeRef.current.style.height = '640px';
        chatIframeRef.current.style.borderRadius = '15px';
      }
    };

    const handleToggleClick = () => {
      if (modalOverlayRef.current) {
        modalOverlayRef.current.style.display = 'block';
      }
      adjustIframeSize();
    };
    setTimeout(() => {
      adjustIframeSize();
        }, 500);


    window.addEventListener('resize', handleResize);

    if (modalOverlayRef.current) {
      modalOverlayRef.current.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (modalOverlayRef.current) {
        modalOverlayRef.current.removeEventListener('click', handleClickOutside);
      }
    };
  }, []);

  return (
    <div id="ai-chat-container" style={{ position: 'fixed', bottom: '100px', right: '20px', zIndex: 1000 }}>
      <button
        id="chat-toggle"
        onClick={() => {
          adjustIframeSize();
          if (modalOverlayRef.current) {
            modalOverlayRef.current.style.display = 'block';
            modalOverlayRef.current.style.opacity = '0';
            modalOverlayRef.current.style.transition = 'opacity 0.3s ease-in-out';
            setTimeout(() => {
              if (modalOverlayRef.current) {
                modalOverlayRef.current.style.opacity = '1';
              }
            }, 10);
          }
        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0f172a',
          color: 'white',
          border: 'none',
          borderRadius: '9999px',
          cursor: 'pointer',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          const button = e.currentTarget;
          button.style.transform = 'scale(1.05)';
          button.style.backgroundColor = '#1e293b';
        }}
        onMouseLeave={(e) => {
          const button = e.currentTarget;
          button.style.transform = 'scale(1)';
          button.style.backgroundColor = '#0f172a';
        }}
      >
        Ask AI
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      </button>
      <div
        id="modal-overlay"
        ref={modalOverlayRef}
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1001,
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <iframe
          id="chat-iframe"
          ref={chatIframeRef}
          src="https://chatbot-web-3.vercel.app"
          frameBorder="0"
          scrolling="no"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            borderRadius: '15px',
            width: '630px',
            height: '640px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
          }}
        ></iframe>
      </div>
    </div>
  );
}

export default ChatModal;
