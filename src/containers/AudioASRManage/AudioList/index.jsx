import React, {useState} from 'react';

function AudioList(props){
  const {
    audioList,
    isLoading,
    setIsLoading,
    pagination,
  } = props;
  return (
    <div>{console.log(audioList)}</div>
  )
}
export default AudioList;
