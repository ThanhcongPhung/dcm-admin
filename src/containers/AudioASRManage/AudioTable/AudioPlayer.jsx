/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Icon, Tooltip } from '@material-ui/core';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

export default function AudioPlayer({ audioLink, onMouseEnter, onMouseLeave }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { t } = useTranslation();

  const toggleIsPlaying = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <IconButton
      onClick={toggleIsPlaying}
      className="audioButton"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <audio id="ad" preload="auto" onEnded={toggleIsPlaying} ref={audioRef}>
        <source src={audioLink} type="audio/wav" />
      </audio>
      {isPlaying ? (
        <Tooltip title={t('stop')}>
          <Icon color="primary" className="iconAction">
            stop_circle
          </Icon>
        </Tooltip>
      ) : (
        <Tooltip title={t('play')}>
          <PlayCircleFilledWhiteIcon color="primary" />
        </Tooltip>
      )}
    </IconButton>
  );
}
