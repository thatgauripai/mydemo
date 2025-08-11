import 'dart:math';

import '../models/article.dart';

class AIService {
  final Random _random = Random();

  Future<String> ask(String prompt) async {
    await Future.delayed(const Duration(milliseconds: 500));
    final responses = [
      'Here\'s a quick summary based on recent headlines.',
      'This topic is trending today with multiple perspectives.',
      'Analysts suggest watching how the story develops over the week.',
      'Key takeaway: context matters — here\'s what to note.',
      'I\'ve highlighted a few articles that relate closely to your question.'
    ];
    return responses[_random.nextInt(responses.length)];
  }

  List<Article> related(List<Article> pool, {int count = 3}) {
    if (pool.isEmpty) return [];
    final shuffled = List<Article>.from(pool)..shuffle(_random);
    return shuffled.take(count).toList();
  }
}