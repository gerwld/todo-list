function toSentenceCase(text) {
 let symbs = [".", ",", ";", "!", "?"],
  res = [];

 //basic checks
 if (!text && text !== 0) return "Wrong argument";
 else text = text.toString().toLowerCase();

 //if string contains symbol split, then map with strClearAndFrUpper
 for (let sym of symbs) {
  if (text.indexOf(sym) !== -1) {
   res = text.split(sym).map((e) => {
    return strClearAndFrUpper(e + sym);
   });
  }
 }
 // if doesn't contain any from [symbs]
 if (res.length === 0) res = strClearAndFrUpper(text + ".");

 //without last dot
 return typeof res === "object" ? res.join(" ").slice(0, -1) : res.slice(0, -1);
 //with it - return typeof res === "object" ? res.join(" ") : res;
}

function strClearAndFrUpper(str) {
 str = str
  .toString()
  .split(" ")
  .filter((e) => e !== "")
  .join(" ");
 return str.charAt(0).toUpperCase() + str.substring(1);
}

export default toSentenceCase;
