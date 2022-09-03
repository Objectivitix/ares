const praiseSelect = document.querySelector(".praise .select");
const praiseAll = document.querySelectorAll(".praise > ul");

onAttributeMutation(praiseSelect, "data-value", target => {
  const selectedList =
    document.querySelector(`.praise > .${target.dataset.value}`);

  praiseAll.forEach(list => list.style.display = "none");
  selectedList.style.display = "block";
  target.style.setProperty("--bg", `url('./images/${target.dataset.value}.png')`);
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
  dropdown.addEventListener("keydown", evt => {
    if (evt.key === "Enter") select.classList.toggle("active");
    if (evt.key === "Tab") select.classList.add("active");
  });

  options.forEach(option => {
    const handleChange = () => {
      currValue.innerHTML = option.innerHTML;
      select.dataset.value = option.dataset.value;

      options.forEach(option => option.classList.remove("selected"));
      option.classList.add("selected");
      select.classList.remove("active");
    }

    option.addEventListener("click", handleChange);
    option.addEventListener("keydown", evt => {
      if (evt.key === "Enter") handleChange();
    });
  });

  options[options.length - 1]
    .addEventListener("blur", () => select.classList.remove("active"));
}
