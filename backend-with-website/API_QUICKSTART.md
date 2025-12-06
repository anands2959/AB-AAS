# 🚀 AB AAS API Quick Start Guide

## What You Got

A complete REST API at `/api/abaas` with full CRUD operations for managing beneficiary data.

## API Endpoint

```
http://localhost:3000/api/abaas
```

## Quick Test

### 1. Start Your Server
```bash
npm run dev
```

### 2. Test in Browser
Open: `http://localhost:3000/api-test.html`

This interactive page lets you:
- ✅ View all beneficiaries
- ✅ Create new records
- ✅ Update existing records
- ✅ Delete records
- ✅ Search by ID

### 3. Test with cURL

**Fetch All:**
```bash
curl http://localhost:3000/api/abaas
```

**Create New:**
```bash
curl -X POST http://localhost:3000/api/abaas \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phoneNumber": "1234567890",
    "address": "Test Address"
  }'
```

## Mobile App Integration

### For React Native / Expo

```javascript
const API_URL = 'http://YOUR_IP:3000/api/abaas';

// Fetch all
const getBeneficiaries = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.data;
};

// Create
const addBeneficiary = async (beneficiary) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(beneficiary)
  });
  return await response.json();
};

// Update
const updateBeneficiary = async (id, updates) => {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...updates })
  });
  return await response.json();
};

// Delete
const deleteBeneficiary = async (id) => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'DELETE'
  });
  return await response.json();
};
```

### For Flutter

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

  Future<Map> createBeneficiary(Map beneficiary) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(beneficiary),
    );
    return json.decode(response.body);
  }
}
```

## Important Notes

### For Mobile Testing

1. **Find Your Computer's IP:**
   - Mac/Linux: `ifconfig | grep inet`
   - Windows: `ipconfig`

2. **Use IP Instead of localhost:**
   ```
   http://192.168.1.100:3000/api/abaas
   ```

3. **Make Sure MongoDB is Connected:**
   - Check your `.env` file
   - Verify MongoDB Atlas IP whitelist includes your IP

### Response Format

**Success:**
```json
{
  "success": true,
  "data": { /* your data */ }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## Available Operations

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/abaas` | Get all beneficiaries |
| GET | `/api/abaas?id=xxx` | Get single beneficiary |
| POST | `/api/abaas` | Create new beneficiary |
| PUT | `/api/abaas` | Update beneficiary |
| DELETE | `/api/abaas?id=xxx` | Delete beneficiary |

## Data Structure

```json
{
  "id": "MongoDB ObjectId",
  "name": "string (required)",
  "phoneNumber": "string (required)",
  "dob": "string",
  "address": "string",
  "disabilityType": "string",
  "disabilityPercentage": "string",
  "maritalStatus": "string",
  "comments": "string"
}
```

## Next Steps

1. ✅ Test the API using `http://localhost:3000/api-test.html`
2. ✅ Add some sample data to MongoDB
3. ✅ Integrate with your mobile app
4. ✅ Read full documentation in `API_DOCUMENTATION.md`

## Troubleshooting

**Can't connect from mobile?**
- Use your computer's IP, not localhost
- Make sure both devices are on the same network
- Check firewall settings

**MongoDB errors?**
- Verify `.env` file has correct connection string
- Check MongoDB Atlas IP whitelist
- Ensure database and collection exist

**CORS errors?**
- Next.js handles CORS automatically
- For production, configure in `next.config.ts`

## Support

Check `API_DOCUMENTATION.md` for detailed examples and mobile integration code.
