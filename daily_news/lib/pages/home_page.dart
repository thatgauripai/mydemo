import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../models/article.dart';
import '../providers/news_provider.dart';
import '../providers/theme_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/news_card.dart';
import '../widgets/shimmer_list.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final ScrollController _scrollController = ScrollController();
  bool _showScrollFab = false;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      final shouldShow = _scrollController.offset > 300;
      if (shouldShow != _showScrollFab) {
        setState(() => _showScrollFab = shouldShow);
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<NewsProvider>();
    final themeProvider = context.read<ThemeProvider>();
    final Color gold = AppTheme.gold;

    return Scaffold(
      appBar: AppBar(
        title: Text('DailyNews', style: TextStyle(color: gold, fontWeight: FontWeight.w700)),
        actions: [
          IconButton(
            tooltip: 'Search',
            onPressed: () {},
            icon: const Icon(Icons.search),
          ),
          IconButton(
            tooltip: 'Toggle theme',
            onPressed: themeProvider.toggle,
            icon: const Icon(Icons.brightness_6_outlined),
          ),
        ],
      ),
      body: provider.isLoading
          ? const ShimmerList()
          : RefreshIndicator(
              onRefresh: provider.refreshHome,
              color: gold,
              backgroundColor: Colors.black,
              child: CustomScrollView(
                controller: _scrollController,
                physics: const BouncingScrollPhysics(),
                slivers: [
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.only(top: 8, bottom: 12),
                      child: _buildCarousel(provider.featured),
                    ),
                  ),
                  const SliverToBoxAdapter(
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      child: Text('Latest News', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                    ),
                  ),
                  SliverList.builder(
                    itemCount: provider.latest.length,
                    itemBuilder: (context, index) {
                      final Article a = provider.latest[index];
                      return NewsCard(article: a);
                    },
                  ),
                  const SliverToBoxAdapter(child: SizedBox(height: 100)),
                ],
              ),
            ),
      floatingActionButton: _showScrollFab
          ? FloatingActionButton(
              onPressed: () => _scrollController.animateTo(0, duration: const Duration(milliseconds: 350), curve: Curves.easeOut),
              backgroundColor: gold,
              foregroundColor: Colors.black,
              child: const Icon(Icons.arrow_upward),
            )
          : null,
    );
  }

  Widget _buildCarousel(List<Article> featured) {
    final Color gold = AppTheme.gold;
    return CarouselSlider.builder(
      itemCount: featured.length,
      options: CarouselOptions(
        height: 220,
        autoPlay: true,
        autoPlayInterval: const Duration(seconds: 6),
        enlargeCenterPage: true,
        viewportFraction: 0.9,
      ),
      itemBuilder: (context, index, realIdx) {
        final a = featured[index];
        return GestureDetector(
          onTap: () => NewsCard.openDetail(context, a),
          child: Stack(
            children: [
              Hero(
                tag: 'article-image-${a.id}',
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Image.network(
                    a.imageUrl,
                    height: double.infinity,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, Colors.black.withOpacity(0.7)],
                  ),
                ),
              ),
              Positioned(
                left: 16,
                right: 16,
                bottom: 16,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      a.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 6),
                    Text(DateFormat.yMMMd().format(a.date), style: TextStyle(color: gold, fontWeight: FontWeight.w600)),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}