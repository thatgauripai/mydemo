import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/article.dart';
import '../providers/news_provider.dart';
import '../services/ai_service.dart';
import '../theme/app_theme.dart';
import 'ai_chat_bubble.dart';
import 'news_card.dart';

class AIChatOverlay {
  static OverlayEntry create(BuildContext context, {required VoidCallback onClose}) {
    return OverlayEntry(
      builder: (ctx) => _AIOverlay(onClose: onClose),
    );
  }
}

class _AIOverlay extends StatefulWidget {
  const _AIOverlay({required this.onClose});
  final VoidCallback onClose;

  @override
  State<_AIOverlay> createState() => _AIOverlayState();
}

class _AIOverlayState extends State<_AIOverlay> with SingleTickerProviderStateMixin {
  final List<_ChatMessage> _messages = [];
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  final AIService _ai = AIService();

  late final AnimationController _anim = AnimationController(vsync: this, duration: const Duration(milliseconds: 250))..forward();

  @override
  void dispose() {
    _controller.dispose();
    _scrollController.dispose();
    _anim.dispose();
    super.dispose();
  }

  void _send() async {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.add(_ChatMessage(author: _Author.user, text: text));
      _controller.clear();
    });
    await Future.delayed(const Duration(milliseconds: 120));
    _scrollToBottom();

    final reply = await _ai.ask(text);
    setState(() {
      _messages.add(_ChatMessage(author: _Author.ai, text: reply));
    });
    await Future.delayed(const Duration(milliseconds: 120));
    _scrollToBottom();
  }

  void _scrollToBottom() {
    _scrollController.animateTo(
      _scrollController.position.maxScrollExtent + 120,
      duration: const Duration(milliseconds: 250),
      curve: Curves.easeOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    final Color gold = AppTheme.gold;
    final news = context.watch<NewsProvider>();

    final List<Article> pool = [
      ...news.latest,
      ...news.featured,
      ...news.sportsArticles,
      ...news.entertainment,
    ];
    final related = _ai.related(pool, count: 3);

    return FadeTransition(
      opacity: _anim,
      child: Stack(
        children: [
          GestureDetector(
            onTap: widget.onClose,
            child: Container(color: Colors.black.withOpacity(0.6)),
          ),
            Align(
              alignment: Alignment.bottomRight,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 520, minWidth: 320, maxHeight: 560),
                  child: Material(
                    color: const Color(0xFF0E0E0E),
                    borderRadius: BorderRadius.circular(20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                          decoration: BoxDecoration(
                            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
                            color: Colors.black,
                          ),
                          child: Row(
                            children: [
                              Icon(Icons.smart_toy, color: gold),
                              const SizedBox(width: 8),
                              Text('DailyNews AI', style: TextStyle(color: gold, fontWeight: FontWeight.w700)),
                              const Spacer(),
                              IconButton(onPressed: widget.onClose, icon: const Icon(Icons.close))
                            ],
                          ),
                        ),
                        Expanded(
                          child: ListView.builder(
                            controller: _scrollController,
                            padding: const EdgeInsets.all(12),
                            itemCount: _messages.length,
                            itemBuilder: (context, index) {
                              final m = _messages[index];
                              return AIChatBubble(
                                text: m.text,
                                isUser: m.author == _Author.user,
                              );
                            },
                          ),
                        ),
                        if (related.isNotEmpty)
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 12),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const SizedBox(height: 6),
                                Text('Related Articles', style: TextStyle(color: gold, fontWeight: FontWeight.w700)),
                                const SizedBox(height: 6),
                                ...related.map((a) => Padding(
                                      padding: const EdgeInsets.only(bottom: 8.0),
                                      child: NewsCard(article: a),
                                    )),
                              ],
                            ),
                          ),
                        Padding(
                          padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
                          child: Row(
                            children: [
                              Expanded(
                                child: TextField(
                                  controller: _controller,
                                  decoration: InputDecoration(
                                    hintText: 'Ask about the news...',
                                    filled: true,
                                    fillColor: const Color(0xFF111111),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(14),
                                      borderSide: BorderSide(color: gold.withOpacity(0.5)),
                                    ),
                                    enabledBorder: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(14),
                                      borderSide: BorderSide(color: gold.withOpacity(0.5)),
                                    ),
                                  ),
                                  onSubmitted: (_) => _send(),
                                ),
                              ),
                              const SizedBox(width: 8),
                              FloatingActionButton.small(
                                onPressed: _send,
                                heroTag: null,
                                child: const Icon(Icons.send),
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

enum _Author { user, ai }

class _ChatMessage {
  final _Author author;
  final String text;
  _ChatMessage({required this.author, required this.text});
}