import { Box, Button, Card, Chip, Container, Typography, Grid, CardContent, CardActions, Divider } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import Cookies from "js-cookie";
import { createCheckoutSession } from '@/app/lib/data';
import useToast from '@/hooks/use-toast';
import routes from "@/services/routes";
import { useLayoutContext } from "@/states/layout";

const Package = () => {
    const t = useTranslations("package");
    const locale = useLocale();
    const isRTL = locale === "he";
    const [isLoading, setIsLoading] = useState(false);
    const { toaster } = useToast();
    const { state: layoutState } = useLayoutContext();
    const isWhite = layoutState.theme === "light";

    const handleCheckout = async (priceId: string) => {
        setIsLoading(true);
        const loggedIn = Cookies.get("loggedIn") === "true";
        if (!loggedIn) {
            window.location.href = routes.auth.login;
            return;
        }
        try {
            const { url } = await createCheckoutSession(priceId);
            window.location.href = url;
        } catch (error) {
            console.error('Error:', error);
            toaster.error(t('errorCheckout'));
        } finally {
            setIsLoading(false);
        }
    };

    const tiers = [
        {
            title: t("Starter"),
            price: t("Free"),
            subheader: t("Base"),
            description: [
                t("60k tokens per month"),
                t("1 AI Assistant"),
                t("Our Platform"),
                t("Customization Service"),
                { text: t("support"), disabled: true },
                { text: t("Custom development by our team"), disabled: true }
            ],
            buttonText: t("Start Now"),
            buttonVariant: 'outlined',
            buttonColor: 'primary',
            buttonSx: {
                borderColor: isWhite ? 'primary.main' : 'grey.400',
                color: isWhite ? 'primary.main' : 'grey.100',
                '&:hover': {
                    borderColor: isWhite ? 'primary.dark' : 'grey.300',
                    backgroundColor: 'rgba(144, 202, 249, 0.08)'
                }
            },
            href: routes.dashboard
        },
        {
            title: t("Standard"),
            price: t("100$"),
            subheader: t("Most Popular"),
            description: [
                t("2M tokens per month"),
                t("1 AI Assistant"),
                t("Our Platform"),
                t("Customization Service"),
                t("support"),
                t("Custom development by our team")
            ],
            buttonText: t("Buy Now"),
            buttonVariant: 'contained',
            buttonColor: 'primary',
            priceId: 'price_1QOvrSB16lQffSxJhy8KNPs7'
        },
        {
            title: t("Pro"),
            price: t("$700"),
            subheader: t("Enhanced Version"),
            description: [
                t("Unlimited tokens per month"),
                t("1 AI Assistant"),
                t("Our Platform"),
                t("Customization Service"),
                t("support"),
                t("Custom development by our team")
            ],
            buttonText: t("Buy Now"),
            buttonVariant: 'outlined',
            buttonColor: 'primary',
            buttonSx: {
                borderColor: isWhite ? 'primary.main' : 'grey.400',
                color: isWhite ? 'primary.main' : 'grey.100',
                '&:hover': {
                    borderColor: isWhite ? 'primary.dark' : 'grey.300',
                    backgroundColor: 'rgba(144, 202, 249, 0.08)'
                }
            },
            priceId: 'price_1QOvs3B16lQffSxJ5Hqibeb7'
        }
    ];

    return (
        <Container
            id="packages"
            sx={{
                pt: { xs: 4, sm: 4, md: 10 },
                pb: { xs: 4, sm: 4, md: 10 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 4, sm: 4 },
                direction: isRTL ? 'rtl' : 'ltr',
                height: '100%',
                justifyContent: 'center',
                px: { xs: 1, sm: 2, md: 3 }
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    mx: 'auto',
                    backgroundColor: {
                        xs: 'transparent',
                        sm: isWhite ? 'background.paper' : 'hsl(220, 30%, 16%)'
                    },
                    borderRadius: { xs: 0, sm: '24px' },
                    boxShadow: {
                        xs: 'none',
                        sm: isWhite 
                            ? '0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)'
                            : '0 12px 40px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)'
                    },
                    p: { xs: 0, sm: 5, md: 8 },
                    border: {
                        xs: 'none',
                        sm: isWhite ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.05)'
                    },
                    position: 'relative',
                    '&::before': {
                        display: { xs: 'none', sm: 'block' },
                        content: '""',
                        position: 'absolute',
                        inset: -1,
                        borderRadius: '24px',
                        background: isWhite 
                            ? 'linear-gradient(145deg, rgba(144, 202, 249, 0.2), rgba(255, 255, 255, 0))'
                            : 'linear-gradient(145deg, rgba(144, 202, 249, 0.1), rgba(255, 255, 255, 0))',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: 'center',
                        mx: 'auto'
                    }}
                >
                    <Typography
                        component="h2"
                        variant="h4"
                        gutterBottom
                        sx={{ 
                            color: isWhite ? 'text.primary' : 'grey.100',
                            fontWeight: 600,
                            mb: 2,
                            fontSize: { xs: '1.75rem', sm: '2.125rem' }
                        }}
                    >
                        {t("Packages")}
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: isWhite ? 'text.secondary' : 'grey.300',
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            lineHeight: 1.5
                        }}
                    >
                        {t("Packages_b")}
                    </Typography>
                </Box>

                <Grid container spacing={4} sx={{ alignItems: 'center', justifyContent: 'center', width: '100%', mt: 2 }}>
                    {tiers.map((tier) => (
                        <Grid item xs={12} sm={6} md={4} key={tier.title}>
                            <Card
                                sx={[
                                    {
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        height: '100%',
                                        maxWidth: 400,
                                        mx: 'auto',
                                        borderRadius: 2,
                                        border: isWhite ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
                                        background: isWhite
                                            ? '#fff'
                                            : 'hsl(220, 30%, 16%)',
                                        boxShadow: isWhite
                                            ? '0 8px 12px hsla(220, 20%, 42%, 0.1)'
                                            : '0 8px 12px hsla(0, 0%, 0%, 0.2)',
                                    },
                                    tier.subheader === t("Most Popular") && {
                                        border: 'none',
                                        background: isWhite
                                            ? 'radial-gradient(circle at 50% 0%, hsl(220, 20%, 35%), hsl(220, 30%, 6%))'
                                            : 'radial-gradient(circle at 50% 0%, hsl(220, 20%, 20%), hsl(220, 30%, 16%))',
                                        boxShadow: isWhite
                                            ? '0 8px 12px hsla(220, 20%, 42%, 0.2)'
                                            : '0 8px 12px hsla(0, 0%, 0%, 0.8)',
                                    },
                                ]}
                            >
                                <CardContent sx={{ p: 1 }}>
                                    <Box
                                        sx={{
                                            mb: 1,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            gap: 2,
                                            color: !isWhite || tier.subheader === t("Most Popular") ? 'grey.100' : 'inherit',
                                        }}
                                    >
                                        <Typography component="h3" variant="h6">
                                            {tier.title}
                                        </Typography>
                                        {tier.subheader && (
                                            <Chip
                                                icon={<AutoAwesomeIcon />}
                                                label={tier.subheader}
                                                color={tier.subheader === t("Most Popular") ? "primary" : "default"}
                                                size="small"
                                                sx={{
                                                    bgcolor: !isWhite && tier.subheader !== t("Most Popular") 
                                                        ? 'rgba(255, 255, 255, 0.1)' 
                                                        : undefined,
                                                    '& .MuiChip-label': {
                                                        color: !isWhite && tier.subheader !== t("Most Popular")
                                                            ? 'grey.100'
                                                            : undefined
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        color: !isWhite && tier.subheader !== t("Most Popular")
                                                            ? 'grey.100'
                                                            : undefined
                                                    }
                                                }}
                                            />
                                        )}
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            color: !isWhite || tier.subheader === t("Most Popular") ? 'grey.50' : 'inherit',
                                        }}
                                    >
                                        <Typography 
                                            component="h3" 
                                            sx={{ 
                                                fontSize: '2rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            {tier.price === t("Free") ? tier.price : `${tier.price}`}
                                        </Typography>
                                        {tier.price !== t("Free") && (
                                            <Typography 
                                                component="span" 
                                                sx={{ 
                                                    fontSize: '1rem',
                                                    ml: 0.5
                                                }}
                                            >
                                                /{t("per month")}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Divider sx={{ my: 2, opacity: 0.2 }} />

                                    {tier.description.map((line, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                py: 0.75,
                                                display: 'flex',
                                                gap: 1.5,
                                                alignItems: 'center',
                                            }}
                                        >
                                            {typeof line === 'object' && line.disabled ? (
                                                <CancelIcon color="disabled" sx={{ width: 18 }} />
                                            ) : (
                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        width: 18,
                                                        color: tier.subheader === t("Most Popular")
                                                            ? 'primary.light'
                                                            : 'primary.main',
                                                    }}
                                                />
                                            )}
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: !isWhite || tier.subheader === t("Most Popular")
                                                        ? 'grey.50'
                                                        : 'inherit',
                                                }}
                                            >
                                                {typeof line === 'object' ? line.text : line}
                                            </Typography>
                                        </Box>
                                    ))}
                                </CardContent>

                                <CardActions sx={{ p: 2, pt: 0 }}>
                                    {tier.href ? (
                                        <Button
                                            href={tier.href}
                                            variant={tier.buttonVariant as 'outlined' | 'contained'}
                                            color={tier.buttonColor as 'primary'}
                                            fullWidth
                                            sx={{ 
                                                borderRadius: 1,
                                                ...tier.buttonSx 
                                            }}
                                        >
                                            {tier.buttonText}
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => tier.priceId && handleCheckout(tier.priceId)}
                                            variant={tier.buttonVariant as 'outlined' | 'contained'}
                                            color={tier.buttonColor as 'primary'}
                                            fullWidth
                                            disabled={isLoading}
                                            sx={{ 
                                                borderRadius: 1,
                                                ...tier.buttonSx 
                                            }}
                                        >
                                            {isLoading ? t("Processing") : tier.buttonText}
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Package;
