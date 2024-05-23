import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend_task/widgets/styles.dart';

class LoginScreen1View extends StatelessWidget {
  const LoginScreen1View({super.key});

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
                  left: 58.w,
                  top: 67.h,
                  width: 259.w,
                  height: 251.h,
                  child: Image.asset(
                    'assets/login_screens/login_screen_1/Frame.png',
                  ),
                ),
                Positioned(
                    top: 358.h,
                    left: 24.w,
                    width: 327.w,
                    child: Column(
                      children: [
                        RichText(
                            textAlign: TextAlign.center,
                            text: TextSpan(
                                style: TextStyle(
                                  height: 33.8 / 26.spMin,
                                  fontSize: 26.spMin,
                                  fontFamily: 'Josefin Sans',
                                  color: const Color(0xfffafafb),
                                  fontWeight: FontWeight.w700,
                                ),
                                children: const [
                                  TextSpan(text: 'Learn ', style: TextStyle()),
                                  TextSpan(
                                      text: 'live',
                                      style:
                                          TextStyle(color: Color(0xffffc043))),
                                  TextSpan(text: ' online from the '),
                                  TextSpan(
                                      text: 'best teachers',
                                      style:
                                          TextStyle(color: Color(0xffffc043))),
                                ])),
                        8.verticalSpace,
                        RichText(
                          textAlign: TextAlign.center,
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
                    )),
                Positioned(
                    top: 536.h,
                    left: 24.w,
                    width: 327.w,
                    height: 252.h,
                    child: Column(
                      children: [
                        SizedBox(
                          width: 327.w,
                          child: TextButton(
                              onPressed: () {},
                              style: customButtonStyle(
                                  0xfffafafb,
                                  EdgeInsets.symmetric(
                                      vertical: 14.h, horizontal: 15.w),
                                  15),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Image.asset(
                                      'assets/login_screens/login_screen_1/Google Logo.png'),
                                  15.horizontalSpace,
                                  Text(
                                    'Continue with Google',
                                    style: TextStyle(
                                        height: 16 / 14.spMin,
                                        fontSize: 14.spMin,
                                        fontFamily: 'Open Sans',
                                        fontWeight: FontWeight.w600,
                                        color: const Color(0xff747b84)),
                                  )
                                ],
                              )),
                        ),
                        10.verticalSpace,
                        SizedBox(
                          width: 327.w,
                          child: TextButton(
                              onPressed: () {},
                              style: customButtonStyle(
                                  0xff000000,
                                  EdgeInsets.symmetric(
                                      vertical: 14.h, horizontal: 15.w),
                                  15),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Image.asset(
                                      'assets/login_screens/login_screen_1/Apple Logo.png'),
                                  15.horizontalSpace,
                                  Text(
                                    'Continue with Apple',
                                    style: TextStyle(
                                        height: 16 / 14.spMin,
                                        fontSize: 14.spMin,
                                        fontFamily: 'Open Sans',
                                        fontWeight: FontWeight.w600,
                                        color: const Color(0xff747b84)),
                                  )
                                ],
                              )),
                        ),
                        12.verticalSpace,
                        Text("or",
                            style: TextStyle(
                              fontSize: 15.spMin,
                              fontFamily: 'Open Sans',
                              fontWeight: FontWeight.w600,
                              color: const Color(0xfffafafb),
                            )),
                        12.verticalSpace,
                        SizedBox(
                          width: 327.w,
                          child: TextButton(
                              onPressed: () {},
                              style: customButtonStyle(
                                  0xffffc107,
                                  EdgeInsets.symmetric(
                                      vertical: 18.h, horizontal: 16.w),
                                  15),
                              child: Text(
                                "Create Account",
                                style: TextStyle(
                                  fontSize: 14.spMin,
                                  fontFamily: 'Open Sans',
                                  fontWeight: FontWeight.w700,
                                  color: const Color(0xff23262b),
                                ),
                              )),
                        ),
                        24.verticalSpace,
                        RichText(
                            text: TextSpan(
                          style: TextStyle(
                            fontSize: 14.spMin,
                            fontFamily: 'Open Sans',
                            fontWeight: FontWeight.w400,
                            color: const Color(0xfffafafb),
                          ),
                          children: [
                            const TextSpan(text: "or "),
                            TextSpan(
                              text: "Login or continue as guest",
                              style: const TextStyle(color: Color(0xffffc043)),
                              recognizer: TapGestureRecognizer()..onTap = () {},
                            )
                          ],
                        )),
                      ],
                    ))
              ],
            ),
          )
        ],
      ),
    );
  }
}
