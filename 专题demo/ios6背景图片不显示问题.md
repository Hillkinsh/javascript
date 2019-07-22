https://stackoverflow.com/questions/26473833/ios-background-image-for-iphone-6

ios6设置背景图片竟然不好使，test环境也好使。这就很奇怪了。
查下发现是：
I'm trying to set a UIImage as the background of a UIView. The problem is that if I use colorWithPatternImage the background image repeats for the iPhone 6 (as far as I know it uses de @2x resolution). For the iPhone 6 plus I have no problems because it uses de @3x image but iPhone 4,4s,5,5s and 6 uses the same 2@x image and have differents screen sizes.

图片版本的问题。
ios竟然有三个版本的图片，这就很蛋疼。
还不如直接写样式来的痛快。