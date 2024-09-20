// const htmlContent = await element.evaluate((el) => el.innerHTML);

// const childrenInfo = await element.evaluate((el) => {
//   const children = Array.from(el.children);
//   return children.map((child) => ({
//     tagName: child.tagName,
//     attributes: Array.from(child.attributes).reduce((acc, attr) => {
//       acc[attr.name] = attr.value;
//       return acc;
//     }, {}),
//     textContent: child.textContent.trim(),
//   }));
// });
// console.log("Target HTML:", childrenInfo);

// if ((await element.count()) > 0) {
//     let text = await element.innerText();
//     console.log(`Found element: ${text}`);
//   } else {
//     console.log("Element not found");
//   }
