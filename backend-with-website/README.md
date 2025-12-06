# AB AAS - Beneficiary Management System

A complete Next.js application with REST API for managing beneficiary data for **अखिल भारतीय अष्टावक्र अद्वैत संस्थान (AB AAS)**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Access Points:**
- 🌐 Web Dashboard: `http://localhost:3000`
- 🔌 REST API: `http://localhost:3000/api/abaas`
- 🧪 API Tester: `http://localhost:3000/api-test.html`

## 📱 REST API for Mobile Apps

### Registration API (Recommended for Mobile Apps)

**Smart registration endpoint** that checks if user exists and returns appropriate response:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register or fetch existing user by phone |

### Full CRUD API

Complete CRUD operations at `/api/abaas`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/abaas` | Get all beneficiaries |
| GET | `/api/abaas?id={id}` | Get single beneficiary |
| POST | `/api/abaas` | Create beneficiary |
| PUT | `/api/abaas` | Update beneficiary |
| DELETE | `/api/abaas?id={id}` | Delete beneficiary |

### Quick Example

```bash
# Register or check existing user (Recommended for mobile apps)
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Rajesh Kumar",
    "phoneNumber":"9876543210",
    "dob":"15/03/1985",
    "disabilityType":"Visual Impairment",
    "disabilityPercentage":"75%"
  }'

# Fetch all beneficiaries
curl http://localhost:3000/api/abaas
```

## 📚 Documentation

- **[API_QUICKSTART.md](API_QUICKSTART.md)** - Quick start guide for developers
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference with examples
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - Database setup instructions
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Full project overview

## 🧪 Test the API

Open `http://localhost:3000/api-test.html` for an interactive API testing interface with:
- Visual CRUD operations
- Real-time response display
- Easy beneficiary management

## 🔧 Environment Setup

Create a `.env` file in the root directory:

```env
NEXT_DB_API_KEY=mongodb+srv://username:password@cluster.mongodb.net/asaas
```

**Database Structure:**
- Database: `asaas`
- Collection: `beneficiaries`

## 📱 Mobile App Integration

### React Native / Expo

```javascript
const API_URL = 'http://YOUR_IP:3000/api/abaas';

// Fetch all beneficiaries
const fetchBeneficiaries = async () => {
  const response = await fetch(API_URL);
  const result = await response.json();
  return result.data;
};

// Create beneficiary
const createBeneficiary = async (data) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};
```

### Flutter

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const baseUrl = 'http://YOUR_IP:3000/api/abaas';

  Future<List> getBeneficiaries() async {
    final response = await http.get(Uri.parse(baseUrl));
    final data = json.decode(response.body);
    return data['data'];
  }
}
```

**Note:** Replace `YOUR_IP` with your computer's IP address (not `localhost`) when testing from mobile devices.

## 🎯 Features

- ✅ Full CRUD REST API
- ✅ MongoDB integration
- ✅ Web dashboard with search functionality
- ✅ Statistics dashboard
- ✅ Mobile-ready API
- ✅ Interactive API tester
- ✅ Complete documentation
- ✅ Responsive design

## 📊 Data Structure

```typescript
{
  "id": "string",                    // MongoDB ObjectId
  "name": "string",                  // Required
  "phoneNumber": "string",           // Required
  "dob": "string",                   // Optional
  "address": "string",               // Optional
  "disabilityType": "string",        // Optional
  "disabilityPercentage": "string",  // Optional
  "maritalStatus": "string",         // Optional
  "comments": "string"               // Optional
}
```

## 🔐 Security Notes

**Development:**
- CORS enabled for all origins
- MongoDB credentials in `.env` file

**Production:**
- Add API authentication (JWT/API Keys)
- Implement rate limiting
- Restrict CORS to specific domains
- Use HTTPS only
- Add input validation

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify `.env` file has correct connection string
- Check MongoDB Atlas IP whitelist
- Ensure database and collection exist

### Mobile App Can't Connect
- Use computer's IP address, not `localhost`
- Ensure both devices on same network
- Check firewall settings

## 📦 Tech Stack

- **Framework:** Next.js 16
- **Database:** MongoDB
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **API:** REST

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Project Status:** ✅ Complete and Ready for Mobile Integration

For detailed API documentation and mobile integration examples, see the documentation files listed above.
