import 'dart:convert';

import 'package:flutter/services.dart' show rootBundle;

import '../models/article.dart';
import '../models/category.dart';

class DataService {
  Future<Map<String, dynamic>> _loadRaw() async {
    final String jsonStr = await rootBundle.loadString('data/news.json');
    // Simulate network delay for shimmer effect
    await Future.delayed(const Duration(milliseconds: 600));
    return json.decode(jsonStr) as Map<String, dynamic>;
  }

  Future<List<Article>> loadFeatured() async {
    final raw = await _loadRaw();
    final List list = raw['featured'] as List;
    return list.map((e) => Article.fromJson(Map<String, dynamic>.from(e))).toList();
  }

  Future<List<Article>> loadLatest() async {
    final raw = await _loadRaw();
    final List list = raw['latest'] as List;
    return list.map((e) => Article.fromJson(Map<String, dynamic>.from(e))).toList();
  }

  Future<List<Article>> loadSportsArticles() async {
    final raw = await _loadRaw();
    final List list = raw['sportsArticles'] as List;
    return list.map((e) => Article.fromJson(Map<String, dynamic>.from(e))).toList();
  }

  Future<List<SportsCategory>> loadSportsCategories() async {
    final raw = await _loadRaw();
    final List list = raw['sportsCategories'] as List;
    return list.map((e) => SportsCategory.fromJson(Map<String, dynamic>.from(e))).toList();
  }

  Future<List<Article>> loadEntertainment() async {
    final raw = await _loadRaw();
    final List list = raw['entertainment'] as List;
    return list.map((e) => Article.fromJson(Map<String, dynamic>.from(e))).toList();
  }

  Future<List<String>> loadQuotes() async {
    final raw = await _loadRaw();
    final List list = raw['quotes'] as List;
    return list.map((e) => e.toString()).toList();
  }
}