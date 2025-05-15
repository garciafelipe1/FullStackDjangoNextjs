import { IPostsList } from "@/interfaces/blog/IPost";
import PostCard from "./PostCard";
import 'keen-slider/keen-slider.min.css'
import {useKeenSlider} from 'keen-slider/react'
import LoadingPostCard from "@/components/loaders/LoaderPostCard";
import { use, useEffect, useState } from "react";
import { on } from "events";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface ComponentProps {
  posts: IPostsList[];
  title?: string;
  description?: string;
  loading: boolean;
}


function Arrow({
  disabled,
  left,
  onClick,
}: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabledClass = disabled ? ' arrow--disabled' : '';
  return (
    <button
      type="button"
      onClick={onClick} // Pasar onClick siempre
      className={`arrow ${left ? 'arrow--left' : 'arrow--right'} ${disabledClass}`}
      disabled={disabled} // Añadir el atributo disabled al botón
    >
      {left ? (
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      ) : (
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      )}
    </button>
  );
}


export default function PostList({ posts,loading,title, description }: ComponentProps) {
  const [currentSlide,setCurrentSlide]=useState<number>(0);
  const [loaded,setLoaded]=useState<boolean>(false);
  const[perView,setPerView]=useState<number>(3);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });


  useEffect(() => {
    const handleResize =()=>{
      if(window.innerWidth<900){
        setPerView(1)
      }else{
        setPerView(3)
      }
    }
    handleResize()
    window.addEventListener('resize',handleResize)
    return () => {
      window.removeEventListener('resize',handleResize)
    }
    
  },[])

  useEffect(() => {
    if(!loading && posts.length>0 && instanceRef.current){
      instanceRef.current.update()
      setLoaded(true)
    }
    
  },[posts,loading,instanceRef])

  useEffect(() => {
    if( instanceRef.current){
      instanceRef.current.update()
    }
    
  },[instanceRef])


  if(loading){
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {title !== '' && (
            <div className="mx-auto text-left">
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                {title}
              </h2>
              {description !== '' && <p className="mt-2 text-lg/8 text-gray-600">{description}</p>}
            </div>
          )}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <LoadingPostCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {title !== '' && (
          <div className="mx-auto text-left">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              {title}
            </h2>
            {description !== '' && <p className="mt-2 text-lg/8 text-gray-600">{description}</p>}
          </div>
        )}

        <div ref={sliderRef} className="keen-slider mt-16">
          {posts.map((post) => (
            <div key={post.id} className="keen-slider__slide">
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {loaded && instanceRef.current && (
          <div className="hidden 2xl:flex">
            <Arrow
              left
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
            />
            <Arrow
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 3}
            />
          </div>
        )}
        {loaded && instanceRef.current && (
          <div className="dots absolute bottom-16 left-0 right-0 flex justify-center gap-2">
            {[...Array(instanceRef.current.track.details.slides.length-(perView-1)).keys()].map((idx) => (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`dot ${currentSlide === idx ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

PostList.defaultProps = {
  title: "",
  description: "",

};

Arrow.defaultProps = {
  left: false,
};