"use strict"

const treeId = 'tree';
let tree = document.getElementById(treeId);

hideChildrenUL(tree);
//оборачиваем весь текст в li span'ами
for (let li of tree.querySelectorAll('li')) {
    let span = document.createElement('span');
    li.prepend(span);
    span.append(span.nextSibling);
}

// функция, скрывающая все дочерние ul'ы элемента
function hideChildrenUL(elem) {
    for (let children of elem.querySelectorAll('ul'))
        children.hidden = true;
}

tree.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
        let children = e.target.parentNode.querySelector('ul');
            if (children) {
                let isHiding = !children.hidden;
                children.hidden = isHiding;
                // если прячем, то прячем все внутренние.
                if (isHiding) {
                    hideChildrenUL(children);
                }
                
            }
    }
})

