"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { Element } from "../entity/Element";

export const ElementsPanel = observer((_props: {}) => {
  const store = React.useContext(StoreContext);
  return (
    <div>
      <p style={{
        borderRadius: '5px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        color: 'black',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, border-color 0.3s',
        width: 'fit-content',
        marginBottom: '10px',
      }} onClick={() => store?.saveVideo()}>Save Video</p>
      <div className="flex flex-row justify-between">
        <div className="text-sm px-[16px] py-[7px] font-semibold">Elements</div>
      </div>

      <div className="flex flex-col">
        {store?.editorElements.map((element) => {
          return <Element key={element.id} element={element} />;
        })}
      </div>
    </div>
  );
});
