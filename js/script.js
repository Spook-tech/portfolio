// Анимация при скролле
let elements = document.querySelectorAll(".to__anim");
let html = document.querySelector('html');

if (elements) {
   giveActive()
   window.addEventListener('scroll', giveActive);
   function giveActive(){
      for (i = 0; i != elements.length; i++){
         let animItem = elements[i];
         let itemHeight = animItem.offsetHeight;
         let itemOffset = offset(animItem).top;
         const coefficient = 4;
         let StartAnimPoint = window.innerHeight - itemHeight / coefficient;

         if((pageYOffset > itemOffset - StartAnimPoint) && pageYOffset < (itemOffset + itemHeight)){
            animItem.classList.add("active");
         }
      }
   }
   function offset(el) {
      var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
}

// Меню бургер
let menuBurger = document.querySelector(".header__burger");
let headerMenu = document.querySelector(".header__links");
menuBurger.addEventListener("click", function(){
   menuBurger.classList.toggle("active");
   headerMenu.classList.toggle("active");
   html.classList.toggle("lock");
});
// Переход по ссылкам
MenuLinksUpdate();
function MenuLinksUpdate(){
   let menuLinks = document.querySelectorAll("a[data-goto]");
   if (menuLinks.length > 0){
      menuLinks.forEach(menuLinks    => {
         menuLinks.addEventListener("click", onMenuLinkClick)
      });
   
      function onMenuLinkClick(event){
         const menuLink = event.target;
         if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector(".header").offsetHeight;
   
            window.scrollTo({
               top: gotoBlockValue,
               behavior: "smooth"
            })
            event.preventDefault();
   
            headerMenu.classList.remove("active");
            menuBurger.classList.remove("active");
            html.classList.remove("lock");
         }
      }
   }
}
// Исправление адаптива для секции проектов
const projectsReverse = document.querySelectorAll('.projects__work__reverse');
if (window.innerWidth < 1024){
   console.log('pr');
   for (i = 0; i != projectsReverse.length; i++){
      projectsReverse[i].classList.remove("projects__work__reverse");
   }
}

// Мультиязычность сайта
let select = 1;
if (document.documentElement.clientWidth > 1024) {
   select = document.querySelector('.header__lang');
} else {
   select = document.querySelector('.header__lang-mobile');
}
const allLang = ['en', 'ua'];

select.addEventListener('change', changeURLLanguage);

// перенаправить на url с указанием языка
function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
    MenuLinksUpdate();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;
    document.querySelector('.contact__subtitle').innerHTML = langArr['contact__subtitle'][hash];
    for (let key in langArr) {
        let elem = document.querySelector('.' + key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }
    }
    MenuLinksUpdate();

}
changeLanguage();

// Load more

let loadMore = document.querySelector('.projects__load-more');
loadMore.addEventListener('click', () => {
   let toLoad = ['.projects__work-kevin', '.projects__work-crapto', '.projects__work-coffe', '.projects__work-gocorona'];
   for (i = 0; i != toLoad.length; i++){
      console.log(toLoad[i]);
      let elem = document.querySelector(`${toLoad[i]}`)
      elem.style.display = 'flex';
      elem.classList.add('active');
   }
});