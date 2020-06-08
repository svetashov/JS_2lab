"use strict"

const treeId = 'tree';
let tree = document.getElementById(treeId);

for (let li of tree.querySelectorAll('li')) {
    let span = document.createElement('span');
    li.prepend(span);
    span.append(span.nextSibling);
}

tree.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN');
    let childrenContainer = e.target.parentNode.querySelector('ul');
      if (!childrenContainer) return; // нет детей

      childrenContainer.hidden = !childrenContainer.hidden;
})