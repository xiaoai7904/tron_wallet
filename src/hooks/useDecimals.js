export const useDecimals = (decimals = 6) => {
  // decimals -= 1;
  return parseInt(`1${new Array(decimals).fill(0).join('')}`);
};

export default useDecimals;
