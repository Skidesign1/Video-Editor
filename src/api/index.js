  /* eslint-disable no-async-promise-executor */
/**

 * @param {*} videoFile
 * @returns
 */
const getVideoDuration = videoFile =>
  new Promise((resolve, reject) => {
    try {
      const url = URL.createObjectURL(videoFile);
      const tempAudio = new Audio(url);
      tempAudio.addEventListener("loadedmetadata", () => {
        console.log("getVideoDuration success", tempAudio.duration);
        resolve(tempAudio.duration * 1000000);
      });
    } catch (error) {
      console.log("getVideoDuration error", error);
      throw error;
    }
  });

/**

 * @param {*} videoFile
 * @returns
 */
const getVideoHeightWidth = videoFile =>
  new Promise((resolve, reject) => {
    try {
      const video = document.createElement("video");

      video.preload = "metadata";

      video.src = URL.createObjectURL(videoFile);

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        console.log("getVideoHeightWidth success", {
          width: video.videoWidth,
          height: video.videoHeight
        });
        resolve({ width: video.videoWidth, height: video.videoHeight });
      };
    } catch (error) {
      console.log("getVideoHeightWidth error", error);
      reject(error);
    }
  });

/**

 * @param {*} videoFile
 * @returns
 */
const getVideoListDuration = videoFileList =>
  new Promise(async (resolve, reject) => {
    try {
      let totalDuration = 0;
      for (let i = 0; i < videoFileList.length; i++) {
        const videoFile = videoFileList[i];
        const duration = await getVideoDuration(videoFile);
        totalDuration += duration;
      }
      console.log("getVideoListDuration success", totalDuration);
      resolve(totalDuration * 1000000);
    } catch (error) {
      console.log("getVideoListDuration error", error);
      reject(error);
    }
  });

/**

 * @param {*} coreData
 * @param {*} videoFileList
 * @param {*} currentSectionIndex
 * @returns
 */
const addVideoToCoreData = (coreData, videoFileList, currentSectionIndex) =>
  new Promise(async (resolve, reject) => {
    try {

      const tempVisionTrackMaterials = [];


      let maxtimelineOut = 0;

      const visionTrackMaterials =
        coreData.sections[currentSectionIndex - 1].sectionTimeline.visionTrack
          .visionTrackMaterials;

      for (let i = 0; i < visionTrackMaterials.length; i++) {
        const timelineOut = visionTrackMaterials[i].timelineOut;
        if (timelineOut > maxtimelineOut) {
          maxtimelineOut = timelineOut;
        }
      }


      for (let i = 0; i < videoFileList.length; i++) {
        const videoFile = videoFileList[i];

        const duration = await getVideoDuration(videoFile);

        const timelineIn =
          i === 0
            ? maxtimelineOut
            : tempVisionTrackMaterials[i - 1].timelineOut;

        const timelineOut = timelineIn + duration;

        const { width, height } = await getVideoHeightWidth(videoFile);

        tempVisionTrackMaterials.push({
          type: "video",
          width: width,
          height: height,
          duration: duration,
          timelineIn: timelineIn,
          timelineOut: timelineOut,
          url: URL.createObjectURL(videoFile),
          file: videoFile
        });
      }


      for (let i = 0; i < tempVisionTrackMaterials.length; i++) {
        coreData.sections[
          currentSectionIndex - 1
        ].sectionTimeline.visionTrack.visionTrackMaterials.push(
          tempVisionTrackMaterials[i]
        );
      }

      console.log("addVideoToCoreData success");
      resolve();
    } catch (error) {
      console.log("addVideoToCoreData error", error);
      reject(error);
    }
  });

export default {
  getVideoDuration,
  getVideoListDuration,
  addVideoToCoreData,
  getVideoHeightWidth
};
