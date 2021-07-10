exports.templatesSettings = {
  class: {
    prompt: "NewClass.cs",
    template: ({ name, namespace, cursor }) => `namespace ${namespace}
{
  public class ${name}
  {
    ${cursor}
  }
}`,
  },
  interface: {
    prompt: "INewInterface.cs",
    template: ({ name, namespace, cursor }) => `namespace ${namespace}
{
  public interface ${name}
  {
    ${cursor}
  }
}`,
  },
  enum: {
    prompt: "NewEnum.cs",
    template: ({ name, namespace, cursor }) => `namespace ${namespace}
{
  public enum ${name}
  {
    ${cursor}
  }
}`,
  },
};
