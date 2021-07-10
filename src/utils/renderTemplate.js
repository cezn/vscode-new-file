const { v4: uuid4 } = require("uuid");
const { templatesSettings } = require("./templateSettings");

/**
 *
 * @param {{templateName: 'class' | 'interface' | 'enum', context: {name: string, namespace: string}}} param0
 * @returns {Promise<[string, number]>}
 */
async function renderTemplate({ templateName, context }) {
  const cursor = uuid4();
  let text = templatesSettings[templateName].template({ ...context, cursor });
  const cursorIdx = text.indexOf(cursor);
  text = text.replace(cursor, "");

  return [text, cursorIdx];
}

exports.renderTemplate = renderTemplate;
