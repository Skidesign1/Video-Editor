"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { MdAdd } from "react-icons/md";

type ShapeResourceProps = {
    type: 'rect' | 'circle' | 'triangle',  // You can extend this for other shapes
    width: number,
    height: number,
    fill: string,
    stroke: string,
    strokeWidth: number,
    radius: number,
};
export const ShapeResource = observer(
    ({ type,  // You can extend this for other shapes
        width,
        height,
        fill,
        stroke,
        strokeWidth, radius }: ShapeResourceProps) => {
        const store = React.useContext(StoreContext);
        return (
            <div className="items-center bg-slate-800 m-[15px] flex flex-row">
                <div
                    className="flex-1 text-white px-2 py-1"
                    style={{
                        fill: `${fill}`,
                    }}
                >
                    Add {type}
                </div>
                <button
                    className="hover:bg-[#00a0f5] bg-[rgba(0,0,0,.25)] rounded z-10 text-white font-bold py-1"
                    onClick={() =>
                        store?.addShape({
                            type: type,  // You can extend this for other shapes
                            width: width,
                            height: height,
                            fill: fill,
                            stroke: stroke,
                            strokeWidth: strokeWidth,
                            radius: radius,
                        })
                    }
                >
                    <MdAdd size="25" />
                </button>
            </div>
        );
    }
);
