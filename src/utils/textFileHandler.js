export function parseTextFile(file) {
  return new Promise((resolve, reject) => {
    if (file.type !== "text/plain") {
      reject("Only .txt files are allowed");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const words = text.match(/[a-zA-Z]+/g);
      if (!words || words.length < 3) {
        reject("Text file must contain at least 3 words");
        return;
      }
      const filteredWords = words
        .map((word) => word.toLowerCase())
        .filter((word) => {
          return /^[a-z.,\s!?]+$/i.test(word);
        });
      if (filteredWords.length !== words.length) {
        reject("Text file contains invalid characters");
        return;
      }
      resolve(filteredWords);
    };
    reader.onerror = () => {
      reject("Error parsing text file");
    };
    reader.readAsText(file);
  });
}

export function countWords(words) {
  const wordCountMap = words.reduce((map, word) => {
    map.set(word, (map.get(word) || 0) + 1);
    return map;
  }, new Map());
  const wordCountPairs = Array.from(wordCountMap.entries());
  wordCountPairs.sort((a, b) => b[1] - a[1]);
  return wordCountPairs.slice(0, 3).map(([word, count]) => ({ word, count }));
}
