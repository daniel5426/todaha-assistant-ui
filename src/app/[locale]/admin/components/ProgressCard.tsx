"use client";
import UserIcon from "@iconify/icons-lucide/user";
import { Badge, Card, CardBody } from "@/components/daisyui";

import Icon from "@/components/Icon";
import { useLocale, useTranslations } from "next-intl";
import { useStats } from "../(stats)/use-stats";
import { useAuthContext } from "@/states/auth";

export default function ProgressCard() {
    const t = useTranslations("dashboard");
    const locale = useLocale();
    const isRTL = locale === "he";
    const { state } = useAuthContext();
    const tokenCount = state?.user?.token_used || 0;
    const maxToken = state?.user?.token_limit || 100000;

    return (
        <Card className="bg-base-100 shadow h-full" bordered={false}>
            <CardBody className="gap-2">
                <div className="flex items-start justify-between gap-2 text-sm">
                    <div>
                        <p className="font-medium text-base-content/70 text-lg">
                            {t("token used")}
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <h5 className="inline text-2xl/none font-semibold">
                                {tokenCount}
                            </h5>
                            <progress
                                className="progress progress-info w-full sm:w-[1rem] md:w-[5rem] lg:w-[10rem] mr-2 ml-2"
                                value={tokenCount}
                                max={maxToken}
                            ></progress>
                            <h5 className="inline text-2xl/none font-semibold">{maxToken}</h5>
                            <Badge
                                className="gap-3 border-0 bg-success/10 mr-3 py-3 text-lg font-semibold text-success"
                                size="sm"
                            >
                                {tokenCount / (maxToken / 100)}%
                            </Badge>
                        </div>
                    </div>
                    <div className="rounded bg-base-200 p-2">
                        <Icon
                            icon={UserIcon}
                            className="text-base-content/80"
                            fontSize={20}
                        />
                    </div>
                </div>
                <p className="text-md font-medium">
                    <span className="ms-1.5 text-base-content/60">
                        {t("token left 1")}
                    </span>
                    <span className={"text-success"}> {maxToken - tokenCount}</span>
                    <span className="ms-1.5 text-base-content/60">
                        {t("token left 2")}
                    </span>
                </p>
            </CardBody>
        </Card>
    );
}
