import _ from "lodash";

/**

 * @param {number} clientWidth  document.body.clientWidth
 * @returns 
 */
const calcTimeLineContainerWidth = clientWidth => {

  const OTHER_WIDTH = 783;
  return clientWidth - OTHER_WIDTH;
};

/**

 * @param {number} frame
 * @param {number} fps 
 * @returns 
 */
const frame2Time = (frame, fps) =>
  frame % fps === 0 ? second2hms(frame / fps) : (frame % fps) + "f";

const second2hms = second => {
  const h =
    Math.floor(second / 3600) >= 10
      ? String(Math.floor(second / 3600))
      : "0" + Math.floor(second / 3600);
  const m =
    Math.floor((second / 60) % 60) >= 10
      ? String(Math.floor((second / 60) % 60))
      : "0" + Math.floor((second / 60) % 60);
  const s =
    Math.floor(second % 60) >= 10
      ? String(Math.floor(second % 60))
      : "0" + Math.floor(second % 60);

  return h === "00" ? m + ":" + s : h + ":" + m + ":" + s;
};

/**

 * @param {number} frameWidth 
 * @returns {Object}
 */
const frameWidth2Grid = frameWidth => {

  const gridSegmentList = [
    // level1
    {
      maxWidth: 200,
      minWidth: 43,
      gridFrame: 1,
      groupGridFrame: 2
    },
    // level2
    {
      maxWidth: 43,
      minWidth: 33,
      gridFrame: 1,
      groupGridFrame: 3
    },
    // level3
    {
      maxWidth: 33,
      minWidth: 27,
      gridFrame: 1,
      groupGridFrame: 5
    },
    // level4
    {
      maxWidth: 27,
      minWidth: 20,
      gridFrame: 1,
      groupGridFrame: 10
    },
    // level5
    {
      maxWidth: 20,
      minWidth: 10,
      gridFrame: 3,
      groupGridFrame: 15
    },
    // level6
    {
      maxWidth: 10,
      minWidth: 5,
      gridFrame: 3,
      groupGridFrame: 30
    },
    // level7
    {
      maxWidth: 5,
      minWidth: 30 / 9,
      gridFrame: 6,
      groupGridFrame: 60
    },
    // level8
    {
      maxWidth: 30 / 9,
      minWidth: 2,
      gridFrame: 9,
      groupGridFrame: 90
    },
    // level9
    {
      maxWidth: 2,
      minWidth: 1,
      gridFrame: 15,
      groupGridFrame: 150
    },
    // level10
    {
      maxWidth: 1,
      minWidth: 30 / 90,
      gridFrame: 30,
      groupGridFrame: 300
    },
    // level11
    {
      maxWidth: 30 / 90,
      minWidth: 30 / 180,
      gridFrame: 90,
      groupGridFrame: 900
    },
    // level12
    {
      maxWidth: 30 / 180,
      minWidth: 30 / 360,
      gridFrame: 180,
      groupGridFrame: 1800
    },
    // level13
    {
      maxWidth: 30 / 360,
      minWidth: 30 / 540,
      gridFrame: 360,
      groupGridFrame: 3600
    },
    // level14
    {
      maxWidth: 30 / 540,
      minWidth: 30 / 900,
      gridFrame: 540,
      groupGridFrame: 5400
    },
    // level15
    {
      maxWidth: 30 / 900,
      minWidth: 30 / 1800,
      gridFrame: 900,
      groupGridFrame: 9000
    },
    // level16
    {
      maxWidth: 30 / 1800,
      minWidth: 30 / 5400,
      gridFrame: 1800,
      groupGridFrame: 18000
    },
    // level17
    {
      maxWidth: 30 / 5400,
      minWidth: 30 / 21600,
      gridFrame: 5400,
      groupGridFrame: 54000
    },
    // level18
    {
      maxWidth: 30 / 21600,
      minWidth: 30 / 32400,
      gridFrame: 21600,
      groupGridFrame: 216000
    },
    // level19
    {
      maxWidth: 30 / 32400,
      minWidth: 30 / 54000,
      gridFrame: 32400,
      groupGridFrame: 324000
    },
    // level20
    {
      maxWidth: 30 / 54000,
      minWidth: 30 / 108000,
      gridFrame: 54000,
      groupGridFrame: 540000
    },
    // level21
    {
      maxWidth: 30 / 108000,
      minWidth: 30 / 324000,
      gridFrame: 108000,
      groupGridFrame: 1080000
    },
    // level22
    {
      maxWidth: 30 / 324000,
      minWidth: 30 / 32400000000000000000,
      gridFrame: 324000,
      groupGridFrame: 3240000
    }
  ];

 
  let tempGridSegment;


  for (const gridSegment of gridSegmentList) {
    if (
      frameWidth <= gridSegment.maxWidth &&
      frameWidth > gridSegment.minWidth
    ) {
      tempGridSegment = gridSegment;
      break;
    }
  }

  if (!tempGridSegment) {
    throw new Error("Please input frameWidth in [0,200]");
  }

  return {
    gridWidth: tempGridSegment.gridFrame * frameWidth,
    gridFrame: tempGridSegment.gridFrame,
    groupGridFrame: tempGridSegment.groupGridFrame
  };
};

