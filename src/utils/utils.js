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

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

export function calculateNumberOfCards(cardWidth, gap, rows = null) {
  const container = document.querySelector(".page-wrapper");

  if (container) {
    const containerPadding = container.offsetWidth < 610 ? 2 * 16 : 2 * 4 * 16;
    const containerWidth = container.offsetWidth - containerPadding;
    const columns = Math.floor((containerWidth + gap) / (cardWidth + gap));
    rows = rows ?? columns === 1 ? 4 : 2;
    return columns * rows;
  }
}
