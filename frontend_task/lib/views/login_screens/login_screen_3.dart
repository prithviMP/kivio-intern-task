import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:frontend_task/widgets/styles.dart';

class LoginScreen3View extends StatelessWidget {
  const LoginScreen3View({super.key});

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
                  left: 36.w,
                  top: 83.h,
                  width: 297.w,
                  height: 203.h,
                  child: Image.asset(
                    'assets/login_screens/login_screen_3/Frame.png',
                  ),
                ),
                Positioned(
                    top: 310.h,
                    left: 24.w,
                    width: 327.w,
                    child: Column(
                      children: [
                        Text("Learn live online from the best teachers",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              height: 33.8 / 26.spMin,
                              fontSize: 26.spMin,
                              fontFamily: 'Josefin Sans',
                              color: const Color(0xfffafafb),
                              fontWeight: FontWeight.w700,
                            )),
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
                    top: 454.h,
                    left: 24.w,
                    width: 327.w,
                    height: 280.h,
                    child: Column(
                      children: [
                        SizedBox(
                          width: 327.w,
                          height: 48.h,
                          child: TextButton(
                              onPressed: () {},
                              style: customButtonStyle(
                                  0xff09101d, EdgeInsets.zero, 15.0),
                              child: Row(
                                children: [
                                  52.horizontalSpace,
                                  Image.asset(
                                      'assets/login_screens/login_screen_3/Apple Logo.png'),
                                  15.horizontalSpace,
                                  Text(
                                    'Continue with Apple',
                                    style: TextStyle(
                                        height: 16 / 14.spMin,
                                        fontSize: 14.spMin,
                                        fontFamily: 'Open Sans',
                                        fontWeight: FontWeight.w600,
                                        color: const Color(0xfffafafb)),
                                  )
                                ],
                              )),
                        ),
                        10.verticalSpace,
                        SizedBox(
                          width: 327.w,
                          height: 48.h,
                          child: TextButton(
                              onPressed: () {},
                              style: customButtonStyle(
                                  0x0000000, EdgeInsets.zero, 15.0,
                                  borderSide: const BorderSide(
                                      color: Color(0xff373940), width: 1)),
                              child: Row(
                                children: [
                                  52.horizontalSpace,
                                  Image.asset(
                                      'assets/login_screens/login_screen_3/Google Logo.png'),
                                  15.horizontalSpace,
                                  Text(
                                    'Continue with Google',
                                    style: TextStyle(
                                        height: 16 / 14.spMin,
                                        fontSize: 14.spMin,
                                        fontFamily: 'Open Sans',
                                        fontWeight: FontWeight.w600,
                                        color: const Color(0xfffafafb)),
                                  )
                                ],
                              )),
                        ),
                        10.verticalSpace,
                        SizedBox(
                          width: 327.w,
                          height: 48.h,
                          child: TextButton(
                              onPressed: () {},
                              style: customButtonStyle(
                                  0x0000000, EdgeInsets.zero, 15.0,
                                  borderSide: const BorderSide(
                                      color: Color(0xff373940), width: 1)),
                              child: Row(
                                children: [
                                  52.horizontalSpace,
                                  Image.asset(
                                      'assets/login_screens/login_screen_3/Facebook Logo.png'),
                                  15.horizontalSpace,
                                  Text(
                                    'Continue with Facebook',
                                    style: TextStyle(
                                        height: 16 / 14.spMin,
                                        fontSize: 14.spMin,
                                        fontFamily: 'Open Sans',
                                        fontWeight: FontWeight.w600,
                                        color: const Color(0xfffafafb)),
                                  )
                                ],
                              )),
                        ),
                        10.verticalSpace,
                        SizedBox(
                          width: 327.w,
                          height: 48.h,
                          child: TextButton(
                              onPressed: () {},
                              style: customButtonStyle(
                                  0x0000000, EdgeInsets.zero, 15.0,
                                  borderSide: const BorderSide(
                                      color: Color(0xff373940), width: 1)),
                              child: Row(
                                children: [
                                  52.horizontalSpace,
                                  Image.asset(
                                      'assets/login_screens/login_screen_3/Twitter Logo.png'),
                                  15.horizontalSpace,
                                  Text(
                                    'Continue with Twitter',
                                    style: TextStyle(
                                        height: 16 / 14.spMin,
                                        fontSize: 14.spMin,
                                        fontFamily: 'Open Sans',
                                        fontWeight: FontWeight.w600,
                                        color: const Color(0xfffafafb)),
                                  )
                                ],
                              )),
                        ),
                        10.verticalSpace,
                        SizedBox(
                          width: 327.w,
                          height: 48.h,
                          child: TextButton(
                              onPressed: () {},
                              style: customButtonStyle(
                                  0x0000000, EdgeInsets.zero, 15.0,
                                  borderSide: const BorderSide(
                                      color: Color(0xff373940), width: 1)),
                              child: Row(
                                children: [
                                  52.horizontalSpace,
                                  Image.asset(
                                      'assets/login_screens/login_screen_3/Person Circle.png'),
                                  15.horizontalSpace,
                                  Text(
                                    'Continue with guest',
                                    style: TextStyle(
                                        height: 16 / 14.spMin,
                                        fontSize: 14.spMin,
                                        fontFamily: 'Open Sans',
                                        fontWeight: FontWeight.w600,
                                        color: const Color(0xfffafafb)),
                                  )
                                ],
                              )),
                        ),
                      ],
                    )),
                Positioned(
                  top: 755.h,
                  left: 33.w,
                  width: 309.w,
                  child: RichText(
                      textAlign: TextAlign.center,
                      text: TextSpan(
                        style: TextStyle(
                          fontSize: 12.spMin,
                          fontFamily: 'Open Sans',
                          fontWeight: FontWeight.w400,
                          color: const Color(0xfffafafb),
                        ),
                        children: [
                          const TextSpan(
                              text:
                                  "By continuing, you agree to Book Stack's "),
                          TextSpan(
                            text: "Privacy Policy",
                            style: const TextStyle(
                                color: Color(0xffffc043),
                                fontWeight: FontWeight.w600),
                            recognizer: TapGestureRecognizer()..onTap = () {},
                          ),
                          const TextSpan(text: " and "),
                          TextSpan(
                            text: "Terms of Service",
                            style: const TextStyle(
                                color: Color(0xffffc043),
                                fontWeight: FontWeight.w600),
                            recognizer: TapGestureRecognizer()..onTap = () {},
                          ),
                        ],
                      )),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