/**

 * input @????????? frameWidth
 * input @??????????????? timeLineWidth
 * input @?????????????????? materialMaxFrame
 * output @????????????????????? girdTotalNumber
 */
const getGridTotalNumber = (frameWidth, timeLineWidth, materialMaxFrame) => {

  const gridWidth = frameWidth2Grid(frameWidth).gridWidth;


  const oneScreenGridNumber = Math.floor(timeLineWidth / gridWidth);

  
  const emptyScreenGridNumber = Math.floor(oneScreenGridNumber / 3);

 
  const materialGridNumber = (materialMaxFrame, frameWidth, gridWidth) => {

    const materialWidth = materialMaxFrame * frameWidth;
    //    const materialGridNumber = Math.ceil(materialWidth / gridWidth);
    return materialGridNumber;
  };


  const gridTotalNumber =
    emptyScreenGridNumber +
    materialGridNumber(materialMaxFrame, frameWidth, gridWidth);

  return gridTotalNumber;
};

/**

 * input @????????? frameWidth
 * input @??????????????? timeLineWidth
 * input @?????????????????? materialMaxFrame
 * output @????????????????????? girdTotalNumber
 */
const getTimeScaleWidth = (frameWidth, timeLineWidth, materialMaxFrame) => {

  const gridWidth = frameWidth2Grid(frameWidth).gridWidth;


  const gridTotalNumber = getGridTotalNumber(
    frameWidth,
    timeLineWidth,
    materialMaxFrame
  );

  const result = gridTotalNumber * gridWidth;
  return timeLineWidth >= result ? timeLineWidth : result;
};

const getTimeScalePlaceHolderWidth = (offsetLeft, gridWidth) =>
  Math.floor(offsetLeft / gridWidth) * gridWidth;


const gridBufferFirstIndex = (offsetLeft, gridWidth) => {
  const placeholderWidth = Math.floor(offsetLeft / gridWidth) * gridWidth;
  return Math.floor(placeholderWidth / gridWidth) + 1;
};


const getGridBufferNumber = (timeLine_width, gridWidth) =>
  Math.ceil(timeLine_width / gridWidth) + 1;

/**

 * @param {ref<List>} gridBufferList  GridBufferList
 * @param {*} gridWidth 
 * @param {number} groupGridFrame  Frame
 * @param {number} gridFrame  Frame
 * @param {width} timeLineOffsetLeft 
 * @param {*} timescale_width 
 */
const renderGridBufferList = (
  gridBufferList,
  gridWidth,
  groupGridFrame,
  gridFrame,
  timeLineOffsetLeft,
  timeLine_width
) => {
  try {
    
    const gridMultiple = groupGridFrame / gridFrame;

    
    const firstIndex = gridBufferFirstIndex(timeLineOffsetLeft, gridWidth);

    
    const gridBufferNumber = getGridBufferNumber(timeLine_width, gridWidth);

    
    if (gridBufferNumber > gridBufferList.value.length) {
      const dValue = gridBufferNumber - gridBufferList.value.length;
      for (let i = 1; i <= dValue; i++) {
        gridBufferList.value.push({
          frame: 0,
          showNumber: false,
          width: 0
        });
      }
    } else if (gridBufferNumber < gridBufferList.value.length) {
      const dValue = gridBufferList.value.length - gridBufferNumber;
      gridBufferList.value.splice(gridBufferList.value.length - dValue, dValue);
    } else {
      // doing nothing
    }

    
    for (let i = firstIndex; i <= gridBufferNumber + firstIndex - 1; i++) {
      const grid = gridBufferList.value[i - firstIndex];
      if (i - 1 === 0) {
        grid.frame = 0;
        grid.showNumber = true;
        grid.width = gridWidth;
      } else if ((i - 1) % gridMultiple === 0) {
        grid.frame = (i - 1) * gridFrame;
        grid.showNumber = true;
        grid.width = gridWidth;
      } else {
        grid.frame = (i - 1) * gridFrame;
        grid.showNumber = false;
        grid.width = gridWidth;
      }
    }
  } catch (error) {
    // doing nothing
    // console.log(error);
  }
};

