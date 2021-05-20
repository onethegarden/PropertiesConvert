const properties = require("properties");

export const readPropertiesFile = (file) => {
  const options = {
    path: true,
    namespaces: true, //이거 값 체크하면 json depth 넣어줌
    sections: true,
    variables: true,
    include: true,
  };
  properties.parse(file, options, function (error, obj) {
    if (error) return console.error(error);

    console.log(obj);
  });
};
