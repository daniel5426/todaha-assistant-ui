"use client";
import Head from 'next/head';

type PageMetaDataProps = {
    title: string;
};

const PageMetaData = ({ title }: PageMetaDataProps) => {
    return (
        <Head>
            <title>{title} | Nexus, Client & Admin React Dashboard</title>
        </Head>
    );
};

export default PageMetaData;
