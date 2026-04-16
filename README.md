# UnsentLetters 🎵

A modern, beautiful website for sharing heartfelt messages tied to songs, just like SendTheSong. Express your untold stories through music!

## Features

✨ **Share Messages Through Music**
- Choose a song and write a heartfelt message
- Send messages to someone special or keep them as a personal gift
- Select music platform (Spotify, Apple Music, YouTube Music, etc.)

🔍 **Browse & Discover**
- Search for messages by recipient name
- Filter stories by recent or popular
- View detailed messages with full song information

🎨 **Modern Design**
- Beautiful gradient UI with dark theme
- Smooth animations and transitions
- Responsive design for all devices
- Interactive message cards

📱 **Fully Responsive**
- Mobile-friendly interface
- Touch-friendly buttons and inputs
- Optimized for tablets and desktops

## Project Structure

```
UnsentLetters/
├── index.html         # Home page
├── submit.html        # Submit/Create message page
├── browse.html        # Browse and search messages page
├── styles.css         # All styling (responsive design)
├── script.js          # JavaScript functionality
└── README.md          # This file
```

## Pages Overview

### 1. Home Page (index.html)
- Hero section with call-to-action buttons
- Features section showing how the platform works
- Recent messages carousel
- Inspiring hero animation with rotating vinyl record

### 2. Submit Page (submit.html)
- Form to create new messages
- Input fields for:
  - Recipient name (optional)
  - Message content (500 char limit)
  - Song title and artist
  - Music platform selection
  - Direct link to song
- Privacy options (public/searchable)
- Success modal with sharable link
- Character counter

### 3. Browse Page (browse.html)
- Search functionality to find messages by name
- Filter buttons (All, Recent, Popular)
- Message cards grid display
- Detailed modal with full message view
- Link to listen on music platform
- Share functionality

## How to Use

1. **Open in Browser**
   - Open `index.html` in any modern web browser
   - No server setup required!

2. **Share a Message**
   - Click "Tell Your Story" button
   - Fill in the form with your message and song
   - Click "Share Your Story"
   - Copy and share the generated link

3. **Browse Messages**
   - Click "Browse Stories" to see all messages
   - Use the search bar to find messages for specific people
   - Click on any message card to read the full story
   - Click the Spotify link to listen to the song

## Colors & Styling

The site uses a modern dark theme with vibrant gradients:
- **Primary Color**: Purple (#8b5cf6)
- **Secondary Color**: Pink (#ec4899)
- **Accent Color**: Cyan (#06b6d4)
- **Dark Background**: #0f172a
- **Card Background**: #1e293b

## JavaScript Features

- **Dynamic Message Loading**: Messages stored in `allMessages` array
- **Search & Filter**: Real-time search and categorized filtering
- **Form Validation**: Input validation and character limits
- **Modal System**: Beautiful modals for message details and success
- **Local Storage Ready**: Can be extended to save data locally
- **Responsive Navigation**: Active link highlighting

## Sample Data

The script includes sample messages to demonstrate functionality. To use real data:

1. Replace the `allMessages` array in `script.js` with your backend API
2. Update the form submission handler to send data to your server
3. Implement database storage for persistent messages

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend integration with database
- User authentication system
- Message likes/reactions
- Comment system
- Advanced search filters
- User profiles
- Email notifications
- Dark/Light theme toggle
- Social sharing features
- Analytics dashboard

## Customization

To customize the site:

1. **Colors**: Edit CSS custom properties in `styles.css` (`:root` section)
2. **Fonts**: Change font families in CSS
3. **Messages**: Add/remove sample data in `script.js`
4. **Content**: Edit HTML text in the three main pages
5. **Logo**: Replace "🎵 UnsentLetters" in navigation

## Tips for Development

- Use browser DevTools to test responsive design
- Check Console for any JavaScript errors
- Test form validation with empty fields
- Try search functionality with various queries
- Test on different screen sizes (use DevTools mobile view)

## License

Free to use and modify for your project!

---

**Made with ❤️ for sharing untold stories**

Share your messages. Share your music. Share your heart. 🎵
