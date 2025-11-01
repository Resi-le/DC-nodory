const TARGET_SELECTOR = "li.ub-content.dory";

function removeTargetComments(selector) {
  const elementsToRemove = document.querySelectorAll(selector);
  elementsToRemove.forEach(element => {
    element.remove();
  });
}

function observeAndRemove() {
  const commentContainer = document.querySelector('.view_comment') || document.querySelector('ul.reply_list') || document.body;

  removeTargetComments(TARGET_SELECTOR);

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        removeTargetComments(TARGET_SELECTOR);
        break;
      }
    }
  });

  observer.observe(commentContainer, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeAndRemove);
} else {
  observeAndRemove();
}

