# AB AAS REST API Documentation

## Base URL
```
http://localhost:3000/api/abaas
```
For production: `https://your-domain.com/api/abaas`

---

## API Endpoints

### 1. GET - Fetch All Beneficiaries

**Endpoint:** `GET /api/abaas`

**Description:** Retrieves all beneficiaries from the database.

**Request:**
```bash
curl -X GET http://localhost:3000/api/abaas
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Rajesh Kumar",
      "phoneNumber": "9876543210",
      "dob": "15/03/1985",
      "address": "45 Gandhi Road, Mumbai, Maharashtra",
      "disabilityType": "Visual Impairment",
      "disabilityPercentage": "75%",
      "maritalStatus": "Married",
      "comments": "Requires mobility assistance"
    }
  ]
}
```

---

### 2. GET - Fetch Single Beneficiary by ID

**Endpoint:** `GET /api/abaas?id={beneficiaryId}`

**Description:** Retrieves a specific beneficiary by their ID.

**Request:**
```bash
curl -X GET "http://localhost:3000/api/abaas?id=507f1f77bcf86cd799439011"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "phoneNumber": "9876543210",
    "dob": "15/03/1985",
    "address": "45 Gandhi Road, Mumbai, Maharashtra",
    "disabilityType": "Visual Impairment",
    "disabilityPercentage": "75%",
    "maritalStatus": "Married",
    "comments": "Requires mobility assistance"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Beneficiary not found"
}
```

---

### 3. POST - Create New Beneficiary

**Endpoint:** `POST /api/abaas`

**Description:** Creates a new beneficiary record.

**Required Fields:**
- `name` (string)
- `phoneNumber` (string)

**Optional Fields:**
- `dob` (string)
- `address` (string)
- `disabilityType` (string)
- `disabilityPercentage` (string)
- `maritalStatus` (string)
- `comments` (string)

**Request:**
```bash
curl -X POST http://localhost:3000/api/abaas \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Amit Patel",
    "phoneNumber": "9988776655",
    "dob": "10/11/1978",
    "address": "78 Lake View, Ahmedabad, Gujarat",
    "disabilityType": "Physical Disability",
    "disabilityPercentage": "60%",
    "maritalStatus": "Married",
    "comments": "Wheelchair user"
  }'
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Beneficiary created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Amit Patel",
    "phoneNumber": "9988776655",
    "dob": "10/11/1978",
    "address": "78 Lake View, Ahmedabad, Gujarat",
    "disabilityType": "Physical Disability",
    "disabilityPercentage": "60%",
    "maritalStatus": "Married",
    "comments": "Wheelchair user",
    "createdAt": "2024-12-06T10:30:00.000Z",
    "updatedAt": "2024-12-06T10:30:00.000Z"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Name and phone number are required"
}
```

---

### 4. PUT - Update Beneficiary

**Endpoint:** `PUT /api/abaas`

**Description:** Updates an existing beneficiary record.

**Required Fields:**
- `id` (string) - MongoDB ObjectId

**Optional Fields:** (Only include fields you want to update)
- `name` (string)
- `phoneNumber` (string)
- `dob` (string)
- `address` (string)
- `disabilityType` (string)
- `disabilityPercentage` (string)
- `maritalStatus` (string)
- `comments` (string)

**Request:**
```bash
curl -X PUT http://localhost:3000/api/abaas \
  -H "Content-Type: application/json" \
  -d '{
    "id": "507f1f77bcf86cd799439011",
    "phoneNumber": "9876543211",
    "address": "46 Gandhi Road, Mumbai, Maharashtra",
    "comments": "Updated contact information"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Beneficiary updated successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "phoneNumber": "9876543211",
    "address": "46 Gandhi Road, Mumbai, Maharashtra",
    "comments": "Updated contact information",
    "updatedAt": "2024-12-06T10:35:00.000Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Beneficiary not found"
}
```

---

### 5. DELETE - Delete Beneficiary

**Endpoint:** `DELETE /api/abaas?id={beneficiaryId}`

**Description:** Deletes a beneficiary record.

**Request:**
```bash
curl -X DELETE "http://localhost:3000/api/abaas?id=507f1f77bcf86cd799439011"
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Beneficiary deleted successfully"
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Beneficiary not found"
}
```

---

## Mobile App Integration Examples

### React Native / Expo Example

```javascript
const API_BASE_URL = 'http://localhost:3000/api/abaas';

// Fetch all beneficiaries
const fetchBeneficiaries = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const result = await response.json();
    if (result.success) {
      console.log('Beneficiaries:', result.data);
      return result.data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Create new beneficiary
const createBeneficiary = async (beneficiaryData) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(beneficiaryData),
    });
    const result = await response.json();
    if (result.success) {
      console.log('Created:', result.data);
      return result.data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Update beneficiary
const updateBeneficiary = async (id, updates) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updates }),
    });
    const result = await response.json();
    if (result.success) {
      console.log('Updated:', result.data);
      return result.data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Delete beneficiary
const deleteBeneficiary = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}?id=${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (result.success) {
      console.log('Deleted successfully');
      return true;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Flutter/Dart Example

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class AbaasApiService {
  static const String baseUrl = 'http://localhost:3000/api/abaas';

  // Fetch all beneficiaries
  Future<List<dynamic>> fetchBeneficiaries() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      final result = json.decode(response.body);
      return result['data'];
    }
    throw Exception('Failed to load beneficiaries');
  }

  // Create beneficiary
  Future<Map<String, dynamic>> createBeneficiary(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(data),
    );
    if (response.statusCode == 201) {
      final result = json.decode(response.body);
      return result['data'];
    }
    throw Exception('Failed to create beneficiary');
  }

  // Update beneficiary
  Future<Map<String, dynamic>> updateBeneficiary(String id, Map<String, dynamic> updates) async {
    updates['id'] = id;
    final response = await http.put(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(updates),
    );
    if (response.statusCode == 200) {
      final result = json.decode(response.body);
      return result['data'];
    }
    throw Exception('Failed to update beneficiary');
  }

  // Delete beneficiary
  Future<bool> deleteBeneficiary(String id) async {
    final response = await http.delete(Uri.parse('$baseUrl?id=$id'));
    if (response.statusCode == 200) {
      return true;
    }
    throw Exception('Failed to delete beneficiary');
  }
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Missing required fields |
| 404 | Not Found - Beneficiary doesn't exist |
| 500 | Internal Server Error |

---

## Response Format

All responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Optional success message",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message description"
}
```

---

## Testing the API

### Using Postman

1. Import the endpoints into Postman
2. Set the base URL to `http://localhost:3000/api/abaas`
3. Test each endpoint with sample data

### Using cURL (Command Line)

See the examples above for each endpoint.

### Using Browser (GET only)

Navigate to:
- All beneficiaries: `http://localhost:3000/api/abaas`
- Single beneficiary: `http://localhost:3000/api/abaas?id=YOUR_ID_HERE`

---

## CORS Configuration

The API is configured to accept requests from any origin. For production, you should restrict this in `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://your-mobile-app-domain.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};
```

---

## Security Recommendations

1. **Add Authentication**: Implement JWT or API key authentication
2. **Rate Limiting**: Prevent abuse with rate limiting
3. **Input Validation**: Validate all input data
4. **HTTPS Only**: Use HTTPS in production
5. **Environment Variables**: Store sensitive data in environment variables
6. **CORS**: Restrict origins in production

---

## Support

For issues or questions, contact the development team.
