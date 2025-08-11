import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../models/article.dart';
import '../theme/app_theme.dart';

class ArticleDetailPage extends StatelessWidget {
  const ArticleDetailPage({super.key, required this.article});
  final Article article;

  @override
  Widget build(BuildContext context) {
    final Color gold = AppTheme.gold;
    return Scaffold(
      appBar: AppBar(),
      body: ListView(
        padding: const EdgeInsets.all(16),
        physics: const BouncingScrollPhysics(),
        children: [
          Hero(
            tag: 'article-image-${article.id}',
            child: ClipRRect(
              borderRadius: BorderRadius.circular(16),
              child: AspectRatio(
                aspectRatio: 16 / 9,
                child: Image.network(article.imageUrl, fit: BoxFit.cover),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(article.title, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
          const SizedBox(height: 8),
          Text(DateFormat.yMMMd().format(article.date), style: TextStyle(color: gold, fontWeight: FontWeight.w600)),
          const SizedBox(height: 16),
          Text(
            article.content,
            style: const TextStyle(height: 1.5),
          ),
          const SizedBox(height: 80),
        ],
      ),
    );
  }
}