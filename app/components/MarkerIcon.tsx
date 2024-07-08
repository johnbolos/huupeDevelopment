export default function MarkerIcon({
  height = 32,
  width = 32,
  fill = '#000000',
  styles,
}: {
  height?: number;
  width?: number;
  fill?: string;
  styles?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={height}
      height={width}
      viewBox="0 0 32 32"
      fill="none"
      className={styles}
    >
      <path
        d="M16.0036 15.668C16.6461 15.668 17.1951 15.4392 17.6507 14.9817C18.1062 14.5242 18.334 13.9742 18.334 13.3317C18.334 12.6892 18.1052 12.1402 17.6477 11.6846C17.1902 11.2291 16.6402 11.0013 15.9977 11.0013C15.3552 11.0013 14.8062 11.2301 14.3507 11.6876C13.8951 12.1451 13.6673 12.6951 13.6673 13.3376C13.6673 13.9801 13.8961 14.5291 14.3536 14.9846C14.8111 15.4402 15.3611 15.668 16.0036 15.668ZM16.0007 29.3346C12.4229 26.2902 9.75065 23.4624 7.98398 20.8513C6.21732 18.2402 5.33398 15.8235 5.33398 13.6013C5.33398 10.268 6.40621 7.61241 8.55065 5.63464C10.6951 3.65686 13.1784 2.66797 16.0007 2.66797C18.8229 2.66797 21.3062 3.65686 23.4507 5.63464C25.5951 7.61241 26.6673 10.268 26.6673 13.6013C26.6673 15.8235 25.784 18.2402 24.0173 20.8513C22.2507 23.4624 19.5784 26.2902 16.0007 29.3346Z"
        fill={fill}
      />
    </svg>
  );
}
