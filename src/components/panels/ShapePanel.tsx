"use client";
import React from "react";
import { observer } from "mobx-react";
import { ShapeResource } from "../entity/ShapeResource"; 
import { MdSquare, MdCircle } from "react-icons/md";
import { TbTriangleFilled } from "react-icons/tb";

export const ShapePanel = observer(() => {
  return (
    <div className="bg-slate-800 h-full">
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold text-white">
        Add Shape
      </div>
      <ShapeResource icon={<MdSquare />} type="rect" radius={0} width={50} height={50} fill="grey" stroke="black" strokeWidth={3}/>
      <ShapeResource icon={<TbTriangleFilled />} type="triangle" radius={0} width={50} height={50} fill="grey" stroke="black" strokeWidth={3}/>
      <ShapeResource icon={<MdCircle />} type="circle" width={50} height={50} radius={10} fill="grey" stroke="black" strokeWidth={3}/>
    </div>
  );
});
