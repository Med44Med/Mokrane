const generateOrderNo = (value:string): string => {
  const timestamp = Date.now().toString();
  return `${timestamp}M${value}`;
};
export default generateOrderNo;
