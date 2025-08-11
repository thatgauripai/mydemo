# DailyNews - Flutter App

A modern Material 3 Flutter News app with Home, Sports, and Entertainment sections, elegant typography via Google Fonts, and an AI Chat overlay (dummy responses).

## Features
- Material 3 UI with black background, white text, gold accents
- Bottom navigation (Home, Sports, Entertainment)
- Home: Featured carousel, latest news list, pull-to-refresh
- Sports: Categories grid + sports articles list
- Entertainment: Auto-sliding big card every 30s, Read More with Hero animation, Quote of the Day
- Article Detail page with image, headline, date, and full content
- AI Chatbot overlay (dummy AI) with related articles
- Shimmer loading placeholders, smooth scrolling, gold animations
- Dark mode toggle (default black theme)

## Getting Started
1. Install Flutter SDK: https://docs.flutter.dev/get-started/install
2. From project root:
```bash
flutter pub get
flutter run
```

No API setup is required. All data is dummy JSON in `data/news.json`.