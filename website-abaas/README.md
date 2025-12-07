# AB AAS - Beneficiary Management System

A Next.js application for managing beneficiary data for **अखिल भारतीय अष्टावक्र अद्वैत संस्थान (AB AAS)** with Firebase Firestore integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure Firebase (see setup below)
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Start development server
npm run dev
```

**Access Points:**
- 🌐 Web Dashboard: `http://localhost:3000`

## 🔧 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once created, click on "Web" icon (</>) to add a web app

### 2. Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Copy the Firebase configuration values
4. Create `.env.local` file in project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Setup Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in production mode" or "Test mode" (for development)
4. Select a location for your database
5. Create a collection named `beneficiaries`

### 4. Firestore Security Rules (Optional)

For development, you can use these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /beneficiaries/{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Note:** For production, implement proper authentication and security rules.

## 📊 Adding Sample Data

You can add beneficiaries directly through the Firebase Console:

1. Go to Firestore Database
2. Click on `beneficiaries` collection
3. Click "Add document"
4. Add fields:
   - `name` (string)
   - `phoneNumber` (string)
   - `dob` (string)
   - `address` (string)
   - `disabilityType` (string)
   - `disabilityPercentage` (string)
   - `maritalStatus` (string)
   - `comments` (string)

## 🎯 Features

- ✅ Firebase Firestore integration
- ✅ Real-time data fetching
- ✅ Web dashboard with search functionality
- ✅ Statistics dashboard
- ✅ Responsive design
- ✅ Client-side data fetching

## 📊 Data Structure

```typescript
{
  "id": "string",                    // Firestore Document ID
  "name": "string",
  "phoneNumber": "string",
  "dob": "string",
  "address": "string",
  "disabilityType": "string",
  "disabilityPercentage": "string",
  "maritalStatus": "string",
  "comments": "string"
}
```

## 🔐 Security Notes

**Development:**
- Firebase config exposed in client (safe for public apps)
- Use Firestore security rules to protect data

**Production:**
- Implement proper Firestore security rules
- Add Firebase Authentication
- Use environment variables for sensitive data
- Enable App Check for additional security

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify `.env.local` has correct Firebase credentials
- Check Firebase project is active
- Ensure Firestore database is created
- Verify collection name is `beneficiaries`

### No Data Showing
- Check Firestore console for data
- Verify security rules allow read access
- Check browser console for errors

## 📦 Tech Stack

- **Framework:** Next.js 16
- **Database:** Firebase Firestore
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Data Fetching:** Client-side with Firebase SDK

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Project Status:** ✅ Complete and Ready for Mobile Integration

For detailed API documentation and mobile integration examples, see the documentation files listed above.
