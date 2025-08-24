# TaskFlow Cloud Storage

This directory contains user data files for TaskFlow's cloud sync feature.

## How it works:
- Each user gets a unique JSON file (e.g., `user-123456.json`)
- Files are automatically created and updated when users enable cloud sync
- Data includes tasks, profile information, and settings
- All data is stored securely in this GitHub repository

## Privacy:
- Each user has a unique ID that doesn't contain personal information
- Users must provide their own GitHub Personal Access Token
- Data is only accessible to the repository owner and authorized users

## File Structure:
```json
{
  "tasks": [...],
  "name": "User Name",
  "profilePicture": "base64_or_url",
  "lastSync": "2024-01-01T12:00:00Z",
  "version": "2.0"
}
```