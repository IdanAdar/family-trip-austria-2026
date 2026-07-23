/**
 * Austria 2026 – trip data (source of truth for itinerary / stays / cars / packing)
 * Edit this file for content changes. index.html is only the shell.
 */
window.TRIP_DATA = {
  cars: {
    options: [
      {
        label: 'אפשרות 1',
        labelClass: 'text-alpine-600',
        title: 'Premium SUV · Peugeot 5008 or similar',
        booking: '9735732399',
        pickup: '7/8/26 בשעה 09:30',
        return: '22/8 בשעה 22:00',
        price: '€2,078.77'
      },
      {
        label: 'אפשרות 2',
        labelClass: 'text-green-700',
        title: 'Peugeot 5008 or similar · PFAV',
        booking: '9725091740',
        pickup: '8/8/26 בשעה 08:30',
        return: '22/8 בשעה 19:00',
        price: '€1,916.25'
      }
    ],
    branch: {
      title: 'SIXT – שדה התעופה וינה (VIE)',
      address: 'Mietwagenzentrum, Objekt 134, P4, Wien-Schwechat, 1300 Austria',
      location: 'חניון P4, קומת קרקע (Level 0) – מרכז השכרת הרכבים',
      hours: 'כל יום 06:00–00:00 (כולל חגים) · החזרה 24 שעות',
      site: 'https://www.sixt.com/car-rental/austria/vienna/vienna-airport/',
      gmaps: 'https://www.google.com/maps/search/?api=1&query=SIXT+Vienna+Airport+P4',
      waze: 'https://waze.com/ul?q=SIXT%20Vienna%20Airport&navigate=yes',
      howto: 'אחרי איסוף המזוודות ← אולם ההגעות ← שמאלה לכיוון מנהרת CAT ← דרך הדלתות ← מעלית ל-Level 0 (Car Rental Center). הדלפק בתחילת האולם.',
      returnNote: 'החזרה: לעקוב אחרי שלטי <em>Car Rental Return</em> לחניון P4, Level 0.'
    }
  },

  stays: [
    {
      name: 'NH Conference Center Vienna Airport',
      img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/24/f4/9f/nh-vienna-airport-facade.jpg?w=700&h=-1&s=1',
      link: 'https://www.nh-hotels.com/en/hotel/nh-vienna-airport-conference-center',
      headerClass: 'bg-alpine-700',
      subtitle: null,
      blocks: [
        { title: '6–8 באוגוסט', room: 'Family Connecting Room', booking: '157195399' },
        { title: '22–23 באוגוסט', room: 'Family Connecting Room', booking: '157505241' }
      ],
      payment: 'במקום',
      extraLinkText: 'לינק לאתר המלון'
    },
    {
      name: 'Chalet Wildruh',
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/890101025.jpg?k=d4d8060d7f56404fb4a22066d4ef146c4f84d9d7583a4899aaf0355414a70a30&o=',
      link: 'https://www.chaletwildruh.tirol/en/hirschen-suite',
      headerClass: 'bg-green-700',
      subtitle: 'עמק הצילר · 8–16/8 (8 לילות)',
      status: 'שולם דרך Booking.com',
      extraLinkText: 'אתר Chalet Wildruh · Hirschen Suite'
    },
    {
      name: 'Appartmenthaus Phantasia',
      img: 'https://www.phantasia.at/wp-content/uploads/appartements-phantasia-flachau.jpg',
      link: 'https://www.phantasia.at/en/',
      headerClass: 'bg-purple-700',
      subtitle: 'פלכאו · 16–22/8 (6 לילות)',
      payment: "העברה בנקאית + מזומן לג'וזי במקום",
      extraLinkText: 'אתר Appartmenthaus Phantasia'
    }
  ],

  packing: [
    {
      title: '👕 בגדים',
      items: [
        'בגדים להחלפה (לכל יום)',
        'מעילים חמים / פליז / סווטשירטים',
        'מעילי גשם',
        'בגדי ים + מגבות',
        'נעלי הליכה נוחות',
        'כובע / כובעי שמש',
        'גרביים נוספים'
      ]
    },
    {
      title: '🎒 תיק יומי / רכב',
      items: [
        'תיק בריכה (מגבות, כפכפים, מצופים)',
        'מזומן (יורו)',
        'בקבוקי מים + חטיפים',
        'קרם הגנה',
        'משקפי שמש',
        'מטריה',
        'צעצועי מים + לחם יבש לברווזים',
        'רשיונות נהיגה'
      ]
    },
    {
      title: '📋 מסמכים + אחר',
      items: [
        'דרכונים',
        'אישורי מלון',
        'אישורי רכב / ביטוח (SIXT)',
        'כרטיסי טיסה',
        'תרופות / ערכת עזרה ראשונה',
        'מטענים + מתאמים',
        'אפליקציית חניה + מדבקת גרמניה'
      ]
    }
  ],

  mapPlaces: [
    { name: 'וינה · שדה התעופה (NH)', coords: [48.1103, 16.5697] },
    { name: 'פראטר (Prater)', coords: [48.2167, 16.3958] },
    { name: 'Motorikpark Ansfelden', coords: [48.212, 14.289] },
    { name: 'SEP / BILLA (Salzkammergut)', coords: [47.918, 13.799] },
    { name: 'Chalet Wildruh', coords: [47.233, 11.866] },
    { name: "Ellmi's Zauberwelt", coords: [47.512, 12.303] },
    { name: 'Erlebnistherme Zillertal', coords: [47.283, 11.875] },
    { name: 'מכרה הכסף (שוואץ)', coords: [47.351, 11.708] },
    { name: 'Harter Schleierwasserfall', coords: [47.28, 11.75] },
    { name: 'DEZ Innsbruck + Smyths', coords: [47.263, 11.432] },
    { name: 'Hexenwasser Söll', coords: [47.505, 12.192] },
    { name: 'קיצביל (Kitzbühel)', coords: [47.447, 12.392] },
    { name: 'Swarovski Kristallwelten', coords: [47.294, 11.604] },
    { name: 'Achensee / Atoll', coords: [47.448, 11.722] },
    { name: 'Spieljochbahn', coords: [47.248, 11.852] },
    { name: 'Rosenalm + Arena Coaster', coords: [47.198, 11.848] },
    { name: 'Ahornbahn / Mountopolis', coords: [47.168, 11.863] },
    { name: 'Erlebnissennerei Zillertal', coords: [47.178, 11.885] },
    { name: 'מפלי קרימל', coords: [47.211, 12.172] },
    { name: 'Triassic Park', coords: [47.485, 12.545] },
    { name: 'פלכאו (Phantasia)', coords: [47.345, 13.392] },
    { name: 'Salzburg Zoo', coords: [47.804, 13.052] },
    { name: 'Hopsiland Planai', coords: [47.392, 13.688] },
    { name: "Flori's Path", coords: [47.352, 13.395] },
    { name: 'Funspace Flachau', coords: [47.345, 13.39] },
    { name: 'טירת מאוטרנדורף', coords: [47.135, 13.678] },
    { name: 'Jägersee', coords: [47.223, 13.155] },
    { name: 'קרחון קיצשטיינהורן', coords: [47.198, 12.685] },
    { name: 'Maisi Flitzer', coords: [47.2739, 12.757] },
    { name: "Toni's Almspielplatz", coords: [47.392, 13.148] },
    { name: 'Therme Amadé', coords: [47.338, 13.395] },
    { name: 'Woody Bob', coords: [47.4635, 13.37125] }
  ],

  sections: []
};
