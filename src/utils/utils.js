export const generateRandomString = (length) => {
  // can be refactored to return directly
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

export const toCamelCase = (str) =>
  // can have implicit return
  str
    .replace(/['’]/g, "")
    .split(/[\s\-_]+/)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");

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

export const toCapitalize = (str) =>
  // can use ternary operator for readability and use of implicit return
  typeof str === "string" && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    : "";

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

export function calculateNumberOfCards(cardWidth, gap, rows = null) {
  const container = document.querySelector(".page-wrapper");
  // can turn the logic for better readability
  if (!container) return 1;

  const containerPadding = container.offsetWidth < 610 ? 32 : 128;
  const containerWidth = container.offsetWidth - containerPadding;
  const columns = Math.max(
    Math.floor((containerWidth + gap) / (cardWidth + gap)),
    1
  );

  rows = rows ?? (columns === 1 ? 4 : 2);
  return Math.max(columns * rows, 1);
}

export function msToMMSS(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
