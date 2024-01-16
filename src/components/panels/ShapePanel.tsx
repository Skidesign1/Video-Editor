"use client";
import React from "react";
import { observer } from "mobx-react";
import { ShapeResource } from "../entity/ShapeResource"; 

export const ShapePanel = observer(() => {
  return (
    <div className="bg-slate-800 h-full">
      <div className="text-sm px-[16px] pt-[16px] pb-[8px] font-semibold text-white">
        Add Shape
      </div>
      <ShapeResource type="rect" width={50} height={50} fill="grey" stroke="black" strokeWidth={3}/>
      <ShapeResource type="ellipse" width={100} height={100} fill="grey" stroke="black" strokeWidth={3}/>
    </div>
  );
});
