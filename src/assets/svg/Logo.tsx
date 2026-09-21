import React from "react";

interface PhHealthcareLogoProps extends React.SVGProps<SVGSVGElement> {
    width?: number | string;
    height?: number | string;
    title?: string;
}

export default function PhHealthcareLogo({
    width = "50",
    height = "50",
    className = "",
    title = "PH Healthcare Logo",
    ...props
}: PhHealthcareLogoProps) {
    const titleId = `logo-title-${Math.random().toString(36).substring(2, 9)}`;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            width={width}
            height={height}
            className={className}
            role="img"
            aria-labelledby={titleId}
            {...props}
        >
            <title id={titleId}>{title}</title>
            <defs>
                {/* Gradients */}
                <linearGradient
                    id="shieldGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>

                <linearGradient
                    id="accentGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#1e40af" />
                </linearGradient>

                <filter
                    id="dropShadow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                >
                    <feDropShadow
                        dx="0"
                        dy="4"
                        stdDeviation="6"
                        floodColor="#0f172a"
                        floodOpacity="0.15"
                    />
                </filter>
            </defs>

            <g transform="translate(0, 0)">
                {/* Outer Shield / Circle Elements */}
                <g filter="url(#dropShadow)">
                    <path
                        d="M 250 55 A 145 145 0 1 1 130 95"
                        fill="none"
                        stroke="url(#shieldGrad)"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 250 85 L 340 120 C 340 220 290 310 250 340 C 210 310 160 220 160 120 Z"
                        fill="#ffffff"
                        opacity="0.9"
                    />
                    <path
                        d="M 250 75 L 350 115 C 350 225 300 320 250 355 C 200 320 150 225 150 115 Z"
                        fill="none"
                        stroke="url(#shieldGrad)"
                        strokeWidth="8"
                        strokeLinejoin="round"
                    />
                </g>

                {/* Caduceus / Medical Cross Centerpiece */}
                <g fill="url(#accentGrad)">
                    <rect x="244" y="130" width="12" height="190" rx="6" />
                    <circle cx="250" cy="125" r="9" />
                    <path d="M 250 145 C 220 130 180 140 170 155 C 185 170 210 165 240 175 Z" />
                    <path d="M 250 145 C 280 130 320 140 330 155 C 315 170 290 165 260 175 Z" />
                    <path
                        d="M 210 175 L 210 250 L 235 250 C 255 250 265 240 265 225 C 265 210 255 200 235 200 L 230 200 L 230 175 Z"
                        fill="#1e40af"
                        opacity="0.85"
                    />
                </g>

                {/* Snakes / Medical Asclepius Curves */}
                <path
                    d="M 250 170 C 230 190 270 210 250 230 C 230 250 270 270 250 290"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="5"
                    strokeLinecap="round"
                />
                <path
                    d="M 250 170 C 270 190 230 210 250 230 C 270 250 230 270 250 290"
                    fill="none"
                    stroke="#1d4ed8"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.7"
                />

                {/* Typography Section */}
                <g textAnchor="middle">
                    <text
                        x="250"
                        y="415"
                        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                        fontWeight="800"
                        fontSize="30"
                        fill="#0f172a"
                        letterSpacing="3"
                    >
                        PH HEALTHCARE
                    </text>
                    <text
                        x="250"
                        y="445"
                        fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
                        fontWeight="500"
                        fontSize="14"
                        fill="#475569"
                        letterSpacing="1.5"
                    >
                        Your Trusted Health Partner
                    </text>
                </g>
            </g>
        </svg>
    );
}
