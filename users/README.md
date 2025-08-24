# TaskFlow User Accounts

This directory contains the user account database for TaskFlow's authentication system.

## Files:
- `users.json` - Contains all user accounts with hashed passwords

## Structure:
```json
{
  "username": {
    "userId": "user-timestamp-random",
    "passwordHash": "hashed_password",
    "createdAt": "2024-01-01T12:00:00Z"
  }
}
```

## Security:
- Passwords are hashed (not stored in plain text)
- Only username and hashed password are stored
- GitHub tokens are not stored in this file for security
- Users must provide their GitHub token each time they login

## Cross-Device Login:
- Users can login from any device/browser
- Accounts are stored in GitHub repository (not browser localStorage)
- Requires username, password, and the same GitHub token used during registration