import React from "react";
import { EmblaOptionsType } from "embla-carousel";
// import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import "./EmbalCarousel.css";
import Image from "next/image";

type PropType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: any;
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { event, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla mb-0 pb-0 ">
      <div className="embla__viewport " ref={emblaRef}>
        <div className="embla__container ">
          {event.imageUrls.map((image: string, index: number) => (
            <div className="embla__slide" key={index}>
              <Image
                src={image}
                alt={`image-${index}`}
                width={800}
                height={600}
                className="embla__slide__number"
              />
              {/* <div className="embla__slide__number">{index + 1}</div> */}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
