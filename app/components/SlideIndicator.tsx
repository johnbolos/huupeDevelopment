function SlideIndicator({
  active,
  className,
  onClick,
}: {
  active: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className={className}>
      <span
        className={`
        h-[10px]
        rounded-[5px]
        w-full
        ${active ? ' bg-[#F26500]' : ' bg-[#D9D9D9]'}
        `}
      />
    </div>
  );
}

export default SlideIndicator;
