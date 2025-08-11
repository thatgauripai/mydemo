import 'dart:async';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/article.dart';
import '../providers/news_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/gold_button.dart';
import '../widgets/shimmer_list.dart';
import 'article_detail_page.dart';

class EntertainmentPage extends StatefulWidget {
  const EntertainmentPage({super.key});

  @override
  State<EntertainmentPage> createState() => _EntertainmentPageState();
}

class _EntertainmentPageState extends State<EntertainmentPage> {
  final PageController _pageController = PageController(viewportFraction: 0.95);
  Timer? _timer;
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _startAutoSlide();
  }

  void _startAutoSlide() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 30), (_) {
      if (!mounted) return;
      final provider = context.read<NewsProvider>();
      if (provider.entertainment.isEmpty) return;
      _currentIndex = (_currentIndex + 1) % provider.entertainment.length;
      _pageController.animateToPage(
        _currentIndex,
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<NewsProvider>();
    final Color gold = AppTheme.gold;

    return Scaffold(
      appBar: AppBar(
        title: Text('Entertainment', style: TextStyle(color: gold, fontWeight: FontWeight.w700)),
      ),
      body: provider.isLoading
          ? const ShimmerList()
          : ListView(
              physics: const BouncingScrollPhysics(),
              children: [
                const SizedBox(height: 12),
                SizedBox(
                  height: 420,
                  child: PageView.builder(
                    controller: _pageController,
                    itemCount: provider.entertainment.length,
                    onPageChanged: (i) => setState(() => _currentIndex = i),
                    itemBuilder: (context, index) {
                      final a = provider.entertainment[index];
                      return _EntertainmentCard(article: a);
                    },
                  ),
                ),
                const SizedBox(height: 24),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: _QuoteOfDay(quotes: provider.quotes),
                ),
                const SizedBox(height: 100),
              ],
            ),
    );
  }
}

class _EntertainmentCard extends StatelessWidget {
  const _EntertainmentCard({required this.article});
  final Article article;

  @override
  Widget build(BuildContext context) {
    final Color gold = AppTheme.gold;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Hero(
              tag: 'article-image-${article.id}',
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: AspectRatio(
                  aspectRatio: 16 / 9,
                  child: Image.network(article.imageUrl, fit: BoxFit.cover),
                ),
              ),
            ),
            const SizedBox(height: 12),
            Text(
              article.title,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: gold),
            ),
            const SizedBox(height: 8),
            Text(
              article.description,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 12),
            GoldButton(
              label: 'Read More',
              onPressed: () {
                Navigator.of(context).push(
                  PageRouteBuilder(
                    transitionDuration: const Duration(milliseconds: 450),
                    pageBuilder: (_, a1, a2) => FadeTransition(
                      opacity: a1,
                      child: ArticleDetailPage(article: article),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 8),
            Text(DateFormat.yMMMd().format(article.date), style: TextStyle(color: gold, fontWeight: FontWeight.w600)),
          ],
        ),
      ),
    );
  }
}

class _QuoteOfDay extends StatelessWidget {
  const _QuoteOfDay({required this.quotes});
  final List<String> quotes;

  @override
  Widget build(BuildContext context) {
    final Color gold = AppTheme.gold;
    final String quote = quotes.isNotEmpty ? quotes.first : 'Stay curious and keep reading.';
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(Icons.format_quote, color: gold),
            const SizedBox(width: 8),
            Text('Quote of the Day', style: TextStyle(color: gold, fontWeight: FontWeight.w700)),
          ],
        ),
        const SizedBox(height: 8),
        Text(
          '“$quote”',
          style: const TextStyle(fontStyle: FontStyle.italic, fontSize: 14),
        ),
      ],
    );
  }
}