import { useStore } from '../store';

export const useStoreApi = () => {
  const { state, dispatch } = useStore();

  return {
    pageLoading: state.pageLoading,
    balance: state.balance,
    address: state.address,
    message: state.message,
    isLandShopCar: state.isLandShopCar,
    otherShopCar: state.otherShopCar,
    seaBalance: state.seaBalance,
    isLandPrice: state.isLandPrice,
    chainName: state.chainName,
    mainNetWork: state.mainNetWork,
    currentProductDetailsInfo: state.currentProductDetailsInfo,
    isPc2View: state.isPc2View,
    isMinScreen: state.isMinScreen,
    setPageLoading: pageLoading => {
      dispatch({
        type: 'PAGE-LOADING',
        pageLoading
      });
    },
    setAddress: newAddress => {
      dispatch({
        type: 'NEW-ADDRESS',
        address: newAddress,
        message: 'New address added successfully!',
      });
    },
    setBalance: newBalance => {
      dispatch({
        type: 'SET-BALANCE',
        balance: newBalance,
      });
    },
    setIsLandShopCar: newShopCar => {
      dispatch({
        type: 'SET-ISLAND-SHOPCAR',
        isLandShopCar: newShopCar,
      });
    },
    setOtherShopCar: newShopCar => {
      dispatch({
        type: 'SET-OTHER-SHOPCAR',
        otherShopCar: newShopCar,
      });
    },
    setSeaBalance: newSeaBalance => {
      dispatch({
        type: 'SET-SEA-BAKANCE',
        seaBalance: newSeaBalance,
      });
    },
    setIsLandPrice: newIsLandPrice => {
      dispatch({
        type: 'SET-ISLAND-PRICE',
        isLandPrice: newIsLandPrice,
      });
    },
    setChainName: newChainName => {
      dispatch({
        type: 'SET-CHAIN-NAME',
        chainName: newChainName,
      });
    },
    setMainNetWork: newMainNetWork => {
      dispatch({
        type: 'SET-MAIN-NET-WORK',
        mainNetWork: newMainNetWork,
      });
    },
    setCurrentProductDetailsInfo: data => {
      dispatch({
        type: 'SET-CURRENT-PRODUCT-DETAILS-INFO',
        currentProductDetailsInfo: data,
      });
    },
    setIsPc: data => {
      dispatch({
        type: 'SET-IS-PC',
        isPc2View: data,
      });
    },
    setIsMinScreen: data => {
      dispatch({
        type: 'SET-IS-MIN-SCREEN',
        isMinScreen: data,
      });
    }
  };
};

export default useStoreApi;
