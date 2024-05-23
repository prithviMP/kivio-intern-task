import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'package:frontend_task/views/intro_screen/create_account.dart';
import 'package:frontend_task/views/login_screens/login_screen_1.dart';
import 'package:frontend_task/views/login_screens/login_screen_2.dart';
import 'package:frontend_task/views/login_screens/login_screen_3.dart';
import 'package:frontend_task/views/onboarding_screens/onboarding_screen_9.dart';
import 'package:frontend_task/views/onboarding_screens/onboarding_screen_10.dart';
import 'package:frontend_task/views/onboarding_screens/onboarding_screen_11.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(375, 812),
      builder: (_, child) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          home: child,
          initialRoute: '/create_account',
          routes: {
            '/create_account': (context) => const CreateAccountView(),
            '/onboarding_screen_9': (context) => const OnboardingScreen9View(),
            '/onboarding_screen_10': (context) =>
                const OnboardingScreen10View(),
            '/onboarding_screen_11': (context) =>
                const OnboardingScreen11View(),
            '/login_screen_1': (context) => const LoginScreen1View(),
            '/login_screen_2': (context) => const LoginScreen2View(),
            '/login_screen_3': (context) => const LoginScreen3View(),
          },
        );
      },
    );
  }
}
