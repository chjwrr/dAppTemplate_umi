import { ChainID } from './chains';

export interface AddressMap {
  [cid:number]:`0x${string}` | string
}

export const USDT_ADDRESSSES:AddressMap = {
  [ChainID.BSC]: "0x55d398326f99059fF775485246999027B3197955",
};



