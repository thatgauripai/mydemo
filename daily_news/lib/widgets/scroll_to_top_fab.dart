import 'package:flutter/material.dart';

import '../theme/app_theme.dart';

class ScrollToTopFab extends StatelessWidget {
  const ScrollToTopFab({super.key, required this.controller});
  final ScrollController controller;

  @override
  Widget build(BuildContext context) {
    final Color gold = AppTheme.gold;
    return FloatingActionButton(
      onPressed: () {
        controller.animateTo(0, duration: const Duration(milliseconds: 350), curve: Curves.easeOut);
      },
      backgroundColor: gold,
      foregroundColor: Colors.black,
      child: const Icon(Icons.arrow_upward),
    );
  }
}