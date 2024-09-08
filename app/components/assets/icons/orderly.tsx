'use client';
import React, { FC } from "react";
import { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size: number;
  className?: string | undefined;
}

export const OrderlyIcon: FC<IconProps> = (props) => {
  const { size = 14, ...rest } = props;
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 14 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.01715 2.44768e-09L6.98387 0C5.22881 0.00408275 3.62547 0.654068 2.39898 1.72485C2.31207 1.80072 2.36711 1.93997 2.48248 1.93997L11.5185 1.93997C11.6339 1.93997 11.689 1.80072 11.602 1.72485C10.3755 0.654069 8.77221 0.00408302 7.01715 2.44768e-09ZM4.05972 8.78965C4.14695 8.78965 4.22759 8.83453 4.27768 8.90594C4.87877 9.76309 5.87428 10.3234 7.00066 10.3234C8.12705 10.3234 9.12256 9.76309 9.72365 8.90594C9.77374 8.83453 9.85438 8.78965 9.9416 8.78965H13.5622C13.6671 8.78965 13.7436 8.88911 13.7138 8.98969C12.8566 11.8865 10.1754 14.0001 7.00063 14.0001C3.82584 14.0001 1.14468 11.8865 0.287443 8.98969C0.25768 8.88911 0.334155 8.78965 0.439044 8.78965H4.05972ZM9.6368 4.97551C9.7008 5.05874 9.79828 5.11093 9.90326 5.11093H13.532C13.6379 5.11093 13.7145 5.00987 13.683 4.90882C13.4087 4.03155 12.9665 3.22848 12.394 2.53728C12.3463 2.47975 12.2752 2.44727 12.2005 2.44727L1.80072 2.44727C1.72601 2.44727 1.65483 2.47975 1.60717 2.53728C1.03464 3.22848 0.592436 4.03155 0.318216 4.90882C0.286629 5.00987 0.363287 5.11093 0.469158 5.11093L4.09792 5.11093C4.2029 5.11093 4.30038 5.05874 4.36438 4.97551C4.97197 4.18537 5.92681 3.67615 7.00059 3.67615C8.07437 3.67615 9.02921 4.18537 9.6368 4.97551ZM10.1199 8.14886C10.0962 8.21318 10.1428 8.28303 10.2113 8.28303H13.7498C13.8269 8.28303 13.8932 8.22806 13.9058 8.152C13.9678 7.77749 14 7.39295 14 7.00088C14 6.57326 13.9617 6.1546 13.8882 5.74814C13.8747 5.67313 13.8089 5.61937 13.7326 5.61937H10.1732C10.1033 5.61937 10.0566 5.6918 10.0828 5.75661C10.2381 6.1409 10.3235 6.56086 10.3235 7.00077C10.3235 7.40431 10.2516 7.79104 10.1199 8.14886ZM3.78867 8.28303C3.85721 8.28303 3.90378 8.21318 3.88011 8.14886C3.74839 7.79104 3.67648 7.40431 3.67648 7.00077C3.67648 6.56086 3.76195 6.1409 3.91719 5.75661C3.94336 5.6918 3.89673 5.61937 3.82684 5.61937L0.267378 5.61937C0.191156 5.61937 0.125329 5.67313 0.111777 5.74814C0.0383425 6.1546 0 6.57326 0 7.00088C0 7.39295 0.032232 7.77749 0.0941906 8.152C0.106775 8.22806 0.173095 8.28303 0.250192 8.28303H3.78867Z"
        fill="#A8A8A8"
      />
    </svg>
  );
};
