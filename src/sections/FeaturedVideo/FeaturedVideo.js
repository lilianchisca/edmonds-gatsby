import React, { useState } from 'react'
import { shape, string } from 'prop-types'
import ReactPlayer from 'react-player'
import styled from 'styled-components'

import Button from '../../components/Button'
import BackgroundImage from '../../components/BackgroundImage'

const Play = styled.div`
  width: 115px;
  height: 115px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  background-color: #6784c9;
  transition: all 0.3s;

  &:hover {
    box-shadow: none;
  }

  &::after {
    content: '';
    width: 24px;
    height: 28px;
    background: url('/images/play.png') no-repeat center / 100% 100%;
    position: absolute;
    top: 50%;
    left: 50px;
    transform: translateY(-50%);
  }
`

const FeaturedVideo = ({
  sectionIndex,
  title,
  button,
  videoLink,
  videoThumbnail,
  content,
}) => {
  const [playing, setPlaying] = useState(false)

  return (
    <section
      data-section-index={sectionIndex}
      className="bg-aqua-200 pt-80 pb-100"
    >
      <div className="mx-auto text-center max-w-1460 px-30">
        <h2 className="font-normal leading-tight mb-30 text-32">{title}</h2>
        <div
          className="mx-auto leading-loose text-gray-400 max-w-1150 text-16 tracking-body mb-50"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mx-auto max-w-910">
          <div className="relative overflow-hidden aspect-ratio-16/9 rounded-5 shadow-box">
            <ReactPlayer
              url={videoLink}
              playing={playing}
              className="absolute top-0 left-0"
              width="100%"
              height="100%"
            />
            <div
              onClick={() => setPlaying(true)}
              className={`absolute inset-0 cursor-pointer transition-all duration-250 ${
                playing ? `invisible opacity-0` : ``
              }`}
            >
              <BackgroundImage
                image={videoThumbnail.imageFile.childImageSharp.fluid}
                additionalClasses="absolute inset-0"
              />
              <Play />
            </div>
          </div>
        </div>
        <footer className="pt-50">
          <Button
            to={button.url}
            target={button.target}
            secondary
            additionalClasses="mx-17 mb-6 md:mb-0"
          >
            {button.title}
          </Button>
        </footer>
      </div>
    </section>
  )
}

FeaturedVideo.propTypes = {
  sectionIndex: string,
  title: string.isRequired,
  button: shape({
    url: string,
    title: string,
    target: string,
  }),
  videoLink: string.isRequired,
  videoThumbnail: shape({
    imageFile: shape({
      childImageSharp: shape({
        fluid: shape({
          base64: string,
          src: string,
          srcSet: string,
          srcWebp: string,
          srcSetWebp: string,
          sizes: string,
        }),
      }),
    }),
  }).isRequired,
  content: string.isRequired,
}

export default FeaturedVideo