/**

 * @param {number} maxMaterialFrame  frame
 * @param {number} timeLineWidth  px
 * @returns
 */
const getMinFrameWidth = (maxMaterialFrame, timeLineWidth) => {
  const maxMaterialFrameWidth = timeLineWidth * (1 / 3);
  return maxMaterialFrameWidth / maxMaterialFrame;
};

/**


 */
const getMaxFrameWidth = () => 200;

/**

 * @param {number} maxMaterialFrame
 * @param {number} timeLineWidth
 * @returns
 */
const getFitFrameWidth = (maxMaterialFrame, timeLineWidth) => {
  const maxMaterialFrameWidth = timeLineWidth * (4 / 5);
  return maxMaterialFrameWidth / maxMaterialFrame;
};

/**

 * @param {*} 
 * @param {number} fps
 * @returns 
 */
const ??s2Frame = (??s, fps) => Math.round(??s * (fps / 1000000));

/**

 * @param {*} ms
 * @param {*} fps
 * @returns
 */
const ms2Frame = (ms, fps) => Math.round(ms * (fps / 1000));

/**

 * @param {*} frame
 * @param {*} fps
 */
const frame2ms = (frame, fps) => (frame / fps) * 1000;

/**

 * @param {number} timelineIn 
 * @param {*} timelineOut 
 * @param {*} frameWidth 
 * @returns
 */
const getMaterialWidth = (timelineIn, timelineOut, frameWidth) =>
  ??s2Frame(timelineOut - timelineIn, 30) * frameWidth;

/**

 * @param {Object} coreData
 */
// TODO 
const getMaxFrameOfMaterial = (coreData, currentSectionIndex) => {
  const visionTrackMaterials =
    coreData.sections[currentSectionIndex - 1].sectionTimeline.visionTrack
      .visionTrackMaterials;

  const audioTrackMaterials =
    coreData.sections[currentSectionIndex - 1].sectionTimeline.audioTrack
      .audioTrackMaterials;

  let maxtimelineOut = 0;
  if (visionTrackMaterials) {
    for (let i = 0; i < visionTrackMaterials.length; i++) {
      const timelineOut = visionTrackMaterials[i].timelineOut;
      if (timelineOut > maxtimelineOut) {
        maxtimelineOut = timelineOut;
      }
    }
  }

  if (audioTrackMaterials) {
    for (let i = 0; i < audioTrackMaterials.length; i++) {
      if (audioTrackMaterials[i].voiceType !== "bgm") {
        const timelineOut = audioTrackMaterials[i].timelineOut;
        if (timelineOut > maxtimelineOut) {
          maxtimelineOut = timelineOut;
        }
      }
    }
  }

  return visionTrackMaterials.length === 0 && audioTrackMaterials.length === 0
    ? 0
    : ??s2Frame(maxtimelineOut, 30);
};

/**


 * @param {*} visionTrackMaterials
 */
const getVideoTrackMaterialList = visionTrackMaterials => {
  const tempList = [];


  for (let i = 0; i < visionTrackMaterials.length; i++) {
    if (
      visionTrackMaterials[i].type === "video" ||
      visionTrackMaterials[i].type === "image" ||
      visionTrackMaterials[i].type === "gif"
    ) {
      tempList.push(visionTrackMaterials[i]);
    }
  }

  return tempList.sort((a, b) => a.timelineIn - b.timelineIn);
};

/**

 * @param {*} videoFrameWidth
 * @param {*} coreData
 * @param {*} frameWidth
 * @param {*} currentSectionIndex
 * @param {*} timeLineOffsetLeft
 * @param {*} timeLine_width
 * @returns {
 *     videoIndex: ??????????????? CoreData ?????? index,
 *     frame: ??????????????????????????????????????? readFrame ????????????,
 *     position: ???????????????????????? background-position ?????????????????????,
 *     file: ???????????????????????????????????????????????? readFrame ????????????,
 *     priority: ??????????????????????????????????????????????????? ReadFrameTask ???????????????
 *               - 0???????????????????????????????????????????????????
 *               - 1????????????????????????????????????????????????
 *               - 2???????????????????????????????????????????????????
 * }[]
 */
