function getTime(time) {
  const hour = parseInt(time / 3600);
  let remainingTime = time % 3600;
  const minute = parseInt(remainingTime / 60);
  remainingTime = remainingTime % 60;
  return `${hour} Hour ${minute} minute ${remainingTime} sec ago`;
}

console.log(getTime(14800));



// button.classList.add("btn");
//     button.innerText = item.category;