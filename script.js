// ==========================================
// STORAGE SETUP
// ==========================================

const STORAGE_KEY = 'unsentLettersMessages';

const defaultMessages = [
    {
        id: 1,
        to: 'alexa',
        message: 'i know we promised no goodbyes, tapi kadang life really gets in the way ya',
        songTitle: 'All Too Well (Taylor\'s Version)',
        artist: 'Taylor Swift',
        platform: 'spotify',
        musicUrl: 'https://open.spotify.com/track/3nsfB1vus2qaloUdcBZvDu',
        artwork: '🎵',
        date: '2026-04-15',
        isPublic: true
    },
    {
        id: 2,
        to: 'reza',
        message: 'masih ada notes kita di gallery, full of plans yang ga pernah kejadian!',
        songTitle: 'when was it over?',
        artist: 'Sasha Alex Sloan, Sam Hunt',
        platform: 'spotify',
        musicUrl: 'https://open.spotify.com/track/779UN3kabApm2zfqX549vf',
        artwork: '🎶',
        date: '2026-04-14',
        isPublic: true
    },
    {
        id: 3,
        to: 'nayla',
        message: 'thank you for being my safe place through 2023... even if we drifted!',
        songTitle: 'SOUL LADY',
        artist: 'YUKIKA',
        platform: 'spotify',
        musicUrl: 'https://open.spotify.com/track/6at6MpTibyLqAYnBee95Ev',
        artwork: '💿',
        date: '2026-04-13',
        isPublic: true
    },
    {
        id: 4,
        to: 'jensen',
        message: 'kadang i wish i could tell u how much ur random texts made my day better!',
        songTitle: 'Past Life',
        artist: 'Tame Impala',
        platform: 'spotify',
        musicUrl: 'https://open.spotify.com/track/4a9fW33mYR8LhXBOLUhbfF',
        artwork: '🎧',
        date: '2026-04-12',
        isPublic: true
    },
    {
        id: 5,
        to: 'kinan',
        message: 'still got our playlist on private... some songs will always remind me of u!',
        songTitle: 'Is It The Answer',
        artist: 'Reality Club',
        platform: 'spotify',
        musicUrl: 'https://open.spotify.com/track/2ktoK3iAhuVDuMEleoFo0L',
        artwork: '🎼',
        date: '2026-04-11',
        isPublic: true
    },
    {
        id: 6,
        to: 'clara',
        message: 'our random drives pas ujan still live in my mind rent free!',
        songTitle: '505',
        artist: 'Arctic Monkeys',
        platform: 'spotify',
        musicUrl: 'https://open.spotify.com/track/58ge6dfP91o9oXMzq3XkIS',
        artwork: '🎵',
        date: '2026-04-10',
        isPublic: true
    }
];

function loadStoredMessages() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return null;
        return parsed;
    } catch (error) {
        console.warn('Failed to load stored messages:', error);
        return null;
    }
}

function saveMessages() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allMessages));
    } catch (error) {
        console.warn('Failed to save messages:', error);
    }
}

let allMessages = loadStoredMessages() || defaultMessages;

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ==========================================
// MESSAGE CARD CREATION
// ==========================================

function createMessageCard(message) {
    const card = document.createElement('div');
    card.className = 'message-card';
    card.innerHTML = `
        <div class="message-artwork">${message.artwork}</div>
        <div class="message-content">
            <div class="message-recipient">To: <strong>${message.to}</strong></div>
            <p class="message-text">${truncateText(message.message, 120)}</p>
            <div class="message-song">
                <div class="song-title">${truncateText(message.songTitle, 40)}</div>
                <div class="song-artist">${truncateText(message.artist, 50)}</div>
            </div>
        </div>
    `;
    card.addEventListener('click', () => openMessageModal(message));
    return card;
}

// ==========================================
// MODAL FUNCTIONS
// ==========================================

function openMessageModal(message) {
    const modal = document.getElementById('messageModal');
    if (!modal) return;

    document.getElementById('detailRecipient').textContent = `To: ${message.to}`;
    document.getElementById('detailSongTitle').textContent = message.songTitle;
    document.getElementById('detailArtist').textContent = message.artist;
    document.getElementById('detailDate').textContent = formatDate(message.date);
    document.getElementById('detailMessage').textContent = message.message;
    document.getElementById('detailArtwork').textContent = message.artwork;
    
    const spotifyLink = document.getElementById('spotifyLink');
    if (spotifyLink) {
        spotifyLink.href = message.musicUrl;
    }

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function shareMessage() {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this message on UnsentLetters',
            text: 'A heartfelt message shared through music',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert('Share the link: ' + window.location.href);
    }
}

// ==========================================
// BROWSE PAGE FUNCTIONS
// ==========================================

