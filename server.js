
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const hotels = [
  {
    ota_property_id: "TEST-MATCH-001",
    hotel_name: "Hotel Admiral Inn",
    star_rating: 0,
    property_type: "Hotel",
    checkin: "12:00",
    checkout: "11:00",
    description: "Hotel Admiral Inn is conveniently located in Andheri East, Mumbai, close to the business district and the airport. Ideal for business travellers and tourists alike.",
    currency: "INR",
    phone: "+91-22-1234-5678",
    email: "reservations@admiralinn.example.com",
    street: "102, Balaji Business Park, Andheri - Kurla Rd, above RBL Bank, Marol, Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    latitude: 19.1077685,
    longitude: 72.8825191,
    time_zone: "Asia/Kolkata",
    pin_code: "400059",
    hotel_images: [
      {
        url: "https://dwq3yv87q1b43.cloudfront.net/swoovo/images/hotels/test-admiral-1.jpg",
        subtitle: "Exterior",
        display_order: 0
      },
      {
        url: "https://dwq3yv87q1b43.cloudfront.net/swoovo/images/hotels/test-admiral-2.jpg",
        subtitle: "Lobby",
        display_order: 1
      },
      {
        url: "https://dwq3yv87q1b43.cloudfront.net/swoovo/images/hotels/test-admiral-3.jpg",
        subtitle: "Room",
        display_order: 2
      }
    ]
  },
  {
    ota_property_id: "TEST-NOMATCH-001",
    hotel_name: "Zyxwv Utopia Cosmic Resort & Spa",
    star_rating: 3,
    property_type: "Resort",
    checkin: "14:00",
    checkout: "10:00",
    description: "A fictional resort with a completely unique name and location designed to have zero similarity to any existing master property. Intended to trigger a mapping rejection.",
    currency: "INR",
    phone: "+91-99999-00001",
    email: "book@zyxwv-utopia.example.com",
    street: "1 Imaginary Lane, Nowhere District",
    city: "Atlantis",
    state: "Atlantis State",
    country: "Atlantis",
    latitude: 0.0,
    longitude: 0.0,
    time_zone: "UTC",
    pin_code: "000000",
    hotel_images: [
      {
        url: "https://dwq3yv87q1b43.cloudfront.net/swoovo/images/hotels/test-nomatch-1.jpg",
        subtitle: "Exterior",
        display_order: 0
      }
    ]
  },
  {
    ota_property_id: "TEST-INCOMPLETE-001",
    hotel_name: "Incomplete Data Test Hotel",
    star_rating: 2,
    property_type: "Hotel",
    checkin: null,
    checkout: null,
    description: null,
    currency: "INR",
    phone: null,
    email: null,
    street: null,
    city: null,
    state: null,
    country: null,
    latitude: null,
    longitude: null,
    time_zone: null,
    pin_code: null,
    hotel_images: []
  },
  {
    "ota_property_id": "TEST-TWO-OTA-001",
    "hotel_name": "SUNIL RESIDENCY",
    "star_rating": 2,
    "property_type": "HOTEL",
    "city": "Bangalore",
    "state": "Karnataka",
    "country": "India",
    "latitude": 12.9905416,
    "longitude": 77.5508425,
    "currency": "INR",
    "checkin": "12:00:00",
    "checkout": "11:00:00",
    "description": "Located in shivanahalli Rajajinagar, Hotel Sunil Residency is an ideal choice if you are looking for clean and spacious rooms at pocket friendly prices. The rooms have classic wooden furniture and includes a dresser. Hotel has a seating area, free wifi and an elevator to make the guests stay more comfortable.",
    "street": "#79/B,1st Stage, 5th Phase,West of chord road, Thimmaiah Road, Rajajinagar,Shivanagar",
    "pin_code": "560044",
    "time_zone": "Asia/Calcutta",
    "phone": "",
    "email": "",
    "hotel_images": [
      {
        "url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
        "subtitle": "Hotel image"
      },
      {
        "url": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        "subtitle": "Hotel image"
      }
    ]
  }
];

const API_KEY = "MYTRAVALY_TEST_2026_SECRET";

app.get('/api/hotels', (req, res) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized. Invalid or missing API key."
    });
  }

  res.json({
    status: true,
    message: "Hotels retrieved successfully",
    data: {
      list: hotels,
      limit: 50,
      offset: 0,
      total: hotels.length
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🏨 Hotels API: http://localhost:${PORT}/api/hotels`);
});
