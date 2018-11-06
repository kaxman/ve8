const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    liInput = _items.getElementsByTagName('input');
    liSpan = _items.getElementsByTagName('span');
    liButton = _items.getElementsByTagName('button');
    numItems = _items.getElementsByTagName('li').length;
    
    for (i=0;i<numItems;i++){
      liInput[i].addEventListener('change',finish);
      liSpan[i].addEventListener('click',edit);
      liButton[i].addEventListener('click',deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    console.log(e.srcElement[0].value);
    add(e.srcElement[0].value);
    e.srcElement[0].value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    if (e.currentTarget.parentElement.className == 'item item--done'){
      e.currentTarget.parentElement.className = 'item';
    } else {
      e.currentTarget.parentElement.className = 'item item--done';
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
/*
    console.log(e.currentTarget);
    console.log(e.currentTarget.parentNode);
    console.log(e.currentTarget.innerHTML);
*/  
    if(e.target.className == 'item__text'){
      let inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'item__edit';
      inp.value = e.currentTarget.innerHTML;
      e.currentTarget.parentNode.insertBefore(inp, e.currentTarget);
      e.currentTarget.style.display = 'none';
      inp.focus();
      inp.select();

      inp.onkeypress = function(evt) {
        if (evt.keyCode === ENTER_KEYCODE){
          inp.parentNode.querySelector('.item__text').innerHTML = inp.value == ''? "&nbsp;" : inp.value;
          inp.parentNode.querySelector('.item__text').style.display = '';
          inp.parentNode.removeChild(inp);
        }
      }
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    value = value.trim();
    if (value != ''){
      console.log('trying to append');
      var newNode = document.createElement('li');
      newNode.className = 'item';
      var cBox = document.createElement('input');
      cBox.type = 'checkbox';
      cBox.className = 'item__checkbox';
      var dButton = document.createElement('button');
      dButton.className = 'item__button';
      dButton.innerHTML = 'Eyða';
      var pNode = document.createElement('span');
      pNode.className = 'item__text';
      pNode.innerHTML = value;

      cBox.addEventListener('change',finish);
      pNode.addEventListener('click',edit);
      dButton.addEventListener('click',deleteItem);

      newNode.append(cBox, pNode, dButton);
      console.log(newNode);
      items.appendChild(newNode);
    } else {
      alert("Task to add must contain some text.");
    }
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    console.log(e.currentTarget);
    console.log(e.target.parentElement);
    if( e.target.parentElement.parentElement.hasChildNodes()){
        e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    }
  }
  return {
    init: init
  }
})();
