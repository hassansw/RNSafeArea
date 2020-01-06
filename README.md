# RNSafeArea
User safe area for react native. 
Handling android versions.

Behavior:

Android with notch:
Version 9 and above: No status bar. Safe area not requited, Android handles app itself.

Version below 9: Adds status bar as safe area.

Android without notch
Version 9 and above: Safe area required.

Version below 9: Adds Status bar, although safe area is not required.


