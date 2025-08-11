import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

class AIChatBubble extends StatelessWidget {
  const AIChatBubble({super.key, required this.text, required this.isUser});
  final String text;
  final bool isUser;

  @override
  Widget build(BuildContext context) {
    final Color gold = AppTheme.gold;
    final bg = isUser ? gold : const Color(0xFF1A1A1A);
    final fg = isUser ? Colors.black : Colors.white;
    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 6),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        constraints: const BoxConstraints(maxWidth: 420),
        decoration: BoxDecoration(
          color: bg,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(16),
            topRight: const Radius.circular(16),
            bottomLeft: Radius.circular(isUser ? 16 : 4),
            bottomRight: Radius.circular(isUser ? 4 : 16),
          ),
          border: isUser ? null : Border.all(color: gold.withOpacity(0.4)),
        ),
        child: Text(text, style: TextStyle(color: fg)),
      ),
    );
  }
}