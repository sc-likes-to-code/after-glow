// High-quality SVG photo illustrations rendered as crisp data URLs
// Guaranteed to never break, work 100% offline, and render instantly in polaroids!

function svgToDataUrl(svgString: string): string {
  const cleaned = svgString.replace(/\s+/g, ' ').trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(cleaned)}`;
}

export const SAMPLE_PHOTOS = {
  sundayMorningCoffee: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFDF7" />
          <stop offset="50%" stop-color="#F6EBD9" />
          <stop offset="100%" stop-color="#EAD5BB" />
        </linearGradient>
        <radialGradient id="sunbeam" cx="20%" cy="10%" r="90%">
          <stop offset="0%" stop-color="#FFF5D1" stop-opacity="0.85"/>
          <stop offset="70%" stop-color="#F2DFB8" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#E8D1B0" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(#bgGrad)"/>
      <rect width="600" height="600" fill="url(#sunbeam)"/>
      
      <!-- Table wood planks -->
      <path d="M0,420 Q300,410 600,420 L600,600 L0,600 Z" fill="#D3BEA2" opacity="0.4"/>
      <path d="M0,490 Q300,480 600,490" stroke="#C2AA8C" stroke-width="2" stroke-dasharray="4 6"/>
      
      <!-- Open Book -->
      <g transform="translate(140, 360)">
        <polygon points="0,70 140,55 280,70 270,120 140,110 10,120" fill="#EFE8D6" stroke="#9A8878" stroke-width="1.5"/>
        <line x1="140" y1="55" x2="140" y2="110" stroke="#8C7969" stroke-width="2"/>
        <line x1="30" y1="75" x2="120" y2="70" stroke="#C0B4A4" stroke-width="1.5"/>
        <line x1="30" y1="85" x2="125" y2="80" stroke="#C0B4A4" stroke-width="1.5"/>
        <line x1="30" y1="95" x2="110" y2="90" stroke="#C0B4A4" stroke-width="1.5"/>
        <line x1="155" y1="70" x2="245" y2="75" stroke="#C0B4A4" stroke-width="1.5"/>
        <line x1="155" y1="80" x2="250" y2="85" stroke="#C0B4A4" stroke-width="1.5"/>
        <line x1="155" y1="90" x2="235" y2="95" stroke="#C0B4A4" stroke-width="1.5"/>
        <!-- Pressed wildflower bookmark -->
        <path d="M140,40 Q130,20 142,5 Q148,22 140,40" fill="#C98B94"/>
        <line x1="140" y1="40" x2="140" y2="70" stroke="#7A9471" stroke-width="1.5"/>
      </g>
      
      <!-- Ceramic Cup & Saucer -->
      <g transform="translate(370, 310)">
        <ellipse cx="60" cy="115" rx="55" ry="18" fill="#D8CBC4"/>
        <ellipse cx="60" cy="110" rx="52" ry="16" fill="#F0EAE1" stroke="#BAA79E" stroke-width="1.5"/>
        <!-- Cup Body -->
        <path d="M25,60 C25,100 95,100 95,60 Z" fill="#F9F6F0" stroke="#A8968D" stroke-width="2"/>
        <!-- Coffee surface -->
        <ellipse cx="60" cy="60" rx="35" ry="12" fill="#5F4333"/>
        <ellipse cx="60" cy="60" rx="28" ry="8" fill="#4B3326"/>
        <path d="M52,58 Q60,54 68,58 Q60,62 52,58" fill="#D3A786" opacity="0.6"/>
        <!-- Handle -->
        <path d="M92,68 C115,68 115,92 90,92" fill="none" stroke="#A8968D" stroke-width="3" stroke-linecap="round"/>
        <!-- Steam swirls -->
        <path d="M50,42 Q45,28 55,16 Q65,4 58,-8" fill="none" stroke="#D1BEB0" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
        <path d="M70,38 Q78,24 68,12 Q60,0 68,-10" fill="none" stroke="#D1BEB0" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      </g>

      <!-- Soft Window light shadow & Croissant -->
      <g transform="translate(180, 240)">
        <path d="M-60,-120 L30,-120 L-40,80 L-130,80 Z" fill="#FFFFFF" opacity="0.25"/>
        <path d="M20,-120 L110,-120 L40,80 L-50,80 Z" fill="#FFFFFF" opacity="0.25"/>
      </g>
      <!-- Croissant on small dish -->
      <g transform="translate(80, 310)">
        <ellipse cx="50" cy="65" rx="42" ry="14" fill="#E4DCD0" stroke="#B8A79B" stroke-width="1.5"/>
        <path d="M22,62 C25,45 45,35 60,40 C75,45 82,60 78,65 C68,58 35,58 22,62 Z" fill="#D89E62" stroke="#AC733F" stroke-width="1.5"/>
        <path d="M38,42 C45,38 55,39 60,45" stroke="#C48443" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>
  `),

  eveningWalkSunset: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#495B70" />
          <stop offset="25%" stop-color="#8E7D93" />
          <stop offset="50%" stop-color="#DDA19B" />
          <stop offset="75%" stop-color="#F7C8A4" />
          <stop offset="100%" stop-color="#FCEFD5" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#skyGrad)"/>
      
      <!-- Setting Golden Sun -->
      <circle cx="340" cy="380" r="54" fill="#FFF2BD" opacity="0.9"/>
      <circle cx="340" cy="380" r="75" fill="#FFE8A3" opacity="0.4"/>
      
      <!-- Gentle Cloud wisps -->
      <path d="M50,220 Q180,200 320,230 Q460,250 560,210" stroke="#F5B8B0" stroke-width="16" stroke-linecap="round" opacity="0.6"/>
      <path d="M120,280 Q260,260 400,285 Q500,295 580,270" stroke="#F8CCA8" stroke-width="12" stroke-linecap="round" opacity="0.5"/>
      
      <!-- Distant Hills -->
      <path d="M0,450 Q180,410 380,440 Q500,455 600,430 L600,600 L0,600 Z" fill="#755E6B"/>
      
      <!-- Foreground Ridge & Trees Silhouettes -->
      <path d="M0,500 Q200,470 420,510 Q520,520 600,490 L600,600 L0,600 Z" fill="#3D323E"/>
      
      <!-- Tree silhouettes -->
      <g fill="#2D232E">
        <!-- Tree 1 -->
        <path d="M80,510 Q78,410 82,380 Q88,410 86,510 Z"/>
        <ellipse cx="82" cy="360" rx="35" ry="50"/>
        <!-- Tree 2 -->
        <path d="M130,520 Q128,440 132,410 Q138,440 136,520 Z"/>
        <ellipse cx="132" cy="395" rx="25" ry="38"/>
        <!-- Tree 3 -->
        <path d="M520,510 Q518,420 522,390 Q528,420 526,510 Z"/>
        <ellipse cx="522" cy="370" rx="32" ry="46"/>
      </g>
      
      <!-- Silhouetted birds in flight -->
      <g stroke="#3D323E" stroke-width="2.5" fill="none" stroke-linecap="round">
        <path d="M220,180 Q228,172 236,180 Q244,172 252,180"/>
        <path d="M255,160 Q261,154 267,160 Q273,154 279,160"/>
        <path d="M285,185 Q291,179 297,185 Q303,179 309,185"/>
      </g>
      
      <!-- Country road winding -->
      <path d="M280,600 Q310,540 330,510 Q350,480 340,460" stroke="#B09B8B" stroke-width="16" fill="none" opacity="0.6"/>
    </svg>
  `),

  cozyCafeDiscovery: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <linearGradient id="cafeWall" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EBE3D5" />
          <stop offset="100%" stop-color="#D5C7B2" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#cafeWall)"/>
      
      <!-- Arched window with plants -->
      <path d="M120,600 L120,240 A180,180 0 0,1 480,240 L480,600 Z" fill="#889FA5" opacity="0.3"/>
      <path d="M130,600 L130,245 A170,170 0 0,1 470,245 L470,600 Z" fill="#F4EFE6"/>
      <!-- Window panes -->
      <line x1="300" y1="75" x2="300" y2="600" stroke="#B3A292" stroke-width="6"/>
      <line x1="130" y1="280" x2="470" y2="280" stroke="#B3A292" stroke-width="5"/>
      <line x1="130" y1="420" x2="470" y2="420" stroke="#B3A292" stroke-width="5"/>

      <!-- Hanging Pothos Plant -->
      <g transform="translate(300, 100)">
        <line x1="0" y1="0" x2="0" y2="70" stroke="#7A6858" stroke-width="2"/>
        <path d="M-25,70 L25,70 L18,95 L-18,95 Z" fill="#C98A73"/>
        <!-- Vines trailing down -->
        <path d="M-15,85 Q-40,140 -20,190 Q-5,240 -25,290" fill="none" stroke="#5F7D52" stroke-width="2.5"/>
        <path d="M10,85 Q35,130 15,180 Q-5,220 20,270" fill="none" stroke="#5F7D52" stroke-width="2.5"/>
        <!-- Leaves -->
        <ellipse cx="-28" cy="115" rx="10" ry="14" transform="rotate(-25 -28 115)" fill="#6E8E5F"/>
        <ellipse cx="-38" cy="150" rx="12" ry="16" transform="rotate(35 -38 150)" fill="#7FA270"/>
        <ellipse cx="-18" cy="195" rx="10" ry="15" transform="rotate(-15 -18 195)" fill="#658457"/>
        <ellipse cx="-10" cy="240" rx="11" ry="14" transform="rotate(40 -10 240)" fill="#769866"/>
        <ellipse cx="25" cy="110" rx="11" ry="15" transform="rotate(30 25 110)" fill="#789B69"/>
        <ellipse cx="32" cy="150" rx="12" ry="16" transform="rotate(-20 32 150)" fill="#6A8A5B"/>
        <ellipse cx="14" cy="195" rx="10" ry="15" transform="rotate(35 14 195)" fill="#7E9F6E"/>
      </g>
      
      <!-- Little cafe bistro table -->
      <ellipse cx="300" cy="540" rx="220" ry="60" fill="#EADBC8" stroke="#9A8270" stroke-width="3"/>
      <!-- Flower vase on table -->
      <g transform="translate(230, 420)">
        <rect x="0" y="40" width="30" height="60" rx="8" fill="#FBF9F5" stroke="#9E8D80" stroke-width="2"/>
        <line x1="15" y1="40" x2="15" y2="-10" stroke="#688358" stroke-width="2"/>
        <!-- Buttercup flower -->
        <circle cx="15" cy="-15" r="14" fill="#F7CA4F"/>
        <circle cx="15" cy="-15" r="6" fill="#D48624"/>
      </g>
      <!-- Handwritten Menu Chalkboard on wall -->
      <g transform="translate(30, 160)">
        <rect x="0" y="0" width="70" height="110" rx="4" fill="#434440" stroke="#7A6858" stroke-width="3"/>
        <line x1="12" y1="20" x2="58" y2="20" stroke="#FAF8F5" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="15" y1="35" x2="55" y2="35" stroke="#FAF8F5" stroke-width="1" stroke-dasharray="2 3"/>
        <line x1="15" y1="50" x2="52" y2="50" stroke="#FAF8F5" stroke-width="1" stroke-dasharray="2 3"/>
        <line x1="15" y1="65" x2="55" y2="65" stroke="#FAF8F5" stroke-width="1" stroke-dasharray="2 3"/>
        <line x1="15" y1="80" x2="45" y2="80" stroke="#FAF8F5" stroke-width="1" stroke-dasharray="2 3"/>
      </g>
    </svg>
  `),

  rainyDayWindow: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <linearGradient id="rainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4B5864" />
          <stop offset="40%" stop-color="#738190" />
          <stop offset="100%" stop-color="#A5B1BC" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#rainGrad)"/>
      
      <!-- Blurred cozy lights through glass -->
      <circle cx="160" cy="220" r="45" fill="#F8DE9D" opacity="0.35"/>
      <circle cx="380" cy="180" r="65" fill="#E9B58A" opacity="0.3"/>
      <circle cx="480" cy="320" r="50" fill="#FAD1A0" opacity="0.25"/>
      <circle cx="240" cy="380" r="55" fill="#E6A8A4" opacity="0.3"/>

      <!-- Rain streaks on window glass -->
      <g stroke="#C2D3DE" stroke-linecap="round" opacity="0.6">
        <line x1="80" y1="40" x2="70" y2="140" stroke-width="2"/>
        <line x1="140" y1="90" x2="135" y2="240" stroke-width="2.5"/>
        <line x1="220" y1="20" x2="210" y2="190" stroke-width="3"/>
        <line x1="310" y1="80" x2="305" y2="260" stroke-width="2"/>
        <line x1="420" y1="30" x2="410" y2="180" stroke-width="2.5"/>
        <line x1="510" y1="70" x2="505" y2="230" stroke-width="1.8"/>
      </g>
      
      <!-- Water droplets condensation -->
      <g fill="#D8E7F0" opacity="0.75">
        <circle cx="70" cy="145" r="4"/>
        <circle cx="135" cy="246" r="5"/>
        <circle cx="210" cy="195" r="6"/>
        <circle cx="305" cy="265" r="4"/>
        <circle cx="180" cy="320" r="3.5"/>
        <circle cx="270" cy="130" r="4"/>
        <circle cx="370" cy="360" r="5"/>
        <circle cx="450" cy="280" r="3"/>
        <circle cx="480" cy="120" r="4"/>
        <circle cx="90" cy="400" r="4.5"/>
        <circle cx="340" cy="480" r="3"/>
      </g>
      
      <!-- Cozy warm indoor windowsill -->
      <rect x="0" y="470" width="600" height="130" fill="#E8DDD1"/>
      <line x1="0" y1="470" x2="600" y2="470" stroke="#B8A799" stroke-width="4"/>
      
      <!-- Candle in glass jar glowing -->
      <g transform="translate(180, 420)">
        <rect x="0" y="10" width="60" height="70" rx="8" fill="#F4EFE6" stroke="#9A897B" stroke-width="2" opacity="0.9"/>
        <path d="M10,25 L50,25 L50,75 L10,75 Z" fill="#EAD9BA"/>
        <!-- Wick and Flame -->
        <line x1="30" y1="25" x2="30" y2="16" stroke="#5E4C3D" stroke-width="2"/>
        <ellipse cx="30" cy="10" rx="8" ry="14" fill="#FFC956"/>
        <ellipse cx="30" cy="11" rx="4" ry="8" fill="#FFF2BD"/>
        <!-- Warm Glow around candle -->
        <circle cx="30" cy="10" r="40" fill="#FFDF79" opacity="0.35"/>
      </g>
      <!-- Teacup on windowsill -->
      <g transform="translate(340, 435)">
        <path d="M10,20 C10,50 60,50 60,20 Z" fill="#FAF7F2" stroke="#8E7C70" stroke-width="2"/>
        <ellipse cx="35" cy="20" rx="25" ry="8" fill="#583C28"/>
        <!-- Warm herbal tea leaf -->
        <circle cx="35" cy="20" r="2" fill="#889E6E"/>
        <path d="M35,12 Q30,2 38,-8" stroke="#D3C3B5" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      </g>
    </svg>
  `),

  friendsPicnicLaughter: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#C5DBBC" />
          <stop offset="100%" stop-color="#93B887" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#grassGrad)"/>
      
      <!-- Scattered Dappled sunlight through tree leaves -->
      <g fill="#FDF7E4" opacity="0.4">
        <circle cx="80" cy="90" r="50"/>
        <circle cx="180" cy="150" r="35"/>
        <circle cx="320" cy="80" r="60"/>
        <circle cx="480" cy="160" r="45"/>
        <circle cx="530" cy="70" r="55"/>
        <circle cx="240" cy="480" r="40"/>
        <circle cx="440" cy="500" r="50"/>
      </g>

      <!-- Gingham Picnic Blanket -->
      <g transform="translate(90, 160) rotate(-6)">
        <rect x="0" y="0" width="440" height="340" rx="16" fill="#F2EBE5" stroke="#BFABA0" stroke-width="2"/>
        <!-- Gingham stripes pattern -->
        <g stroke="#E5A6B1" stroke-width="18" opacity="0.4">
          <line x1="40" y1="0" x2="40" y2="340"/>
          <line x1="100" y1="0" x2="100" y2="340"/>
          <line x1="160" y1="0" x2="160" y2="340"/>
          <line x1="220" y1="0" x2="220" y2="340"/>
          <line x1="280" y1="0" x2="280" y2="340"/>
          <line x1="340" y1="0" x2="340" y2="340"/>
          <line x1="400" y1="0" x2="400" y2="340"/>
          
          <line x1="0" y1="40" x2="440" y2="40"/>
          <line x1="0" y1="100" x2="440" y2="100"/>
          <line x1="0" y1="160" x2="440" y2="160"/>
          <line x1="0" y1="220" x2="440" y2="220"/>
          <line x1="0" y1="280" x2="440" y2="280"/>
        </g>
        
        <!-- Woven Basket -->
        <g transform="translate(50, 40)">
          <rect x="0" y="15" width="90" height="65" rx="10" fill="#BE8B58" stroke="#775130" stroke-width="2"/>
          <path d="M0,45 L90,45" stroke="#775130" stroke-width="2"/>
          <path d="M15,15 C15,-10 75,-10 75,15" fill="none" stroke="#775130" stroke-width="3"/>
          <!-- Baguette peeking out -->
          <ellipse cx="78" cy="15" rx="12" ry="30" transform="rotate(35 78 15)" fill="#D99B57" stroke="#9E672E" stroke-width="1.5"/>
        </g>
        
        <!-- Strawberries in ceramic bowl -->
        <g transform="translate(190, 80)">
          <ellipse cx="40" cy="40" rx="36" ry="18" fill="#FAF8F2" stroke="#A99587" stroke-width="2"/>
          <circle cx="30" cy="36" r="9" fill="#D64555"/>
          <circle cx="45" cy="35" r="9" fill="#DE5261"/>
          <circle cx="38" cy="42" r="8" fill="#C93847"/>
          <circle cx="52" cy="40" r="7" fill="#DE5261"/>
        </g>
        
        <!-- Instant Polaroid camera on blanket -->
        <g transform="translate(290, 150) rotate(12)">
          <rect x="0" y="0" width="85" height="85" rx="12" fill="#E8DEC9" stroke="#8A7664" stroke-width="2.5"/>
          <circle cx="42" cy="42" r="22" fill="#4A4541"/>
          <circle cx="42" cy="42" r="14" fill="#6A7A88"/>
          <circle cx="42" cy="42" r="6" fill="#1C1B1A"/>
          <circle cx="68" cy="18" r="5" fill="#E85D4E"/>
        </g>
      </g>
    </svg>
  `),

  goldenSunsetBeach: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <linearGradient id="beachSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#8B7B9E" />
          <stop offset="35%" stop-color="#DCA295" />
          <stop offset="70%" stop-color="#F7C488" />
          <stop offset="100%" stop-color="#FFEBB0" />
        </linearGradient>
        <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#808894" />
          <stop offset="50%" stop-color="#556F79" />
          <stop offset="100%" stop-color="#3C5158" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#beachSky)"/>
      
      <!-- Big low sun over horizon -->
      <circle cx="300" cy="310" r="65" fill="#FFF7DE"/>
      
      <!-- Ocean horizon -->
      <rect x="0" y="310" width="600" height="140" fill="url(#oceanGrad)"/>
      <!-- Sun reflection on water shimmer -->
      <polygon points="260,310 340,310 390,450 210,450" fill="#FCE4A6" opacity="0.45"/>
      <g stroke="#FFF4CC" stroke-width="2" stroke-linecap="round" opacity="0.75">
        <line x1="285" y1="325" x2="315" y2="325"/>
        <line x1="270" y1="345" x2="330" y2="345"/>
        <line x1="250" y1="375" x2="350" y2="375"/>
        <line x1="230" y1="410" x2="370" y2="410"/>
      </g>
      
      <!-- Wet sand shore -->
      <path d="M0,450 Q300,430 600,450 L600,600 L0,600 Z" fill="#D3BA9E"/>
      <path d="M0,470 Q300,450 600,470 L600,600 L0,600 Z" fill="#E8D1B7"/>
      <!-- Gentle seafoam lace -->
      <path d="M0,450 Q150,440 300,446 Q450,440 600,450" stroke="#FFFFFF" stroke-width="5" fill="none" opacity="0.8"/>
      
      <!-- Scattered Seashells -->
      <g fill="#FBF3EC" stroke="#9A8274" stroke-width="1.5">
        <path d="M140,520 Q150,510 160,520 Q150,535 140,520 Z"/>
        <path d="M420,540 Q432,530 440,542 Q430,555 420,540 Z"/>
      </g>
    </svg>
  `),

  botanicalSpontaneousTrail: svgToDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
      <defs>
        <linearGradient id="forestCanopy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#6F8D69" />
          <stop offset="45%" stop-color="#4B6A47" />
          <stop offset="100%" stop-color="#30442E" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#forestCanopy)"/>
      
      <!-- Light rays filtering through trees -->
      <g fill="#F8F3CE" opacity="0.18">
        <polygon points="120,0 220,0 360,600 200,600"/>
        <polygon points="340,0 420,0 560,600 440,600"/>
      </g>
      
      <!-- Winding earthen trail -->
      <path d="M280,300 Q260,380 320,460 Q380,540 340,600 L240,600 Q260,530 210,450 Q170,380 230,300 Z" fill="#A88B70"/>
      
      <!-- Lush Ferns and wildflowers on borders -->
      <!-- Left Fern -->
      <g stroke="#395834" stroke-width="3" fill="none" stroke-linecap="round">
        <path d="M40,580 Q100,500 160,460"/>
        <path d="M80,530 Q70,515 55,525"/>
        <path d="M100,510 Q115,495 105,485"/>
        <path d="M120,490 Q110,475 95,485"/>
        <path d="M140,475 Q150,460 140,450"/>
      </g>
      <!-- Right Wildflower patch -->
      <g transform="translate(420, 460)">
        <!-- Stems -->
        <line x1="30" y1="120" x2="30" y2="40" stroke="#486842" stroke-width="2.5"/>
        <line x1="70" y1="120" x2="80" y2="20" stroke="#486842" stroke-width="2.5"/>
        <!-- Blooms -->
        <circle cx="30" cy="35" r="14" fill="#E8AAB4"/>
        <circle cx="30" cy="35" r="5" fill="#FCE4A6"/>
        <circle cx="80" cy="15" r="12" fill="#A2BFDE"/>
        <circle cx="80" cy="15" r="4" fill="#FAF5DB"/>
      </g>
      
      <!-- Little wooden signpost -->
      <g transform="translate(180, 360)">
        <rect x="18" y="30" width="8" height="70" fill="#785942"/>
        <polygon points="0,15 55,15 65,25 55,35 0,35" fill="#D3B89E" stroke="#5E432E" stroke-width="1.5"/>
        <line x1="8" y1="25" x2="48" y2="25" stroke="#5E432E" stroke-width="1.5" stroke-dasharray="2 3"/>
      </g>
    </svg>
  `),
};
