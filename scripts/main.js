"use strict"

for (let li of tree.querySelectorAll('li')) {
    let span = document.createElement('span');
    li.prepend(span);
    span.append(span.nextSibling);
}

tree.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN');
    let children = e.target.parentNode.querySelector('ul');
      if (!children) return;
      children.hidden = !children.hidden;
})