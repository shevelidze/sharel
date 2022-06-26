export default interface Method {
  name: string;
  returnType: string;
  argumentsJtdSchema: any;
  func: (id: string) => any;
}
