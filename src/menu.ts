import type { App } from 'electron';
 interface MenuState {
    bpmn: boolean;
    dmn: boolean;
    appName: string;
    state:{
        save: boolean;
        exportAs: ['png', 'jpeg', 'svg']
        devlopment: boolean;
        devtools: boolean;
        latsTab: boolean;
        tabs: []; //TODO define
        activeTab: {}; //TODO define
    }
    }

const menu = (electronApp:App,menuState:MenuState) => {
    return [{
        label: 'Open LanguageTool',
        accelerator: 'CommandOrControl+Shift+S',
        enabled: function() {
        // only enabled for BPMN diagrams
            return menuState.bpmn;
        },
        action: function() {
          electronApp.emit('menu:action', 'openLanguageTool');
        }
      }];
};

export default menu;