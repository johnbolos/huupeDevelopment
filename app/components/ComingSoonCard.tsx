import curtain from '../images/products/curtain.webp';

export function ComingSoonCard({order}: {order?: string}) {
  return (
    <div
      className={`flex flex-col justify-start items-center max-w-[380px] mx-[26px] lg:mx-[72px] ${
        order ? order : ''
      }`}
    >
      <div className="flex flex-col justify-start items-center">
        <div className="card-image h-[280px] w-[180px]">
          <img
            className="object-fit w-full fadeIn rounded-[10px]"
            src={curtain}
            alt="red curtain with gold tassels"
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-center text-lg font-['AndaleMono'] mt-[15px] mb-[10px]">
            coming soon.
          </h3>
          <div className={'h-[96px]'}>
            <p className="text-center">Enter email to join waitlist</p>
          </div>
          <div className="flex gap-x-[10px] justify-center">
            <div className="klaviyo-form-VjN4UC"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
