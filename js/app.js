
const navigationList = document.getElementById('navbar__list');
arr = [];
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
//a function to add elements to the navigation menu
function addTolist(data, id){
  const item = document.createElement('li');
  const link = document.createElement('a');
  const text = document.createElement('p');
  link.href = '#' + id;
  text.textContent = data;
  text.classList.add('text');
  link.classList.add('links');
  link.appendChild(text);
  item.appendChild(link);
  navigationList.appendChild(item);
}
//a function to calculate the distance from the top of the screen
function viewport(element){
  const bounds = element.getBoundingClientRect();
  arr.push(bounds.top);
  return(bounds.top);
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
const elements = document.getElementsByClassName('landing__container');
for(element of elements)
{
  addTolist(element.parentElement.dataset.nav, element.parentElement.id);
}
const anchors = document.getElementsByClassName('links');
const header = document.querySelector(".page__header");
const bar = document.querySelector(".navbar__menu");
var func;
//show the menu on loading
header.addEventListener("mouseover", function(){
  bar.style.display = "block";
});
bar.addEventListener("mouseover", function(){
  bar.style.display = "block";
});
bar.addEventListener("mouseout", function(){
  bar.style.display = "none";
});
// Add class 'active' to section when near top of viewport
document.addEventListener('scroll', function(event){
    //empty the array with every scroll
    console.log("scroll");
    arr.splice(0, arr.length);
    //get the new values and build the new array
    for(element of elements)
    {
      viewport(element.parentElement);
    }
    let i = 0;

    setTimeout(function(){
      for(i; i < arr.length; i++)
      {
        if(arr[i] < 120 && arr[i] > -120)//a range for the element to be displayed in the screen
        {
          //add class to the viewed element and remove it from the others
          for(element of elements)
          {
               element.parentElement.classList.remove("active");
          }
          //the section viewd is highlighted in the navigation menu
          for(anchor of anchors)
          {
              anchor.firstElementChild.style.cssText = 'text-shadow: none';
          }
          elements[i].parentElement.classList.add("active");
          anchors[i].firstElementChild.style.cssText = 'text-shadow: 1px 0px 5px #FC0';
        }
      }
      bar.style.display = "block";
    }, 10);
    //hide the navigation bar if no scroll is detected
    window.clearTimeout(func);
    func = setTimeout(function(){
    bar.style.display = "none";
  }, 2000);
});

// Scroll to anchor ID
for(anchor of anchors)
{
  const string = anchor.firstElementChild.textContent;
  const paragraph = document.getElementById(string);
  anchor.addEventListener('click', function(event){
    event.preventDefault();
    paragraph.scrollIntoView({
      alignToTop: true,
      behavior: 'smooth'
    })
  });
}
