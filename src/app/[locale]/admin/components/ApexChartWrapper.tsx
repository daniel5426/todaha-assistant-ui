"use client";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DynamicApexChart = ({ options, series, height }: { options: any, series: any, height: any }) => {
    return <ApexChart options={options} series={series} type="bar" height={height} />;
};

export default DynamicApexChart;
