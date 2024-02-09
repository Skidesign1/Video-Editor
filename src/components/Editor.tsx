"use client"
import { fabric } from "fabric";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "@/store";
import "@/utils/fabric-utils";
import { Resources } from "./Resources";
import { ElementsPanel } from "./panels/ElementsPanel";
import { Menu } from "./Menu";
import { TimeLine } from "./TimeLine";

export const Editor = observer(() => {
  const store = React.useContext(StoreContext);
  const [isMobileSize, setIsMobileSize] = React.useState(false);

  const handleSizeChange = () => {
    setIsMobileSize(!isMobileSize);
  };

  useEffect(() => {
    if (store && typeof window !== 'undefined') {
      const canvas = new fabric.Canvas("canvas", {
        height: isMobileSize ? 720 : 500,
        width: isMobileSize ? 406 : 800,
        backgroundColor: "#ededed",
      });
      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = "#00a0f5";
      fabric.Object.prototype.cornerStyle = "circle";
      fabric.Object.prototype.cornerStrokeColor = "#0063d8";
      fabric.Object.prototype.cornerSize = 10;
      // canvas mouse down without target should deselect active object
      canvas.on("mouse:down", function (e) {
        if (!e.target) {
          store?.setSelectedElement(null);
        }
      });

      store?.setCanvas(canvas);
      fabric.util.requestAnimFrame(function render() {
        canvas.renderAll();
        fabric.util.requestAnimFrame(render);
      });
    }
  }, [store, isMobileSize]);

  return (
    <div className="grid grid-rows-[20px_500px_1fr] grid-cols-[60px_200px_800px_1fr] h-[100%] pt-10">
      <div className="tile row-span-2 flex flex-col">
        <Menu />
      </div>
      <div className="row-span-2 flex flex-col overflow-auto">
        <Resources />
      </div>
      <canvas id="canvas" className="h-[500px] w-[800px] row col-start-3 flex justify-center items-center" />
      <div className="col-start-4 row-start-2">
      <button onClick={handleSizeChange}>Toggle Size</button>
        <ElementsPanel />
      </div>
      <div className="col-start-3 row-start-3 col-span-2 relative overflow-scroll px-[10px] py-[4px] mt-64">
        <TimeLine />
      </div>
    </div>
  );
});