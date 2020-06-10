"use strict"

const treeId = 'tree';
const formId = 'newFileForm';
let tree = document.getElementById(treeId);
let form = document.getElementById(formId);

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

// добавление файла в дерево.
function addFile() {
    const value = document.getElementById('pathInput').value;
    if (value.length == 0) {
      alert('Ошибка! Путь не введён.');
      retrun;
    }
    if (value[0] != '/') {
      alert('Ошибка! Путь должен начинаться с \'/\'');
      return;
    }

    let foldersPath = value.split('/');
    for (let i = 0; i < foldersPath.length - 1; i++) {
        if (foldersPath[i].indexOf('.') >= 0) {
            alert('Ошибка: Файл не может содержаться в другом файле.');
            return;
        }
    }
    if (foldersPath[foldersPath.length-1].indexOf('.') == foldersPath[foldersPath.length-1].length-1) {
        alert('Расширение файла не должно быть пустым.');
        return;
    }

    createFile(tree, foldersPath);
}

// проверка на существование, если есть, то возвращается li
function isFileExists(ul, filename) {
    for (let li of ul.querySelectorAll('li')) {
        let span = li.querySelector('span');
        if (span && span.textContent.trim() == filename)
            return li;
    }
    return null;
}

// получение ul внутри ul по name, если такого нет, то он создается
function getUlByName(ul, name) {
    let targetLi = isFileExists(ul, name)
    if (targetLi) {
        let newUl = targetLi.querySelector('ul')
            if (newUl)
                return newUl;
            newUl = document.createElement('ul');
            targetLi.append(newUl);
            return newUl;
    }

    let newLi = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = name;
    newLi.append(span);
    ul.append(newLi);
    let newUl = document.createElement('ul');
    newLi.append(newUl);
    return newUl;
}

// создание файла в пути
function createFile(ul, path) {
    let ptr = ul;
    for (let i = 1; i < path.length-1; i++) {
        const element = path[i];
        ptr = getUlByName(ptr, element);
    }
    if (!isFileExists(ptr, path[path.length-1])) {
        let newLi = document.createElement('li');
        let span = document.createElement('span');
        span.textContent = path[path.length-1];
        newLi.append(span);
        ptr.append(newLi);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addFile();
})

tree.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
        let children = e.target.parentNode.querySelector('ul');
            if (children) {
                let isHiding = !children.hidden;
                children.hidden = isHiding;
                // если прячем, то прячем все внутренние.
                if (isHiding)
                    hideChildrenUL(children);
            }
    }
})
