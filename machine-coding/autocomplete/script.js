import debounce from "../debounce/debounce.js";
import dummyApiCall from "./api.js";

const LIST_SIZE = 5;

let placeholder = document.getElementById('autocomplete-placeholder');
const input = document.createElement('input');
const ul = document.createElement('ul');
let selectedIndex = null;

function initInput() {
    input.setAttribute('name', 'autocomplete');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('type', 'text');
    input.addEventListener('input', (event) => debouncedInputChange(event.target.value))
    input.addEventListener('keydown', handleKeyEvent())
    placeholder.append(input)
}

function initListContainer() {
    const container = document.createElement('div');
    container.classList.add('autocomplete-options-container');
    container.id = 'js-list-container';

    ul.classList.add('list')
    ul.addEventListener('click', () => {
        input.value = event.target.innerText
        toggleList(false);
    })
    container.appendChild(ul);
    placeholder.appendChild(container);
}

(function init() {
    initInput();
    initListContainer();
})()

function handleKeyEvent() {

    const map = {
        'ArrowUp': () => {
            selectedIndex = Math.max(Math.min((selectedIndex ??  ul.children.length) - 1), 0)
            ul.children[selectedIndex].classList.add('active')
        },
        'ArrowDown': () => {
            selectedIndex = Math.min(Math.max((selectedIndex ?? -1)+1), ul.children.length-1)
            ul.children[selectedIndex].classList.add('active')

        },
        'Enter': () => {
            if (selectedIndex !== null) {
                input.value = ul.children[selectedIndex].innerText;
                toggleList(false)
            }
        },
    }
    return (event) => {
        const fn = map[event.key]
        if (fn) {
            selectedIndex!==null && ul.children[selectedIndex].classList.remove('active')
            fn();
       }
    }
}

async function inputChange(value) {
    // handle race condition
    const filteredWords = await dummyApiCall(value, LIST_SIZE)

    ul.innerHTML = '';
    const fragment = new DocumentFragment();
    for (let i = 0; i < filteredWords.length; i++) {
        const li = document.createElement('li');
        li.textContent = filteredWords[i];
        fragment.appendChild(li)
    }
    ul.appendChild(fragment)

    toggleList(filteredWords.length)
}


const debouncedInputChange = debounce(inputChange, 300);

function toggleList(show) {
    ul.style.display = show ? null : 'none';
    selectedIndex = null
}
