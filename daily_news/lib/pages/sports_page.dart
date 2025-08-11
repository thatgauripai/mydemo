import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/article.dart';
import '../models/category.dart';
import '../providers/news_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/news_card.dart';
import '../widgets/shimmer_list.dart';

class SportsPage extends StatelessWidget {
  const SportsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<NewsProvider>();
    final Color gold = AppTheme.gold;
    final ScrollController controller = ScrollController();

    return Scaffold(
      appBar: AppBar(
        title: Text('Sports News', style: TextStyle(color: gold, fontWeight: FontWeight.w700)),
      ),
      body: provider.isLoading
          ? const ShimmerList()
          : CustomScrollView(
              controller: controller,
              physics: const BouncingScrollPhysics(),
              slivers: [
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                  sliver: SliverToBoxAdapter(
                    child: _CategoriesGrid(categories: provider.sportsCategories),
                  ),
                ),
                const SliverToBoxAdapter(
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    child: Text('Latest in Sports', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                  ),
                ),
                SliverList.builder(
                  itemCount: provider.sportsArticles.length,
                  itemBuilder: (context, index) {
                    final Article a = provider.sportsArticles[index];
                    return NewsCard(article: a);
                  },
                ),
                const SliverToBoxAdapter(child: SizedBox(height: 100)),
              ],
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => controller.animateTo(0, duration: const Duration(milliseconds: 350), curve: Curves.easeOut),
        backgroundColor: gold,
        foregroundColor: Colors.black,
        child: const Icon(Icons.arrow_upward),
      ),
    );
  }
}

class _CategoriesGrid extends StatelessWidget {
  const _CategoriesGrid({required this.categories});
  final List<SportsCategory> categories;

  @override
  Widget build(BuildContext context) {
    final Color gold = AppTheme.gold;
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 4,
        mainAxisExtent: 88,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
      ),
      itemCount: categories.length,
      itemBuilder: (context, index) {
        final c = categories[index];
        return InkWell(
          onTap: () {},
          borderRadius: BorderRadius.circular(14),
          child: Ink(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: gold, width: 1.5),
              color: const Color(0xFF0E0E0E),
            ),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(_iconFor(c.icon), color: gold),
                  const SizedBox(height: 6),
                  Text(c.name, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  IconData _iconFor(String key) {
    switch (key) {
      case 'football':
        return Icons.sports_soccer;
      case 'cricket':
        return Icons.sports_cricket;
      case 'tennis':
        return Icons.sports_tennis;
      case 'basketball':
        return Icons.sports_basketball;
      case 'golf':
        return Icons.sports_golf;
      case 'esports':
        return Icons.sports_esports;
      default:
        return Icons.sports;
    }
  }
}