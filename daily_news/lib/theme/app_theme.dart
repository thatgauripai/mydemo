import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color black = Color(0xFF000000);
  static const Color white = Color(0xFFFFFFFF);
  static const Color gold = Color(0xFFFFD700);

  static final TextTheme textTheme = GoogleFonts.poppinsTextTheme().apply(
    bodyColor: white,
    displayColor: white,
  );

  static final ColorScheme darkColorScheme = const ColorScheme.dark(
    brightness: Brightness.dark,
    primary: gold,
    onPrimary: black,
    secondary: gold,
    onSecondary: black,
    background: black,
    onBackground: white,
    surface: Color(0xFF111111),
    onSurface: white,
  );

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: darkColorScheme,
      scaffoldBackgroundColor: black,
      textTheme: textTheme,
      appBarTheme: const AppBarTheme(
        backgroundColor: black,
        foregroundColor: white,
        elevation: 0,
      ),
      iconTheme: const IconThemeData(color: white),
      splashColor: gold.withOpacity(0.2),
      highlightColor: gold.withOpacity(0.1),
      dividerColor: Colors.white24,
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: const Color(0xFF0A0A0A),
        indicatorColor: gold.withOpacity(0.2),
        labelTextStyle: WidgetStateProperty.all(
          textTheme.labelMedium?.copyWith(color: white),
        ),
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: gold,
        foregroundColor: black,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: gold,
          foregroundColor: black,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        ).copyWith(
          overlayColor: WidgetStateProperty.all(gold.withOpacity(0.2)),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          side: const BorderSide(color: gold, width: 1.5),
          foregroundColor: gold,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        ).copyWith(
          overlayColor: WidgetStateProperty.all(gold.withOpacity(0.15)),
        ),
      ),
      listTileTheme: const ListTileThemeData(iconColor: gold),
      cardTheme: CardTheme(
        color: const Color(0xFF0E0E0E),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
    );
  }

  static final ColorScheme lightColorScheme = const ColorScheme.light(
    brightness: Brightness.light,
    primary: gold,
    onPrimary: black,
    secondary: gold,
    onSecondary: black,
    background: white,
    onBackground: black,
    surface: Color(0xFFF5F5F5),
    onSurface: Colors.black87,
  );

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: lightColorScheme,
      scaffoldBackgroundColor: white,
      textTheme: GoogleFonts.poppinsTextTheme().apply(
        bodyColor: Colors.black87,
        displayColor: Colors.black87,
      ),
    );
  }
}