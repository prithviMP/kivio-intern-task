import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

ButtonStyle customButtonStyle(
    int color, EdgeInsets edgeInsets, double borderRadius,
    {BorderSide? borderSide}) {
  return ButtonStyle(
    backgroundColor: WidgetStateProperty.all<Color>(Color(color)),
    padding: WidgetStateProperty.all<EdgeInsetsGeometry>(edgeInsets),
    shape: WidgetStateProperty.all<RoundedRectangleBorder>(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(borderRadius).r,
      ),
    ),
    side: WidgetStateProperty.all<BorderSide>(borderSide ?? BorderSide.none),
  );
}
