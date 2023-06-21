export function GGPPillUnit({ title = 'GGP', value = null, ...props }) {
  return (
    <span
      className="pointer-events-none flex h-fit min-w-fit flex-row items-center justify-start space-x-2 rounded-full bg-indigo-700 p-1.5 pl-2 pr-4 text-xs text-white"
      {...props}
    >
      <svg
        // className="h-full w-full max-w-[20px] bg-indigo-700 pt-1"
        className="rounded-full bg-blue-400"
        fill="white"
        height="27"
        viewBox="0 -5 9 24"
        width="27"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.3222 11.5733L3.69648 11.5537C3.50283 11.5521 3.34354 11.714 3.34198 11.9167L3.33261 12.767C3.3248 13.4407 3.84016 13.9917 4.48357 13.9999C5.12698 14.0081 5.65327 13.4685 5.66108 12.7948L5.67045 11.9445C5.67201 11.7418 5.51741 11.575 5.32376 11.5733H5.3222Z"
          fill="white"
        />
        <path
          d="M4.27727 0.00466366C2.01127 0.120758 0.141928 2.05675 0.00762286 4.4277C-0.0735848 5.8568 0.460512 7.16327 1.36161 8.08222H1.36473L1.37878 8.1002L1.688 8.38308L2.99044 9.57836C3.131 9.70754 3.31059 9.77785 3.49799 9.77785H5.50008C5.68748 9.77785 5.86707 9.70754 6.00762 9.57836L7.35692 8.34057L7.39752 8.30296L7.57087 8.14272L7.58024 8.13618C8.45323 7.27446 8.99825 6.05792 8.99825 4.70894C8.99982 2.0355 6.85718 -0.126147 4.27727 0.00466366ZM4.5006 2.50642C5.65937 2.50642 6.60419 3.49567 6.60419 4.71057C6.60419 5.92548 5.65937 6.9131 4.5006 6.9131C3.34182 6.9131 2.397 5.92384 2.397 4.71057C2.397 3.49731 3.34182 2.50642 4.5006 2.50642V2.50642Z"
          fill="white"
        />
      </svg>
      <div className="font-bold tracking-widest">{title}</div>
      {value ? <div>{(Math.round(value * 100) / 100).toFixed(2).replace(/\.?0+$/, '')}</div> : null}
    </span>
  )
}
