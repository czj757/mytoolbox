export const formatJson = (json: string): string => {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error('无效的 JSON 格式');
  }
};

export const compressJson = (json: string): string => {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error('无效的 JSON 格式');
  }
};

export const jsonToXml = (json: string): string => {
  try {
    const obj = JSON.parse(json);
    const xml = jsonToXmlHelper(obj);
    return '<?xml version="1.0" encoding="UTF-8"?>\n<root>' + xml + '</root>';
  } catch (error) {
    throw new Error('无效的 JSON 格式');
  }
};

const jsonToXmlHelper = (obj: any): string => {
  let xml = '';
  for (const prop in obj) {
    xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (const array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += jsonToXmlHelper(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += jsonToXmlHelper(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
  }
  return xml;
};