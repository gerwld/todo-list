function toTitleCase(text) {
 return text
  .toLowerCase()
  .split(" ")
  .filter((e) => e !== "")
  .reduce((s, e, i, t) => {
   if (i === 0 || i === t.length - 1 || e.length > 3) return s + e.charAt(0).toUpperCase() + e.substring(1) + " ";
   else if (e.length) return s + e + " ";
  }, "")
  .slice(0, -1);
}

export default toTitleCase;
