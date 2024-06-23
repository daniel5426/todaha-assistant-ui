"use client";
import arrowDownIcon from "@iconify/icons-lucide/arrow-down";
import arrowUpIcon from "@iconify/icons-lucide/arrow-up";

import { useMemo } from "react";

import { Badge, Card, CardBody } from "@/components/daisyui";

import Icon from "@/components/Icon";
import { getEcommerceDashboardCounterData } from "@/data/dashboards/ecommerce";
import { IEcommerceDashboardCounter } from "@/types/dashboards/ecommerce";
import { useStats } from "../use-stats";
import { StatsToCounterData, StatsToCounterData2 } from "@/app/lib/serialize/serialize";
import { CounterCard } from "@/types/dashboards/chat_statistics";

const SingleCounter = ({ counter }: { counter: CounterCard }) => {
    const { icon, title, amount, changes, inMoney, changesAmount, subTitle } = counter;

    return (
        <Card className="bg-base-100 shadow" bordered={false}>
            <CardBody className="gap-2">
                <div className="flex items-start justify-between gap-2 text-sm">
                    <div>
                        <p className="font-medium text-base-content/70">{title}</p>
                        <div className="mt-4 flex items-center gap-2">
                            <h5 className="inline text-2xl/none font-semibold">
                                {inMoney && "$"}
                                {amount}
                            </h5>
                            <>
                                {changes !== 0?(changes > 0 ? (
                                    <Badge
                                        className="gap-1 border-0 bg-success/10 py-3 text-xs font-semibold text-success"
                                        size="sm">
                                        <Icon icon={arrowUpIcon} fontSize={14} />
                                        {changes}%
                                    </Badge>
                                ) : (
                                    <Badge
                                        className="gap-1 border-0 bg-error/10 py-3 text-xs font-semibold text-error"
                                        size="sm">
                                        <Icon icon={arrowDownIcon} fontSize={14} />
                                        {-changes}%
                                    </Badge>
                                )):(
                                    <Badge
                                        className="gap-1 border-0 bg-error/10 py-3 text-xs font-semibold text-warning"
                                        size="sm">
                                        {changes}%
                                    </Badge>
                                )}
                            </>
                        </div>
                    </div>
                    <div className="rounded bg-base-200 p-2 ">
                        <Icon icon={icon} className="text-base-content/80" fontSize={20} />
                    </div>
                </div>

                <p className="text-sm font-medium">
                    <span className={changes !== 0?(changes > 0 ? "text-success" : "text-error"):"text-warning"}>
                        {changes !== 0?(changes > 0 ? "+" : "-"):""}
                        {inMoney && "$"}
                        {Math.abs(changesAmount)}
                    </span>
                    <span className="ms-1.5 text-base-content/60">{subTitle}</span>
                </p>
            </CardBody>
        </Card>
    );
};

export function DashboardCounterWidget  () {
    const { chartStats } = useStats();
    
    const data = useMemo(() => {
        return StatsToCounterData(chartStats)
    }, [chartStats]);
    return (
        <>
            {data.map((counter, index) => (
                <SingleCounter counter={counter} key={index} />
            ))}
        </>
    );
};

export function StatsCounterWidget  () {
    const { chartStats } = useStats();
    
    const data = useMemo(() => {
        return StatsToCounterData2(chartStats)
    }, [chartStats]);
    return (
        <>
            {data.map((counter, index) => (
                <SingleCounter counter={counter} key={index} />
            ))}
        </>
    );
};