const getflatFrameList = (
  videoFrameWidth,
  coreData,
  frameWidth,
  currentSectionIndex,
  timeLineOffsetLeft,
  timeLine_width
) => {

  if (coreData.sections.length === 0) {
    return [];
  }


  if (
    coreData.sections[currentSectionIndex - 1].sectionTimeline.visionTrack
      .visionTrackMaterials.length === 0
  ) {
    return [];
  }


  const visionTrackMaterials =
    coreData.sections[currentSectionIndex - 1].sectionTimeline.visionTrack
      .visionTrackMaterials;

  const tempFramesList = [];

  for (let i = 0; i < visionTrackMaterials.length; i++) {
   
    const material = visionTrackMaterials[i];

 
    const materialWidth = getMaterialWidth(
      material.timelineIn,
      material.timelineOut,
      frameWidth
    );

   
    const framesNumber = Math.ceil(materialWidth / videoFrameWidth);

    const tempFrames = [];

    for (let i = 0; i < framesNumber; i++) {
      let frame = Math.floor(i * (videoFrameWidth / frameWidth));
      let position = `${i * videoFrameWidth + "px"} 0px`;

      tempFrames.push({
        frame: frame,
        position: position,
        file: material.file
      });
    }
    tempFramesList.push(tempFrames);
  }

  // // console.log("getflatFrameList tempFramesList", tempFramesList);


  const screenFramesNumber = Math.ceil(timeLine_width / videoFrameWidth);


  let currentVideoIndex = 0;
  let currentFrameIndex = 0;

  let tempTotalMaterialWidth = 0;
  for (let i = 0; i < visionTrackMaterials.length; i++) {
 
    const material = visionTrackMaterials[i];


    const materialWidth = getMaterialWidth(
      material.timelineIn,
      material.timelineOut,
      frameWidth
    );

    tempTotalMaterialWidth += materialWidth;

    if (timeLineOffsetLeft < tempTotalMaterialWidth) {
      currentVideoIndex = i;
      currentFrameIndex = Math.floor(
        (timeLineOffsetLeft - (tempTotalMaterialWidth - materialWidth)) /
          videoFrameWidth
      );
      break;
    } else if (timeLineOffsetLeft === tempTotalMaterialWidth) {
      currentVideoIndex = i + 1;
      currentFrameIndex = 0;
      break;
    }
  }


  const tempList = [];

  // ???????????? index
  let flatCurrentFrameIndex;
  let count = 0;

  for (let i = 0; i < tempFramesList.length; i++) {
    const tempFrames = tempFramesList[i];
    for (let j = 0; j < tempFrames.length; j++) {
      const tempFrame = tempFrames[j];
      tempList.push({
        videoIndex: i,
        frame: tempFrame.frame,
        position: tempFrame.position,
        file: tempFrame.file
      });
      if (currentVideoIndex === i && currentFrameIndex === j) {
        flatCurrentFrameIndex = count;
      }
      count++;
    }
  }

  // console.log("????????????", tempList);
  // console.log(
  //   "????????????????????????",
  //   flatCurrentFrameIndex,
  //   tempList[flatCurrentFrameIndex]
  // );

  // ???????????????
  const startFrameIndex =
    flatCurrentFrameIndex - screenFramesNumber > 0
      ? flatCurrentFrameIndex - screenFramesNumber
      : 0;

  // ???????????????
  const endFrameIndex =
    flatCurrentFrameIndex + 2 * screenFramesNumber - 1 > tempList.length - 1
      ? tempList.length - 1
      : flatCurrentFrameIndex + 2 * screenFramesNumber - 1;

  // console.log(
  //   "flatCurrentFrameIndex + 2 * screenFramesNumber",
  //   flatCurrentFrameIndex + 2 * screenFramesNumber
  // );
  // console.log("screenFramesNumber", screenFramesNumber);
  // console.log("tempList.length", tempList.length - 1);

  // console.log("???????????????", startFrameIndex);
  // console.log("???????????????", endFrameIndex);

  // ?????????????????????????????????????????????
  const flatFrameList = tempList.slice(startFrameIndex, endFrameIndex + 1);
  // console.log("??????????????????", flatFrameList);

  // ??????????????????????????????
  const afterSliceFlatCurrentFrameIndex =
    flatCurrentFrameIndex - startFrameIndex;

  // ?????????????????????????????????
  for (let i = 0; i < flatFrameList.length; i++) {
    if (i >= 0 && i < afterSliceFlatCurrentFrameIndex) {
      flatFrameList[i].priority = 2;
    } else if (
      i >= afterSliceFlatCurrentFrameIndex &&
      i < afterSliceFlatCurrentFrameIndex + screenFramesNumber
    ) {
      flatFrameList[i].priority = 0;
    } else if (i >= afterSliceFlatCurrentFrameIndex + screenFramesNumber) {
      flatFrameList[i].priority = 1;
    }
  }

  // console.log("???????????????????????????", flatFrameList);
  // debugger;
  return flatFrameList;
};

