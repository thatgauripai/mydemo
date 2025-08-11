import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import 'theme/app_theme.dart';
import 'providers/news_provider.dart';
import 'providers/theme_provider.dart';
import 'pages/home_page.dart';
import 'pages/sports_page.dart';
import 'pages/entertainment_page.dart';
import 'widgets/ai_chat_overlay.dart';

void main() {
  runApp(const DailyNewsApp());
}

class DailyNewsApp extends StatelessWidget {
  const DailyNewsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => NewsProvider()..loadAll()),
      ],
      child: Consumer<ThemeProvider>(
        builder: (context, themeProvider, _) {
          return MaterialApp(
            debugShowCheckedModeBanner: false,
            title: 'DailyNews',
            themeMode: themeProvider.themeMode,
            theme: AppTheme.lightTheme,
            darkTheme: AppTheme.darkTheme,
            home: const _RootScaffold(),
          );
        },
      ),
    );
  }
}

class _RootScaffold extends StatefulWidget {
  const _RootScaffold();

  @override
  State<_RootScaffold> createState() => _RootScaffoldState();
}

class _RootScaffoldState extends State<_RootScaffold> with TickerProviderStateMixin {
  late final PageController _pageController;
  int _currentIndex = 0;
  OverlayEntry? _chatOverlay;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: _currentIndex);
  }

  @override
  void dispose() {
    _pageController.dispose();
    _removeChatOverlay();
    super.dispose();
  }

  void _openChat() {
    if (_chatOverlay != null) return;
    _chatOverlay = AIChatOverlay.create(context, onClose: _removeChatOverlay);
    Overlay.of(context).insert(_chatOverlay!);
  }

  void _removeChatOverlay() {
    _chatOverlay?.remove();
    _chatOverlay = null;
  }

  void _onNavTapped(int index) {
    setState(() => _currentIndex = index);
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 350),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    final Color gold = AppTheme.gold;

    return Scaffold(
      body: PageView(
        controller: _pageController,
        physics: const BouncingScrollPhysics(),
        onPageChanged: (i) => setState(() => _currentIndex = i),
        children: const [
          HomePage(),
          SportsPage(),
          EntertainmentPage(),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: _onNavTapped,
        indicatorColor: gold.withOpacity(0.15),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.sports_soccer_outlined), selectedIcon: Icon(Icons.sports_soccer), label: 'Sports'),
          NavigationDestination(icon: Icon(Icons.movie_outlined), selectedIcon: Icon(Icons.movie), label: 'Entertainment'),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _openChat,
        foregroundColor: Colors.black,
        backgroundColor: gold,
        child: const Icon(Icons.smart_toy_outlined),
      ),
    );
  }
}