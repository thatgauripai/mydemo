class SportsCategory {
  final String id;
  final String name;
  final String icon; // Use Material icon codepoint name or emoji

  SportsCategory({
    required this.id,
    required this.name,
    required this.icon,
  });

  factory SportsCategory.fromJson(Map<String, dynamic> json) {
    return SportsCategory(
      id: json['id'] as String,
      name: json['name'] as String,
      icon: json['icon'] as String,
    );
  }
}