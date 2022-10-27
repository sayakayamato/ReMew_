import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "../../css/Slider.css";

import { useFirebase } from "../../hooks/useFirebase";

export function QuestionSlider() {
  const navigate = useNavigate();
  const WhatCategory = (e) => {
    const categoryName = e.target.innerText;
    const categoryId = e.target.id;
    navigate("/questionsamples", {
      state: { categoryName: categoryName, categoryId: categoryId },
    });
  };
  const { data } = useFirebase("questionCategory");

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        // modules={[Pagination]}
        className="mySwiper"
      >
        {Object.entries(data).map(([key, item]) => (
          <SwiperSlide key={key} className="category_box">
            <button onClick={WhatCategory}>
              <div className="category_name" id={key}>
                <img className="swiper_img" src={item.image || ""} alt="" />
                {String(item.content)}
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
