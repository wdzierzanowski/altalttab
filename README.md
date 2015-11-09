A GNOME Shell extension that makes the application switcher prefer the active
workspace.

When using Alt+Tab to switch to another application in GNOME Shell the built-in
action is to choose the window that was active last.  If that window happens
to be on a different workspace you get a forced workspace switch.

This extension changes the action to be "try the window in the current
workspace first", thus eliminating the workspace switch if possible.
