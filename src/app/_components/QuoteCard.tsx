import React from "react";
import Image from "next/image";
import QuoteLeft from "~/assets/quote-left.png";

interface cover {
  title: string;
  subtitle: string;
}

const QuoteCard = ({ title, subtitle }: cover) => {
  return (
    <div className="mx-32 bg-[#F6F6F6] p-9">
      <center className="m-3">
        <Image
          style={{ boxShadow: "sm", borderRadius: "lg" }}
          width={50}
          height={50}
          alt={"quote-left"}
          src={QuoteLeft}
        />
      </center>

      <h1 className="text-center text-[36px] text-[#333333]">{title}</h1>
      <p className="mx-32 my-5 text-center text-[#999999]">{subtitle}</p>
    </div>
  );
};

export default QuoteCard;
