import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoPlaySpeed:1000,
        cssEase: "linear",
        height:'70vh',
        adaptiveHeight:true,
       arrows:false
    };
    return (
        <div className="border-2 border-black ">
            <Slider {...settings}>
                <div id='item1' className=" w-full">
                    <img src="../../worker3.png" className="w-full" alt="Tailwind CSS Carousel component" />
                </div>
                <div id='item2' className="carousel-item w-full">
                    <img src="../../worker2.png" className="w-full" alt="Tailwind CSS Carousel component" />
                </div>
                <div id='item3' className="carousel-item w-full">
                    <img src="../../worker1.png" className="w-full" alt="Tailwind CSS Carousel component" />
                </div>
                <div id='item4' className="carousel-item w-full">
                    <img src="../../worker4.png" className="w-full" alt="Tailwind CSS Carousel component" />
                </div>
                <div id='item5' className="carousel-item w-full">
                    <img src="../../worker5.png" className="w-full " alt="Tailwind CSS Carousel component" />
                </div>
            </Slider>
        </div>
    );
}

export default SimpleSlider;

