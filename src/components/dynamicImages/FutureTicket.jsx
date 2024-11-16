import { useState, useEffect } from "react";

export default function FutureTicket({ user, movieTitle, watchDate }) {

    
    const [titleLines, setTitleLines] = useState({ line1: movieTitle, line2: "" });
    const [textYPosition, setTextYPosition] = useState(160);

    useEffect(() => {
        //continuing string on next line if too long
        const maxLength = 26;

        if (movieTitle.length > maxLength) {
            setTitleLines({
                line1: movieTitle.slice(0, maxLength),
                line2: movieTitle.slice(maxLength),
            });
            setTextYPosition(150);
        } else {
            setTitleLines({ line1: movieTitle, line2: "" });
            setTextYPosition(160);
        }
    }, [movieTitle]);

    return (
        <div>
            <svg width="620" height="300">
                <defs>
                    <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff0080" />
                        <stop offset="25%" stopColor="#ff00ff" />
                        <stop offset="50%" stopColor="#00ffff" />
                    </linearGradient>
                    <clipPath id="circleClip">
                        <circle cx="85" cy="70" r="35" />
                    </clipPath>
                </defs>
                
                {/* Path and Lines */}
                <path
                    d="M15,5 A10,10 0 0 0 5,15 L5,112 A1,1 0 0 1 5,187 L5,285 A10,10 0 0 0 15,295 L605,295 A10,10 0 0 0 615,285 L615,187 A1,1 0 0 1 615,112 L615,15 A10,10 0 0 0 605,5 Z"
                    fill="none"
                    stroke="url(#shine)"
                    strokeWidth="5"
                />
                {/* Dashed Lines */}
                {[...Array(30)].map((_, index) => (
                    <line
                        key={index}
                        x1="480"
                        y1={10 + index * 10}
                        x2="480"
                        y2={15 + index * 10}
                        stroke="#555555"
                        strokeWidth="1"
                    />
                ))}
                
                {/* Profile Image and Username */}
                <image href={user.imageUrl} x="50" y="35" height="70" clipPath="url(#circleClip)" />
                <text x="135" y="70" fontWeight="bold" fontSize="25" fill="#ffffff">
                    {user.username}
                </text>

                {/* Decorative Elements */}
                <circle cx="60" cy="220" r="30" fill="#43034f" />
                <ellipse cx="60" cy="220" rx="30" ry="15" fill="#f2f2d2" />
                <circle cx="68" cy="223" r="9" fill="#1c1b1c" />
                <text x="32" y="280" fontSize="30" fontWeight="lighter" fill="#515151" opacity={0.5}>
                    cine
                </text>

                {/* Watched Date */}
                <text x="345" y="240" fontSize="20" fontWeight="bold" fill="#ffffff">
                    Watched On
                </text>
                <text x="380" y="270" fontSize="20" fontWeight="bold" fill="#ffffff">
                    {watchDate}
                </text>

                {/* Movie Title */}
                <text x="100" y={textYPosition} fontSize="30" fontWeight="bolder" fill="none" stroke="#ffffff" strokeWidth="1">
                    {titleLines.line1}
                </text>
                {titleLines.line2 && (
                    <text x="100" y={textYPosition + 40} fontSize="30" fontWeight="bolder" fill="none" stroke="#ffffff" strokeWidth="1">
                        {titleLines.line2}
                    </text>
                )}
            </svg>
        </div>
    );
}
