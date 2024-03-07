
const Tab = {
  highlightTab: (tabElement, tabId) => {
    tabElement.querySelectorAll(`[data-for-tab="${tabId}"], [data-tab="${tabId}"]`).forEach(elem => {
      elem.classList.add('c-tab--active');
    });
  },

  clearHighlightTab: (tabElement) => {
    tabElement.querySelectorAll('.c-tab--active').forEach(elem => {
      elem.classList.remove('c-tab--active');
    });
  },

  onTabBtnClick: (e) => {
    const btn = e.target;
    const tabId = btn.dataset.forTab;
    const tabElement = btn.closest('.c-tab'); // find the closest parent with class c-tab... nice!

    Tab.clearHighlightTab(tabElement);
    Tab.highlightTab(tabElement, tabId);
  },

  init: () => {
    document.querySelectorAll('.c-tab').forEach(elem => {
      Tab.highlightTab(elem, elem.dataset.defaultTab || 0);
      elem.querySelectorAll('[data-for-tab]').forEach(btnElem => {
        btnElem.addEventListener('click', Tab.onTabBtnClick);
      })
    });
  }
};

document.addEventListener('DOMContentLoaded', Tab.init);
