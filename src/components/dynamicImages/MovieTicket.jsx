
import { useState,useEffect } from "react";

export default function MovieTicket({ movieTitle, watchedDate}) {

  const black = "#000000";
  const maxLength = 22;

  // State to handle title lines and rectangle dimensions
  const [titleLines, setTitleLines] = useState({ line1: movieTitle, line2: "" });
  const [rectHeight, setRectHeight] = useState(25);
  const [textYPosition, setTextYPosition] = useState(120);

  useEffect(() => {
      if (movieTitle.length > maxLength) {
          setTitleLines({
              line1: movieTitle.slice(0, maxLength),
              line2: movieTitle.slice(maxLength),
          });
          setRectHeight(47); // Increase rectangle height for two lines
          setTextYPosition(105); // Adjust text position for two lines
      } else {
          setTitleLines({ line1: movieTitle, line2: "" });
          setRectHeight(25);
          setTextYPosition(105);
      }
  }, [movieTitle]);

  return (
      <svg

    width="450"
    height="600"
    viewBox="0 0 300 400"
    xmlns="http://www.w3.org/2000/svg"
    style={{backgroundColor: '#ffffff' }}> 

{/* background logos */}
<circle cx="140" cy="65" r="50" fill="#d4d4d4"/>
<ellipse cx="140" cy="65" rx="50" ry="30" fill="#ededed"/>
<circle cx="150" cy="70" r="17" fill="#d4d4d4"/>
<text x="97" y ="150" fontWeight="bolder" fontSize="40" fill="#d4d4d4">cine</text>

<circle cx="140" cy="265" r="50" fill="#d4d4d4"/>
<ellipse cx="140" cy="265" rx="50" ry="30" fill="#ededed"/>
<circle cx="150" cy="270" r="17" fill="#d4d4d4"/>
<text x="97" y ="350" fontWeight="bolder" fontSize="40" fill="#d4d4d4">cine</text>

{/* text */}
    <text x="10" y ="60" fontWeight="bolder" fontSize="20" fill={black}>AUD 9</text>
    <text x="10" y ="80" fill={black}>ROW: E</text>
    <text x="100" y ="80" fill={black}>SEAT: 19</text>

    <rect x="10" y="87" width="210" height={rectHeight} fill={black} />
     {/* Display movie title, split into two lines if needed */}
     <text x="15" y={textYPosition} fill="#ffffff" fontWeight="bold">
                {titleLines.line1}
            </text>
            {titleLines.line2 && (
                <text x="15" y={textYPosition + 20} fill="#ffffff" fontWeight="bold">
                    {titleLines.line2}
                </text>
            )}

    <text x="10" y ="150" fill={black}>TUE 7:55</text>
    <text x="100" y ="150" fill={black}>{watchedDate}</text>

    <text x="35" y ="175" fontSize="11" fill={black}>Admission Price : $12.99</text>
    <text x="35" y ="185" fontSize="11" fill={black}>GST/HST : 1.21</text>
    <text x="35" y ="195" fontSize="11" fill={black}>Ticket Total : $14.20</text>

    <rect x="35" y="200" width="2" height="15" fill={black} />
    <rect x="40" y="200" width="3" height="15" fill={black} />
    <rect x="45" y="200" width="1" height="15" fill={black} />
    <rect x="48" y="200" width="2" height="15" fill={black} />
    <rect x="52" y="200" width="3" height="15" fill={black} />
    <rect x="58" y="200" width="1" height="15" fill={black} />
    <rect x="61" y="200" width="4" height="15" fill={black} />
    <rect x="67" y="200" width="2" height="15" fill={black} />
    <rect x="71" y="200" width="2" height="15" fill={black} />
    <rect x="75" y="200" width="3" height="15" fill={black} />
    <rect x="80" y="200" width="2" height="15" fill={black} />
    <rect x="84" y="200" width="1" height="15" fill={black} />
    <rect x="87" y="200" width="3" height="15" fill={black} />
    <rect x="92" y="200" width="2" height="15" fill={black} />
    <rect x="96" y="200" width="4" height="15" fill={black} />
    <rect x="102" y="200" width="1" height="15" fill={black} />
    <rect x="105" y="200" width="3" height="15" fill={black} />
    <rect x="110" y="200" width="2" height="15" fill={black} />
    <rect x="114" y="200" width="1" height="15" fill={black} />
    <rect x="117" y="200" width="2" height="15" fill={black} />
    <rect x="121" y="200" width="3" height="15" fill={black} />
    <rect x="126" y="200" width="2" height="15" fill={black} />
    <rect x="130" y="200" width="4" height="15" fill={black} />

    <text x="60" y="225" fontFamily="Arial, sans-serif" fontSize="7" fill={black}>723849106238</text>


    <rect x="5" y="260" width="25" height="25" fill={black} />
    <text x="9" y ="280" fontWeight="bold" fontSize="20" fill="#ffffff">G</text>
    <text x="35" y ="280" fontWeight="bold" fontSize="20" fill={black}>General</text>

    <text x="10" y ="320" fontSize="10" fill={black}>Please keep and maintain your ticket</text>

    <rect x="230" y="0" width="1" height="7" fill={black} />
    <rect x="230" y="10" width="1" height="7" fill={black} />
    <rect x="230" y="20" width="1" height="7" fill={black} />
    <rect x="230" y="30" width="1" height="7" fill={black} />
    <rect x="230" y="40" width="1" height="7" fill={black} />
    <rect x="230" y="50" width="1" height="7" fill={black} />
    <rect x="230" y="60" width="1" height="7" fill={black} />
    <rect x="230" y="70" width="1" height="7" fill={black} />
    <rect x="230" y="80" width="1" height="7" fill={black} />
    <rect x="230" y="90" width="1" height="7" fill={black} />
    <rect x="230" y="100" width="1" height="7" fill={black} />
    <rect x="230" y="110" width="1" height="7" fill={black} />
    <rect x="230" y="120" width="1" height="7" fill={black} />
    <rect x="230" y="130" width="1" height="7" fill={black} />
    <rect x="230" y="140" width="1" height="7" fill={black} />
    <rect x="230" y="150" width="1" height="7" fill={black} />
    <rect x="230" y="160" width="1" height="7" fill={black} />
    <rect x="230" y="170" width="1" height="7" fill={black} />
    <rect x="230" y="180" width="1" height="7" fill={black} />
    <rect x="230" y="190" width="1" height="7" fill={black} />
    <rect x="230" y="200" width="1" height="7" fill={black} />
    <rect x="230" y="210" width="1" height="7" fill={black} />
    <rect x="230" y="220" width="1" height="7" fill={black} />
    <rect x="230" y="230" width="1" height="7" fill={black} />
    <rect x="230" y="240" width="1" height="7" fill={black} />
    <rect x="230" y="250" width="1" height="7" fill={black} />
    <rect x="230" y="260" width="1" height="7" fill={black} />
    <rect x="230" y="270" width="1" height="7" fill={black} />
    <rect x="230" y="280" width="1" height="7" fill={black} />
    <rect x="230" y="290" width="1" height="7" fill={black} />
    <rect x="230" y="300" width="1" height="7" fill={black} />
    <rect x="230" y="310" width="1" height="7" fill={black} />
    <rect x="230" y="320" width="1" height="7" fill={black} />
    <rect x="230" y="330" width="1" height="7" fill={black} />
    <rect x="230" y="340" width="1" height="7" fill={black} />
    <rect x="230" y="350" width="1" height="7" fill={black} />
    <rect x="230" y="360" width="1" height="7" fill={black} />
    <rect x="230" y="370" width="1" height="7" fill={black} />
    <rect x="230" y="380" width="1" height="7" fill={black} />
    <rect x="230" y="390" width="1" height="7" fill={black} />

    <text x="240" y ="100" fontSize="8">{watchedDate}</text>
    <text x="240" y ="145" fontSize="8" fill={black}>7:55</text>
    <text x="240" y ="200" fontSize="8" fontWeight="bolder" fill={black}>Do Not Detach</text>
    <text x="240" y ="370" fontSize="9"  fill={black}> 348902</text>
    
    <image
          href="https://img.freepik.com/free-photo/white-paper-texture_1194-2301.jpg?t=st=1730839063~exp=1730842663~hmac=7f35e70039c5beeefb676438e1f707679bc1c4f34eb254554f67bcd61c36a7a0&w=996"
          x="0"
          y="0"
          width="300"
          height="400"
          preserveAspectRatio="none"
          opacity={.25}
        />

    
</svg>  );
}
