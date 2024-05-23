import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend_task/widgets/styles.dart';

class OnboardingScreen9View extends StatelessWidget {
  const OnboardingScreen9View({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff23262b),
      body: Column(
        children: [
          SizedBox(
            width: 375.w,
            height: 812.h,
            child: Stack(
              children: [
                Positioned(
                  top: 69.h,
                  left: 167.w,
                  child: Image.asset(
                    'assets/onboarding_screens/onboarding_screen_9/Frame 51260.png',
                  ),
                ),
                Positioned(
                    top: 63.h,
                    left: 318.w,
                    width: 34.w,
                    height: 16.h,
                    child: GestureDetector(
                      onTap: () {},
                      child: Text(
                        "Skip!",
                        style: TextStyle(
                          height: 16 / 14.spMin,
                          fontSize: 14.spMin,
                          fontFamily: 'Open Sans',
                          fontWeight: FontWeight.w700,
                          color: const Color(0xff747B84),
                        ),
                      ),
                    )),
                Positioned(
                  top: 111.h,
                  left: 24.w,
                  width: 327.w,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      RichText(
                        text: TextSpan(
                            style: TextStyle(
                                height: 42 / 35.spMin,
                                fontSize: 35.spMin,
                                fontFamily: 'Josefin Sans',
                                fontWeight: FontWeight.w700,
                                color: const Color(0xfffafafb)),
                            children: const [
                              TextSpan(
                                  text: "Learn live",
                                  style: TextStyle(color: Color(0xffFFC107))),
                              TextSpan(
                                text: " online from the best teachers",
                              )
                            ]),
                      ),
                      8.verticalSpace,
                      RichText(
                        text: TextSpan(
                            style: TextStyle(
                                height: 19.5 / 15.spMin,
                                fontSize: 15.spMin,
                                fontFamily: 'Open Sans',
                                fontWeight: FontWeight.w400,
                                color: const Color(0xff747b84)),
                            children: const [
                              TextSpan(
                                  text: "Upgrade",
                                  style:
                                      TextStyle(fontWeight: FontWeight.w600)),
                              TextSpan(
                                text: " your basic skill to be advance with ",
                              ),
                              TextSpan(
                                  text: "expert",
                                  style:
                                      TextStyle(fontWeight: FontWeight.w600)),
                              TextSpan(
                                text: " mentors",
                              ),
                            ]),
                      ),
                    ],
                  ),
                ),
                Positioned(
                  top: 315.h,
                  width: 1032.w,
                  height: 388.h,
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Image.asset(
                      'assets/onboarding_screens/Full Frame.png',
                    ),
                  ),
                ),
                Positioned(
                  top: 736.h,
                  left: 24.w,
                  width: 327.w,
                  child: TextButton(
                      onPressed: () {},
                      style: customButtonStyle(
                          0xffFFC107,
                          EdgeInsets.symmetric(
                              vertical: 18.h, horizontal: 16.w),
                          15),
                      child: Text(
                        "Next",
                        style: TextStyle(
                          height: 16 / 14.spMin,
                          fontSize: 14.spMin,
                          fontFamily: 'Open Sans',
                          fontWeight: FontWeight.w700,
                          color: const Color(0xff23262b),
                        ),
                      )),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
