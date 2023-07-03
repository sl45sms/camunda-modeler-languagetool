declare const window: any;
import dom from 'domquery';
import { isTextFieldEntryEdited } from '@bpmn-io/properties-panel';
import { jsxs } from '@bpmn-io/properties-panel/preact/jsx-runtime';

var LOW_PRIORITY = 500;

class SpellCheckPlugin {
  //@ts-ignore TODO types
  constructor(propertiesPanel, editorActions) {
  console.log('Languagetool Plugin instantiated');

  propertiesPanel.registerProvider(LOW_PRIORITY, this);
  const openLanguageToolExternal = this.openLanguageToolExternal;
  editorActions.register({
    openLanguageTool: function() {
      openLanguageToolExternal();
    }
  }
  );
}
  openLanguageToolExternal() {
    const ta = dom("#bio-properties-panel-documentation");
    const text = ta.val();
    const url = 'https://languagetool.org/editor/new?text='+text+'&language=el&motherTongue=el';
    window.open(url, '_blank');
  }

  getGroups(element:any) {
    const that = this;
    //this fires after the properties panel is rendered, while type on textarea
    return function (groups:any) {
      const documentationGroup = groups.find(({ id }:any) => id === "documentation");
      if (documentationGroup) {
        const id = documentationGroup.entries[0].id;
        //set attribute spellcheck to true
        const ta = dom("#bio-properties-panel-"+id);
        ta.attr('spellcheck', 'true');
        ta.attr('lang', 'el');
        documentationGroup.entries.push({
          id: 'languagetool',
          element,
          isEdited: isTextFieldEntryEdited,
          component: (props:any) => {
          return jsxs('button',{
            id: 'bio-properties-panel-languagetool',
            class: 'bio-properties-panel-languagetool',
            onClick: that.openLanguageToolExternal,
            children: ['Open LanguageTool']
          }); 
          }
        });
      }
      return groups;
    };
  }
} 

//@ts-ignore TODO types
SpellCheckPlugin.$inject = ['propertiesPanel', 'editorActions']

export default {
    __init__: [ 'spellCheckPlugin' ],
    spellCheckPlugin: [ 'type', SpellCheckPlugin ]
};