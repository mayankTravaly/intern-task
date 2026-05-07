const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper: Generate random booking data
function generateBookings(days = 7) {
  const bookings = [];
  const hotels = [
    "Grand Plaza Delhi", "Seaside Resort Goa", "Mountain View Shimla", 
    "Business Hotel Mumbai", "Heritage Palace Jaipur", "Beachfront Resort Kerala"
  ];
  const statuses = ['confirmed', 'pending', 'cancelled'];
  const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Villa'];
  const names = ['Rahul', 'Priya', 'Amit', 'Sneha', 'Raj', 'Anjali', 'Vikram', 'Meera'];

  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + i);
    
    const stayDuration = Math.floor(Math.random() * 5) + 1; // 1-5 nights
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + stayDuration);
    
    const amount = Math.floor(Math.random() * 20000) + 5000; // ₹5000-25000
    
    bookings.push({
      id: `BOOK${String(i + 1).padStart(3, '0')}`,
      guestName: `${names[Math.floor(Math.random() * names.length)]} ${names[Math.floor(Math.random() * names.length)]}`,
      hotelName: hotels[Math.floor(Math.random() * hotels.length)],
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      amount: amount,
      currency: 'INR',
      roomType: roomTypes[Math.floor(Math.random() * roomTypes.length)],
      paymentStatus: Math.random() > 0.3 ? 'paid' : 'pending',
      bookingDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return bookings;
}

// Helper: Generate metrics based on bookings
function generateMetrics(bookings) {
  const totalBookings = bookings.length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const cancelled = bookings.filter(b => b.status === 'cancelled').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status === 'confirmed' ? b.amount : 0), 0);
  const avgRevenue = totalBookings > 0 ? Math.floor(totalRevenue / totalBookings) : 0;
  
  return {
    totalBookings,
    confirmed,
    pending,
    cancelled,
    totalRevenue,
    averageBookingValue: avgRevenue,
    occupancyRate: Math.floor((confirmed / totalBookings) * 100) || 0,
    conversionRate: Math.floor((confirmed / (totalBookings + pending)) * 100) || 0
  };
}

// Helper: Generate trends data
function generateTrends(months = 6) {
  const trends = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const today = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);
    
    const bookings = Math.floor(Math.random() * 100) + 20;
    const revenue = bookings * (Math.floor(Math.random() * 8000) + 5000);
    
    trends.push({
      month: monthNames[date.getMonth()],
      bookings: bookings,
      revenue: revenue,
      avgRoomRate: Math.floor(revenue / bookings)
    });
  }
  
  return trends;
}

// API Endpoints
app.get('/api/bookings', (req, res) => {
  try {
    const { days = '7', status, sort = 'checkIn', order = 'asc' } = req.query;
    const daysCount = parseInt(days);
    
    if (isNaN(daysCount) || daysCount < 1 || daysCount > 365) {
      return res.status(400).json({ 
        error: 'Invalid days parameter. Must be between 1 and 365' 
      });
    }
    
    let bookings = generateBookings(daysCount);
    
    // Filter by status if provided
    if (status && ['confirmed', 'pending', 'cancelled'].includes(status)) {
      bookings = bookings.filter(b => b.status === status);
    }
    
    // Sorting
    bookings.sort((a, b) => {
      if (order === 'desc') {
        return new Date(b[sort]) - new Date(a[sort]);
      }
      return new Date(a[sort]) - new Date(b[sort]);
    });
    
    res.json({
      success: true,
      count: bookings.length,
      filters: req.query,
      data: bookings
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/metrics', (req, res) => {
  try {
    const { days = '30' } = req.query;
    const daysCount = parseInt(days);
    
    if (isNaN(daysCount) || daysCount < 1 || daysCount > 365) {
      return res.status(400).json({ 
        error: 'Invalid days parameter. Must be between 1 and 365' 
      });
    }
    
    const bookings = generateBookings(daysCount);
    const metrics = generateMetrics(bookings);
    
    res.json({
      success: true,
      period: `${daysCount} days`,
      data: metrics
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/trends', (req, res) => {
  try {
    const { months = '6' } = req.query;
    const monthsCount = parseInt(months);
    
    if (isNaN(monthsCount) || monthsCount < 1 || monthsCount > 12) {
      return res.status(400).json({ 
        error: 'Invalid months parameter. Must be between 1 and 12' 
      });
    }
    
    const trends = generateTrends(monthsCount);
    
    res.json({
      success: true,
      period: `${monthsCount} months`,
      data: trends
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Bonus: Simulate real-time updates
app.get('/api/realtime', (req, res) => {
  // Simulate WebSocket-like behavior with Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const sendUpdate = () => {
    const update = {
      timestamp: new Date().toISOString(),
      newBookings: Math.floor(Math.random() * 5),
      cancellations: Math.floor(Math.random() * 2),
      revenueUpdate: Math.floor(Math.random() * 50000)
    };
    
    res.write(`data: ${JSON.stringify(update)}\n\n`);
  };
  
  // Send updates every 10 seconds
  const interval = setInterval(sendUpdate, 10000);
  
  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'myTravaly Booking API',
    version: '1.0.0'
  });
});

// Root endpoint with documentation
app.get('/', (req, res) => {
  res.json({
    service: 'MyTravaly Intern Task API',
    endpoints: {
      bookings: 'GET /api/bookings?days=7&status=confirmed&order=asc',
      metrics: 'GET /api/metrics?days=30',
      trends: 'GET /api/trends?months=6',
      health: 'GET /api/health'
    },
    example: 'https://your-render-app.onrender.com/api/bookings?days=30&status=confirmed'
  });
});

const hotels = [
  {
    ota_property_id: 3318608196,
    hotel_name: "Cozy Stay Inn",
    star_rating: 2,
    property_type: "UNKNOWN",
    checkin: "12:00:00",
    checkout: "12:00:00",
    description: "A cozy stay inn in Bangalore",
    hotel_image: "898144366-1997834712.jpg",
    currency: "INR",
    street: "170, 6th Cross Road",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    latitude: 12.9810310,
    longitude: 77.5321283,
    time_zone: "Asia/Calcutta",
    pin_code: "560076"
  },
  {
    ota_property_id: 4412789123,
    hotel_name: "Royal Comfort Suites",
    star_rating: 4,
    property_type: "HOTEL",
    checkin: "14:00:00",
    checkout: "11:00:00",
    description: "Luxury stay in Mumbai city center",
    hotel_image: "royal-comfort.jpg",
    currency: "INR",
    street: "Linking Road",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    latitude: 19.076090,
    longitude: 72.877426,
    time_zone: "Asia/Calcutta",
    pin_code: "400050"
  }
];

/**
 * Paginated Hotels API
 *
 * Example:
 * GET /api/hotels?page=1&limit=1
 */
app.get('/api/hotels', (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page and limit must be greater than 0'
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedHotels = hotels.slice(startIndex, endIndex);

    res.json(paginatedHotels);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 myTravaly API running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}`);
});