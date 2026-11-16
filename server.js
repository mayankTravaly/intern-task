
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
  }
];

app.get('/api/hotels', (req, res) => {
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
