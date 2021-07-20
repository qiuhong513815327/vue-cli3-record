module.exports = {
  handleObjData: function(data) {
    let keys = Object.keys(data).join();
    let values = "";
    let valuesList = Object.values(data);
    valuesList.forEach((item, index) => {
      if (typeof item === "string") {
        values =
          values + `"${item}"${index === valuesList.length - 1 ? "" : ","}`;
      } else {
        values =
          values + `${item}${index === valuesList.length - 1 ? "" : ","}`;
      }
    });

    let keyValue = "";
    Object.entries(data).forEach((item, index) => {
      if (typeof item[1] === "string") {
        keyValue =
          keyValue +
          `${item[0]} = '${item[1]}'${
            index === valuesList.length - 1 ? "" : ","
          }`;
      } else {
        keyValue =
          keyValue +
          `${item[0]} = ${item[1]}${
            index === valuesList.length - 1 ? "" : ","
          }`;
      }
    });

    return {
      keys,
      values,
      keyValue
    };
  }
};
