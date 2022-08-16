
 const getName = (name) => {
    let list = name.match(/\b(\w+)\b/g);
    return list;
  }

  export default getName;