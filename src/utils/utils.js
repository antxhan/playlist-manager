export function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function toCamelCase(str) {
  return str
    .replace(/['’]/g, "")
    .split(/[\s\-_]+/)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

export function decodeHTMLEntities(str) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = str;
  return tempDiv.textContent || tempDiv.innerText || "";
}

export function sortByFrequency(items) {
  const itemCount = items.reduce((countMap, item) => {
    countMap[item] = (countMap[item] || 0) + 1;
    return countMap;
  }, {});

  const sortedItems = Object.keys(itemCount).sort(
    (a, b) => itemCount[b] - itemCount[a]
  );

  return sortedItems.map((item) => ({
    item,
    count: itemCount[item],
  }));
}

export function toCapitalize(str) {
  if (typeof str !== "string" || str.length === 0) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
