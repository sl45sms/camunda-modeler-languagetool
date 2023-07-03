"use strict";;
Object.defineProperty(exports, "__esModule", { value: true });
const menu = (electronApp, menuState) => {
    return [{
            label: 'Open LanguageTool',
            accelerator: 'CommandOrControl+Shift+S',
            enabled: function () {
                // only enabled for BPMN diagrams
                return menuState.bpmn;
            },
            action: function () {
                electronApp.emit('menu:action', 'openLanguageTool');
            }
        }];
};
exports.default = menu;
module.exports = exports["default"];
