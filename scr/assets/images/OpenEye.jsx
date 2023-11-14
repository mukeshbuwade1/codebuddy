import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.994 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm0-2.006a1.494 1.494 0 110-2.988 1.494 1.494 0 010 2.988z"
        fill="#0F0F0F"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5C7.189 5 3.917 7.609 2.19 9.48a3.679 3.679 0 000 5.04C3.916 16.391 7.188 19 12 19c4.811 0 8.083-2.609 9.81-4.48a3.679 3.679 0 000-5.04C20.084 7.609 16.812 5 12 5zm-8.341 5.837C5.189 9.18 7.967 7 12 7c4.033 0 6.812 2.18 8.341 3.837a1.68 1.68 0 010 2.326C18.811 14.82 16.033 17 12 17c-4.033 0-6.812-2.18-8.341-3.837a1.68 1.68 0 010-2.326z"
        fill="#0F0F0F"
      />
    </Svg>
  )
}

export default SvgComponent
