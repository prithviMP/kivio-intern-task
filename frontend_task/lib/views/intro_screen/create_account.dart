import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend_task/widgets/styles.dart';

class CreateAccountView extends StatelessWidget {
  const CreateAccountView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff23262b),
      body: Column(
        children: [
          SizedBox(
              width: 375.w,
              height: 812.h,
              child: Stack(children: [
                Positioned(
                  left: -245.w,
                  width: 804.w,
                  height: 535.h,
                  child: Image.asset(
                    'assets/intro_screen/create_account/image 5.png',
                  ),
                ),
                Positioned(
                  top: 300.h,
                  child: Container(
                    width: 375.w,
                    height: 235.h,
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        stops: [0.0, 0.8, 0.9, 1.0],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Color(0x0023262B), // #23262B - 0%
                          Color(0xFF23262B), // #23262B - 80%
                          Color(0xFF23262B), // #23262B - 90%
                          Color(0xFF23262B), // #23262B - 100%
                        ],
                      ),
                    ),
                  ),
                ),
                Positioned(
                  top: 540.h,
                  left: 24.w,
                  width: 327.w,
                  child: Column(
                    children: [
                      20.verticalSpace,
                      Text(
                        "Learn from the best.",
                        style: TextStyle(
                            height: 29.9 / 23.spMin,
                            fontSize: 23.spMin,
                            fontFamily: 'Josefin Sans',
                            fontWeight: FontWeight.w700,
                            color: const Color(0xfffafafb)),
                      ),
                      20.verticalSpace,
                      Text(
                        "Mobile learning management system designed for today's digital habits",
                        style: TextStyle(
                            height: 19.5 / 15.spMin,
                            fontSize: 15.spMin,
                            fontFamily: 'Josefin Sans',
                            fontWeight: FontWeight.w400,
                            color: const Color(0xfffafafb)),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
                Positioned(
                  top: 694.h,
                  left: 24.w,
                  width: 327.w,
                  child: TextButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/onboarding_screen_9');
                      },
                      style: customButtonStyle(
                          0xffFFC107,
                          EdgeInsets.symmetric(
                              vertical: 18.h, horizontal: 16.w),
                          15),
                      child: Text(
                        "EXPLORE OUR APP",
                        style: TextStyle(
                          fontSize: 14.sp,
                          fontFamily: 'Open Sans',
                          fontWeight: FontWeight.w700,
                          color: const Color(0xff23262b),
                        ),
                      )),
                ),
                Positioned(
                    top: 770.h,
                    left: 163.w,
                    child: GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(context, '/login_screen_1');
                      },
                      child: Text(
                        "LOG IN",
                        style: TextStyle(
                          height: 18.2 / 14.sp,
                          fontSize: 14.sp,
                          fontFamily: 'Open Sans',
                          fontWeight: FontWeight.w600,
                          color: const Color(0xffFAFAFB),
                        ),
                      ),
                    ))
              ])),
        ],
      ),
    );
  }
}
