const praiseSelect = document.querySelector(".praise .select");
const praiseAll = document.querySelectorAll(".praise > ul");

onAttributeMutation(praiseSelect, "data-value", target => {
  const selectedList =
    document.querySelector(`.praise > .${target.dataset.value}`);

  praiseAll.forEach(list => list.style.display = "none");
  selectedList.style.display = "block";
  target.style.setProperty("--image-file", `url('./images/${target.dataset.value}.png')`);
});

// custom selects are initialised afterwards
// so defaults can trigger the `MutationObserver`s
const customSelects = document.querySelectorAll(".select");
customSelects.forEach(setupSelect);

function onAttributeMutation(targetNode, targetAttr, callbackFn) {
  new MutationObserver(mutations => mutations.forEach(
    mutation => {
      if (mutation.attributeName === targetAttr)
        callbackFn(targetNode);
    }
  )).observe(targetNode, {attributes: true});
}

function setupSelect(select) {
  const dropdown = select.querySelector(".dropdown");
  const currValue = select.querySelector(".value");
  const options = select.querySelectorAll(".options > li");

  const dfault = Array.from(options)
    .find(option => option.classList.contains("selected"));
  currValue.innerHTML = dfault.innerHTML;
  select.dataset.value = dfault.dataset.value;

  dropdown.addEventListener("click", () => select.classList.toggle("active"));

  options.forEach(option => {
    option.addEventListener("click", () => {
      currValue.innerHTML = option.innerHTML;
      select.dataset.value = option.dataset.value;

      options.forEach(option => option.classList.remove("selected"));
      option.classList.add("selected");
      select.classList.remove("active");
    });
  });
}
