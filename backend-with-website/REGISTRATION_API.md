# 📝 Registration API Documentation

## Overview

The Registration API provides a smart endpoint that checks if a user exists by phone number and either returns existing details or creates a new registration.

## Endpoint

```
POST /api/register
```

## How It Works

1. **App sends registration request** with required fields
2. **Backend checks** if phone number already exists in database
3. **If user exists**: Returns existing user details with `userExists: true`
4. **If user doesn't exist**: Creates new registration and returns new user details with `userExists: false`

## Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | string | Full name of beneficiary | "Rajesh Kumar" |
| `phoneNumber` | string | 10-digit phone number | "9876543210" |
| `dob` | string | Date of birth | "15/03/1985" |
| `disabilityType` | string | Type of disability | "Visual Impairment" |
| `disabilityPercentage` | string | Percentage of disability | "75%" |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `address` | string | Full address |
| `maritalStatus` | string | Marital status |
| `comments` | string | Additional notes |

---

## Request Examples

### cURL

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "phoneNumber": "9876543210",
    "dob": "15/03/1985",
    "disabilityType": "Visual Impairment",
    "disabilityPercentage": "75%",
    "address": "45 Gandhi Road, Mumbai, Maharashtra",
    "maritalStatus": "Married",
    "comments": "Requires mobility assistance"
  }'
