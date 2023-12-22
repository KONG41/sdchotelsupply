import React from 'react'
import {Tooltip} from "@nextui-org/react";
import Qr from '../Qr';
const QrTooltip = ({qr,icon}:any) => {
  return (
    <Tooltip content={<Qr qr={qr}/>} showArrow={true} classNames={{  
        base: [
          // arrow color
          "before:bg-black dark:before:bg-white before:mb-1",
        ],
        content: [
          "bg-black p-1 rounded-sm",
        ],
      }}
      >
        {icon}
      </Tooltip>
  )
}

export default QrTooltip