# Email Setup Guide for Password Reset

## 🚨 Critical: Email Configuration Required

Your password reset functionality **WILL NOT WORK** in deployment without proper email configuration.

## 📧 Email Service Options

### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Environment Variables:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   FROM_NAME=TaskForge
   FROM_EMAIL=your-email@gmail.com
   ```

### Option 2: SendGrid (Recommended for Production)

1. **Create SendGrid Account** (free tier available)
2. **Get API Key** from SendGrid dashboard
3. **Environment Variables:**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   FROM_NAME=TaskForge
   FROM_EMAIL=noreply@yourdomain.com
   ```

### Option 3: Mailgun

1. **Create Mailgun Account**
2. **Get SMTP credentials**
3. **Environment Variables:**
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=your-mailgun-username
   SMTP_PASS=your-mailgun-password
   FROM_NAME=TaskForge
   FROM_EMAIL=noreply@yourdomain.com
   ```

## 🔧 Testing Email Configuration

### Local Testing:
```bash
# In your backend directory
node -e "
const sendEmail = require('./utils/sendEmail');
sendEmail({
  email: 'test@example.com',
  subject: 'Test Email',
  message: 'This is a test email',
  html: '<p>This is a test email</p>'
}).then(() => console.log('✅ Email sent')).catch(err => console.error('❌ Error:', err));
"
```

## 🚀 Production Deployment Checklist

### Environment Variables to Set:
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS`
- [ ] `FROM_NAME`
- [ ] `FROM_EMAIL`
- [ ] `FRONTEND_URL` (your actual domain)
- [ ] `NODE_ENV=production`

### Common Issues & Solutions:

1. **"Authentication failed"**
   - Check SMTP credentials
   - Ensure app password is used (not regular password)
   - Verify 2FA is enabled for Gmail

2. **"Connection timeout"**
   - Check SMTP host and port
   - Ensure firewall allows SMTP traffic
   - Try different ports (587, 465, 25)

3. **"Email not received"**
   - Check spam folder
   - Verify email address is correct
   - Check email service logs

4. **"Invalid token" errors**
   - Ensure FRONTEND_URL matches your actual domain
   - Check token expiry time
   - Verify JWT_SECRET is consistent

## 📱 Mobile App Considerations

If you plan to have a mobile app:
- Use deep links for password reset
- Consider SMS-based reset as alternative
- Implement universal links for iOS

## 🔒 Security Best Practices

1. **Use environment-specific URLs**
2. **Set appropriate token expiry** (30min for production)
3. **Implement rate limiting** (already done)
4. **Log email attempts** for monitoring
5. **Use HTTPS** for all reset links
6. **Validate email addresses** before sending

## 🆘 Troubleshooting

If emails still don't work:
1. Check server logs for detailed errors
2. Test with a simple email service first
3. Verify DNS settings for custom domains
4. Contact your hosting provider about SMTP restrictions