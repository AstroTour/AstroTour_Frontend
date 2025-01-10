import React from 'react'
import Image from 'next/image';

const Page = ({ title, content, image }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-black/40 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-6 transition-all hover:shadow-2xl">
      <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white text-sm">{content}</p>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
          <Image src={image} alt={title} width={100} height={100} />
        </div>
      </div>
    </div>
  );
};


const PageContainer = () => {
  const cards = [
    {
      title: "Cím",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      image: "/example-image.png",
    },
    {
      title: "Cím",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      image: "/example-image.png",
    },
    {
      title: "Cím",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      image: "/example-image.png",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Page
            key={index}
            title={card.title}
            content={card.content}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
}

export default PageContainer;