const constructFramesMap = (
  flatFrameList,
  videoFrameBuffer,
  readFrameTaskStack
) => {
  // debugger
  /**
   * task = {
      file: File,
      readFrameList: "0,374593.975,749187.95,1123781"
    }
   */
  const taskList = [];

  /**
   * key: {
      priority: number,
      videoIndex: number
    }

    value: {
      time,
      file
    }[]
   */
  const tempMap = new Map();

  // Step 1.1: ??? flatFrame ??? blobUrl ??????
  // Step 1.2?????? tempMap ????????????????????????
  for (let i = 0; i < flatFrameList.length; i++) {
    const flatFrame = flatFrameList[i];
    const key = JSON.stringify({
      videoIndex: flatFrame.videoIndex,
      frame: flatFrame.frame
    });
    if (videoFrameBuffer.has(key)) {
      flatFrame.blobUrl = videoFrameBuffer.get(key);
    } else {
      // 1. ?????? Map ??????????????????[pririty, videoIndex]
      const groupKey = JSON.stringify({
        priority: flatFrame.priority,
        videoIndex: flatFrame.videoIndex
      });
      if (tempMap.has(groupKey)) {
        tempMap.get(groupKey).push({
          frame: flatFrame.frame,
          file: flatFrame.file,
          videoIndex: flatFrame.videoIndex,
          priority: flatFrame.priority
        });
      } else {
        const value = [];
        value.push({
          frame: flatFrame.frame,
          file: flatFrame.file,
          videoIndex: flatFrame.videoIndex,
          priority: flatFrame.priority
        });
        tempMap.set(groupKey, value);
      }
    }
  }

  // ????????????
  // console.log("tempMap", tempMap);

  for (let frameList of tempMap.values()) {
    const readFrameList = [];

    frameList.forEach(frame => readFrameList.push(frame.frame));

    const task = {
      file: frameList[0].file,
      videoIndex: frameList[0].videoIndex,
      priority: frameList[0].priority,
      readFrameList: readFrameList
    };

    taskList.push(task);
  }

  // Stack???????????????????????? priority ???????????????????????????????????????????????? prority ?????????????????????????????????????????????videoIndex ?????????????????????
  // ?????????????????? videoIndex ???????????????????????? priority ????????????
  taskList.sort((a, b) => b.videoIndex - a.videoIndex);
  taskList.sort((a, b) => b.priority - a.priority);

  // console.log("???????????? TaskList", taskList);

  // ??? Task ?????????????????????
  for (let i = 0; i < taskList.length; i++) {
    readFrameTaskStack.push(taskList[i]);
  }

  // ????????????????????????
  // deduplicationTask(readFrameTaskStack);

  // ?????????????????? flatFrameList ???????????? framesMap
  const framesMap = new Map();

  for (let i = 0; i < flatFrameList.length; i++) {
    const flatFrame = flatFrameList[i];
    const isVideoIndexAlreadyExist = framesMap.has(flatFrame.videoIndex);
    if (isVideoIndexAlreadyExist) {
      const frames = framesMap.get(flatFrame.videoIndex);
      frames.push({
        blobUrl: flatFrame.blobUrl,
        frame: flatFrame.frame,
        position: flatFrame.position
      });
    } else {
      const frames = [];
      frames.push({
        blobUrl: flatFrame.blobUrl,
        frame: flatFrame.frame,
        position: flatFrame.position
      });
      framesMap.set(flatFrame.videoIndex, frames);
    }
  }

  // console.log("?????? framesMap", framesMap);
  // debugger;
  return framesMap;
};

/**
 * ??? TaskStack ??????
 * @param {*} taskStack
 */
const deduplicationTask = taskStack => {
  // TODO ??????????????????????????? errorCount
};

export default {
  calcTimeLineContainerWidth,
  frame2Time,
  frameWidth2Grid,
  getGridTotalNumber,
  getTimeScaleWidth,
  getTimeScalePlaceHolderWidth,
  gridBufferFirstIndex,
  renderGridBufferList,
  getMinFrameWidth,
  getMaxFrameWidth,
  getFitFrameWidth,
  ??s2Frame,
  ms2Frame,
  frame2ms,
  second2hms,
  getMaterialWidth,
  getMaxFrameOfMaterial,
  getVideoTrackMaterialList,
  getflatFrameList,
  constructFramesMap
};