function displayMessages(messages) {
    const grid = document.getElementById('messagesGrid');
    const noResults = document.getElementById('noResults');

    if (!grid) return;

    grid.innerHTML = '';

    if (messages.length === 0) {
        if (noResults) noResults.style.display = 'block';
        return;
    }

    if (noResults) noResults.style.display = 'none';

    messages.forEach(message => {
        grid.appendChild(createMessageCard(message));
    });
}

function searchMessages() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();

    if (query === '') {
        displayMessages(allMessages);
        return;
    }

    const results = allMessages.filter(msg =>
        msg.to.toLowerCase().includes(query) ||
        msg.message.toLowerCase().includes(query) ||
        msg.songTitle.toLowerCase().includes(query) ||
        msg.artist.toLowerCase().includes(query)
    );

    displayMessages(results);
}

function filterMessages(filterType) {
    let filtered = [...allMessages];

    if (filterType === 'recent') {
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (filterType === 'popular') {
        filtered = filtered.slice(0, Math.ceil(filtered.length / 2));
    }

    displayMessages(filtered);
}

// ==========================================
// SUBMIT FORM FUNCTIONS
// ==========================================

function handleCharCount() {
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    if (textarea && charCount) {
        textarea.addEventListener('input', () => {
            const remaining = 500 - textarea.value.length;
            charCount.textContent = `${textarea.value.length} / 500 characters`;

            if (remaining < 0) {
                textarea.value = textarea.value.substring(0, 500);
                charCount.textContent = '500 / 500 characters';
            }
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const recipientName = document.getElementById('recipientName').value || 'Anonymous';
    const message = document.getElementById('message').value;
    const songTitle = document.getElementById('songTitle').value;
    const artistName = document.getElementById('artistName').value;
    const musicPlatform = document.getElementById('musicPlatform').value;
    const musicUrl = document.getElementById('musicUrl').value;
    const isPublic = document.getElementById('isPublic').checked;

    if (!message || !songTitle || !artistName || !musicUrl) {
        alert('Please fill in all required fields');
        return;
    }

    // Create new message object
    const newMessage = {
        id: allMessages.length + 1,
        to: recipientName,
        message: message,
        songTitle: songTitle,
        artist: artistName,
        platform: musicPlatform,
        musicUrl: musicUrl,
        artwork: getRandomElement(['🎵', '🎶', '💿', '🎧', '🎼', '🎤']),
        date: new Date().toISOString().split('T')[0],
        isPublic: isPublic
    };

    // Add to messages array
    allMessages.push(newMessage);
    saveMessages();

    // Show success modal
    showSuccessModal();

    // Reset form
    document.getElementById('submitForm').reset();
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const shareLink = document.getElementById('shareLink');
    const lastMessage = allMessages[allMessages.length - 1];

    if (modal && shareLink) {
        const recipientQuery = lastMessage.to && lastMessage.to !== 'Anonymous'
            ? `?to=${encodeURIComponent(lastMessage.to)}`
            : '';

        const basePath = window.location.protocol.startsWith('http')
            ? `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, '')}`
            : '';

        shareLink.value = `${basePath}browse.html${recipientQuery}`;
        modal.style.display = 'flex';
    }
}

function copyToClipboard() {
    const shareLink = document.getElementById('shareLink');
    if (shareLink) {
        shareLink.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    }
}

// ==========================================
// HOME PAGE FUNCTIONS
// ==========================================

function loadRecentMessages() {
    const recentMessages = document.getElementById('recentMessages');
    if (!recentMessages) return;

    const recent = allMessages.slice(-6).reverse();
    recent.forEach(message => {
        recentMessages.appendChild(createMessageCard(message));
    });
}

// ==========================================
// EVENT LISTENERS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Home page
    if (document.getElementById('recentMessages')) {
        loadRecentMessages();
    }

    // Browse page
    if (document.getElementById('messagesGrid')) {
        displayMessages(allMessages);

        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        const filterBtns = document.querySelectorAll('.filter-btn');

        if (searchBtn) searchBtn.addEventListener('click', searchMessages);
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') searchMessages();
            });

            const params = new URLSearchParams(window.location.search);
            const toParam = params.get('to');
            if (toParam) {
                searchInput.value = toParam;
                searchMessages();
            }
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterMessages(btn.dataset.filter);
            });
        });
    }

    // Submit page
    if (document.getElementById('submitForm')) {
        handleCharCount();
        document.getElementById('submitForm').addEventListener('submit', handleFormSubmit);
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('messageModal');
        if (modal && e.target === modal) {
            closeModal();
        }

        const successModal = document.getElementById('successModal');
        if (successModal && e.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    // Update active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href.includes(currentPage) || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.style.display = 'none';
        }
    }
});
