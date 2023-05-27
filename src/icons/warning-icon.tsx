const WarningIcon = ({ height, width }: { height: number; width: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={height}
    height={width}
    viewBox="0 0 256 256"
  >
    <path
      fill="#ED6C02"
      d="M240.26 186.1L152.81 34.23a28.74 28.74 0 0 0-49.62 
      0L15.74 186.1a27.45 27.45 0 0 0 0 27.71A28.31 28.31 0 0 0
       40.55 228h174.9a28.31 28.31 0 0 0 24.79-14.19a27.45 27.45 0 0 0 
       .02-27.71Zm-20.8 15.7a4.46 4.46 0 0 1-4 2.2H40.55a4.46 4.46 0 0 1-4-2.2a3.56
        3.56 0 0 1 0-3.73L124 46.2a4.77 4.77 0 0 1 8 0l87.44 151.87a3.56 3.56 0 0 1 
        .02 3.73ZM116 136v-32a12 12 0 0 1 24 0v32a12 12 0 0 1-24 0Zm28 40a16 16 0 1 
        1-16-16a16 16 0 0 1 16 16Z"
    />
  </svg>
);

export default WarningIcon;
