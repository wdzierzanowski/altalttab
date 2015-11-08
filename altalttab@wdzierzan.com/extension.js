// Make Alt+Tab prefer the active workspace (GNOME Shell extension)
// Copyright (C) 2015  Wojciech Dzierżanowski
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

const AltTab = imports.ui.altTab;
const Main = imports.ui.main;

let _originalFinish;

function _chooseWindow(windows) {
    let preferredWorkspace = global.screen.get_active_workspace();
    for (let i = 0; i < windows.length; ++i)
        if (windows[i].get_workspace() == preferredWorkspace)
            return windows[i];

    return windows[0];
}

function _patchedFinish() {
    return function(timestamp) {
        let appIcon = this._items[this._selectedIndex];
        if (this._currentWindow < 0) {
            appIcon.app.activate_window(_chooseWindow(appIcon.cachedWindows),
                                        timestamp);
        } else {
            Main.activateWindow(appIcon.cachedWindows[this._currentWindow],
                                timestamp);
        }

        this.destroy();
    };
}

function enable() {
    _originalFinish = AltTab.AppSwitcherPopup.prototype._finish;
    AltTab.AppSwitcherPopup.prototype._finish = _patchedFinish();
}

function disable() {
    AltTab.AppSwitcherPopup.prototype._finish = _originalFinish;
    _originalFinish = null;
}
