import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { flushSync } from 'react-dom'
import axios from 'axios';


const TWEEN_FACTOR = 1.2

const EmblaCarousel = () => {
    const [image, setImage] = useState([]);
    const imageByIndex = (index) => image[index % image.length].image;
    console.log(imageByIndex)
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/image")
            .then((res) => {
                console.log(res.data);
                setImage(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const options = { dragFree: true }
    const slides = image.map((_, index) => index)
    console.log(slides)
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const [tweenValues, setTweenValues] = useState([])

  const onScroll = useCallback(() => {
    if (!emblaApi) return

    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      return diffToTarget * (-1 / TWEEN_FACTOR) * 100
    })
    setTweenValues(styles)
  }, [emblaApi, setTweenValues])

  useEffect(() => {
    if (!emblaApi) return
    onScroll()
    emblaApi.on('scroll', () => {
      flushSync(() => onScroll())
    })
    emblaApi.on('reInit', onScroll)
  }, [emblaApi, onScroll])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((image, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <div className="embla__parallax">
                <div
                  className="embla__parallax__layer"
                  style={{
                    ...(tweenValues.length && {
                      transform: `translateX(${tweenValues[index]}%)`
                    })
                  }}
                >
                  <img
                    className="embla__slide__img embla__parallax__img"
                    src={imageByIndex(index)}
                    alt="Your alt text"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
