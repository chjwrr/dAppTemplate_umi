import { FlexViewCenter } from "../View";
import { Triangle } from 'react-loader-spinner'

export default function LoadingRow({width = 100}:{width?:number}){
  return <FlexViewCenter>
    <Triangle
      height={width}
      width={width}
      color="#d8d8d8"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      visible={true}
    />
  </FlexViewCenter>
}