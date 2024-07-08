import StarFullIcon from './StarFullIcon';
import StarHalfIcon from './StarHalfIcon';

export default function TestimonyCard({
  testimony,
  onClick,
}: {
  testimony: Testimony;
  onClick: () => void;
}) {
  const wholeStarsNumber = Math.floor(testimony.stars);
  const starsArray = [];
  for (let i = 0; i < wholeStarsNumber; i++) {
    starsArray.push(<StarFullIcon fill={'#27AE60'} />);
  }
  return (
    <div className="betatesters-slide h-[209px] w-[306px] mx-[18px] cursor-pointer relative">
      <img
        src={testimony.img}
        alt={testimony.altText}
        height={testimony.height}
        width={testimony.width}
        className="h-[209px] w-[306px] rounded-[20px]"
        onClick={onClick}
      />
      <div className="absolute bottom-0 left-0 flex flex-col h-full p-[20px] z-10 pointer-events-none">
        <div className="flex flex-col justify-end h-full">
          {/* <div className="flex flex-row gap-1 mb-2">
            {starsArray}
            {testimony.stars % wholeStarsNumber !== 0 && (
              <StarHalfIcon fill={'#27AE60'} />
            )}
          </div> */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[20px] font-[Radikal] text-[#ffffff] font-[900] leading-[100%] pointer-events-none">
              &quot;{testimony.title}&quot;
            </h2>
            {testimony.name && (
              <p className="text-[16px] font-[Radikal] text-[#ffffff] font-[400] leading-[100%] pointer-events-none">
                - {testimony.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
