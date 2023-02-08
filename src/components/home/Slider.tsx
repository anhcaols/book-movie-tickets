/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SimpleSlider() {
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
  };
  return (
    <div className="w-full block">
      <Slider {...settings}>
        <img
          className="h-[528px]"
          alt="img"
          src="https://cdn.galaxycine.vn/media/2023/1/14/chi-chi-em-em-2-3_1673710348053.jpg"
        />
        <img
          className="h-[528px]"
          alt="img"
          src="https://cdn.galaxycine.vn/media/2023/1/14/nha-ba-nu-4_1673710602771.jpg"
        />
        <img
          className="h-[528px]"
          alt="img"
          src="https://cdn.galaxycine.vn/media/2023/2/8/titanic-5_1675823758136.jpg"
        />
      </Slider>
    </div>
  );
}

export default SimpleSlider;
