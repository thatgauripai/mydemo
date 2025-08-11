import 'package:flutter/foundation.dart';

import '../models/article.dart';
import '../models/category.dart';
import '../services/data_service.dart';

class NewsProvider extends ChangeNotifier {
  final DataService _dataService = DataService();

  bool isLoading = true;
  List<Article> featured = [];
  List<Article> latest = [];
  List<Article> sportsArticles = [];
  List<Article> entertainment = [];
  List<SportsCategory> sportsCategories = [];
  List<String> quotes = [];

  Future<void> loadAll() async {
    isLoading = true;
    notifyListeners();
    try {
      final results = await Future.wait([
        _dataService.loadFeatured(),
        _dataService.loadLatest(),
        _dataService.loadSportsArticles(),
        _dataService.loadEntertainment(),
        _dataService.loadSportsCategories(),
        _dataService.loadQuotes(),
      ]);
      featured = results[0] as List<Article>;
      latest = results[1] as List<Article>;
      sportsArticles = results[2] as List<Article>;
      entertainment = results[3] as List<Article>;
      sportsCategories = results[4] as List<SportsCategory>;
      quotes = results[5] as List<String>;
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<void> refreshHome() async {
    final results = await Future.wait([
      _dataService.loadFeatured(),
      _dataService.loadLatest(),
    ]);
    featured = results[0] as List<Article>;
    latest = results[1] as List<Article>;
    notifyListeners();
  }
}