```

### JavaScript / React Native

```javascript
const registerUser = async (userData) => {
  try {
    const response = await fetch('http://YOUR_IP:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        dob: userData.dob,
        disabilityType: userData.disabilityType,
        disabilityPercentage: userData.disabilityPercentage,
        address: userData.address,
        maritalStatus: userData.maritalStatus,
        comments: userData.comments,
      }),
    });

    const result = await response.json();
    
    if (result.success) {
      if (result.userExists) {
        console.log('User already registered:', result.data);
        // Show existing user details
      } else {
        console.log('New registration successful:', result.data);
        // Show success message
      }
    } else {
      console.error('Registration failed:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Usage
const userData = {
  name: "Rajesh Kumar",
  phoneNumber: "9876543210",
  dob: "15/03/1985",
  disabilityType: "Visual Impairment",
  disabilityPercentage: "75%",
  address: "Mumbai, Maharashtra",
  maritalStatus: "Married",
  comments: "Requires assistance"
};

registerUser(userData);
```

### Flutter / Dart

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class RegistrationService {
  static const String baseUrl = 'http://YOUR_IP:3000/api/register';

  Future<Map<String, dynamic>> registerBeneficiary({
    required String name,
    required String phoneNumber,
    required String dob,
    required String disabilityType,
    required String disabilityPercentage,
    String? address,
    String? maritalStatus,
    String? comments,
  }) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'name': name,
        'phoneNumber': phoneNumber,
        'dob': dob,
        'disabilityType': disabilityType,
        'disabilityPercentage': disabilityPercentage,
        'address': address ?? '',
        'maritalStatus': maritalStatus ?? '',
        'comments': comments ?? '',
      }),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      final result = json.decode(response.body);
      
      if (result['userExists'] == true) {
        print('User already registered');
        // Show existing user details
      } else {
        print('New registration successful');
        // Show success message
      }
      
      return result;
    } else {
      throw Exception('Registration failed');
    }
  }
}

// Usage
final service = RegistrationService();
final result = await service.registerBeneficiary(
  name: 'Rajesh Kumar',
  phoneNumber: '9876543210',
  dob: '15/03/1985',
  disabilityType: 'Visual Impairment',
  disabilityPercentage: '75%',
  address: 'Mumbai, Maharashtra',
  maritalStatus: 'Married',
  comments: 'Requires assistance',
);
```

---

## Response Examples

### Case 1: New Registration (User Doesn't Exist)

**Status Code:** `201 Created`

```json
{
  "success": true,
  "message": "Registration successful",
  "userExists": false,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "phoneNumber": "9876543210",
    "dob": "15/03/1985",
    "address": "45 Gandhi Road, Mumbai, Maharashtra",
    "disabilityType": "Visual Impairment",
    "disabilityPercentage": "75%",
    "maritalStatus": "Married",
    "comments": "Requires mobility assistance",
    "registeredAt": "2024-12-06T10:30:00.000Z"
  }
}
```

### Case 2: Existing User (Phone Number Already Registered)

**Status Code:** `200 OK`

```json
{
  "success": true,
  "message": "User already registered",
  "userExists": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Rajesh Kumar",
    "phoneNumber": "9876543210",
    "dob": "15/03/1985",
    "address": "45 Gandhi Road, Mumbai, Maharashtra",
    "disabilityType": "Visual Impairment",
    "disabilityPercentage": "75%",
    "maritalStatus": "Married",
    "comments": "Requires mobility assistance",
    "registeredAt": "2024-12-05T08:15:00.000Z"
  }
}
```

### Case 3: Validation Error (Missing Required Fields)

**Status Code:** `400 Bad Request`

```json
{
  "success": false,
  "error": "All fields are required: name, phoneNumber, dob, disabilityType, disabilityPercentage"
}
```

### Case 4: Server Error

**Status Code:** `500 Internal Server Error`

```json
{
  "success": false,
  "error": "Registration failed. Please try again."
}
```

---

## Mobile App Implementation Guide

### React Native Complete Example

```javascript
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';

const RegistrationScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    dob: '',
    disabilityType: '',
    disabilityPercentage: '',
    address: '',
    maritalStatus: '',
    comments: '',
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validate required fields
    if (!formData.name || !formData.phoneNumber || !formData.dob || 
        !formData.disabilityType || !formData.disabilityPercentage) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://YOUR_IP:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        if (result.userExists) {
          Alert.alert(
            'Already Registered',
            `Welcome back ${result.data.name}! Your details are already in our system.`,
            [
              {
                text: 'View Details',
                onPress: () => {
                  // Navigate to details screen with result.data
                  console.log('User details:', result.data);
                },
              },
            ]
          );
        } else {
          Alert.alert(
            'Success',
            'Registration completed successfully!',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate to success screen or home
                  console.log('New user registered:', result.data);
                },
              },
            ]
          );
        }
      } else {
        Alert.alert('Error', result.error || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>Name *</Text>
      <TextInput
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        placeholder="Full Name"
      />

      <Text>Phone Number *</Text>
      <TextInput
        value={formData.phoneNumber}
        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
        placeholder="10-digit number"
        keyboardType="phone-pad"
        maxLength={10}
      />

      <Text>Date of Birth *</Text>
      <TextInput
        value={formData.dob}
        onChangeText={(text) => setFormData({ ...formData, dob: text })}
        placeholder="DD/MM/YYYY"
      />

      <Text>Disability Type *</Text>
      <TextInput
        value={formData.disabilityType}
        onChangeText={(text) => setFormData({ ...formData, disabilityType: text })}
        placeholder="Type of disability"
      />

      <Text>Disability Percentage *</Text>
      <TextInput
        value={formData.disabilityPercentage}
        onChangeText={(text) => setFormData({ ...formData, disabilityPercentage: text })}
        placeholder="e.g., 75%"
      />

      <Text>Address</Text>
      <TextInput
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
        placeholder="Full address"
        multiline
      />

      <Button
        title={loading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
        disabled={loading}
      />
    </View>
  );
};

export default RegistrationScreen;
```

### Flutter Complete Example

```dart
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class RegistrationScreen extends StatefulWidget {
  @override
  _RegistrationScreenState createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _dobController = TextEditingController();
  final _disabilityTypeController = TextEditingController();
  final _disabilityPercentageController = TextEditingController();
  final _addressController = TextEditingController();
  bool _isLoading = false;

  Future<void> _handleRegistration() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      final response = await http.post(
        Uri.parse('http://YOUR_IP:3000/api/register'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'name': _nameController.text,
          'phoneNumber': _phoneController.text,
          'dob': _dobController.text,
          'disabilityType': _disabilityTypeController.text,
          'disabilityPercentage': _disabilityPercentageController.text,
          'address': _addressController.text,
        }),
      );

      final result = json.decode(response.body);

      if (result['success']) {
        if (result['userExists']) {
          // User already registered
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: Text('Already Registered'),
              content: Text('Welcome back ${result['data']['name']}! Your details are already in our system.'),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                    // Navigate to details screen
                  },
                  child: Text('View Details'),
                ),
              ],
            ),
          );
        } else {
          // New registration successful
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: Text('Success'),
              content: Text('Registration completed successfully!'),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                    // Navigate to home or success screen
                  },
                  child: Text('OK'),
                ),
              ],
            ),
          );
        }
      } else {
        // Error
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(result['error'] ?? 'Registration failed')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Network error. Please try again.')),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Register Beneficiary')),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: EdgeInsets.all(16),
          children: [
            TextFormField(
              controller: _nameController,
              decoration: InputDecoration(labelText: 'Name *'),
              validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
            ),
            TextFormField(
              controller: _phoneController,
              decoration: InputDecoration(labelText: 'Phone Number *'),
              keyboardType: TextInputType.phone,
              maxLength: 10,
              validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
            ),
            TextFormField(
              controller: _dobController,
              decoration: InputDecoration(labelText: 'Date of Birth *'),
              validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
            ),
            TextFormField(
              controller: _disabilityTypeController,
              decoration: InputDecoration(labelText: 'Disability Type *'),
              validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
            ),
            TextFormField(
              controller: _disabilityPercentageController,
              decoration: InputDecoration(labelText: 'Disability Percentage *'),
              validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
            ),
            TextFormField(
              controller: _addressController,
              decoration: InputDecoration(labelText: 'Address'),
              maxLines: 3,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _isLoading ? null : _handleRegistration,
              child: Text(_isLoading ? 'Registering...' : 'Register'),
            ),
          ],
        ),
      ),
    );
  }
}
```

---

## Testing

### Using the Web Interface

1. Start your server: `npm run dev`
2. Open: `http://localhost:3000/api-test.html`
3. Use the "Register Beneficiary" section at the top
4. Fill in the required fields and click "Register / Check Existing"

### Using Postman

1. Create a new POST request
2. URL: `http://localhost:3000/api/register`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Test User",
  "phoneNumber": "1234567890",
  "dob": "01/01/1990",
  "disabilityType": "Physical",
  "disabilityPercentage": "50%"
}
```

---

## Error Handling

### In Your Mobile App

```javascript
const handleRegistration = async (userData) => {
  try {
    const response = await fetch('http://YOUR_IP:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!result.success) {
      // Handle error
      if (response.status === 400) {
        alert('Please fill all required fields');
      } else if (response.status === 500) {
        alert('Server error. Please try again later.');
      } else {
        alert(result.error || 'Registration failed');
      }
      return null;
    }

    return result;
  } catch (error) {
    // Network error
    alert('Network error. Please check your connection.');
    return null;
  }
};
```

---

## Best Practices

1. **Validate phone numbers** on the client side before sending
2. **Show loading indicators** during API calls
3. **Handle both cases** (existing user vs new registration) appropriately
4. **Store user data** locally after successful registration
5. **Implement retry logic** for network failures
6. **Use proper error messages** for better UX

---

## Security Notes

- Phone numbers are used as unique identifiers
- No authentication required (add if needed for production)
- All data is stored in MongoDB
- Consider adding rate limiting for production

---

## Support

For issues or questions, refer to:
- `API_DOCUMENTATION.md` for general API info
- `API_QUICKSTART.md` for quick start guide
- Test the endpoint at `http://localhost:3000/api-test.html`
