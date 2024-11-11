'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import routes from '@/services/routes';
import Link from 'next/link';
import Topbar from '../components/Topbar';
import { Loading } from '@/components/daisyui/Loading';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Message = () => (
    <>
        <Topbar />
        <section className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center mx-4">
                    <div className="text-warning mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="card-title mb-2">Payment Not Completed</h2>
                    <p className="text-base-content mb-4">
                        Your payment process was not completed. This could be due to cancellation or an interruption in the payment flow.
                    </p>
                    <p className="text-sm text-base-content/70 mb-6">
                        If you're experiencing any issues, our support team is here to help.
                    </p>
                    <div className="card-actions flex flex-col w-full gap-2">
                        <Link href={routes.landing} className="btn btn-primary btn-block">
                            Return to Subscription Page
                        </Link>
                        <Link href={routes.contact} className="btn btn-outline btn-block">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </>
);

const SuccessDisplay = ({ sessionId }) => {
    const { width, height } = useWindowSize();
    
    return (
        <>
            <ReactConfetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={200}
            />
            <Topbar />
            <section className="min-h-screen bg-base-200 flex items-center justify-center p-4">
                <div className="container mx-auto px-4 py-8 flex flex-col items-center">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <Logo />
                            <h2 className="card-title text-success">Subscription Successful!</h2>
                            <p className="text-base-content">Your starter plan subscription has been activated.</p>

                            <form action="/create-portal-session" method="POST" className="w-full mt-6">
                                <input
                                    type="hidden"
                                    id="session-id"
                                    name="session_id"
                                    value={sessionId}
                                />
                                <Link 
                                    href="/admin/dashboard" 
                                    className="btn btn-primary btn-block mb-2"
                                >
                                    Go to Dashboard
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default function Page() {
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get('success')) {
            setSuccess(true);
            setSessionId(query.get('session_id'));
        }

        if (query.get('canceled')) {
            setSuccess(false);
        }
    }, [sessionId]);

    useEffect(() => {
        // When success and sessionId are determined, we can stop loading
        if (success !== undefined) {
            setIsLoading(false);
        }
    }, [success]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (success && sessionId !== '') {
        return <SuccessDisplay sessionId={sessionId} />;
    } else if (!success) {
        return <Message />;
    }

    // Fallback loading state (shouldn't normally be reached)
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
}
